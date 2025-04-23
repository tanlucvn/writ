<p align="center">
	<img alt="Minimil Logo" src=".github/assets/logo.png" width="90">
	<h4 align="center">Minimil</h4>
  <p align="center">Next.js Starter Template</p>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/ddkhkc3uu/image/upload/v1744549191/github-repo-icons/squiggly-line-light.svg">
    <img alt="Line Icon" src="https://res.cloudinary.com/ddkhkc3uu/image/upload/v1744549190/github-repo-icons/squiggly-line-dark.svg" width="30">
  </picture>
</p>

<p align="center">
	<a href="https://minimil.vercel.app/">Live demo</a>
</p>

![Minimil Banner](.github/assets/banner.jpg)

<p align="center">
  <a href="https://vercel.com/new/clone?repository-url=https://github.com/tanlucvn/minimil&env=NEXT_PUBLIC_SITE_URL&project-name=minimil&repository-name=minimil">
    <img src=".github/assets/deploy.png" alt="Deploy to Vercel" height="36"/>
  </a>
</p>

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/ddkhkc3uu/image/upload/v1744549191/github-repo-icons/squiggly-line-light.svg">
    <img alt="Line Icon" src="https://res.cloudinary.com/ddkhkc3uu/image/upload/v1744549190/github-repo-icons/squiggly-line-dark.svg" width="30">
  </picture>
</p>

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/ddkhkc3uu/image/upload/v1744550370/github-repo-icons/sparkle-light-border.svg">
    <img alt="Sparkle Icon" src="https://res.cloudinary.com/ddkhkc3uu/image/upload/v1744550316/github-repo-icons/sparkle-dark-border.svg" width="40">
  </picture>

  <h4>Features</h4>
</div>

