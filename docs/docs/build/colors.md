---
title: Colors
description: Choose a color direction and let the agent map it to readable interface roles.
---

# Colors

Choose a color direction for the product, then let the agent build a small palette around it. A brand color by itself is not a usable interface palette: pages also need readable text, quiet surfaces, borders, focus indicators, and clear feedback for destructive actions.

## Choose a direction

You can share a brand color, a palette, a reference, or a simple description such as “warm neutrals with a forest-green action color.” You can also ask the agent to recommend a palette from the product and audience. Specify whether the application needs both light and dark appearances; each mode needs its own checked values.

Avoid choosing every shade by hand. The agent derives the shades needed for page and card backgrounds, body and muted text, borders, primary actions, hover and selection surfaces, and focus rings. Add status colors only when the product has a real success, warning, or informational state.

## Use semantic roles

This starter uses shadcn's semantic CSS variables in `apps/client/src/styles.css`. Components refer to roles such as `background`, `foreground`, `primary`, `muted`, `border`, and `destructive`, rather than scattering raw colors through the interface. `primary` is the main action color; `accent` is a quieter hover or selection surface and can be neutral.

The root `DESIGN.md` records the chosen values and their intended roles. Treat it as canonical when changing colors, then reconcile both the `:root` and `.dark` variables with the document. Keep destructive actions recognizable and pair color with text or an icon.

## Check readable contrast

Check text against the surface where it actually appears, including muted text, buttons, and both supported modes. WCAG 2.2 normally requires a contrast ratio of 4.5:1 for regular text and 3:1 for large text and qualifying interface graphics. A design lint result does not cover every rendered state, opacity, or focus indicator, so review those against their actual backgrounds too.

## Let the agent do the rest

Share the palette direction and any colors that must remain fixed. The [design-md skill](/reference/skills) derives semantic shades, records them in `DESIGN.md`, and updates the existing stylesheet. It should recommend a direction if you have no palette in mind, then measure contrast instead of guessing.

## References

- [Design and UI](/build/design-system)
- [shadcn/ui](/build/shadcn-ui)
- [WCAG 2.2 contrast minimum](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html)
- [WCAG 2.2 non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html)
