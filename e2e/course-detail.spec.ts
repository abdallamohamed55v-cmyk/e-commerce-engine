import { test, expect } from "@playwright/test";

test.describe("Course detail", () => {
  test("shows outcomes, prerequisites, lessons", async ({ page }) => {
    await page.goto("/courses/ai-fundamentals");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("heading", { name: /you'll learn|هتتعلم/i })).toBeVisible();
    await expect(page.getByText(/prerequisites|المتطلبات/i)).toBeVisible();
    await expect(page.getByText(/lessons|الدروس/i).first()).toBeVisible();
  });

  test("lessons redirect to /pricing when not subscribed", async ({ page }) => {
    await page.goto("/courses/ai-fundamentals");
    const firstLesson = page
      .locator('a[href*="/lessons/"], a[href="/pricing"]')
      .first();
    await firstLesson.click();
    await expect(page).toHaveURL(/\/(pricing|auth)/);
  });
});
