import { test, expect } from "@playwright/test";

test.describe("Static pages", () => {
  test("About renders content + stats", async ({ page }) => {
    await page.goto("/about");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByText(/courses|كورس/i).first()).toBeVisible();
  });

  test("Contact form renders fields", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator("textarea")).toBeVisible();
    await expect(
      page.getByRole("button", { name: /send|إرسال/i })
    ).toBeVisible();
  });

  test("Reset password renders email form", async ({ page }) => {
    await page.goto("/reset-password");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test("Checkout success page renders", async ({ page }) => {
    await page.goto("/checkout/success");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: /start learning|ابدأ التعلم/i })).toBeVisible();
  });

  test("Checkout cancel page renders", async ({ page }) => {
    await page.goto("/checkout/cancel");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
