const { expect, test } = require("@playwright/test");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test.describe("Running outer tests in sequence", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://playwright.dev/docs/test-parallel");
  });

  test("A finishes first", async ({ page }) => {
    await expect(page).not.toBeNull();
  });

  test("B is slower and waits for A to finish", async ({ page }) => {
    await delay(1000);
    await expect(page).not.toBeNull();
  });

  test("C is the slowest, and the total execution time is a sum of all", async ({ page }) => {
    await delay(2000);
    await expect(page.locator("text=By default, test files are run in parallel")).toBeVisible();
  });
});
