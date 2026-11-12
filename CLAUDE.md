# Habit Tracker App

A small web app for tracking daily habits. Every habit and check-in is saved in the browser's `localStorage`, so data stays on this device and there is no server or database.

## Stack
- Plain HTML (`index.html`)
- Plain CSS (`styles.css`)
- Vanilla JavaScript (`app.js`), used only to read and write `localStorage` and update the page
- No framework, no libraries, no package manager, no build step

## How to run
1. Open `index.html` in a browser (double-click it, or run `open index.html` on macOS).
2. Optional: serve the folder with `python3 -m http.server 8000` and visit http://localhost:8000.

There is nothing to install or compile. To reset the app, clear the site's `localStorage` in the browser dev tools (Application → Local Storage).

## Folder layout
```
habit-tracker-app/
├── CLAUDE.md
├── index.html
├── styles.css
└── app.js
```

## Conventions
- Keep it to these three code files. Add a new file only if one of them gets too long to read easily, and explain why in the commit message.
- Name CSS classes and JavaScript functions in English, using lowercase words joined by hyphens for CSS (`habit-list`) and camelCase for JavaScript (`saveHabits`).
- Store all data under a single `localStorage` key, `habitTracker`, as one JSON object. Every read and write goes through one `loadData()` and one `saveData()` function in `app.js`.
- Write short comments that explain *why* something is done, not *what* the code does.

## Rules you can check by looking
- The project folder contains only `CLAUDE.md`, `index.html`, `styles.css`, and `app.js` (plus an optional `README.md`). No `package.json`, no `node_modules/`, no `dist/`.
- `index.html` opens and works when double-clicked, with no server running.
- After adding a habit and reloading the page, the habit is still there.
- In dev tools → Application → Local Storage, there is exactly one key: `habitTracker`.
- The page shows a clear message when there are no habits yet, instead of an empty screen.
- The layout is usable on a phone-width screen (about 375px) without scrolling sideways.

## Prohibitions
- Do not add any framework or library (no React, Vue, jQuery, Tailwind, Bootstrap, etc.), and do not load anything from a CDN.
- Do not add a build step, bundler, or package manager (no npm, Vite, Webpack, Sass).
- Do not send data anywhere. No `fetch` calls, no backend, no analytics; data lives only in `localStorage`.
- Do not use inline `style="..."` attributes or inline `<script>` blocks; styles go in `styles.css`, scripts go in `app.js`.
