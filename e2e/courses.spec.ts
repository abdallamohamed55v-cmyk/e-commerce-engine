import { test, expect } from "@playwright/test";

test.describe("Courses library", () => {
  test("lists multiple courses", async ({ page }) => {
    await page.goto("/courses");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    const cards = page.locator('a[href^="/courses/"]');
    await expect.poll(async () => await cards.count()).toBeGreaterThan(3);
  });

  test("search filter narrows results", async ({ page }) => {
    await page.goto("/courses");
    const input = page.getByPlaceholder(/search courses|ابحث/i);
    await input.fill("python");
    await page.waitForTimeout(300);
    const cards = page.locator('a[href^="/courses/"]');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
    expect(count).toBeLessThan(15);
  });

  test("clicking a course opens detail", async ({ page }) => {
    await page.goto("/courses");
    await page.locator('a[href^="/courses/"]').first().click();
    await expect(page).toHaveURL(/\/courses\/[^/]+$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
