import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['list'],
    ['html'],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['allure-playwright', { outputFolder: 'allure-results' }],
  ],

  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Global deterministic viewport to stabilize visual tests
    viewport: { width: 1265, height: 900 },
  },

  projects: [
    // UI
    {
      name: 'ui-chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
