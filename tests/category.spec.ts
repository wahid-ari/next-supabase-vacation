import { login, logout } from '@/tests/util';
import { expect, test, type Page } from '@playwright/test';

async function goToPage(page: Page) {
  await page.goto('http://localhost:3000/category');
}

test.describe('Testing Category Page', () => {
  test('should have title, url, search form and add button', async ({ page }) => {
    await goToPage(page);
    await expect(page).toHaveURL(/category/);
    await expect(page).toHaveTitle(/Category/);
    await expect(page.getByRole('heading', { name: 'Category' })).toBeVisible();
    await expect(page.getByPlaceholder('Search')).toBeVisible();
    await expect(page.getByRole('button', { name: 'New Category' })).toBeVisible();
  });
  test('should render table and data', async ({ page }) => {
    await goToPage(page);
    await expect(page.getByRole('cell', { name: 'No', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Action' })).toBeVisible();
  });
  test('should show filter result', async ({ page }) => {
    await goToPage(page);
    await page.getByPlaceholder('Search').fill('beach');
    await expect(page.getByRole('cell', { name: 'Beach' }).first()).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Architecture', exact: true })).not.toBeVisible();
  });
  test('should only can create new category after login', async ({ page }) => {
    await goToPage(page);
    await page.getByRole('button', { name: 'New Category' }).click();
    await page.getByPlaceholder('Category Name').fill('Category');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText('Please provide bearer token in headers')).toBeVisible();
  });
});

test.describe('Testing Create Data with Empty field in Category Page', () => {
  test('should fill required field when creating new category', async ({ page }) => {
    // Login
    await login(page);
    // go to category page
    await goToPage(page);
    // add new category
    await page.getByRole('button', { name: 'New Category' }).click();
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

test.describe('Testing Create Data in Category Page', () => {
  test('should can create new category after login', async ({ page }) => {
    // Login
    await login(page);
    // go to category page
    await goToPage(page);
    // add new category
    await page.getByRole('button', { name: 'New Category' }).click();
    await page.getByPlaceholder('Category Name').fill('New Category Test');
    await page
      .getByPlaceholder('Image URL')
      .fill('https://images.unsplash.com/photo-1682686581580-d99b0230064e?w=500&auto=format&fit=crop&q=60');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText(/Creating/)).toBeVisible();
    await expect(page.getByText('Success add category')).toBeVisible();
    // cek new created category
    await page.reload();
    await expect(page.getByRole('cell', { name: 'New Category Test', exact: true })).toBeVisible();
    // Logout
    await logout(page);
  });
});

test.describe('Testing Edit Data in Category Page', () => {
  test('should can edit new created category after login', async ({ page }) => {
    // Login
    await login(page);
    // go to category page
    await goToPage(page);
    // edit category
    await page.getByRole('button', { name: 'Edit New Category Test' }).click();
    await page.getByPlaceholder('Category Name').fill('Edit Category Test');
    await page
      .getByPlaceholder('Image URL')
      .fill('https://images.unsplash.com/photo-1682686581580-d99b0230064e?w=500&auto=format&fit=crop&q=60');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText('Updating category')).toBeVisible();
    await expect(page.getByText('Success update category')).toBeVisible();
    // cek new edited category
    await page.reload();
    await expect(page.getByRole('cell', { name: 'New Category Test', exact: true })).not.toBeVisible();
    await expect(page.getByRole('cell', { name: 'Edit Category Test', exact: true })).toBeVisible();
    // Logout
    await logout(page);
  });
});

test.describe('Testing Delete Data in Category Page', () => {
  test('should can delete category after login', async ({ page }) => {
    // Login
    await login(page);
    // go to category page
    await goToPage(page);
    // delete category
    await page.getByRole('button', { name: 'Delete Edit Category Test' }).click();
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText(/Deleting/)).toBeVisible();
    await expect(page.getByText('Success delete category')).toBeVisible();
    // cek deleted category
    await page.reload();
    await expect(page.getByRole('cell', { name: 'Edit Category Test', exact: true })).not.toBeVisible();
    // Logout
    await logout(page);
  });
});
