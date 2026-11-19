---
title: Testing
description: Test schemas, API behavior, and authentication with Vitest and Supertest.
---

This starter kit uses two test layers. Unit tests check isolated logic quickly, and API integration tests check how server pieces work together against in-memory MongoDB. Choose the cheapest layer that can prove a change works.

The tests live under one root directory:

```text
tests/
├── unit/           # Fast, isolated server tests
└── integration/    # Express/API tests with in-memory MongoDB
```

The layers are intentionally different. Unit tests are the cheapest feedback. Integration tests verify that server components work together, including routing, validation, authentication, and MongoDB access. They start one in-memory MongoDB server for the suite and drop a random test database after each run.

## Test commands

Run commands from the repository root.

| Command                    | What it runs                                 |
| -------------------------- | -------------------------------------------- |
| `bun run test`             | Unit tests followed by API integration tests |
| `bun run test:unit`        | All tests in `tests/unit/`                   |
| `bun run test:integration` | All tests in `tests/integration/`            |

`bun run test` runs both layers in sequence.

## Unit tests

Location: `tests/unit/`

Unit tests use Vitest and do not start an HTTP server or require MongoDB.

Current coverage includes:

- `config.test.ts`
  - Parses valid application configuration.
  - Applies defaults and transforms values such as `PORT` and `TRUST_PROXY`.
  - Rejects invalid ports, URLs, environments, MongoDB URLs, secrets, and public URL combinations.
  - Requires `TEST_MONGODB_URI` when running in test mode.
  - Confirms test mode uses `TEST_MONGODB_URI` instead of `MONGODB_URI`.
  - Requires the production email credential in production mode.
- `api.test.ts`
  - Returns JSON errors for unknown API routes and malformed JSON.
  - Returns a structured error for a malformed request body.
- `email-client.test.ts`
  - Confirms non-production email is sent through the local SMTP inbox configuration.
- `storage.test.ts`
  - Checks signed upload headers, URL expiry, and R2/B2 endpoint configuration.
  - Distinguishes missing bucket objects from provider failures using mocked calls.

Use unit tests for pure functions, configuration parsing, schemas, and other logic that
can be tested without assembling the server.

## API integration tests

Location: `tests/integration/`

API integration tests use Vitest and Supertest. They call Express application instances
directly, so they exercise routing, middleware, validation, authentication, and database
behavior without starting a network listener.

Current coverage includes:

- `api.test.ts`
  - Accepts a valid example user.
  - Returns structured errors for invalid request bodies.
  - Returns JSON errors for unknown API routes and malformed JSON.
- `validation.test.ts`
  - Validates and normalizes request bodies.
  - Validates route parameters and query strings.
  - Validates multiple request targets on one route.
  - Prevents invalid requests from reaching route handlers.
- `auth.test.ts`
  - Creates a random test database.
  - Signs a user up through Better Auth.
  - Reads the authenticated session.
  - Signs out and verifies the session is revoked.
  - Drops the test database during teardown.

Use integration tests when several server pieces must work together but browser behavior
is not part of the requirement.

`uploads.test.ts` covers upload validation, ownership, confirmation, private downloads,
and pending-file cleanup with in-memory MongoDB and mocked S3 network calls. See
[File uploads: Verify and troubleshoot](/build/file-uploads/#verify-and-troubleshoot)
for the focused command and provider-check boundaries.

## Local prerequisites

The project requires Node.js 24 or newer and Bun. Integration tests start their own in-memory MongoDB server, so no external database is needed.

### MongoDB

Integration tests start one in-memory MongoDB server through the Vitest global setup,
share its URI with the test workers, and stop it when the suite finishes. Vitest
downloads the MongoDB binary on first use and caches it in the user's home directory.

Test mode still requires `TEST_MONGODB_URI` in the environment, but the integration
suite supplies the in-memory server's URI at runtime. No `.env` entry or local MongoDB
container is needed. Test mode deliberately does not fall back to `MONGODB_URI`, so
tests cannot accidentally modify the development database.

Each persistence test run uses a random `mern_test_<random-id>` database. The tests drop
their databases during cleanup.

## Running tests during development

Use the cheapest applicable layer while iterating:

```bash
# Pure logic or schema change
bun run test:unit

# Express route, middleware, auth, or database change
bun run test:integration
```

Before opening a pull request or finishing a substantial change, run the full suite:

```bash
bun run test
```

## Test configuration

### Vitest

The server package owns the Vitest dependency, but the tests now live in the root
`tests/` directory. The server package scripts therefore run Vitest with the repository
root as its project root:

```text
vitest run --root ../.. --config vitest.config.ts tests/unit
vitest run --root ../.. --config vitest.integration.config.ts tests/integration
```

`vitest.integration.config.ts` extends the base config with a global setup that starts
the in-memory MongoDB server. `vitest.config.ts` resolves dependencies installed in
`apps/server/node_modules` so
root-level tests can import server dependencies such as Express, Mongoose, Supertest,
Zod, Better Auth, Nodemailer, and Resend.

Do not remove the `--root`, `--config`, or resolver configuration without verifying that
tests still discover files under `tests/` and can resolve the server package
dependencies.

## CI behavior

The testing workflow is defined in `.github/workflows/testing.yaml` and runs on pushes
and pull requests.

CI has two jobs:

1. **Unit tests** install dependencies and run `bun run test:unit`.
2. **Integration tests** install dependencies and run `bun run test:integration`. Vitest
   starts the in-memory MongoDB server for the suite.

The unit and integration jobs are separate so a failure in one layer is easy to identify
and so the fast unit job can finish independently.

## Adding a test

Choose the narrowest layer that proves the behavior:

- Add a file under `tests/unit/` when the behavior is isolated and needs no database or
  browser. API error handling with a faked auth handler belongs here.
- Add a file under `tests/integration/` when the behavior involves Express routes,
  middleware, authentication, or MongoDB.

Keep test data isolated, avoid depending on execution order, and use unique values for
persisted records. For database-backed tests, clean up the database even when the test
fails.

The goal is not to duplicate every assertion at every layer. Test details at the lowest
useful layer.

## Troubleshooting

### A test database remains after a failed run

The normal teardown removes the random database. Integration databases live on the
in-memory server and disappear when its process exits, so no manual cleanup is needed.

## References

- [Vitest](https://vitest.dev/)
- [Supertest](https://github.com/forwardemail/supertest)
- [Validation](/build/validation)
- [API routes](/build/api-routes)
- [Database](/build/database)
