import { defineConfig, devices } from "@playwright/test";


const qaseConfig = {
  apiToken: "2b46839b9d9e02b42ad387107322a116667b40a193f780dd1cfdad80bf40dc8d",
  projectCode: "SWISSCOWS",
  runComplete: true,
  basePath: "https://api.qase.io/v1",
  logging: true,
  uploadAttachments: true,
  environmentId: 1,
  rootSuiteTitle: "End2End",
};


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  snapshotDir: "./tests/snapshots",
  // globalSetup: 'utils/globalSetup.js',
  testDir: "./tests",
  timeout: 5 * 60 * 1000,
  // Limit the number of failures on CI to save resources
  maxFailures: process.env.CI ? 10 : undefined,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 4 : undefined,
  // reporter: process.env.CI
  //   ? [["playwright-qase-reporter", qaseConfig]]
  //   : undefined,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //["playwright-qase-reporter", qaseConfig]
  reporter: [
    ["html"],["list"],
    ["playwright-qase-reporter", qaseConfig],
    ["./reporter/SlowStepReporter.js"],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: "https://dev.swisscows.com/",
    actionTimeout: 25 * 1000,
    updateSnapshots: 'none',
    locale: "en-GB",
    colorScheme: "light",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
  },
  expect: {
    toHaveScreenshot: {  maxDiffPixels: 100 },
    timeout: 15 * 1000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      testMatch: /global\.setup\.js/,
      teardown: "cleanup",
    },
    {
      name: "cleanup",
      testMatch: /.*\.teardown\.js/,
    },
    {
      name: "chromium",
      testMatch: /.*\.chrome\.js/,
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        storageState: "./data/auth/user.json",
        viewport: { width: 1360, height: 900 },
        screenshot: "only-on-failure",
      },
      dependencies: ["setup"],
    },
    {
      name: "firefox",
      testMatch: /.*\.ff\.js/,
      use: {
        ...devices["Desktop Firefox"],
        viewport: { width: 1360, height: 900 },
        screenshot: "only-on-failure",
        video: "retain-on-failure",
      },
    },
    {
      name: "edge",
      testMatch: /.*\.msedge\.js/,
      use: {
        ...devices["Desktop Edge"],
        viewport: { width: 1360, height: 900 },
        screenshot: "only-on-failure",
        video: "retain-on-failure",
      },
    },
    {
      name: "mobile",
      testMatch: /.*\.mobile\.js/,
      use: {
        ...devices["Pixel 7"],
        channel: "chrome",
        screenshot: "only-on-failure",
        video: "retain-on-failure",
      },
    },
    {
      name: "api",
      testMatch: /.*\.api\.js/,
    },
  ],
  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
  // c
});
