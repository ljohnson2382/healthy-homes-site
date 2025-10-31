# 3 Boys Handyman LLC — Frontend (React + Vite)

This repository contains the frontend for the 3 Boys Handyman LLC website. It's built with React + Vite and styled using Tailwind CSS.

This README explains what is in the project, how to run it locally (Windows / PowerShell), and suggested next steps.

## What this branch contains

- A responsive React site scaffolded with Vite.
- Tailwind CSS configured with a project color palette.
- Core components: `Navbar`, `Hero`, `Stats`, `Testimonials`, `Footer`.
- Pages: `Home`, `About`, `Services`, `Portfolio`, `Contact`, `NotFound`.
- Static assets (logo, gallery images, wireframe SVG) placed under `public/`.

## Project color palette (Tailwind tokens)

- `navy`: #0d1b2a
- `navyMid`: #1b263b
- `midGray`: #415A77
- `lightGray`: #e0e1dd
- `yellow`: #ffd16f
- `orange`: #ff6b35

These colors are available in `tailwind.config.js` and used throughout the app.

## Notable UI changes implemented

- Hero: centered content, caption removed, and heading constrained to one line on md+ screens.
- Contact: contact form centered vertically and horizontally, styled to match the site palette.
- Testimonials: refined cards and CTA styles to match the wireframe colors.
- Stats: primary numbers styled using the orange accent color.
- Footer: added and included on core pages.

Note: the wireframe SVG had text converted to paths (no embedded font files). If exact typography is required, please provide the font files (WOFF/WOFF2/TTF/OTF) and I will integrate them.

## Quick start (Windows / PowerShell)

1. Open PowerShell and change into the project folder:

```pwsh
cd 'C:\Users\loydj\Documents\Coding Projects\Project\3 Boys Handyman LLC\3boys-handyman'
```

2. Install dependencies (if you haven't already):

```pwsh
npm install
```

3. Start the Vite dev server:

```pwsh
npm run dev
```

4. Open the Local URL printed by Vite (commonly `http://localhost:5173`) and view the site.

If `npm run dev` exits with code 1, make sure you ran the commands from the `3boys-handyman` directory and paste the terminal error output here so I can diagnose it.

## Important files

- `src/` — React components and pages
- `public/` — static assets served by Vite (logo, wireframe, images)
- `tailwind.config.js` — Tailwind configuration
- `postcss.config.js` — PostCSS setup
- `package.json` — npm scripts and dependencies

---