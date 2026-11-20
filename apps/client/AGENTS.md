## Design system

- Read the repository-root `DESIGN.md`, when present, before interface work. Its tokens and intent are canonical; shadcn configuration and `src/styles.css` implement them.
- For establishing or changing the system, load `../../.agents/skills/design-md/SKILL.md` from this directory. With no DESIGN.md, do not treat starter defaults as a chosen product identity.
- Use the official shadcn skill and root `bun ui` wrapper for components/presets/migrations. Preserve Base UI. Reconcile generated changes with DESIGN.md; update intent and implementation together for intentional changes.
- Interface icons use the configured shadcn library. Brand/social icons may use named `react-icons/si` exports or official brand assets. Do not mix general icon packs.
- After design-system changes, run root `bun design:lint`, review contrast warnings, and check CSS/config against the document. Lint does not automatically detect implementation drift or prove rendered accessibility.
