import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  snapshotDir: "./tests/snapshots",
  // globalSetup: 'utils/globalSetup.js',
  timeout: 5 * 60 * 1000,
  actionTimeout: 35 * 1000,
  // Limit the number of failures on CI to save resources
  maxFailures: process.env.CI ? 40 : 0,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 2 : undefined,
  // reporter: process.env.CI ? [['github'], ['blob']] : 'list',

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // ["playwright-qase-reporter", qaseConfig]
  reporter: [
    ["./reporter/SlowStepReporter.js"],
    ["html"],
    ["list"],
    [
      "playwright-qase-reporter",
      {
        debug: false,
        testops: {
          api: {
            token:
              "2b46839b9d9e02b42ad387107322a116667b40a193f780dd1cfdad80bf40dc8d",
          },
          project: "SWISSCOWS",
          logging: false,
          uploadAttachments: true,
          environmentId: 1,
          rootSuiteTitle: "End2End",
          run: {
            complete: true,
          },
        },
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: "https://dev.swisscows.com",
    actionTimeout: 25 * 1000,
    updateSnapshots: "none",
    locale: "en-GB",
    colorScheme: "light",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: "on-first-retry",
  },
  expect: {
    toHaveScreenshot: {
      threshold: 0.35,
      maxDiffPixelRatio: 0.04,
      maxDiffPixels: 900,
    },
    timeout: 30 * 1000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "setup",
      testMatch: /global\.setup\.js/,
    },
    {
      name: "chromium",
      testMatch: /.*\.chrome\.js/,
      use: {
        ...devices["Desktop Chrome"],
        channel: "chromium",
        storageState: "./data/auth/internalUser.json",
        viewport: { width: 1440, height: 900 },
      },
      dependencies: ["setup"],
    },
    {
      name: "firefox",
      testMatch: /.*\.ff\.js/,
      use: {
        ...devices["Desktop Firefox"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "edge",
      testMatch: /.*\.msedge\.js/,
      use: {
        ...devices["Desktop Edge"],
        viewport: { width: 1440, height: 900 },
      },
    },
    {
      name: "mobile",
      testMatch: /.*\.mobile\.js/,
      use: {
        ...devices["Pixel 7"],
        channel: "chromium"
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
});
