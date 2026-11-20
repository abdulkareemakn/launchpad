---
title: Commands
description: Every script in the root package.json, what it runs, and when to use it.
---

# Commands

All commands run from the repository root unless noted.

## Root scripts

These are the root scripts currently provided by `package.json`.

| Command                             | Purpose                                        |
| ----------------------------------- | ---------------------------------------------- |
| `bun dev`                           | Start the API and MailDev inbox/SMTP server    |
| `bun dev:ui`                        | Start the interactive Vite client on port 3000 |
| `bun dev:mail`                      | Start the React Email preview on port 3002     |
| `bun run build`                     | Build the client and compile the server        |
| `bun start`                         | Run the compiled server                        |
| `bun typecheck`                     | Generate route types and check all packages    |
| `bun quality`                       | Check formatting and lint rules                |
| `bun format`                        | Apply formatting and safe lint fixes           |
| `bun db:up` / `bun db:down`         | Start or stop local MongoDB and RustFS         |
| `bun docker:up` / `bun docker:down` | Build/start or stop the complete stack         |

## Per-package scripts

Package-level commands are useful when working on one workspace:

```sh
bun --filter @mern/client generate-routes
```

## References

- [Development workflow](/installation/development-workflow)
