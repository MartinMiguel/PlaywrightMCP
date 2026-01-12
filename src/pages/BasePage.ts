import type { Locator, Page } from '@playwright/test';
import { expect } from '@playwright/test';
import type { TestContext } from '../framework/testContext';

export class BasePage {
  protected readonly page: Page;

  constructor(protected readonly ctx: TestContext) {
    this.page = ctx.page;
  }

  protected log(message: string) {
    this.ctx.logger.info(message);
  }

  protected async expectVisible(locator: Locator, name = 'element') {
    this.log(`Expect visible: ${name}`);
    await expect(locator, `${name} should be visible`).toBeVisible();
  }

  protected async click(locator: Locator, name = 'element') {
    this.log(`Click: ${name}`);
    await this.expectVisible(locator, name);
    await locator.click();
  }

  protected async fill(locator: Locator, value: string, name = 'field') {
    this.log(`Fill: ${name} = "${value}"`);
    await this.expectVisible(locator, name);
    await locator.fill(value);
  }
}
