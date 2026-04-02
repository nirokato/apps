# apps.andymolenda.com

Monorepo for side projects hosted under **[apps.andymolenda.com](https://apps.andymolenda.com)**. Each project gets its own subdomain, deployed to Cloudflare Pages with infrastructure managed by OpenTofu.

## Projects

| Project | URL | Tech | Description |
|---------|-----|------|-------------|
| [homepage](projects/homepage/) | [apps.andymolenda.com](https://apps.andymolenda.com) | Static HTML | Landing page and project directory |
| [clock](projects/clock/) | [clock.apps.andymolenda.com](https://clock.apps.andymolenda.com) | Static HTML/JS | World clock across timezones |
| [weft](projects/weft/) | [weft.apps.andymolenda.com](https://weft.apps.andymolenda.com) | Veilid WASM, cr-sqlite, lit-html | Local-first topic-threaded P2P chat |
| [peer-drop](projects/peer-drop/) | [peer-drop.apps.andymolenda.com](https://peer-drop.apps.andymolenda.com) | WebRTC, PeerJS | Browser-based P2P file and text sharing |

## Stack

- **No build step** — all projects are static HTML/CSS/JS with native ES modules
- **External libraries via CDN only** — no npm, no bundlers, no node_modules
- **Infrastructure as Code** — OpenTofu manages Cloudflare Pages projects, DNS, and custom domains
- **CI/CD** — GitHub Actions deploys only changed projects on push to `main`
- **Claude Code** — `@claude` in issues/PRs triggers automated coding via GitHub Action

## Structure

```
projects/
  homepage/              Landing page (apps.andymolenda.com)
  clock/                 World clock
  weft/                  P2P chat (Veilid + cr-sqlite)
  peer-drop/             P2P file sharing (WebRTC)
tofu/                    OpenTofu infrastructure
.github/workflows/
  deploy.yml             Tofu plan/apply + deploy changed projects
  claude.yml             Claude Code GitHub Action
```

## Adding a new project

1. Create `projects/<name>/` with an `index.html`
2. Add the project name to the `projects` set in `tofu/variables.tf`
3. Update `projects/homepage/index.html` to link to the new project
4. Push to `main` — tofu creates the Cloudflare Pages project + DNS, deploy auto-discovers the new directory

Subdomain `<name>.apps.andymolenda.com` is derived automatically. No workflow file changes needed.

## Local development

No build step. Serve any project directory:

```
cd projects/<name>
python3 -m http.server 8000
```

## Design system

Dark theme with gold accent. See [CLAUDE.md](CLAUDE.md) for the full design system reference with colors, typography, and layout specs.

| Token | Value |
|-------|-------|
| Background | `#0f0f0c` |
| Surface | `#1a1a16` |
| Accent | `#c4a24e` |
| Text | `#e8e4d4` |
| Font | Inter + JetBrains Mono |
