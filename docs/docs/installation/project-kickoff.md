---
title: Project kickoff
description: Give an agent a product brief and let it prepare this starter around your decisions.
---

# Project kickoff

Use the prompt below when you are ready to turn this starter into an application. Replace the bracketed brief with what you know. If you are unsure about a choice, say “recommend for me” and let the agent propose a direction.

```text
Set up this Launchpad starter for my application.

Product brief:
- What it does: [describe the product]
- Who it is for: [users]
- First important workflow: [what a user should be able to do]
- Constraints or reference products: [optional]

Start by inspecting the repository instructions, current implementation, and git status. Keep existing work. Treat starter screens and neutral design defaults as replaceable, not as decisions I already made.

Before changing files, ask me one concise set of questions about any missing product details and these design choices:
- Product character and visual references
- Colors or palette direction
- Fonts for interface, expressive headings, and code where needed
- Interface icon style and any required brand marks
- Compact or comfortable layout, corner style, and light/dark mode needs

Recommend one coherent direction using the brief and existing code. I can accept it, change individual choices, or delegate them to you. Do not ask me to choose token values. Explain meaningful tradeoffs briefly. Then use the design-md skill to update DESIGN.md and implement its decisions in the existing client CSS and shadcn configuration. Keep Base UI and the current application architecture. Check generated changes against DESIGN.md.

After I confirm or delegate the direction, set up the smallest useful first version of the product workflow in this starter. Reuse the existing stack and patterns. Add authentication, database models, API routes, email, file uploads, or deployment configuration only where the brief needs them. Preserve security, validation, and accessibility. Do not add speculative features.

Finish by summarizing the files changed and the commands I should run next. Run the relevant typecheck, lint, and design lint commands; report any checks you could not run.
```

The agent should follow the [Design and UI guide](/build/design-system) before building out more screens. The [Fonts](/build/fonts), [Icons](/build/icons), and [Colors](/build/colors) pages explain the main visual choices.

## References

- [Design and UI](/build/design-system)
- [Development workflow](/installation/development-workflow)
