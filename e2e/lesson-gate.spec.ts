import { test, expect } from "@playwright/test";

// E2E: Lesson access is gated behind subscription
test.describe("Lesson gate", () => {
  test("unauthenticated lesson click redirects to pricing", async ({ page }) => {
    await page.goto("/courses");
    // Click the first course card
    const firstCard = page.locator("a[href^='/courses/']").first();
    await firstCard.click();
    // CourseDetail page should load
    await expect(page).toHaveURL(/\/courses\/[^/]+$/);
    // Lesson rows for non-subscribers route to /pricing
    const firstLesson = page
      .locator("a[href='/pricing'], a[href^='/courses/'][href*='/lessons/']")
      .first();
    await firstLesson.click();
    await expect(page).toHaveURL(/\/pricing|\/auth/);
  });
});
