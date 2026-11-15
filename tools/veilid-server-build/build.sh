#!/usr/bin/env bash
# Build a static (musl) veilid-server with WSS from an upstream Veilid tag.
#
# This is the binary weft's home bootstrap node runs. The Debian packages from
# packages.veilid.net are built without enable-protocol-wss, so a WSS node needs
# its own build.
#
# The script checks its output: the binary must be statically linked, and its
# --dump-config must contain a `wss:` section. That section only exists when the
# feature is compiled in; without it the server silently ignores the wss config.
#
# Usage: tools/veilid-server-build/build.sh
#   VEILID_REF       upstream tag or branch          (default: v0.5.8)
#   VEILID_FEATURES  comma-separated cargo features  (default: enable-protocol-wss)
#   VEILID_SRC       existing Veilid checkout to build instead of cloning
#   WORK_DIR         where the clone goes            (default: a temp dir)
#   OUT_DIR          where the binary is written     (default: $WORK_DIR/out)
#   C_MARCH          -march for the C code            (default: x86-64-v2, the node's vCPU)
#
# Needs: git, rustup + cargo, musl-gcc (Debian/Ubuntu: musl-tools).

set -euo pipefail

VEILID_REPO="https://gitlab.com/veilid/veilid.git"
VEILID_REF="${VEILID_REF:-v0.5.8}"
VEILID_FEATURES="${VEILID_FEATURES:-enable-protocol-wss}"
TARGET="x86_64-unknown-linux-musl"
WORK_DIR="${WORK_DIR:-$(mktemp -d)}"
OUT_DIR="${OUT_DIR:-$WORK_DIR/out}"

die() { echo "error: $*" >&2; exit 1; }

[[ "$VEILID_REF" =~ ^[A-Za-z0-9][A-Za-z0-9._/-]*$ ]] || die "bad VEILID_REF: $VEILID_REF"
[[ "$VEILID_FEATURES" =~ ^[a-z0-9,-]*$ ]] || die "bad VEILID_FEATURES: $VEILID_FEATURES"
command -v musl-gcc >/dev/null || die "musl-gcc not found (install musl-tools)"

mkdir -p "$WORK_DIR" "$OUT_DIR"

# --- source ------------------------------------------------------------------
if [ -n "${VEILID_SRC:-}" ]; then
    SRC="$VEILID_SRC"
else
    SRC="$WORK_DIR/veilid"
    rm -rf "$SRC"
    git clone --depth 1 --branch "$VEILID_REF" "$VEILID_REPO" "$SRC"
fi
VEILID_COMMIT="$(git -C "$SRC" rev-parse HEAD)"

# --- build -------------------------------------------------------------------
rustup target add "$TARGET"
export CC_x86_64_unknown_linux_musl=musl-gcc
# Pin the C code (bundled SQLite, ring) to x86-64-v2. Newer Ubuntu GCC emits
# AVX by default, and the node's vCPU (Proxmox x86-64-v2-AES) has no AVX: the
# 2026-11-15 build died with SIGILL in sqlite3_initialize.
C_MARCH="${C_MARCH:-x86-64-v2}"
export CFLAGS_x86_64_unknown_linux_musl="-march=$C_MARCH -mtune=generic"
(cd "$SRC" && cargo build --locked --release --target "$TARGET" -p veilid-server --features "$VEILID_FEATURES")
BIN="$SRC/target/$TARGET/release/veilid-server"

# --- check -------------------------------------------------------------------
file "$BIN" | grep -qE 'statically linked|static-pie linked' || die "not a static binary: $(file -b "$BIN")"
# SQLite has no runtime CPU dispatch, so any VEX (AVX) instruction in its
# functions means the C code was built above x86-64-v2.
AVX_COUNT="$(objdump -d --no-show-raw-insn "$BIN" \
    | awk '/^[0-9a-f]+ <sqlite3[^>]*>:$/{s=1;next} /^$/{s=0} s' \
    | grep -cE '\sv[a-z0-9]+\s+.*%[xyz]mm' || true)"
[ "$AVX_COUNT" = "0" ] || die "SQLite code has $AVX_COUNT AVX instructions; the node's CPU (x86-64-v2) can't run it"
VEILID_VERSION="$("$BIN" --version | awk '{print $2}')"
"$BIN" --dump-config > "$WORK_DIR/dump-config.yaml"
if [[ ",$VEILID_FEATURES," == *",enable-protocol-wss,"* ]]; then
    grep -qE '^\s+wss:' "$WORK_DIR/dump-config.yaml" \
        || die "enable-protocol-wss was requested but --dump-config has no wss section"
fi

# --- output ------------------------------------------------------------------
cp "$BIN" "$OUT_DIR/veilid-server"
sha() { sha256sum "$1" | awk '{print $1}'; }
cat > "$OUT_DIR/BUILD_INFO.json" <<EOF
{
  "veilid_version": "$VEILID_VERSION",
  "veilid_ref": "$VEILID_REF",
  "veilid_commit": "$VEILID_COMMIT",
  "features": "$VEILID_FEATURES",
  "target": "$TARGET",
  "c_march": "$C_MARCH",
  "cc": "$(musl-gcc --version | head -1)",
  "rustc": "$(rustc --version)",
  "veilid-server": { "bytes": $(stat -c %s "$OUT_DIR/veilid-server"), "sha256": "$(sha "$OUT_DIR/veilid-server")" }
}
EOF

echo "Built veilid-server $VEILID_VERSION ($VEILID_REF @ ${VEILID_COMMIT:0:12}) into $OUT_DIR"
cat "$OUT_DIR/BUILD_INFO.json"
