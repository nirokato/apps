#!/usr/bin/env bash
# Build veilid-wasm from an upstream Veilid tag and vendor it into weft.
#
# Applies tools/veilid-wasm-build/patches/*.patch, runs upstream's own pipeline
# (veilid-wasm/wasm_build_js.sh: cargo build, wasm-bindgen, wasm-opt) with weft's
# feature set, then replaces
# projects/weft/wasm/veilid/ with the result plus a BUILD_INFO.json.
#
# Usage: tools/veilid-wasm-build/build.sh
#   VEILID_REF       upstream tag or branch          (default: v0.5.8)
#   VEILID_FEATURES  comma-separated cargo features  (default: enable-protocol-wss)
#   VEILID_SRC       existing Veilid checkout to build instead of cloning
#   WORK_DIR         where the clone and tools go    (default: a temp dir)
#   OUT_DIR          where the bundle is written     (default: projects/weft/wasm/veilid)
#
# Needs: git, curl, rustup + cargo. wasm-bindgen and wasm-opt are downloaded at
# the versions the Veilid checkout pins.

set -euo pipefail

VEILID_REPO="https://gitlab.com/veilid/veilid.git"
VEILID_REF="${VEILID_REF:-v0.5.8}"
VEILID_FEATURES="${VEILID_FEATURES:-enable-protocol-wss}"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
OUT_DIR="${OUT_DIR:-$REPO_ROOT/projects/weft/wasm/veilid}"
WORK_DIR="${WORK_DIR:-$(mktemp -d)}"
BINARYEN_FALLBACK="125"

die() { echo "error: $*" >&2; exit 1; }

[[ "$VEILID_REF" =~ ^[A-Za-z0-9][A-Za-z0-9._/-]*$ ]] || die "bad VEILID_REF: $VEILID_REF"
[[ "$VEILID_FEATURES" =~ ^[a-z0-9,-]*$ ]] || die "bad VEILID_FEATURES: $VEILID_FEATURES"

mkdir -p "$WORK_DIR/tools/bin"
export PATH="$WORK_DIR/tools/bin:$PATH"

# --- source ------------------------------------------------------------------
if [ -n "${VEILID_SRC:-}" ]; then
    SRC="$VEILID_SRC"
else
    SRC="$WORK_DIR/veilid"
    rm -rf "$SRC"
    git clone --depth 1 --branch "$VEILID_REF" "$VEILID_REPO" "$SRC"
fi
[ -x "$SRC/veilid-wasm/wasm_build_js.sh" ] \
    || die "$VEILID_REF has no veilid-wasm/wasm_build_js.sh (tags before 0.5.4 built with wasm-pack)"
VEILID_COMMIT="$(git -C "$SRC" rev-parse HEAD)"

# --- patches -----------------------------------------------------------------
# Fixes weft needs that upstream doesn't have yet; see patches/README.md. Each must apply
# cleanly, or already be applied (a reused VEILID_SRC), or the build stops.
PATCH_DIR="$REPO_ROOT/tools/veilid-wasm-build/patches"
PATCHES=()
for patch in "$PATCH_DIR"/*.patch; do
    [ -e "$patch" ] || continue
    if git -C "$SRC" apply --check "$patch" 2>/dev/null; then
        git -C "$SRC" apply "$patch"
    elif ! git -C "$SRC" apply --reverse --check "$patch" 2>/dev/null; then
        die "$(basename "$patch") does not apply to $VEILID_REF; update or drop it"
    fi
    PATCHES+=("$(basename "$patch")")
done
PATCHES_JSON="$(printf '"%s",' "${PATCHES[@]}")"
PATCHES_JSON="[${PATCHES_JSON%,}]"
[ "${#PATCHES[@]}" -eq 0 ] && PATCHES_JSON="[]"
VEILID_VERSION="$(awk -F'"' '/^version = "/ {print $2; exit}' "$SRC/veilid-wasm/Cargo.toml")"

# --- tool versions, as pinned by the checkout --------------------------------
# wasm-bindgen's CLI must match the crate version in Cargo.lock exactly.
WASM_BINDGEN_VERSION="$(awk '/^name = "wasm-bindgen"$/ {getline; gsub(/[^0-9.]/, ""); print; exit}' "$SRC/Cargo.lock")"
[ -n "$WASM_BINDGEN_VERSION" ] || die "could not read the wasm-bindgen version from Cargo.lock"
BINARYEN_VERSION="$(sed -n 's/^BINARYEN_VERSION="\([0-9.]*\)".*/\1/p' "$SRC/.dagger/versions.env" 2>/dev/null | head -1)"
BINARYEN_VERSION="${BINARYEN_VERSION:-$BINARYEN_FALLBACK}"

