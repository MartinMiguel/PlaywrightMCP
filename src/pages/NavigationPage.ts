import type { Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import type { TestContext } from '../framework/testContext';

/**
 * NavigationPage encapsulates common navigation and header interactions
 * shared across multiple page objects.
 *
 * This reduces duplication for:
 * - Search functionality
 * - Navigation actions
 * - Header/logo interactions
 */
export class NavigationPage extends BasePage {
  private readonly searchBox: Locator;
  private readonly searchButton: Locator;
  private readonly logo: Locator;
  private readonly header: Locator;

  constructor(ctx: TestContext) {
    super(ctx);
    this.searchBox = ctx.page.locator('#search_query_top');
    this.searchButton = ctx.page.locator('button[name="submit_search"]');
    this.logo = ctx.page.locator('#logo');
    this.header = ctx.page.getByRole('banner');
  }

  /**
   * Perform a search from any page
   */
  async search(term: string): Promise<void> {
    this.log(`Search: "${term}"`);
    await this.fill(this.searchBox, term, 'Search box');
    await this.click(this.searchButton, 'Search button');
    await this.ctx.page.waitForURL(/controller=search/);
  }

  /**
   * Click logo to return home
   */
  async clickLogo(): Promise<void> {
    this.log('Click: Logo');
    await this.click(this.logo, 'Logo');
    await this.ctx.page.waitForURL(new RegExp(this.ctx.config.baseURL));
  }

  /**
   * Navigate to home page
   */
  async goHome(): Promise<void> {
    this.log(`Go to home: ${this.ctx.config.baseURL}`);
    await this.page.goto(this.ctx.config.baseURL);
    await this.expectVisible(this.searchBox, 'Search box');
  }

  /**
   * Verify header is visible and stable
   */
  async expectHeaderVisible(): Promise<void> {
    this.log('Expect: Header visible');
    await this.expectVisible(this.header, 'Header');
  }

  /**
   * Clear search and reset to home
   */
  async clearSearchAndGoHome(): Promise<void> {
    this.log('Clear search and navigate home');
    await this.clickLogo();
    await this.expectVisible(this.searchBox, 'Search box');
  }
}
