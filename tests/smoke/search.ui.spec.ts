import { test, expect } from '../../src/fixtures/testFixtures';

test('UI-001: Search "T-shirts" shows expected product', async ({ home, results }) => {
  await home.goto();
  await home.search('T-shirts');
  await results.expectProductVisible('Faded Short Sleeve T-shirts');
});

test('UI-002: Search "Dresses" shows results list', async ({ home, ctx }) => {
  await home.goto();
  await home.search('Dresses');

  // Simple stability assertion: results container exists
  const resultsList = ctx.page.locator('.product_list');
  await expect(resultsList).toBeVisible();
});

test('UI-003: Search with nonsense term shows "No results were found"', async ({ home, ctx }) => {
  await home.goto();
  await home.search('zzzzzzzzzzzzzz');

  // The site typically shows an alert for no results
  const warning = ctx.page.locator('.alert-warning');
  await expect(warning).toBeVisible();
});

test('UI-004: Search for T-shirts and verify Faded Short Sleeve T-shirts in results', async ({ home, results, page }) => {
  // Verify page title
  await home.goto();
  await expect(page).toHaveTitle('My Shop');
  
  // Search for T-shirts
  await home.search('T-shirts');
  
  // Wait for search results
  await results.waitForSearchResults();
  
  // Verify product heading is visible
  await results.expectProductHeadingVisible('Faded Short Sleeve T-shirts');
  
  // Verify search results count
  await results.expectSearchResultsCount('1');
});