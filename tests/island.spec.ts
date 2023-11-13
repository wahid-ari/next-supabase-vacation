import { login, logout } from '@/tests/util';
import { expect, test, type Page } from '@playwright/test';

async function goToPage(page: Page) {
  await page.goto('http://localhost:3000/island');
}

test.describe('Testing Island Page', () => {
  test('should have title, url, search form and add button', async ({ page }) => {
    await goToPage(page);
    await expect(page).toHaveURL(/island/);
    await expect(page).toHaveTitle(/Island/);
    await expect(page.getByRole('heading', { name: 'Island' })).toBeVisible();
    await expect(page.getByPlaceholder('Search')).toBeVisible();
    await expect(page.getByRole('button', { name: 'New Island' })).toBeVisible();
  });
  test('should render table and data', async ({ page }) => {
    await goToPage(page);
    await expect(page.getByRole('cell', { name: 'No', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Destination' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Action' })).toBeVisible();
  });
  test('should show filter result', async ({ page }) => {
    await goToPage(page);
    await page.getByPlaceholder('Search').fill('bali');
    await expect(page.getByRole('cell', { name: 'Bali' }).first()).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Jawa', exact: true })).not.toBeVisible();
  });
  test('should only can create new island after login', async ({ page }) => {
    await goToPage(page);
    await page.getByRole('button', { name: 'New Island' }).click();
    await page.getByPlaceholder('Island Name').fill('Island');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText('Please provide bearer token in headers')).toBeVisible();
  });
});

test.describe('Testing Create Data with Empty field in Island Page', () => {
  test('should fill required field when creating new island', async ({ page }) => {
    // Login
    await login(page);
    // go to island page
    await goToPage(page);
    // add new island
    await page.getByRole('button', { name: 'New Island' }).click();
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText(/Creating/)).toBeVisible();
    await expect(page.getByText('Name is required')).toBeVisible();
    await expect(page.getByText('Invalid Image URL')).toBeVisible();
    // close modal
    await page.getByRole('button', { name: 'Cancel' }).click();
    // Logout
    await logout(page);
  });
});

test.describe('Testing Create Data in Island Page', () => {
  test('should can create new island after login', async ({ page }) => {
    // Login
    await login(page);
    // go to island page
    await goToPage(page);
    // add new island
    await page.getByRole('button', { name: 'New Island' }).click();
    await page.getByPlaceholder('Island Name').fill('New Island Test');
    await page
      .getByPlaceholder('Image URL')
      .fill('https://images.unsplash.com/photo-1682686581580-d99b0230064e?w=500&auto=format&fit=crop&q=60');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText(/Creating/)).toBeVisible();
    await expect(page.getByText('Success add island')).toBeVisible();
    // cek new created island
    await page.reload();
    await expect(page.getByRole('cell', { name: 'New Island Test', exact: true })).toBeVisible();
    // Logout
    await logout(page);
  });
});

test.describe('Testing Edit Data in Island Page', () => {
  test('should can edit new created island after login', async ({ page }) => {
    // Login
    await login(page);
    // go to island page
    await goToPage(page);
    // edit island
    await page.getByRole('button', { name: 'Edit New Island Test' }).click();
    await page.getByPlaceholder('Island Name').fill('Edit Island Test');
    await page
      .getByPlaceholder('Image URL')
      .fill('https://images.unsplash.com/photo-1682686581580-d99b0230064e?w=500&auto=format&fit=crop&q=60');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText('Updating island')).toBeVisible();
    await expect(page.getByText('Success update island')).toBeVisible();
    // cek new edited island
    await page.reload();
    await expect(page.getByRole('cell', { name: 'New Island Test', exact: true })).not.toBeVisible();
    await expect(page.getByRole('cell', { name: 'Edit Island Test', exact: true })).toBeVisible();
    // Logout
    await logout(page);
  });
});

test.describe('Testing Delete Data in Island Page', () => {
  test('should can delete island after login', async ({ page }) => {
    // Login
    await login(page);
    // go to island page
    await goToPage(page);
    // delete island
    await page.getByRole('button', { name: 'Delete Edit Island Test' }).click();
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText(/Deleting/)).toBeVisible();
    await expect(page.getByText('Success delete island')).toBeVisible();
    // cek deleted island
    await page.reload();
    await expect(page.getByRole('cell', { name: 'Edit Island Test', exact: true })).not.toBeVisible();
    // Logout
    await logout(page);
  });
});
