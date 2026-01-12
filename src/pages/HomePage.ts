import { NavigationPage } from './NavigationPage';
import type { TestContext } from '../framework/testContext';

/**
 * HomePage represents the home page and provides home-specific actions.
 * Inherits common navigation patterns from NavigationPage.
 */
export class HomePage extends NavigationPage {
  constructor(ctx: TestContext) {
    super(ctx);
  }

  /**
   * Navigate to home page and verify readiness
   */
  async goto(): Promise<void> {
    this.log(`Go to: ${this.ctx.config.baseURL}`);
    await this.goHome();
  }
}