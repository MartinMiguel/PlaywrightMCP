import { test as base, expect as pwExpect } from '@playwright/test';
import { loadConfig } from '../framework/config';
import { ApiClient } from '../api/ApiClient';
import { TestDataApi } from '../api/TestDataApi';

type ApiFixtures = {
  restful: ApiClient;
  jsonp: TestDataApi;
};

export const test = base.extend<ApiFixtures>({
  restful: async ({ request }, use) => {
    const cfg = loadConfig();
    await use(new ApiClient(request, cfg.apiBaseUrl));
  },

  jsonp: async ({ request }, use) => {
    const cfg = loadConfig();
    await use(new TestDataApi(request, cfg.jsonPlaceholderBaseUrl));
  }  
});

export const expect = pwExpect;