# Pokemon PC — Task Tracker

Agents: mark your task `[x]` when done. Add a one-line note if you hit anything unexpected.

## Shared Foundation
- [ ] **FOUNDATION** — Extract `Pokemon` type to `src/types/pokemon.ts`; add PC theme tokens to `globals.css`

## Issue #1 — Infinite Scroll Grid
- [ ] **1A** — `usePokemon` hook (`src/hooks/usePokemon.ts`)
- [ ] **1B** — Scroll sentinel + IntersectionObserver (inside `PokemonGrid.tsx`) · _depends on 1A_
- [ ] **1C** — PC grid shell + skeleton loaders (`PokemonGrid.tsx` layout) · _depends on 1A_

## Issue #2 — Search
- [ ] **2A** — Debounced search input wired to `usePokemon` · _depends on 1A_

## Issue #3 — Expandable Card
- [ ] **3A** — `PokemonCard` default view (`src/components/PokemonCard.tsx`) · _depends on 1C_
- [ ] **3B** — `PokemonDialog` expanded view (`src/components/PokemonDialog.tsx`) · _depends on 3A_

## Notes
<!-- Agents: drop any cross-cutting observations here -->
