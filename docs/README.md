# MERN course starter docs

This documentation site is built with [Blume](https://useblume.dev). No repository
workflow publishes it yet, so the host's build settings (currently Cloudflare Pages)
must run `bun run build` in this directory and serve `docs/dist/`.

```sh
bun run dev
# or validate the production build
bun run build
bun run validate
```

Content lives in `docs/docs/`, navigation comes from the file tree and the
`meta.ts` files in each folder, and site settings live in `blume.config.ts`.
