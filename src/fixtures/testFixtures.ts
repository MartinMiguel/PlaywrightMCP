import { test as base, expect as pwExpect } from '@playwright/test';
import { loadConfig } from '../framework/config';
import { TestContext } from '../framework/testContext';
import { Logger } from '../framework/logger';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { NavigationPage } from '../pages/NavigationPage';

type UiFixtures = {
  ctx: TestContext;
  home: HomePage;
  results: SearchResultsPage;
  nav: NavigationPage;
};

function extendUi(t: typeof base) {
  const extended = t.extend<UiFixtures>({

    ctx: async ({ page }, use) => {
      const config = loadConfig();
      const logger = new Logger('UI');
      const ctx = new TestContext(page, config, logger);
      await use(ctx);
    },
    home: async ({ ctx }, use) => use(new HomePage(ctx)),
    results: async ({ ctx }, use) => use(new SearchResultsPage(ctx)),
    nav: async ({ ctx }, use) => use(new NavigationPage(ctx)),
  });

  // Hooks
  extended.beforeEach(async ({ ctx }, testInfo) => {
    ctx.logger.info(`START: ${testInfo.title}`);
  });

  extended.afterEach(async ({ ctx }, testInfo) => {
    ctx.logger.info(`END: ${testInfo.title} => ${testInfo.status}`);
  });

  return extended;
}

export const test = extendUi(base);

export const expect = pwExpect;
