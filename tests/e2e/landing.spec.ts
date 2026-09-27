import { expect, test } from "@playwright/test";

test("introduces the course starter", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      level: 1,
      name: /Build something worth submitting/,
    }),
  ).toBeVisible();
  await expect(
    page.getByText("Launchpad", { exact: true }).first(),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "What's included" }),
  ).toBeVisible();
  await expect(page.getByRole("heading", { level: 4 })).toHaveText([
    "shadcn/ui & design-md",
    "MongoDB & Mongoose",
    "Better Auth",
    "Zod validation",
    "Resend & local email",
    "Object storage",
    "Reusable middleware",
    "Cron jobs",
    "Deno Deploy",
    "Docker & Compose",
    "Formatting & linting",
    "Unit, integration & end-to-end tests",
    "GitHub Actions",
  ]);
  await expect(page.getByText("In progress", { exact: true })).toBeVisible();
  await expect(
    page.getByText("Scheduling required", { exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "What's included" }).click();
  await expect(page).toHaveURL(/#included$/);
  await expect(
    page.getByRole("link", { name: "Read the setup guide" }).first(),
  ).toHaveAttribute(
    "href",
    "https://github.com/abdulkareemakn/mern-app-starter/blob/main/docs/docs/installation/installation.md",
  );
});
