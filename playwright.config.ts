import { defineConfig, devices } from '@playwright/test';
/**
* Read environment variables from file.
* https://github.com/motdotla/dotenv
*/
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env.dev') });

/**
* See https://playwright.dev/docs/test-configuration.
*/
export default defineConfig({
  testDir: './performTests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 0,
  /* Set test case timeout exceed */
  timeout: 50_000,
  /* value workers will seperate  */
  workers: process.env.CI ? 2 : 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.BASE_URL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    video: 'on',
    screenshot: 'only-on-failure',
    headless: true
  },

  /* Configure projects for major browsers */
  projects: [
    {
        name: 'setup',
        testMatch: /auth\.spec\.ts/
    },
    // {
    //     name: 'unauth',
    //   use: { ...devices['Desktop Chrome'] },
    //     testMatch: ['**/GenAuth.spec.ts']
    // },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'],},
      testIgnore: [
        '**/auth.spec.ts', 
      ],
      dependencies: ['setup'],
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
 