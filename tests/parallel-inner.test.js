const { expect, test } = require("@playwright/test");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

test.describe.parallel("Running inner tests in parallel", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://google.com/");
  });

  test("A finishes first", async ({ page }) => {
    await expect(page).not.toBeNull();
  });

  test("B takes a bit longer, but all this happens in parallel", async ({ page }) => {
    await delay(1000);
    await expect(page).not.toBeNull();
  });

  test("C is the slowest, and therefore it sets the total execution time", async ({ page }) => {
    await delay(2000);
    await expect(page).not.toBeNull();
  });
});
