import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/search');
});

test.describe('Testing Search Page', () => {
  test('should have title and url', async ({ page }) => {
    await expect(page).toHaveURL(/search/);
    await expect(page).toHaveTitle(/Search/);
    await expect(page.getByRole('heading', { name: 'Search' })).toBeVisible();
  });
  test('should show search result of "jane" using enter keyboard', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search Title, Author, ISBN');
    await searchInput.fill('jane');
    await searchInput.press('Enter');
    await expect(page.getByText(/Searching “jane”.../)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible();
    await expect(page.getByText('Jane Eyre')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Authors' })).toBeVisible();
    await expect(page.getByText('Jane Austen')).toBeVisible();
  });
  test('should show search result of "game" using search button', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search Title, Author, ISBN');
    const searchButton = page.getByRole('button', { name: 'Search' });
    await searchInput.fill('game');
    await searchButton.click();
    await expect(page.getByText(/Searching “game”.../)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible();
    await expect(page.getByText('The Hunger Games (The Hunger Games #1)')).toBeVisible();
  });
  test('should show search history after visit setting page and back to search page', async ({ page }) => {
    // first visit to search page, and search "jane"
    const searchInput = page.getByPlaceholder('Search Title, Author, ISBN');
    await searchInput.fill('jane');
    await searchInput.press('Enter');
    await expect(page.getByText(/Searching “jane”.../)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible();
    await expect(page.getByText('Jane Eyre')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Authors' })).toBeVisible();
    await expect(page.getByText('Jane Austen')).toBeVisible();
    // go to setting page and back to search page
    await page.getByRole('link', { name: 'Setting' }).click();
    await page.getByRole('link', { name: 'Search' }).click();
    // show search history
    await expect(page.getByText('Recent Search')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible();
    await expect(page.getByText('Jane Eyre')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Authors' })).toBeVisible();
    await expect(page.getByText('Jane Austen')).toBeVisible();
  });
  test('should remove all search history', async ({ page }) => {
    // first visit to search page, and search "jane"
    const searchInput = page.getByPlaceholder('Search Title, Author, ISBN');
    await searchInput.fill('jane');
    await searchInput.press('Enter');
    await expect(page.getByText(/Searching “jane”.../)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible();
    await expect(page.getByText('Jane Eyre')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Authors' })).toBeVisible();
    await expect(page.getByText('Jane Austen')).toBeVisible();
    // go to setting page and back to search page
    await page.getByRole('link', { name: 'Setting' }).click();
    await page.getByRole('link', { name: 'Search' }).click();
    // show search history
    await expect(page.getByText('Recent Search')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible();
    await expect(page.getByText('Jane Eyre')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Authors' })).toBeVisible();
    await expect(page.getByText('Jane Austen')).toBeVisible();
    // clear all search history
    await page.getByRole('button', { name: 'Clear All' }).click();
    await expect(page.getByText('Recent Search')).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Books' })).not.toBeVisible();
    await expect(page.getByText('Jane Eyre')).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Authors' })).not.toBeVisible();
    await expect(page.getByText('Jane Austen')).not.toBeVisible();
  });
  test('should remove all books search history', async ({ page }) => {
    // first visit to search page, and search "jane"
    const searchInput = page.getByPlaceholder('Search Title, Author, ISBN');
    await searchInput.fill('jane');
    await searchInput.press('Enter');
    await expect(page.getByText(/Searching “jane”.../)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible();
    await expect(page.getByText('Jane Eyre')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Authors' })).toBeVisible();
    await expect(page.getByText('Jane Austen')).toBeVisible();
    // go to setting page and back to search page
    await page.getByRole('link', { name: 'Setting' }).click();
    await page.getByRole('link', { name: 'Search' }).click();
    // show search history
    await expect(page.getByText('Recent Search')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible();
    await expect(page.getByText('Jane Eyre')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Authors' })).toBeVisible();
    await expect(page.getByText('Jane Austen')).toBeVisible();
    // clear books search history
    await page.getByRole('button', { name: 'Clear Books' }).click();
    await expect(page.getByText('Recent Search')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Books' })).not.toBeVisible();
    await expect(page.getByText('Jane Eyre')).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Authors' })).toBeVisible();
    await expect(page.getByText('Jane Austen')).toBeVisible();
  });
  test('should remove all authors search history', async ({ page }) => {
    // first visit to search page, and search "jane"
    const searchInput = page.getByPlaceholder('Search Title, Author, ISBN');
    await searchInput.fill('jane');
    await searchInput.press('Enter');
    await expect(page.getByText(/Searching “jane”.../)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible();
    await expect(page.getByText('Jane Eyre')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Authors' })).toBeVisible();
    await expect(page.getByText('Jane Austen')).toBeVisible();
    // go to setting page and back to search page
    await page.getByRole('link', { name: 'Setting' }).click();
    await page.getByRole('link', { name: 'Search' }).click();
    // show search history
    await expect(page.getByText('Recent Search')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible();
    await expect(page.getByText('Jane Eyre')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Authors' })).toBeVisible();
    await expect(page.getByText('Jane Austen')).toBeVisible();
    // clear authors search history
    await page.getByRole('button', { name: 'Clear Authors' }).click();
    await expect(page.getByText('Recent Search')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible();
    await expect(page.getByText('Jane Eyre')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Authors' })).not.toBeVisible();
    await expect(page.getByText('Jane Austen')).not.toBeVisible();
  });
  test('should remove single author search history', async ({ page }) => {
    // first visit to search page, and search "jane"
    const searchInput = page.getByPlaceholder('Search Title, Author, ISBN');
    await searchInput.fill('jane');
    await searchInput.press('Enter');
    await expect(page.getByText(/Searching “jane”.../)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Authors' })).toBeVisible();
    await expect(page.getByText('Jane Austen')).toBeVisible();
    // go to setting page and back to search page
    await page.getByRole('link', { name: 'Setting' }).click();
    await page.getByRole('link', { name: 'Search' }).click();
    // show search history
    await expect(page.getByText('Recent Search')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Authors' })).toBeVisible();
    await expect(page.getByText('Jane Austen')).toBeVisible();
    // clear single authors search history
    await page
      .locator('div')
      .filter({ hasText: /^Jane AustenWebX$/ })
      .getByRole('button', { name: 'X' })
      .click();
    await expect(page.getByText('Jane Austen')).not.toBeVisible();
  });
  test('should remove single destination search history', async ({ page }) => {
    // first visit to search page, and search "jane"
    const searchInput = page.getByPlaceholder('Search Title, Author, ISBN');
    await searchInput.fill('hunger');
    await searchInput.press('Enter');
    await expect(page.getByText(/Searching “hunger”.../)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible();
    await expect(page.getByText('Mockingjay (The Hunger Games #3)')).toBeVisible();
    // go to setting page and back to search page
    await page.getByRole('link', { name: 'Setting' }).click();
    await page.getByRole('link', { name: 'Search' }).click();
    // show search history
    await expect(page.getByText('Recent Search')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Books' })).toBeVisible();
    await expect(page.getByText('Mockingjay (The Hunger Games #3)')).toBeVisible();
    // clear single authors search history
    await page
      .locator('div')
      .filter({ hasText: /^Mockingjay \(The Hunger Games #3\)2010X$/ })
      .getByRole('button', { name: 'X' })
      .click();
    await expect(page.getByText('Mockingjay (The Hunger Games #3)')).not.toBeVisible();
  });
});
