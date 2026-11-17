# Samuel Gathemia — Embedded Systems Engineering Portfolio

Personal portfolio site for **Engineer Samuel Gathemia** — Embedded Systems &
Firmware Engineer (ESP32, STM32, FreeRTOS, ESP-IDF, IoT).

Built with **Vite + React + TypeScript + Tailwind CSS v4**. Deploys as a
static SPA to GitHub Pages.

Live: <https://samuelgathemia.github.io/>

## Local development

```bash
bun install
bun run dev       # http://localhost:8080
bun run build     # production build → dist/
bun run preview   # preview the built site
```

Node/npm work too: replace `bun` with `npm`/`pnpm` as appropriate.

## Project structure

```
.
├── public/               # Static assets copied verbatim
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── 404.html          # GitHub Pages SPA fallback
│   └── resume.pdf        # replace with your real résumé
├── src/
│   ├── main.tsx          # Entry point (BrowserRouter, basename from Vite base)
│   ├── App.tsx           # Route table
│   ├── styles.css        # Tailwind v4 + design tokens (dark-only)
│   ├── data/             # All editable content lives here
│   │   ├── profile.ts
│   │   ├── skills.ts
│   │   ├── projects.ts
│   │   ├── philosophy.ts
│   │   ├── blog.ts
│   │   ├── experience.ts
│   │   └── certifications.ts
│   ├── components/
│   │   ├── layout/       # Navbar, Footer, ScrollProgress, ScrollToTop
│   │   ├── sections/     # Hero, About, Skills, FeaturedProjects, ...
│   │   ├── PCBBackground.tsx
│   │   ├── ProjectCard.tsx
│   │   └── SectionHeading.tsx
│   ├── pages/            # Route components
│   └── hooks/
├── index.html            # SEO meta, JSON-LD, font <link>, SPA-restore script
├── vite.config.ts        # base "/" in production
└── .github/workflows/deploy.yml
```

## Editing content

All content is data-driven — no need to touch components to change what the
site says.

| To change …                     | Edit                          |
| ------------------------------- | ----------------------------- |
| Name, title, socials, location  | `src/data/profile.ts`         |
| Skills, categories, proficiency | `src/data/skills.ts`          |
| Projects (list + detail pages)  | `src/data/projects.ts`        |
| Engineering philosophy cards    | `src/data/philosophy.ts`      |
| Blog articles                   | `src/data/blog.ts`            |
| Timeline / experience / edu    | `src/data/experience.ts`      |
| Certifications                  | `src/data/certifications.ts`  |
| Résumé PDF                      | `public/resume.pdf`           |
| GitHub username for repos feed  | `profile.githubUser` in `profile.ts` |

## Design system

Dark-only, engineering-lab aesthetic. Semantic tokens in `src/styles.css`:

- `--background` `#0D1117` — near-black canvas
- `--card` `#161B22` — surfaces
- `--border` `#30363D`
- `--foreground` `#E6EDF3` / `--muted-foreground` `#8B949E`
- `--primary` `#22D3EE` (cyan), `--accent` `#10B981` (emerald)

Fonts: **JetBrains Mono** for headings & code, **Inter** for body — loaded via
`<link>` in `index.html` (Tailwind v4 requires filesystem `@import`s only).

Never hardcode Tailwind color utilities like `text-white` / `bg-black`; use
the semantic tokens (`text-foreground`, `bg-card`, `text-primary`, …).

## GitHub API integration

`src/components/sections/GitHubStats.tsx` fetches
`https://api.github.com/users/samuelgathemia/repos?sort=updated` at runtime
— no token, no build step, no hardcoded repos. Two embedded
`github-readme-stats` cards render the stats/top-languages summary.

To point the site at a different account, change `profile.githubUser` in
`src/data/profile.ts`.

## Deployment (GitHub Pages)

### Automated (recommended)

The workflow at `.github/workflows/deploy.yml` builds and deploys on every
push to `main`.

1. Push this repo to GitHub as `samuelgathemia/samuelgathemia.github.io`.
2. In the repo, **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push to `main`. The action builds `dist/` and publishes it.

### Different repo name

The Vite `base` is set to `/` in `vite.config.ts` because this is a user/organisation GitHub Pages repository. If you later host under a project repo name instead, update **both**:

- `vite.config.ts` → `base: "/<repo-name>/"`
- `public/404.html` → `segmentCount = 0` stays for a user/organisation root; for a project repo, set `segmentCount = 1`.
- `public/robots.txt` and `public/sitemap.xml` — update the absolute URLs.

### Manual deploy

```bash
bun run build
# publish contents of dist/ to the gh-pages branch by any means you like
```

## GitHub Pages + SPA routing

GitHub Pages only serves static files, so a deep link like
`/projects/wifi-manager` would normally 404. The standard
`404.html` + `index.html` handshake (rafgraph/spa-github-pages) is included:

- `public/404.html` rewrites the URL into `?/…` and reloads `index.html`.
- The inline script in `index.html` unpacks that query and restores the
  original path before React Router mounts.

Nothing to configure — it just works.

## Accessibility & performance

- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Visible focus rings using `--ring`.
- `prefers-reduced-motion` respected in `styles.css`.
- Route-level code splitting via `React.lazy`.
- Images `loading="lazy"`, PDF served as `<object>` fallback.
- SEO: per-page `<title>` / description via `useDocumentHead`, JSON-LD Person
  schema in `index.html`, Open Graph + Twitter Card meta.

## License

MIT — see `LICENSE`.
