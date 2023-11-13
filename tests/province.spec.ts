import { goToLastPage, login, logout } from '@/tests/util';
import { expect, test, type Page } from '@playwright/test';

async function goToPage(page: Page) {
  await page.goto('http://localhost:3000/province');
}

test.describe('Testing Province Page', () => {
  test('should have title, url, search form and add button', async ({ page }) => {
    await goToPage(page);
    await expect(page).toHaveURL(/province/);
    await expect(page).toHaveTitle(/Province/);
    await expect(page.getByRole('heading', { name: 'Province' })).toBeVisible();
    await expect(page.getByPlaceholder('Search')).toBeVisible();
    await expect(page.getByRole('button', { name: 'New Province' })).toBeVisible();
  });
  test('should render table and data', async ({ page }) => {
    await goToPage(page);
    await expect(page.getByRole('columnheader', { name: 'No' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Island' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Destination' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Action' })).toBeVisible();
  });
  test('should show filter result', async ({ page }) => {
    await goToPage(page);
    await page.getByPlaceholder('Search').fill('bali');
    await expect(page.getByRole('cell', { name: 'Bali' }).first()).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Aceh', exact: true })).not.toBeVisible();
  });
  test('should only can create new province after login', async ({ page }) => {
    await goToPage(page);
    await page.getByRole('button', { name: 'New Province' }).click();
    await page.getByPlaceholder('Province Name').fill('Province');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText('Please provide bearer token in headers')).toBeVisible();
  });
  test('should fill required field when creating new province', async ({ page }) => {
    // Login
    await login(page);
    // go to province page
    await goToPage(page);
    // add new province
    await page.getByRole('button', { name: 'New Province' }).click();
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText(/Creating/)).toBeVisible();
    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Invalid Image URL')).toBeVisible();
    // close modal
    await page.getByRole('button', { name: 'Cancel' }).click();
    // Logout
    await logout(page);
  });
  test('should can create new province after login', async ({ page }) => {
    // Login
    await login(page);
    // go to province page
    await goToPage(page);
    // add new province
    await page.getByRole('button', { name: 'New Province' }).click();
    await page.getByPlaceholder('Province Name').fill('New Province Test');
    await page
      .getByPlaceholder('Image URL')
      .fill('https://images.unsplash.com/photo-1682686581580-d99b0230064e?w=500&auto=format&fit=crop&q=60');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText(/Creating/)).toBeVisible();
    await expect(page.getByText('Success add province')).toBeVisible();
    // cek new created province
    await page.reload();
    await goToLastPage(page);
    await expect(page.getByRole('cell', { name: 'New Province Test', exact: true })).toBeVisible();
    // Logout
    await logout(page);
  });
  test('should can edit new created province after login', async ({ page }) => {
    // Login
    await login(page);
    // go to province page
    await goToPage(page);
    // edit province
    await goToLastPage(page);
    await page.getByRole('button', { name: 'Edit New Province Test' }).click();
    await page.getByPlaceholder('Province Name').fill('Edit Province Test');
    await page
      .getByPlaceholder('Image URL')
      .fill('https://images.unsplash.com/photo-1682686581580-d99b0230064e?w=500&auto=format&fit=crop&q=60');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText('Updating province')).toBeVisible();
    await expect(page.getByText('Success update province')).toBeVisible();
    // cek new edited province
    await page.reload();
    await goToLastPage(page);
    await expect(page.getByRole('cell', { name: 'New Province Test', exact: true })).not.toBeVisible();
    await expect(page.getByRole('cell', { name: 'Edit Province Test', exact: true })).toBeVisible();
    // Logout
    await logout(page);
  });
  test('should can delete province after login', async ({ page }) => {
    // Login
    await login(page);
    // go to province page
    await goToPage(page);
    // delete province
    await goToLastPage(page);
    await page.getByRole('button', { name: 'Delete Edit Province Test' }).click();
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText(/Deleting/)).toBeVisible();
    await expect(page.getByText('Success delete province')).toBeVisible();
    // cek deleted province
    await page.reload();
    await goToLastPage(page);
    await expect(page.getByRole('cell', { name: 'Edit Province Test', exact: true })).not.toBeVisible();
    // Logout
    await logout(page);
  });
});