**Clean structure** – easy to extend and scale  
**Blazing fast** – optimized build and dev performance  
**Tailwind CSS & animation ready** – with `tailwindcss-animate` and `framer-motion`  
**Dark & light mode** – powered by `next-themes`  
**PWA support** – via [`@serwist/next`](https://www.npmjs.com/package/@serwist/next)  
**Developer-friendly** – commit linting, formatting, and type checking baked in  
**Strict code quality** – powered by [`biome`](https://biomejs.dev/)

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/ddkhkc3uu/image/upload/v1744549191/github-repo-icons/squiggly-line-light.svg">
    <img alt="Line Icon" src="https://res.cloudinary.com/ddkhkc3uu/image/upload/v1744549190/github-repo-icons/squiggly-line-dark.svg" width="30">
  </picture>
</p>

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/ddkhkc3uu/image/upload/v1744550826/github-repo-icons/folder-light.svg">
    <img alt="Folder Icon" src="https://res.cloudinary.com/ddkhkc3uu/image/upload/v1744550827/github-repo-icons/folder-dark.svg" width="40">
  </picture>

  <h4>Folder Structures</h4>
</div>

```bash
├── public/             # Static assets
├── src/                # App source code
│   ├── app/            # Next.js app directory
│   ├── components/     # Reusable UI components
│   ├── lib/            # Utility functions & configs
├── .husky/             # Git hooks
├── biome.json          # BiomeJS config
├── tailwind.config.ts  # TailwindCSS config
├── postcss.config.js
└── README.md           
```

<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/ddkhkc3uu/image/upload/v1744549191/github-repo-icons/squiggly-line-light.svg">
    <img alt="Line Icon" src="https://res.cloudinary.com/ddkhkc3uu/image/upload/v1744549190/github-repo-icons/squiggly-line-dark.svg" width="30">
  </picture>
</p>

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://res.cloudinary.com/ddkhkc3uu/image/upload/v1744550896/github-repo-icons/download-light.svg">
    <img alt="Download Icon" src="https://res.cloudinary.com/ddkhkc3uu/image/upload/v1744550892/github-repo-icons/download-dark.svg" width="40">
  </picture>

  <h4>Getting Started</h4>
</div>

```bash
# Clone the repo
git clone https://github.com/tanlucvn/minimil

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

```
miniwrit
├─ .editorconfig
├─ .husky
│  ├─ commit-msg
│  ├─ pre-commit
│  └─ _
│     ├─ applypatch-msg
│     ├─ commit-msg
│     ├─ h
│     ├─ husky.sh
│     ├─ post-applypatch
│     ├─ post-checkout
│     ├─ post-commit
│     ├─ post-merge
│     ├─ post-rewrite
│     ├─ pre-applypatch
│     ├─ pre-auto-gc
│     ├─ pre-commit
│     ├─ pre-merge-commit
│     ├─ pre-push
│     ├─ pre-rebase
│     └─ prepare-commit-msg
├─ biome.json
├─ commitlint.config.js
├─ next.config.mjs
├─ package.json
├─ pnpm-lock.yaml
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ icons
│  │  ├─ android-chrome-192x192.png
│  │  ├─ android-chrome-512x512.png
│  │  ├─ apple-touch-icon.png
│  │  ├─ favicon-16x16.png
│  │  ├─ favicon-32x32.png
│  │  ├─ favicon-light.ico
│  │  └─ favicon.ico
│  ├─ next.svg
│  ├─ sw.js
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ src
│  ├─ app
│  │  ├─ layout.tsx
│  │  ├─ manifest.ts
│  │  ├─ page.tsx
│  │  ├─ robots.ts
│  │  └─ sitemap.ts
│  ├─ components
│  │  ├─ animated-number-badge.tsx
│  │  ├─ editor
│  │  │  ├─ editor-toolbar.tsx
│  │  │  ├─ index.tsx
│  │  │  └─ writer.tsx
│  │  ├─ layout
│  │  │  └─ app-layout.tsx
│  │  ├─ loading.tsx
│  │  ├─ logo.tsx
│  │  ├─ main-menu.tsx
│  │  ├─ motion
│  │  │  └─ fade.tsx
│  │  ├─ number-flow.tsx
│  │  ├─ settings
│  │  │  ├─ appearance-section.tsx
│  │  │  ├─ feedback-section.tsx
│  │  │  ├─ index.tsx
│  │  │  ├─ settings-tabs.tsx
│  │  │  └─ writing-section.tsx
│  │  ├─ theme-toggle.tsx
│  │  ├─ theme.tsx
│  │  ├─ ui
│  │  │  ├─ badge.tsx
│  │  │  ├─ button.tsx
│  │  │  ├─ checkbox.tsx
│  │  │  ├─ command.tsx
│  │  │  ├─ credenza.tsx
│  │  │  ├─ dialog.tsx
│  │  │  ├─ drawer.tsx
│  │  │  ├─ dropdown-menu.tsx
│  │  │  ├─ input.tsx
│  │  │  ├─ kbd.tsx
│  │  │  ├─ label.tsx
│  │  │  ├─ scroll-area.tsx
│  │  │  ├─ select.tsx
│  │  │  ├─ separator.tsx
│  │  │  ├─ switch.tsx
│  │  │  ├─ tabs.tsx
│  │  │  ├─ textarea.tsx
│  │  │  ├─ toggle-group.tsx
│  │  │  ├─ toggle.tsx
│  │  │  └─ tooltip.tsx
│  │  └─ writes
│  │     ├─ history
│  │     │  ├─ item.tsx
│  │     │  └─ sort.tsx
│  │     └─ writes-history-button.tsx
│  ├─ hooks
│  │  └─ use-mobile.ts
│  ├─ lib
│  │  ├─ constants.ts
│  │  ├─ og.ts
│  │  ├─ sw.ts
│  │  └─ utils.ts
│  ├─ pages
│  │  └─ main-page.tsx
│  ├─ services
│  │  └─ indexedDB.ts
│  ├─ store
│  │  ├─ app-store.ts
│  │  └─ dialog-store.tsx
│  └─ styles
│     ├─ globals.css
│     └─ writer.css
├─ tailwind.config.ts
└─ tsconfig.json

```