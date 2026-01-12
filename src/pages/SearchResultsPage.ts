import type { Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { NavigationPage } from './NavigationPage';
import type { TestContext } from '../framework/testContext';

/**
 * SearchResultsPage represents the search results page.
 * Inherits common navigation patterns from NavigationPage.
 */
export class SearchResultsPage extends NavigationPage {
  private readonly productNames: Locator;
  private readonly productHeadings: Locator;
  private readonly searchResultText: Locator;

  constructor(ctx: TestContext) {
    super(ctx);
    this.productNames = ctx.page.locator('.product_list .product-name');
    this.productHeadings = ctx.page.locator('#center_column').getByRole('heading');
    this.searchResultText = ctx.page.locator('h1').first();
  }

  async expectProductVisible(name: string): Promise<void> {
    this.log(`Expect product visible: ${name}`);
    await expect(this.productNames.filter({ hasText: name }).first()).toBeVisible();
  }

  async expectProductHeadingVisible(name: string): Promise<void> {
    const heading = this.productHeadings.filter({ hasText: name });
    await expect(heading.first()).toBeVisible();
  }

  async expectSearchResultsCount(count: string): Promise<void> {
    await expect(this.searchResultText).toContainText(`${count} result has been found`);
  }

  async waitForSearchResults(): Promise<void> {
    await this.ctx.page.waitForURL(/controller=search/);
  }
}