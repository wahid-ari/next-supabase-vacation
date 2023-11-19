import { goToLastPage, login, logout } from '@/tests/util';
import { expect, test, type Page } from '@playwright/test';

async function goToPage(page: Page) {
  await page.goto('http://localhost:3000/destination');
}

test.describe('Testing Destination Page', () => {
  test('should have title, url, search form and add button', async ({ page }) => {
    await goToPage(page);
    await expect(page).toHaveURL(/destination/);
    await expect(page).toHaveTitle(/Destination/);
    await expect(page.getByRole('heading', { name: 'Destination' })).toBeVisible();
    await expect(page.getByPlaceholder('Search')).toBeVisible();
    await expect(page.getByRole('link', { name: 'New Destination' })).toBeVisible();
  });
  test('should render table and data', async ({ page }) => {
    await goToPage(page);
    await expect(page.getByRole('columnheader', { name: 'No' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Location' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Island' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Action' })).toBeVisible();
  });
  test('should show filter result', async ({ page }) => {
    await goToPage(page);
    await page.getByPlaceholder('Search').fill('bali');
    await expect(page.getByRole('cell', { name: 'Bali' }).first()).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Labuan Bajo', exact: true })).not.toBeVisible();
  });
  test('should only can create new destination after login', async ({ page }) => {
    await goToPage(page);
    await page.getByRole('link', { name: 'New Destination' }).click();
    await page.getByPlaceholder('Destination Name').fill('Destination');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText('Please provide bearer token in headers')).toBeVisible();
  });
  test('should fill required field when creating new destination', async ({ page }) => {
    // Login
    await login(page);
    // go to destination page
    await goToPage(page);
    // add new destination
    await page.getByRole('link', { name: 'New Destination' }).click();
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText(/Creating/)).toBeVisible();
    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Invalid Image URL')).toBeVisible();
    await expect(page.getByText('Description is required')).toBeVisible();
    await expect(page.getByText('Content is required')).toBeVisible();
    // Logout
    await logout(page);
  });
  test('should can create new destination after login', async ({ page }) => {
    // Login
    await login(page);
    // go to destination page
    await goToPage(page);
    // add new destination
    await page.getByRole('link', { name: 'New Destination' }).click();
    await page.getByPlaceholder('Destination Name').fill('New Destination Test');
    await page
      .getByPlaceholder('Image URL', { exact: true })
      .fill('https://images.unsplash.com/photo-1682686581580-d99b0230064e?w=500&auto=format&fit=crop&q=60');
    await page.getByPlaceholder('Destination Description').fill('New Destination Description');
    await page.locator('#content').getByRole('paragraph').fill('New Destination Content');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText(/Creating/)).toBeVisible();
    await expect(page.getByText('Success add destination')).toBeVisible();
    // cek new created destination
    await page.reload();
    await goToLastPage(page);
    await expect(page.getByRole('cell', { name: 'New Destination Test', exact: true })).toBeVisible();
    // Logout
    await logout(page);
  });
  test('should can edit new created destination after login', async ({ page }) => {
    // Login
    await login(page);
    // go to destination page
    await goToPage(page);
    // edit destination
    await goToLastPage(page);
    await page.getByRole('link', { name: 'Edit New Destination Test' }).click();
    await page.getByPlaceholder('Destination Name').fill('Edit Destination Test');
    await page
      .getByPlaceholder('Image URL', { exact: true })
      .fill('https://images.unsplash.com/photo-1682686581580-d99b0230064e?w=500&auto=format&fit=crop&q=60');
    await page.getByPlaceholder('Destination Description').fill('Edit Destination Description');
    await page.locator('#content').getByRole('paragraph').fill('Edit Destination Content');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText('Updating destination')).toBeVisible();
    await expect(page.getByText('Success update destination')).toBeVisible();
    // cek new edited destination
    await page.reload();
    await goToLastPage(page);
    await expect(page.getByRole('cell', { name: 'New Destination Test', exact: true })).not.toBeVisible();
    await expect(page.getByRole('cell', { name: 'Edit Destination Test', exact: true })).toBeVisible();
    // Logout
    await logout(page);
  });
  test('should can delete destination after login', async ({ page }) => {
    // Login
    await login(page);
    // go to destination page
    await goToPage(page);
    // delete destination
    await goToLastPage(page);
    await page.getByRole('button', { name: 'Delete Edit Destination Test' }).click();
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText(/Deleting/)).toBeVisible();
    await expect(page.getByText('Success delete destination')).toBeVisible();
    // cek deleted destination
    await page.reload();
    await goToLastPage(page);
    await expect(page.getByRole('cell', { name: 'Edit Destination Test', exact: true })).not.toBeVisible();
    // Logout
    await logout(page);
  });
});
