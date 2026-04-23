# Pokemon PC — Task Tracker

Agents: mark your task `[x]` when done. Add a one-line note if you hit anything unexpected.

## Execution Order

Tasks must be completed in this sequence. Do not start a task until all tasks in the previous wave are marked `[x]`.

```
Wave 1 (start here):   FOUNDATION
Wave 2 (parallel):     1A
Wave 3 (parallel):     1B, 1C, 2A
Wave 4 (parallel):     3A
Wave 5 (parallel):     3B
```

---

## Wave 1
- [ ] **FOUNDATION** — Extract `Pokemon` type to `src/types/pokemon.ts`; add PC theme tokens to `globals.css`

## Wave 2
- [ ] **1A** — `usePokemon` hook (`src/hooks/usePokemon.ts`) · _requires: FOUNDATION_

## Wave 3
- [ ] **1B** — Scroll sentinel + IntersectionObserver (inside `PokemonGrid.tsx`) · _requires: 1A_
- [ ] **1C** — PC grid shell + skeleton loaders (`PokemonGrid.tsx` layout) · _requires: 1A_
- [ ] **2A** — Debounced search input wired to `usePokemon` · _requires: 1A_

## Wave 4
- [ ] **3A** — `PokemonCard` default view (`src/components/PokemonCard.tsx`) · _requires: 1C_

## Wave 5
- [ ] **3B** — `PokemonDialog` expanded view (`src/components/PokemonDialog.tsx`) · _requires: 3A_

## Notes
<!-- Agents: drop any cross-cutting observations here -->
