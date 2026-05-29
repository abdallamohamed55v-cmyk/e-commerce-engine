import { test, expect } from "@playwright/test";

test.describe("Account protection", () => {
  test("redirects unauthenticated user to /auth", async ({ page }) => {
    await page.goto("/account");
    await page.waitForURL(/\/auth/);
    expect(page.url()).toMatch(/\/auth/);
  });
});
