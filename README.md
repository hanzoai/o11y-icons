# @signoz/icons

## Description

`@signoz/icons` is a collection of SVG-based React icon components. This package provides a set of customizable icons that can be easily integrated into your React projects.

## Features

- SVG-based icons for high-quality rendering
- Customizable via React props (`size`, `color`)
- Easy integration with React projects

---

## Adding SVGs

1. **Place SVG files in the `assets/` folder** (repo root).  
   Only files in `assets/` are turned into React components; other folders (e.g. `assets2/`) are not used by the build.

2. **Naming**
   - Use lowercase, hyphenated names (e.g. `arrow-right.svg`, `user-profile.svg`).
   - Avoid spaces and special characters so component names stay valid (e.g. `arrow-right.svg` → `ArrowRight`).

3. **Optional: Export from Figma**  
   To pull icons from the design file into the repo, use the script in `scripts/` (see [scripts/README.md](scripts/README.md)). It writes to `assets2/`; copy or move the SVGs you want into `assets/` before running the build.

4. **After adding or removing SVGs**, run the build (or Storybook) so `src/` and the barrel export are regenerated. Deleting an SVG and re-running will remove its component from the package.

---

## Steps to run

**Prerequisites:** Node.js, [pnpm](https://pnpm.io/) (recommended; npm works too).

```bash
# Install dependencies
pnpm install

# Generate React components from assets/*.svg → src/
pnpm run svgr

# Build the package (svgr + rollup) → dist/
pnpm run build

# Run the icon gallery (Storybook) on http://localhost:6006
pnpm run storybook
```

- **`pnpm run svgr`** — Converts each SVG in `assets/` to a TypeScript React component in `src/` and updates `src/index.ts`. Safe to run anytime; it clears `src/` first.
- **`pnpm run build`** — Runs `svgr` then Rollup to produce `dist/` (ESM + types). Use this before publishing or testing the built package locally.

---

## Validation

Before committing or publishing, run:

```bash
# Lint and type-check (prebuild runs these before build)
pnpm run lint
pnpm run type-check

# Full build (includes clean, lint, svgr, rollup)
pnpm run build
```

Optionally open the gallery to visually confirm icons:

```bash
pnpm run storybook
```

Then open **Icons → Gallery**: search, resize, toggle light/dark, and click an icon to copy its usage snippet.

---

## Publish

This repo uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing.

1. **Create a changeset** (after your changes are committed):
   ```bash
   pnpm run changeset
   ```
   Choose the version bump (patch/minor/major) and add a short summary. This creates a file under `.changeset/`.

2. **Version and publish** (usually on `main` after merging):
   ```bash
   pnpm run version   # Updates package.json and CHANGELOG from changesets
   pnpm run release   # Builds then publishes to the registry (e.g. npm)
   ```
   Or run the steps manually: `pnpm run build && pnpm changeset publish`.

Publish access is configured in `.changeset/config.json` (e.g. `restricted` for scoped packages).

---

## Installation (consumers)

```bash
npm install @signoz/icons
# or
pnpm add @signoz/icons
```

## Usage

```jsx
import { IconName } from '@signoz/icons';

const MyComponent = () => (
  <IconName size="lg" color="#2A2E37" />
);
```

Replace `IconName` with the actual export (e.g. `Logs`, `Value`). Props:

- **`size`** — Preset: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'`, or a number (pixels).
- **`color`** — CSS color (default `'currentColor'`).

---

## Contributing

If you find issues or have suggestions, open an issue or submit a pull request.

