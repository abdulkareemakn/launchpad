# Bun installs dependencies and orchestrates scripts; Node 24 runs the build tools
# and the production server (the server's Node alias loader is not supported by Bun).
FROM oven/bun:1.4.4@sha256:1d22548f177f4ff38e0c15baa3c2c46c6c2060ba2d1bc573bb4720b407548f1d AS bun

FROM node:24-bookworm-slim@sha256:0e0ff40c39bc087845bfb27465a0df4ea419520094bc35842ff83dd8cbe6f9b6 AS build
COPY --from=bun /usr/local/bin/bun /usr/local/bin/bun
WORKDIR /app
COPY package.json bun.lock ./
COPY apps/client/package.json apps/client/package.json
COPY apps/server/package.json apps/server/package.json
COPY packages/emails/package.json packages/emails/package.json
COPY packages/mail/package.json packages/mail/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN bun install --frozen-lockfile
COPY . .
RUN bun run build

FROM build AS prod-deps
WORKDIR /runtime
COPY package.json bun.lock ./
COPY apps/client/package.json apps/client/package.json
COPY apps/server/package.json apps/server/package.json
COPY packages/emails/package.json packages/emails/package.json
COPY packages/mail/package.json packages/mail/package.json
COPY packages/shared/package.json packages/shared/package.json
RUN bun install --frozen-lockfile --production

FROM node:24-bookworm-slim@sha256:0e0ff40c39bc087845bfb27465a0df4ea419520094bc35842ff83dd8cbe6f9b6
ENV NODE_ENV=production
WORKDIR /app/server
COPY --from=prod-deps --chown=node:node /runtime/node_modules /app/node_modules
COPY --from=build --chown=node:node /app/apps/server/dist /app/server/dist
COPY --from=build --chown=node:node /app/apps/server/alias-runtime.js /app/server/alias-runtime.js
COPY --from=build --chown=node:node /app/apps/client/dist /app/client/dist
USER node
EXPOSE 3001
CMD ["node", "--import", "./alias-runtime.js", "dist/index.js"]
