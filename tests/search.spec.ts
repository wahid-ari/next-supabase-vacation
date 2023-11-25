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
  test('should show search result of "bali" using enter keyboard', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search Destination, Video, Province, Category and Island');
    await searchInput.fill('bali');
    await searchInput.press('Enter');
    await expect(page.getByText(/Searching “bali”.../)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Destination' })).toBeVisible();
    await expect(page.getByText('West Bali National Park')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Video' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Bali' })).toBeVisible();
  });
  test('should show search result of "toba" using search button', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search Destination, Video, Province, Category and Island');
    const searchButton = page.getByRole('button', { name: 'Search' });
    await searchInput.fill('toba');
    await searchButton.click();
    await expect(page.getByText(/Searching “toba”.../)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Destination' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'hero Lake Toba' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Video' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'The Heartbeat of Toba' })).toBeVisible();
  });
  test('should show search history after visit setting page and back to search page', async ({ page }) => {
    // first visit to search page, and search "bali"
    const searchInput = page.getByPlaceholder('Search Destination, Video, Province, Category and Island');
    await searchInput.fill('bali');
    await searchInput.press('Enter');
    await expect(page.getByText(/Searching “bali”.../)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Destination' })).toBeVisible();
    await expect(page.getByText('West Bali National Park')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Video' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Bali' })).toBeVisible();
    // go to setting page and back to search page
    await page.getByRole('link', { name: 'Setting' }).click();
    await page.getByRole('link', { name: 'Search' }).click();
    // show search history
    await expect(page.getByText('Recent Search')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Destination' })).toBeVisible();
    await expect(page.getByText('West Bali National Park')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Video' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Bali' })).toBeVisible();
  });
  test('should remove all search history', async ({ page }) => {
    // first visit to search page, and search "bali"
    const searchInput = page.getByPlaceholder('Search Destination, Video, Province, Category and Island');
    await searchInput.fill('bali');
    await searchInput.press('Enter');
    await expect(page.getByText(/Searching “bali”.../)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Destination' })).toBeVisible();
    await expect(page.getByText('West Bali National Park')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Video' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Bali' })).toBeVisible();
    // go to setting page and back to search page
    await page.getByRole('link', { name: 'Setting' }).click();
    await page.getByRole('link', { name: 'Search' }).click();
    // show search history
    await expect(page.getByText('Recent Search')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Destination' })).toBeVisible();
    await expect(page.getByText('West Bali National Park')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Video' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Bali' })).toBeVisible();
    // clear all search history
    await page.getByRole('button', { name: 'Clear All' }).click();
    await expect(page.getByText('Recent Search')).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Destination' })).not.toBeVisible();
    await expect(page.getByText('West Bali National Park')).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Video' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Bali' })).not.toBeVisible();
  });
  test('should remove all destination search history', async ({ page }) => {
    // first visit to search page, and search "bali"
    const searchInput = page.getByPlaceholder('Search Destination, Video, Province, Category and Island');
    await searchInput.fill('bali');
    await searchInput.press('Enter');
    await expect(page.getByText(/Searching “bali”.../)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Destination' })).toBeVisible();
    await expect(page.getByText('West Bali National Park')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Video' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Bali' })).toBeVisible();
    // go to setting page and back to search page
    await page.getByRole('link', { name: 'Setting' }).click();
    await page.getByRole('link', { name: 'Search' }).click();
    // show search history
    await expect(page.getByText('Recent Search')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Destination' })).toBeVisible();
    await expect(page.getByText('West Bali National Park')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Video' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Bali' })).toBeVisible();
    // clear destination search history
    await page.getByRole('button', { name: 'Clear Destination' }).click();
    await expect(page.getByRole('heading', { name: 'Destination' })).not.toBeVisible();
    await expect(page.getByText('West Bali National Park')).not.toBeVisible();
    await expect(page.getByRole('heading', { name: 'Video' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Bali' })).toBeVisible();
  });
  test('should remove all video search history', async ({ page }) => {
    // first visit to search page, and search "bali"
    const searchInput = page.getByPlaceholder('Search Destination, Video, Province, Category and Island');
    await searchInput.fill('bali');
    await searchInput.press('Enter');
    await expect(page.getByText(/Searching “bali”.../)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Destination' })).toBeVisible();
    await expect(page.getByText('West Bali National Park')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Video' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Bali' })).toBeVisible();
    // go to setting page and back to search page
    await page.getByRole('link', { name: 'Setting' }).click();
    await page.getByRole('link', { name: 'Search' }).click();
    // show search history
    await expect(page.getByText('Recent Search')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Destination' })).toBeVisible();
    await expect(page.getByText('West Bali National Park')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Video' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Bali' })).toBeVisible();
    // clear video search history
    await page.getByRole('button', { name: 'Clear Video' }).click();
    await expect(page.getByText('Recent Search')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Destination' })).toBeVisible();
    await expect(page.getByText('West Bali National Park')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Video' })).not.toBeVisible();
    await expect(page.getByRole('button', { name: 'Bali' })).not.toBeVisible();
  });
  test('should remove single destination search history', async ({ page }) => {
    // first visit to search page, and search "bali"
    const searchInput = page.getByPlaceholder('Search Destination, Video, Province, Category and Island');
    await searchInput.fill('bali');
    await searchInput.press('Enter');
    await expect(page.getByText(/Searching “bali”.../)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Destination' })).toBeVisible();
    await expect(page.getByText('West Bali National Park')).toBeVisible();
    // go to setting page and back to search page
    await page.getByRole('link', { name: 'Setting' }).click();
    await page.getByRole('link', { name: 'Search' }).click();
    // show search history
    await expect(page.getByText('Recent Search')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Destination' })).toBeVisible();
    await expect(page.getByText('West Bali National Park')).toBeVisible();
    // clear single destination search history
    await page.getByTitle('Delete West Bali National Park').click();
    await expect(page.getByText('West Bali National Park')).not.toBeVisible();
  });
  test('should remove single video search history', async ({ page }) => {
    // first visit to search page, and search "toba"
    const searchInput = page.getByPlaceholder('Search Destination, Video, Province, Category and Island');
    await searchInput.fill('toba');
    await searchInput.press('Enter');
    await expect(page.getByText(/Searching “toba”.../)).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Video' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'The Heartbeat of Toba' })).toBeVisible();
    // go to setting page and back to search page
    await page.getByRole('link', { name: 'Setting' }).click();
    await page.getByRole('link', { name: 'Search' }).click();
    // show search history
    await expect(page.getByText('Recent Search')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Video' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'The Heartbeat of Toba' })).toBeVisible();
    // clear single video search history
    await page.getByTitle('Delete The Heartbeat of Toba').click();
    await expect(page.getByRole('button', { name: 'The Heartbeat of Toba' })).not.toBeVisible();
  });
});
