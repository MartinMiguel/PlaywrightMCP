import type { Page } from '@playwright/test';
import type { AppConfig } from './config';
import { Logger } from './logger';

export class TestContext {
  constructor(
    public page: Page,
    public config: AppConfig,
    public logger: Logger
  ) {}
}