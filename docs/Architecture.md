# MONSTER IPTV — Architecture

## Current implementation boundary

MONSTER IPTV currently ships as a **frontend-only React 19 + TypeScript + Vite + Tailwind CSS 4 application** inside the managed WebDev project. The initialized template includes a Vite client under `client/`, a minimal static-serving `server/` compatibility entry, shared constants, and shadcn/ui primitives. The current foundation milestone does not implement backend routes, authentication, a database, real IPTV data, subscriptions, payments, or real streams.

> Architectural truth for this milestone: the repository is Vite/React, not a Next.js App Router project. Next.js-oriented concepts belong to a future migration decision and are not part of the current runtime.

## Repository structure

```text
client/
  index.html                 # Vite document shell
  public/                    # Small configuration files only
  src/
    components/
      form/                  # Foundation form primitives
      icons/                 # Lucide-based icon catalog
      image/                 # Image loading and fallback primitives
      layout/                # Container, Page, Section, Stack, Row, Column, Grid
      media/                 # MediaCard foundation
      ui/                    # Existing shadcn/ui primitives
    config/                  # Design, responsive, accessibility configuration
    constants/               # Routes, locales, and app constants
    contexts/                # Theme persistence and providers
    hooks/                   # Reusable hooks
    lib/                     # Template utilities
    pages/                   # Route-level screens
    styles/                  # Motion and animation utilities
    types/                   # Domain vocabulary and future data contracts
    utils/                   # Pure utility functions
    App.tsx                  # Error boundary, theme, router, providers
    index.css                # Tailwind imports and semantic CSS variables
    main.tsx                 # React entry point
server/
  index.ts                   # Static serving compatibility entry; out of scope here
shared/
  const.ts                   # Shared template constants
docs/
  Architecture.md
  Design-System.md
ideas.md                     # Selected Midnight Broadcast design direction
todo.md                      # Foundation completion checklist
```

## Runtime composition

`main.tsx` mounts `App`. `App` owns the error boundary, persisted theme provider, tooltip provider, toaster, and wouter route switch. Route-level screens live under `client/src/pages/`; reusable structural elements live under `client/src/components/` and should not contain route-specific data fetching.

The layout primitive system is intentionally small and composable. `Container` controls readable width, `Page` controls the viewport canvas, `Section` creates vertical rhythm, `Column` and `Stack` express vertical flow, `Row` expresses horizontal flow with wrapping, and `Grid` provides responsive poster/card density. All accept `className`, preserve native HTML attributes, and keep `min-width: 0` to prevent nested content from creating overflow.

## Design-system boundaries

Executable tokens live in `client/src/config/design-system.ts`, while semantic CSS variables live in `client/src/index.css`. Components should prefer semantic utilities such as `bg-background`, `bg-surface`, `text-foreground`, `text-muted-foreground`, `border-border`, and `text-brand` rather than introducing arbitrary colors. The selected direction is **Midnight Broadcast**: near-black cinematic surfaces, Monster Blue `#00B8FF` for focus and action, and restrained Premium Gold for earned attention.

Spacing and image behavior are centralized. Layout primitives resolve named spacing tokens through `SPACING`, while `Image` owns lazy loading, loading skeletons, alt text, error state, and optional fallback sources. Generated visual assets are stored outside the project under `/home/ubuntu/webdev-static-assets/` and are reserved for later branded surface work; local media is not copied into `client/public/` or `client/src/assets/`.

## Accessibility and device strategy

The foundation targets Arabic RTL and English LTR through logical direction-aware placement, `text-align: start`, `end`-anchored controls, keyboard activation, and visible `:focus-visible` rings. Interactive cards support Enter and Space. Buttons expose busy state through `aria-busy` and preserve disabled semantics. `PasswordInput` exposes an explicit show/hide label, `aria-pressed`, and `aria-controls`. Dialog, sheet, drawer, tooltip, and other interactive patterns reuse the existing Radix/Vaul primitives rather than custom focus management.

Responsive behavior is based on the centralized breakpoints and extends from a 320px minimum viewport through tablet, desktop, large desktop, and TV-scale layouts. Grid columns use CSS custom properties and media queries so the same component can express denser poster rails on larger screens without hard-coded per-page markup. Reduced-motion preferences disable non-essential transitions and animations.

## Future extension points

Later milestones may add authentication, a backend API, database-backed catalogs, subscriptions, payments, player and stream services, Control Hub, and localization content. Those changes require an explicit scope update and should be added behind typed service boundaries rather than embedded in current presentation primitives. This milestone intentionally stops before all of those integrations.

## Quality commands

```bash
pnpm check
pnpm lint
pnpm test
pnpm build
```

`pnpm lint` is the project’s formatting-based lint gate because the initialized template does not include ESLint. `pnpm test` runs Vitest with `--passWithNoTests` while the foundation has no test suite yet; this command provides a stable CI entry point for future component tests.
