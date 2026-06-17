# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project purpose

This is **not** a production dashboard — it's a learning project. The owner is using it to learn Vue 3 from scratch, working through it lesson by lesson (routing, state management, forms, etc.). When asked to add or change something:

- Prefer explaining the Vue concept being introduced, not just writing the code.
- Keep changes scoped to what the current lesson covers; don't introduce patterns (testing frameworks, advanced state libs, etc.) the user hasn't been taught yet, unless asked.
- Favor idiomatic, simple Vue 3 `<script setup>` code over clever abstractions — clarity for a learner over DRY-ness.

## Commands

```sh
npm install        # install dependencies
npm run dev         # start Vite dev server with HMR
npm run build       # type-check (vue-tsc --build) then production build via vite
npm run build-only  # production build only, no type-check
npm run preview     # preview the production build locally
npm run type-check  # vue-tsc --build (no emit)
npm run lint        # runs lint:oxlint then lint:eslint (both --fix)
npm run lint:oxlint # oxlint . --fix
npm run lint:eslint # eslint . --fix --cache
```

There is no test runner configured in this repo.

To type-check or lint a single file directly (faster than the full project commands):

```sh
npx vue-tsc --noEmit -p tsconfig.app.json
npx eslint <path/to/file>
```

## Architecture

- **Entry point**: `src/main.ts` creates the Vue app and installs three plugins in order: Pinia (`createPinia()`), the router (`src/router`), and Vuetify (`src/plugins/vuetify.ts`). `src/App.vue` just renders a header nav (`RouterLink`) and `<RouterView />` — it has no other logic.
- **UI library**: Vuetify is used throughout (`v-container`, `v-card`, `v-chip`, `v-btn`, etc.), auto-imported via `vite-plugin-vuetify` (`vuetify({ autoImport: true })` in `vite.config.ts`). Icons use `@mdi/font`.
- **Routing** (`src/router/index.ts`): a single `createRouter` instance with `createWebHistory`. Routes use named routes and lazy-loaded (`() => import(...)`) view components for code-splitting, e.g. `/eventi/:id` → `EventoView.vue`.
- **State management**: Pinia stores under `src/stores/`, written in setup-store style (`defineStore('name', () => { ... return {...} })`) rather than the options-API style. `src/stores/eventi.ts` is the main domain store: it holds the `Evento` interface and a hardcoded in-memory list of eventi, plus computed getters (`pubblicati`, `bozze`) and an action (`toggleStato`). `src/stores/counter.ts` is leftover scaffold boilerplate from `create-vue`, not used by the app.
- **Views vs components**: `src/views/` holds route-level pages (`HomeView`, `EventoView`, `AboutView`), wired up in the router. `src/components/` holds reusable pieces consumed by views, e.g. `EventoCard.vue` (`props: { evento: Evento }`, emits `cambiaStato`), used by `HomeView` to render the eventi list and link to `EventoView` via the named route.
- **Path alias**: `@/*` maps to `src/*` (configured in both `vite.config.ts` and `tsconfig.app.json`).
- **TypeScript setup**: `tsconfig.json` is a references-only root pointing at `tsconfig.app.json` (app code, extends `@vue/tsconfig/tsconfig.dom.json`) and `tsconfig.node.json` (build tooling config files). `vue-tsc` (not plain `tsc`) is required to type-check `.vue` files.
- **Linting**: ESLint (`eslint.config.ts`) combines `eslint-plugin-vue`'s recommended flat config, `@vue/eslint-config-typescript`, and `eslint-plugin-oxlint` (which disables ESLint rules already covered by oxlint to avoid duplicate reporting). oxlint itself is configured separately in `.oxlintrc.json`.
