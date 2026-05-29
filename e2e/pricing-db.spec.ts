import { test, expect } from "@playwright/test";

// E2E: Subscription plans render from Supabase DB
test.describe("Pricing plans from DB", () => {
  test("pricing page renders plans with prices", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // At least one $ price should appear
    await expect(page.locator("text=/\\$\\d+/").first()).toBeVisible({
      timeout: 10_000,
    });
    // At least one "Subscribe" or "Get lifetime" button
    await expect(
      page.getByRole("button", { name: /subscribe|lifetime/i }).first()
    ).toBeVisible();
  });
});
