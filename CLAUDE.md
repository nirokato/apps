# CLAUDE.md

> **Agents: keep this file up to date.** When you add a project, change conventions, or modify infrastructure, update the relevant sections here.

## Repository overview

Monorepo for small projects hosted under **apps.andymolenda.com**. Each project lives under `projects/<name>/` and is deployed to its own Cloudflare Pages project with a subdomain (e.g. `<name>.apps.andymolenda.com`). The homepage project is special — it serves the root at `apps.andymolenda.com`.

## Repository structure

```
projects/
  homepage/              Landing page (serves apps.andymolenda.com)
  clock/                 World clock across timezones
  weft/                  Local-first topic-threaded P2P chat (Veilid + cr-sqlite)
  peer-drop/             Browser-based P2P file and text sharing (WebRTC)
  trove/                 Semantic search for 3D prints by decor style/aesthetic
  zmk-keymap/            Landing page + download for a KDE Plasma ZMK keymap widget
  bubble-share/          Interactive showcase of Bubble Share (FOSS Wi-Fi Aware sharing for Android)
  github-uptime/         GitHub's monthly uptime history, charted from githubstatus.com
tofu/                    OpenTofu infrastructure (Cloudflare Pages + DNS)
tools/
  trove-ingest/          Node script: Printables metadata -> trove index.json
  github-uptime-ingest/  Node script: githubstatus.com uptime history -> github-uptime uptime.json
.github/workflows/
  deploy.yml             Infrastructure (tofu plan/apply) + deploy changed projects
  claude.yml             Claude Code GitHub Action (issue/PR triggers)
  trove-refresh.yml      Rebuild trove's Printables index (scheduled + manual)
  github-uptime-refresh.yml  Rebuild + deploy github-uptime's data (monthly + manual)
```

## Adding a new project

1. Create `projects/<project-name>/` with an `index.html`
2. Add the project name to the `projects` set in `tofu/variables.tf` — subdomain is derived automatically (`<name>.apps.andymolenda.com`). Do NOT specify a subdomain manually.
3. Update `projects/homepage/index.html` to link to the new project (follow the existing `<li>` pattern)
4. Update the projects table below
5. Commit with a `feat:` conventional commit message

The deploy matrix is auto-discovered from the `projects/` directory — **no workflow file changes needed**.

## Projects

