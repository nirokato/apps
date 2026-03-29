# CLAUDE.md

## Repository overview

Monorepo for small projects hosted under **apps.andymolenda.com**. Each project lives under `projects/<name>/` and is deployed to its own Cloudflare Pages project with a subdomain (e.g. `<name>.apps.andymolenda.com`). The homepage project serves the root at `apps.andymolenda.com`.

## Repository structure

```
projects/
  homepage/          # Landing page (serves apps.andymolenda.com)
tofu/                # OpenTofu infrastructure (Cloudflare Pages + DNS)
.github/workflows/
  deploy.yml         # Infrastructure (tofu plan/apply) + production deployment
```

## Adding a new project

1. Create `projects/<project-name>/` with an `index.html`
2. Add the project to `tofu/variables.tf` in the `projects` map with its subdomain
3. Add the project to the deploy matrix in `.github/workflows/deploy.yml`
4. Update `projects/homepage/index.html` to link to the new project
5. Update the project table below

## Projects

| Project | Path | Subdomain | Description |
|---------|------|-----------|-------------|
| homepage | `projects/homepage/` | `apps.andymolenda.com` | Landing page and project directory |

## Tech stack & conventions

- **No build step.** All projects are static HTML/CSS/JS served directly.
- **External libraries via CDN only.** No npm, no bundlers, no node_modules.
- **Infrastructure as Code:** OpenTofu (v1.8+) with Cloudflare provider (~> 4.0).
- **Styling:** Dark theme with accent color `#c4a24e`. Typography: Inter (body), JetBrains Mono (monospace).

## Deployment

- **Platform:** Cloudflare Pages (one Pages project per project)
- **Infrastructure:** OpenTofu manages Pages projects, custom domains, and DNS CNAMEs. State in Cloudflare R2 (`tofu-state` bucket, key `apps/`).
- **Workflow:** `.github/workflows/deploy.yml` — tofu plan on PR (with comment), tofu apply + deploy on push to `main`.
- **Domains:** Homepage at `apps.andymolenda.com`, projects at `<name>.apps.andymolenda.com`.
- **Required secrets:** `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`

## Git conventions

- Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`)
- Squash merge PRs
- Default branch: `main`
