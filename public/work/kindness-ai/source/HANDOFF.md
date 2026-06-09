# Kindness.ai Ch 01 — design library rebuild handoff

**Status:** in-progress, paused mid-build. User explicitly asked to save state in case
of new session. Pick up from "Next session — execution plan" below.

## Decision log (locked, do not relitigate)
- **Approach:** Hybrid — crisp real Figma exports for Colors, Buttons, Typography;
  composed/illustrative tiles for the rest, all labeled honestly. (User chose.)
- **Sections to feature:** All seven —
  1. Brand mark (small)
  2. Colors (Light + Dark)
  3. Buttons (Light + Dark)
  4. Form controls (Light + Dark)
  5. Nav / toolbar
  6. Typography specimen
  7. Component spec tables (Sm/Md/Lg)
- **Labeling rule:** Real Figma crops are labeled "From Kindness Library — Figma".
  Illustrative tiles are labeled "Pattern built on Kindness color tokens".
- **Locked reflection copy** (already in `kindnessAI.ts`, do NOT edit):
  > The interface around AI matters just as much as the intelligence behind it.
  > When people understand what the system is doing, why it is useful, and how to
  > stay in control, trust becomes part of the product experience — and the
  > foundation underneath the interface is what lets that trust scale as the
  > product grows.
- **Do NOT use** "AI is a feature. Trust is the product."

## Source-of-truth Figma file
- **File key:** `LUMLr9tcOIXHx0yhPXZiwi` (in Medefy team — `gmorgan@medefy.com` has access)
- **Main canvas node:** `1:110669` (45919 × 22873 px, "consolidated" library page)
- **Older file `xbHL9xeSsnDWvENnPwZ7VW` is colors-only — do not use.**
- Figma `get_metadata` without `nodeId` only surfaces "Colors" — don't trust the
  page list. Probe specific node IDs.

## Real assets on disk (already pulled from Figma)
| File | What it is |
|---|---|
| `colors.json` | Original Tokens Studio export, light-mode only |
| `tokens.json` | Tokens Studio v1 schema, same 44 tokens with `$type/$value` |
| `colors-light-dark.json` | All 88 hex values (44 light + 44 dark) extracted verbatim |
| `figma/library-full.png` | 2400 × 1196 downsampled overview |
| `figma/library-hires.png` | **8000 × 3985 hi-res capture of node 1:110669 — use this for cropping** |
| `figma/buttons-full.png` | 1289 × 2400 capture of the Buttons frame `1:645` |

## What's currently shipping on Ch 01 (the rejected colors-only board)
- `kindness-design-library.html` (one level up from this folder) — interactive
  colors-only board with Light/Dark toggle + hover tooltips. **User wants this
  expanded into the broader 7-section board.**
- Current `kindnessAI.ts` Ch 01 embed:
  ```ts
  embed: {
    url: '/work/kindness-ai/kindness-design-library.html',
    title: 'Kindness design library — verified brand color system',
    kind: 'document',
    height: 760,
    variant: 'wide',
    badgeLabel: 'Design system artifact',
    openLabel: 'Open in new tab',
  }
  ```
- Static fallback PNG: `kindness-product-infrastructure.png` (also colors-only).

## Real Kindness color tokens (44 light + 44 dark = 88 values)
Pulled verbatim from Figma. Source of truth: `colors-light-dark.json` in this folder.

| Family | Role | Stops | Notable |
|---|---|---|---|
| `kindigo` | primary | 50–950 | 500 anchor `#5a73df` light & dark; ramps invert around 500 |
| `kindle` | accent | 50–950 | 500 anchor `#eb935f` light & dark |
| `kindness` | attention | 50–950 | 500 anchor `#df5a73` light & dark |
| `kindred` | neutral | 50–950 | 500 anchor `#6f7183` light & dark |

Token naming convention: `--{family}-{stop}` (lowercase). Dark mode inverts:
`kindigo-50` light = `#e4e8fa` ↔ dark = `#111d55`, etc.

## Verified Button library (Figma node 1:539 / frame 1:645)
- **2,163 symbol variants** total
- **6 Types:** Primary, Secondary, Tertiary, Destructive, Transparent, Avatar
- **7 axes:** Type, Size, State, Icon Alignment, Pill, Outline, Mode (Light/Dark)
- High-res export in `figma/buttons-full.png`

## Next session — execution plan

### Step 1 — Crop `library-hires.png` into named section assets
Save each crop under `source/figma/sections/`:
- `01-brand.png` — top-left brand mark area
- `02a-colors-light.png` and `02b-colors-dark.png` — color ramps
- `03a-buttons-light.png` and `03b-buttons-dark.png` — button matrices
- `04-form-controls.png` — text fields / dropdowns / menus block
- `05-nav-toolbar.png` — header/nav components
- `06-typography.png` — typography specimen (may need 2-col split, far-right column is tall)
- `07-spec-tables.png` — Small/Medium/Large component spec sheets

Use the existing `scripts/slice-kindness-library.mjs` pattern: same-directory
`file://` HTML wrapper + Puppeteer `page.screenshot({ clip })`. Data URLs DO NOT
work for `<img src="file://...">` due to Chrome's CSP — must be co-located.

To identify each section's bounding box, refer to the existing 5 vertical slices
in `/tmp/lib-col-{1..5}.png` (probably stale — regenerate via
`scripts/slice-kindness-library.mjs` if needed).

### Step 2 — Rebuild `kindness-design-library.html`
Replace the colors-only board with a 7-section grid:

```
+-------- Header: "Kindness Design Library" + Light/Dark toggle + Open ---------+
| Brand (compact)              | Colors (fanned, all 4 ramps, mode-aware)      |
+------------------------------+------------------------------------------------+
| Buttons (light matrix crop)   | Buttons (dark matrix crop)                    |
+------------------------------+------------------------------------------------+
| Form controls (real crop)     | Nav / toolbar (real crop)                     |
+------------------------------+------------------------------------------------+
| Typography (real crop, tall)  | Component spec tables (real crop)             |
+------------------------------+------------------------------------------------+
```

Each tile should have:
- Small uppercase tile label
- A footnote like "From Kindness Library — Figma" (for real crops) or
  "Pattern built on Kindness color tokens" (for any illustrative tile)

Keep the interactive Light/Dark mode toggle wired only to the Colors section
(the button crops are static Figma exports, not live-themed). Keep the hover
tooltips on color swatches.

### Step 3 — Regenerate static PNG fallback
`kindness-product-infrastructure.png` — capture the full new board at 2× DPR
via the existing `scripts/capture-kindness-design-library.mjs`.

### Step 4 — Update Ch 01 alt text in `kindnessAI.ts`
Describe all seven sections, not just colors.

### Step 5 — Verify
- `npx tsc --noEmit` exit 0
- `/work/kindness-ai` route 200
- iframe loads, Light/Dark toggle still works on Colors, hover tooltips intact
- Open-in-new-tab works
- Medefy / TruOps / Fortress / homepage all 200, no regressions

## Gotchas to remember
- Figma MCP rate limit hits fast on View seat. Use cached `library-hires.png`
  whenever possible instead of re-querying Figma.
- The page list API hides sibling canvases. Trust node-id probing only.
- `~/Downloads/Kindness Library.fig` is the OLD colors-only file. Do not use it.
  The new file is only in Figma cloud.
- Other `.fig` files on disk (`Mobile App.fig`, `Virtual Care.fig`) are Medefy,
  not Kindness.
