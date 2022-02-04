// @ts-check

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  workers: 4,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: "on-first-retry",
  },
};

module.exports = config;
