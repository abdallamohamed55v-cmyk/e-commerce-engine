import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  const links = [
    { name: /courses|الكورسات/i, url: /\/courses$/ },
    { name: /pricing|الأسعار/i, url: /\/pricing$/ },
    { name: /about|عن المنصة/i, url: /\/about$/ },
    { name: /contact|تواصل/i, url: /\/contact$/ },
  ];

  for (const link of links) {
    test(`header link → ${link.url}`, async ({ page }) => {
      await page.goto("/");
      await page.getByRole("link", { name: link.name }).first().click();
      await expect(page).toHaveURL(link.url);
    });
  }

  test("404 page renders with back-home", async ({ page }) => {
    await page.goto("/this-route-does-not-exist");
    await expect(page.getByText("404")).toBeVisible();
    await expect(page.getByRole("link", { name: /back home|الرئيسية/i })).toBeVisible();
  });
});
