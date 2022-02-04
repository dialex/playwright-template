const { expect, test } = require("@playwright/test");

// TODO: move selectors to single class
const iframeCheckoutSanddox = "#checkout-demo";
const btnMobileView = ".ViewToggle button:nth-child(2)";
const sectionPaymentSummary = "#ProductSummary-totalAmount";
const inputEmail = "#email";
const inputCardNumber = "#cardNumber";
const inputCardName = "#billingName";
const inputCardExpiry = "#cardExpiry";
const inputCardCode = "#cardCvc";
const inputCardCountry = "#billingCountry";
const btnStripePay = "[data-testid='hosted-payment-submit-button']";

test.describe.parallel("Testing an iframe", () => {
  // all tests start in the same url
  test.beforeEach(async ({ page }) => {
    await page.goto("https://checkout.stripe.dev/preview");
  });

  test("is online and has a checkout sandbox", async ({ page }) => {
    await expect(page).not.toBeNull();
    await expect(page).toHaveTitle(/.*Stripe Checkout.*/);

    await page.locator(btnMobileView).click();
    const stripeFrame = page.frameLocator(iframeCheckoutSanddox);
    await expect(stripeFrame).not.toBeNull();
    await expect(stripeFrame.locator(sectionPaymentSummary)).toBeVisible();
  });

  test("can make a test payment", async ({ page }) => {
    const frame = page.frameLocator(iframeCheckoutSanddox);

    await frame.locator(inputEmail).fill("someone@gmail.com");
    await frame.locator(inputCardNumber).fill("4242424242424242");
    await frame.locator(inputCardCode).fill("123");
    await frame.locator(inputCardExpiry).fill("0123");
    await frame.locator(inputCardName).fill("Someone");
    await frame.locator(inputCardCountry).selectOption({ label: "France" });
    await frame.locator(btnStripePay).click();

    await expect(page.locator("text=Payment success")).toBeVisible();
  });
});
