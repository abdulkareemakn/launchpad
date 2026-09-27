import { createFileRoute } from "@tanstack/react-router";

import { buttonVariants } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

const repository = "https://github.com/abdulkareemakn/mern-app-starter";
const docs = `${repository}/blob/main/docs/docs`;
const setupGuide = `${docs}/installation/installation.md`;
const productName = "Launchpad";
const linkStyle =
  "inline-flex min-h-11 items-center underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground";
const primaryAction = buttonVariants({
  size: "lg",
  className:
    "min-h-11 px-5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground motion-reduce:transition-none motion-reduce:active:translate-y-0",
});

const chapters = [
  {
    title: "Build the application",
    description: "The foundations for your first feature.",
    start: 1,
    features: [
      [
        "shadcn/ui & design-md",
        "Base UI components and a custom skill to shape your interface and maintain a Google-format DESIGN.md.",
        "build/design-system.md",
        "",
      ],
      [
        "MongoDB & Mongoose",
        "Database connection, model conventions, and a local MongoDB service. Shared TypeScript types connect your API and client.",
        "build/database.md",
        "",
        "mongodb",
      ],
      [
        "Better Auth",
        "Email/password authentication, sessions, and rate limiting. Add your own sign-in screens and account email flows.",
        "build/authentication.md",
        "",
      ],
      [
        "Zod validation",
        "Validate configuration and incoming request bodies, query parameters, and route parameters with reusable schemas.",
        "build/validation.md",
        "",
        "zod",
      ],
    ],
  },
  {
    title: "Connect your services",
    description: "Email, files, and the work behind the scenes.",
    start: 5,
    features: [
      [
        "Resend & local email",
        "A production email helper with Resend, local SMTP with a MailDev inbox, and React Email template previews.",
        "build/emails.md",
        "",
        "resend",
      ],
      [
        "Object storage",
        "Private upload and download APIs with signed URLs and ownership checks. Local storage emulation and an upload interface still need work.",
        "build/file-uploads.md",
        "In progress",
      ],
      [
        "Reusable middleware",
        "Protect routes with authMiddleware, validate requests, and return consistent API errors.",
        "build/middleware.md",
        "",
        "express",
      ],
      [
        "Cron jobs",
        "A standalone abandoned-upload cleanup command and scheduling guidance. No recurring job is registered by default.",
        "build/cron-jobs.md",
        "Scheduling required",
      ],
    ],
  },
  {
    title: "Ship and maintain",
    description: "A path from your laptop to deployment.",
    start: 9,
    features: [
      [
        "Deno Deploy",
        "Build and runtime configuration, plus a deployment guide for serving the frontend and API together.",
        "deployment/production.md",
        "",
        "deno",
      ],
      [
        "Docker & Compose",
        "Local MongoDB for development and a production app/database stack. Node and Vite run on your host during development.",
        "deployment/docker.md",
        "",
        "docker",
      ],
      [
        "Formatting & linting",
        "Shared Oxfmt and Oxlint configuration keeps code consistent across the workspace.",
        "quality/formatting.md",
        "",
      ],
      [
        "Unit, integration & end-to-end tests",
        "Vitest, API integration tests, and Playwright browser checks are scaffolded. Extend coverage as you build your features.",
        "quality/testing.md",
        "",
      ],
      [
        "GitHub Actions",
        "Workflows run tests, build the Docker image, and publish documentation. Lint and typecheck gates can be added next.",
        "quality/testing.md",
        "",
        "githubactions",
      ],
    ],
  },
] as const;

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-6 focus:z-10 focus:rounded-md focus:bg-background focus:p-4 focus:outline-2"
        href="#main"
      >
        Skip to content
      </a>
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-2 px-6 py-5 sm:px-10 lg:px-12">
        <a className={`${linkStyle} gap-3 font-medium tracking-tight`} href="/">
          <span>{productName}</span>
          <span className="font-normal text-muted-foreground">
            MERN course starter
          </span>
        </a>
        <nav
          aria-label="Main navigation"
          className="flex flex-wrap gap-x-6 text-sm"
        >
          <a className={linkStyle} href="#included">
            What's included
          </a>
          <a className={linkStyle} href={setupGuide}>
            Guide
          </a>
          <a className={linkStyle} href={repository}>
            GitHub
          </a>
        </nav>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="mx-auto max-w-6xl px-6 pt-12 pb-16 sm:px-10 sm:pt-16 sm:pb-20 lg:px-12">
          <p className="mb-5 text-sm font-medium">
            A clear starting point for ambitious student projects
          </p>
          <h1 className="max-w-4xl text-4xl leading-[1.12] font-medium tracking-[-0.035em] text-balance sm:text-5xl lg:text-6xl">
            Build something worth submitting.
            <span className="mt-1 block text-muted-foreground">
              Start with the important parts already connected.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
            Launchpad gives you a production-minded MERN foundation with the
            setup, services, and decisions documented. Spend your time building
            the feature that makes the project yours.
          </p>
          <p className="mt-5 text-sm text-muted-foreground">
            React · Vite · TanStack Router · Express · MongoDB · TypeScript
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a className={primaryAction} href={setupGuide}>
              Read the setup guide
            </a>
            <a className={`${linkStyle} text-sm font-medium`} href={repository}>
              View source
            </a>
          </div>
        </section>

        <section
          id="included"
          aria-labelledby="included-title"
          className="mx-auto max-w-6xl scroll-mt-6 px-6 sm:px-10 lg:px-12"
        >
          <div className="border-t pt-8">
            <h2
              id="included-title"
              className="text-2xl font-medium tracking-tight sm:text-3xl"
            >
              What's included
            </h2>
            <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
              A practical starting point, from interface to deployment. Each
              guide shows you where to begin and what to configure.
            </p>
          </div>
          {chapters.map((chapter) => (
            <section
              key={chapter.title}
              aria-labelledby={`chapter-${chapter.start}`}
              className="grid gap-8 py-12 sm:py-16 lg:grid-cols-[15rem_1fr] lg:gap-16"
            >
              <div>
                <h3
                  id={`chapter-${chapter.start}`}
                  className="text-lg font-medium tracking-tight"
                >
                  {chapter.title}
                </h3>
                <p className="mt-2 max-w-60 text-sm leading-6 text-muted-foreground">
                  {chapter.description}
                </p>
              </div>
              <ol
                start={chapter.start}
                className="flex flex-col gap-9 sm:gap-10"
              >
                {chapter.features.map(
                  ([title, description, guide, status, logo], index) => (
                    <li
                      key={title}
                      className="grid grid-cols-[1.5rem_1fr] gap-4 sm:grid-cols-[2rem_1fr] sm:gap-6"
                    >
                      <span
                        aria-hidden="true"
                        className="pt-1 font-mono text-xs leading-6 text-muted-foreground"
                      >
                        {String(chapter.start + index).padStart(2, "0")}
                      </span>
                      <div className="flex items-start gap-5 sm:gap-6">
                        {logo ? (
                          <div className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-muted/40 p-4 shadow-xs outline-1 outline-black/10 sm:size-20 sm:p-5 dark:outline-white/10">
                            <img
                              src={`/brands/${logo}.svg`}
                              alt=""
                              aria-hidden="true"
                              className="size-full object-contain"
                            />
                          </div>
                        ) : null}
                        <div>
                          <h4 className="text-lg font-medium tracking-tight sm:text-xl">
                            {title}
                          </h4>
                        </div>
                        {status ? (
                          <p className="mt-2 text-sm font-medium">{status}</p>
                        ) : null}
                        <p className="mt-2 max-w-xl text-base leading-7 text-muted-foreground">
                          {description}
                        </p>
                        <a
                          className={`${linkStyle} mt-1 text-sm`}
                          href={`${docs}/${guide}`}
                          aria-label={`Read the ${title} guide`}
                        >
                          Read the guide{" "}
                          <span aria-hidden="true" className="ml-2">
                            ↗
                          </span>
                        </a>
                      </div>
                    </li>
                  ),
                )}
              </ol>
            </section>
          ))}
        </section>

        <section className="bg-muted/40">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:px-10 sm:py-16 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12">
            <div>
              <h2 className="text-3xl font-medium tracking-tight">
                Your project starts here.
              </h2>
              <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
                Follow the guide, understand the foundation, then build your
                first feature with a path back when you need it.
              </p>
            </div>
            <a
              className={`${primaryAction} justify-self-start`}
              href={setupGuide}
            >
              Read the setup guide
            </a>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 py-8 text-sm sm:px-10 lg:px-12">
        <p className="text-muted-foreground">
          Launchpad for university projects. Yours to build on.
        </p>
        <nav aria-label="Footer navigation" className="flex gap-6">
          <a className={linkStyle} href={`${docs}/index.md`}>
            Documentation
          </a>
          <a className={linkStyle} href={repository}>
            Source
          </a>
        </nav>
      </footer>
    </div>
  );
}
