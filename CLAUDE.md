# CLAUDE.md

> **Agents: keep this file up to date.** When you add a project, change conventions, or modify infrastructure, update the relevant sections here.

## Repository overview

Monorepo for small projects hosted under **apps.andymolenda.com**. Each project lives under `projects/<name>/` and is deployed to its own Cloudflare Pages project with a subdomain (e.g. `<name>.apps.andymolenda.com`). The homepage project is special — it serves the root at `apps.andymolenda.com`.

## Repository structure

```
projects/
  homepage/          # Landing page (serves apps.andymolenda.com)
  clock/             # World clock across timezones
  weft/              # Local-first topic-threaded P2P chat
tofu/                # OpenTofu infrastructure (Cloudflare Pages + DNS)
.github/workflows/
  deploy.yml         # Infrastructure (tofu plan/apply) + production deployment
  claude.yml         # Claude Code GitHub Action (issue/PR triggers)
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
<li><a href="https://<name>.apps.andymolenda.com"><name></a> &mdash; <span style="color:#9a9686;font-size:0.9rem;">short description</span></li>
```

## Tech stack & conventions

- **No build step.** All projects are static HTML/CSS/JS served directly.
- **External libraries via CDN only** (e.g. Google Fonts, PeerJS). No npm, no bundlers, no node_modules.
- **Single-file preferred.** Keep everything in one `index.html` unless complexity demands splitting.
- **Infrastructure as Code:** OpenTofu (v1.8+) with Cloudflare provider (~> 4.0).
- **No test framework or linter** is currently configured.
- **Exception: Weft** uses vendored WASM binaries (Veilid, cr-sqlite) in `wasm/` and `lib/`. These are pre-built artifacts, not compiled in the deploy workflow. The application JS remains unbundled native ES modules consistent with repo conventions.

## Deployment

- **Platform:** Cloudflare Pages (one Pages project per project)
- **Infrastructure:** OpenTofu manages Pages projects, custom domains, and DNS CNAMEs. State in Cloudflare R2 (`tofu-state` bucket, key `apps/`).
- **Workflow:** `.github/workflows/deploy.yml` — tofu plan on PR (with comment), tofu apply + deploy on push to `main`.
- **Auto-discovery:** The deploy job scans `projects/` at runtime to build its matrix. No manual matrix updates needed.
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
- [ ] If you changed the design system (colors, fonts, layout): updated the Design system section above and verified existing projects still match
- [ ] If you changed the deployment workflow or added new infrastructure: updated the Deployment section above
- [ ] If you introduced a build step, package manager, test framework, or linter: updated the Tech stack section above
