import { test, expect } from "@playwright/test";

test.describe("Auth page", () => {
  test("renders sign-in form", async ({ page }) => {
    await page.goto("/auth");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test("switches to sign-up tab", async ({ page }) => {
    await page.goto("/auth");
    await page.getByRole("button", { name: /sign up|إنشاء حساب/i }).first().click();
    await expect(page.getByRole("heading", { name: /create|أنشئ/i })).toBeVisible();
  });

  test("forgot password link works", async ({ page }) => {
    await page.goto("/auth");
    await page.getByRole("link", { name: /forgot password|نسيت كلمة المرور/i }).click();
    await expect(page).toHaveURL(/\/reset-password$/);
  });
});