ARCH="$(uname -m)"

if [ "$(wasm-bindgen --version 2>/dev/null | awk '{print $2}')" != "$WASM_BINDGEN_VERSION" ]; then
    name="wasm-bindgen-$WASM_BINDGEN_VERSION-$ARCH-unknown-linux-musl"
    if curl -fsSL "https://github.com/wasm-bindgen/wasm-bindgen/releases/download/$WASM_BINDGEN_VERSION/$name.tar.gz" \
        | tar -xz -C "$WORK_DIR/tools" 2>/dev/null; then
        cp "$WORK_DIR/tools/$name/wasm-bindgen" "$WORK_DIR/tools/bin/"
    else
        cargo install --locked wasm-bindgen-cli --version "$WASM_BINDGEN_VERSION" --root "$WORK_DIR/tools"
    fi
fi

if [ "$(wasm-opt --version 2>/dev/null | awk '{print $3}')" != "$BINARYEN_VERSION" ]; then
    mkdir -p "$WORK_DIR/tools/binaryen"
    curl -fsSL "https://github.com/WebAssembly/binaryen/releases/download/version_$BINARYEN_VERSION/binaryen-version_$BINARYEN_VERSION-$ARCH-linux.tar.gz" \
        | tar -xz -C "$WORK_DIR/tools/binaryen" --strip-components=1
    cp "$WORK_DIR/tools/binaryen/bin/wasm-opt" "$WORK_DIR/tools/bin/"
fi

rustup target add wasm32-unknown-unknown

# --- build -------------------------------------------------------------------
"$SRC/veilid-wasm/wasm_build_js.sh" release "--features=$VEILID_FEATURES"
PKG="$SRC/veilid-wasm/pkg"

# --- vendor ------------------------------------------------------------------
# Everything the glue imports at runtime, the type declarations (the API
# reference for weft's worker), and the licence. package.json and the README
# are for npm consumers.
mkdir -p "$OUT_DIR"
find "$OUT_DIR" -mindepth 1 -delete
for f in veilid_wasm.js veilid_wasm_bg.wasm veilid_wasm.d.ts veilid_errors.js veilid_errors.d.ts LICENSE.md; do
    cp "$PKG/$f" "$OUT_DIR/"
done
[ -d "$PKG/snippets" ] && cp -r "$PKG/snippets" "$OUT_DIR/"

sha() { sha256sum "$1" | awk '{print $1}'; }
cat > "$OUT_DIR/BUILD_INFO.json" <<EOF
{
  "veilid_version": "$VEILID_VERSION",
  "veilid_ref": "$VEILID_REF",
  "veilid_commit": "$VEILID_COMMIT",
  "features": "$VEILID_FEATURES",
  "patches": $PATCHES_JSON,
  "rustc": "$(rustc --version)",
  "wasm_bindgen": "$WASM_BINDGEN_VERSION",
  "binaryen": "$BINARYEN_VERSION",
  "veilid_wasm_bg.wasm": { "bytes": $(stat -c %s "$OUT_DIR/veilid_wasm_bg.wasm"), "sha256": "$(sha "$OUT_DIR/veilid_wasm_bg.wasm")" },
  "veilid_wasm.js": { "bytes": $(stat -c %s "$OUT_DIR/veilid_wasm.js"), "sha256": "$(sha "$OUT_DIR/veilid_wasm.js")" }
}
EOF

echo "Vendored veilid-wasm $VEILID_VERSION ($VEILID_REF @ ${VEILID_COMMIT:0:12}) into $OUT_DIR"
cat "$OUT_DIR/BUILD_INFO.json"
