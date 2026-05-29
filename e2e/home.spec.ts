import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test("renders hero + CTAs", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: /start membership|ابدأ الاشتراك/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /browse library|تصفّح المكتبة/i })).toBeVisible();
  });

  test("Start membership CTA → /pricing", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /start membership|ابدأ الاشتراك/i }).first().click();
    await expect(page).toHaveURL(/\/pricing$/);
  });

  test("Browse library CTA → /courses", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /browse library|تصفّح المكتبة/i }).first().click();
    await expect(page).toHaveURL(/\/courses$/);
  });
});