| Project | Path | URL | Description |
|---------|------|-----|-------------|
| homepage | `projects/homepage/` | `apps.andymolenda.com` | Landing page and project directory |
| clock | `projects/clock/` | `clock.apps.andymolenda.com` | World clock across timezones |
| weft | `projects/weft/` | `weft.apps.andymolenda.com` | Local-first topic-threaded P2P chat on Veilid + cr-sqlite |
| peer-drop | `projects/peer-drop/` | `peer-drop.apps.andymolenda.com` | P2P file and text sharing between devices via WebRTC |
| trove | `projects/trove/` | `trove.apps.andymolenda.com` | Semantic search for 3D-printable models by decor style / aesthetic |
| zmk-keymap | `projects/zmk-keymap/` | `zmk-keymap.apps.andymolenda.com` | Landing page for a KDE Plasma widget showing a ZMK keyboard's keymap (*just for fun*) |
| bubble-share | `projects/bubble-share/` | `bubble-share.apps.andymolenda.com` | Interactive showcase of [Bubble Share](https://codeberg.org/s1m/bubble-share), a FOSS Wi-Fi Aware file/clipboard sharing app for Android: two-phone simulator plus key-schedule, wire-format and NFC labs |
| github-uptime | `projects/github-uptime/` | `github-uptime.apps.andymolenda.com` | GitHub's monthly uptime since 2017, charted from its status page |

## Project classes

Projects are unmarked by default. A **just for fun** project is shared as-is, with no support promised:

- Its source repo has Issues and pull requests turned off (`gh repo edit --enable-issues=false`; `gh api -X PATCH repos/<owner>/<repo> -F has_pull_requests=false`).
- It is MIT licensed; forks are welcome as long as the copyright notice is kept.
- Its homepage card carries the `just for fun` tag (see Homepage link format), and its page says so near the top and in a closing "Just for fun" card.

## Design system

All projects must follow this visual language consistently.

### Colors

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#0f0f0c` | Page background |
| Card/surface | `#1a1a16` | Cards, panels |
| Border | `#2a2a24` | Card borders, dividers |
| Text primary | `#e8e4d4` | Headings, body text |
| Text secondary | `#9a9686` | Subtitles, descriptions, back links |
| Accent | `#c4a24e` | Links, highlights, interactive elements |

### Typography

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
```

- **Body:** `'Inter', sans-serif`
- **Monospace/data:** `'JetBrains Mono', monospace`

### Layout

- Max width: `600px`, centered, `padding: 2rem`
- Cards: `background: #1a1a16`, `border: 1px solid #2a2a24`, `border-radius: 8px`, `padding: 1.25rem 1.5rem`

### Page template

Every project page must include:
- `<title><name> — apps.andymolenda.com</title>`
- The Google Fonts link above
- A back link at the bottom: `<p class="back"><a href="https://apps.andymolenda.com">&larr; apps.andymolenda.com</a></p>`

### Homepage link format

When adding a project to the homepage, follow this exact pattern:

```html
<li><a class="project" href="https://<name>.apps.andymolenda.com">
  <div class="project-name"><name></div>
  <div class="project-desc">Short description</div>
</a></li>
```

For a *just for fun* project, tag the name: `<div class="project-name"><name><span class="tag">just for fun</span></div>`.

## Tech stack & conventions

- **No build step.** All projects are static HTML/CSS/JS served directly.
- **External libraries via CDN only** (e.g. Google Fonts, PeerJS). No npm, no bundlers, no node_modules.
- **Single-file preferred.** Keep everything in one `index.html` unless complexity demands splitting.
- **Infrastructure as Code:** OpenTofu (v1.8+) with Cloudflare provider (~> 4.0).
- **No test framework or linter** is currently configured for most projects.
- **Exception: Weft** uses vendored WASM binaries (Veilid, cr-sqlite) in `wasm/` and `lib/`. These are pre-built artifacts, not compiled in the deploy workflow. The application JS remains unbundled native ES modules consistent with repo conventions.
- **Exception: Weft testing** uses Playwright (headless Chromium) to test Web Worker logic in a real browser context. Run with `node projects/weft/tests/run.js`. Tests exercise the DB worker (cr-sqlite) and app logic without network access; Veilid DHT tests require a live network and are manual-only. See `projects/weft/tests/README.md` for details.
- **Exception: Trove** stays static + CDN-only, but adds two patterns: (1) **in-browser semantic search** — `transformers.js` (MiniLM sentence embeddings) loaded from CDN, computed client-side and cached in IndexedDB; (2) a **zero-dependency Node ingest tool** (`tools/trove-ingest/ingest.mjs`) that pulls Printables metadata into `projects/trove/data/index.json`, run weekly by `.github/workflows/trove-refresh.yml`. The optional `--embed` precompute path is the only piece that needs npm, and nothing from it is committed. Ranking math is unit-tested: `node projects/trove/tests/run.mjs`.

- **Exception: bubble-share** is a showcase of a third-party app (Bubble Share, AGPL-3.0, by Simon Gougeon on Codeberg), not a client for it. `protocol.mjs` re-implements the app's protocol pieces (X25519 + HMAC key schedule, kotlinx-style CBOR, TEXT_V1/FILE_V1 framing, Type-4/Bubble APDUs, NDEF) as pure functions shared by the browser page and a Node test suite: `node projects/bubble-share/tests/run.mjs`. The simulator in `app.mjs` is a sketch of the app's screens, not screenshots. When Bubble Share changes its protocol, update `protocol.mjs` and its tests from the Kotlin source, then the step text in `app.mjs`.
- **Exception: zmk-keymap** is a landing page, not an app. The widget lives in its own repo (`nirokato/plasma-zmk-keymap`); the download button links to that repo's `releases/latest/download/` asset, so widget releases need no change here. `tiles.png` is rendered by the widget repo's `tools/preview.sh` in this site's palette.

- **Exception: github-uptime** is a no-build port of [DaMrNelson/github-historical-uptime](https://github.com/DaMrNelson/github-historical-uptime) (MIT; notice kept in `projects/github-uptime/LICENSE.txt`). Chart.js + the annotation plugin from CDN. Its container is 900px wide, not 600px, because ten years of monthly points need the width. Data comes from `tools/github-uptime-ingest/ingest.mjs` (zero-dependency Node), which scrapes `githubstatus.com/uptime/<component_id>?page=N` (`Accept: application/json`) and writes a ~20 KB per-month summary to `projects/github-uptime/data/uptime.json`; the raw scrape (~4.5 MB) is never committed. The ingest refuses to write fewer months than are committed (`--force` overrides). The Month to date tab is the one live part: the browser fetches the current month from the same endpoint's page 1 when the tab opens. The status page sends `Access-Control-Allow-Origin: *`, but answers a CORS preflight with a 302, so those fetches send only the safelisted `Accept` header.

## Deployment

- **Platform:** Cloudflare Pages (one Pages project per project)
- **Infrastructure:** OpenTofu manages Pages projects, custom domains, and DNS CNAMEs. State in Cloudflare R2 (`tofu-state` bucket, key `apps/`).
- **Workflow:** `.github/workflows/deploy.yml` — tofu plan on PR (with comment), tofu apply + deploy on push to `main`.
- **Auto-discovery:** The deploy job scans `projects/` at runtime to build its matrix. No manual matrix updates needed.
- **Trove index refresh:** `.github/workflows/trove-refresh.yml` rebuilds `projects/trove/data/index.json` from the Printables API (weekly + manual dispatch) and commits to `main`, re-triggering trove's deploy. The deployed app is fully static; the ingest never runs in users' browsers.
- **github-uptime refresh:** `.github/workflows/github-uptime-refresh.yml` re-scrapes on the 2nd of each month (~9 min, paced requests), commits only when the data changed, and deploys github-uptime itself with wrangler. Pushes made with `GITHUB_TOKEN` don't start other workflows, so `deploy.yml` never sees a bot commit; any scheduled refresh that should go live has to deploy on its own.
- **Domains:** Homepage at `apps.andymolenda.com`, projects at `<name>.apps.andymolenda.com`.
- **SSL:** Cloudflare Advanced Certificate Manager covers `*.apps.andymolenda.com`.

## Git conventions

- [Conventional Commits](https://www.conventionalcommits.org/) for all commit messages and PR titles (e.g. `feat:`, `fix:`, `chore:`, `docs:`, `refactor:`)
- All PRs are squash-merged
- Default branch: `main`

## Local development

Projects have no build step. Serve any project directory with a static file server:

```
python3 -m http.server 8000
```

## Maintenance checklist for agents

When making changes to this repo, check off the applicable items:

- [ ] If you added a project: created `projects/<name>/index.html`, added to `tofu/variables.tf` projects set, updated homepage links, updated projects table in this file
- [ ] If you added a *just for fun* project: tagged its homepage card and page, and turned off Issues and pull requests on its source repo (see Project classes)
- [ ] If you changed the design system (colors, fonts, layout): updated the Design system section above and verified existing projects still match
- [ ] If you changed the deployment workflow or added new infrastructure: updated the Deployment section above
- [ ] If you introduced a build step, package manager, test framework, or linter: updated the Tech stack section above
- [ ] If you made changes to weft: updated `projects/weft/README.md` (current status, architecture, data model), updated `projects/weft/docs/PRD.md` (phase progress, schema, checklist), and ensured tests pass (`node projects/weft/tests/run.js`)
