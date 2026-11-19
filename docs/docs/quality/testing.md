---
title: Testing
description: Test schemas, API behavior, and authentication with Vitest and Supertest.
---

# Testing

This starter kit uses two test layers. Unit tests check isolated logic quickly, and API integration tests check how server pieces work together. Choose the cheapest layer that can prove a change works.

The tests live under one root directory:

```text
tests/
├── unit/           # Fast, isolated server tests
└── integration/    # Express/API tests
```

The layers are intentionally different. Unit tests are the cheapest feedback. Integration tests verify that server components work together, including routing, validation, authentication, and MongoDB access.

## Test commands

Run commands from the repository root.

| Command                 | What it runs                                 |
| ----------------------- | -------------------------------------------- |
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
- `schemas.test.ts`
  - Confirms valid user input is normalized.
  - Confirms invalid names, emails, and ages produce structured validation errors.
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
and pending-file cleanup with real MongoDB and mocked S3 network calls. See
[File uploads: Verify and troubleshoot](/build/file-uploads/#verify-and-troubleshoot)
for the focused command and provider-check boundaries.

## Local prerequisites

The project requires Node.js 24 or newer, Bun, and Docker with Compose for MongoDB-backed tests.

### MongoDB

Integration tests require MongoDB. Start the local container with Docker
Compose:

```bash
bun db:up
```

Then set this variable in the root `.env` file:

```dotenv
TEST_MONGODB_URI=mongodb://127.0.0.1:27017
```

Test mode deliberately does not fall back to `MONGODB_URI`. This prevents tests from
accidentally modifying the development database.

Upload integration tests additionally require the test address in the process
environment. Follow [Development workflow: Upload test database](/installation/development-workflow/#upload-test-database)
before running that file or the full integration suite; its configuration does not
load `.env`.

Each persistence test run uses a random `mern_test_<random-id>` database. The tests drop
their databases during cleanup, so the MongoDB user configured by `TEST_MONGODB_URI`
needs permission to create and drop databases.

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
vitest run --root ../.. --config vitest.config.ts tests/integration
```

`vitest.config.ts` resolves dependencies installed in `apps/server/node_modules` so
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
2. **Integration tests** start MongoDB 8 as a service, set `TEST_MONGODB_URI`, and run
   `bun run test:integration`.

The unit and integration jobs are separate so a failure in one layer is easy to identify
and so the fast unit job can finish independently.

## Adding a test

Choose the narrowest layer that proves the behavior:

- Add a file under `tests/unit/` when the behavior is isolated and does not need an app,
  database, or HTTP request.
- Add a file under `tests/integration/` when the behavior involves Express routes,
  middleware, authentication, or MongoDB.

Keep test data isolated, avoid depending on execution order, and use unique values for
persisted records. For database-backed tests, clean up the database even when the test
fails.

The goal is not to duplicate every assertion at every layer. Test details at the lowest
useful layer.

## Troubleshooting

### `TEST_MONGODB_URI` is required

Set `TEST_MONGODB_URI` in the root `.env` file or export it in the shell. Do not use
only `MONGODB_URI`; test mode intentionally rejects that fallback.

### A test database remains after a failed run

The normal teardown removes the random database. If a process is terminated before
teardown runs, inspect MongoDB for databases beginning with `mern_test_` and remove
only the test database that belongs to the failed run.

## References

- [Vitest](https://vitest.dev/)
- [Supertest](https://github.com/forwardemail/supertest)
- [Validation](/build/validation)
- [API routes](/build/api-routes)
- [Database](/build/database)
