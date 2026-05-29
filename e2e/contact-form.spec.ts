import { test, expect } from "@playwright/test";

// E2E: Contact form submission writes to Supabase
test.describe("Contact form", () => {
  test("submits and shows success state", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel(/name/i).fill("E2E Test User");
    await page.getByLabel(/email/i).fill("e2e@test.dev");
    await page.getByLabel(/subject/i).fill("E2E automated test");
    await page.getByLabel(/message/i).fill("This is an automated test message.");
    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.getByText(/got it|thanks for reaching out/i)).toBeVisible({
      timeout: 10_000,
    });
  });
});
