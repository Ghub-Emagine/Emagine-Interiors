<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

- This is a single self-contained Next.js 16 (App Router) + React 19 + Tailwind v4 frontend app (`emagine-web`). There is no backend, database, API routes, or environment variables — all interactivity (pricing calculator, forms) is client-side only.
- Dependencies (`npm ci`) are installed by the startup update script, so you normally don't need to reinstall.
- Standard commands are in `package.json`: `npm run dev` (dev server on port 3000, uses Turbopack), `npm run build`, `npm run start`, `npm run lint`.
- Run the dev server as a long-running process (e.g. a tmux-backed terminal), not inline. It serves on http://localhost:3000.
- `npm run lint` currently reports pre-existing `react/no-unescaped-entities` errors in `HeroSection.tsx` and `MaterialSection.tsx`; these are existing code issues, not environment problems.
- The `[ RENDER PLACEHOLDER ]` boxes in the portfolio/case-studies section are intentional placeholders in the source, not broken images.
