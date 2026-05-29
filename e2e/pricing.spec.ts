import { test, expect } from "@playwright/test";

test.describe("Pricing", () => {
  test("shows 3 plans with prices", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText("$10", { exact: true })).toBeVisible();
    await expect(page.getByText("$100", { exact: true })).toBeVisible();
    await expect(page.getByText("$200", { exact: true })).toBeVisible();
  });

  test("subscribe button redirects unauthenticated user to /auth", async ({ page }) => {
    await page.goto("/pricing");
    await page
      .getByRole("button", { name: /subscribe now|اشترك الآن/i })
      .first()
      .click();
    await page.waitForURL(/\/auth/);
    expect(page.url()).toMatch(/\/auth/);
  });
});
