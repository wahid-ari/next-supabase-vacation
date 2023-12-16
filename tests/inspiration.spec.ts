import { goToLastPage, login, logout } from '@/tests/util';
import { expect, test, type Page } from '@playwright/test';

async function goToPage(page: Page) {
  await page.goto('http://localhost:3000/inspiration');
}

test.describe('Testing Inspiration Page', () => {
  test('should have title, url, search form and add button', async ({ page }) => {
    await goToPage(page);
    await expect(page).toHaveURL(/inspiration/);
    await expect(page).toHaveTitle(/Inspiration/);
    await expect(page.getByRole('heading', { name: 'Inspiration' })).toBeVisible();
    await expect(page.getByPlaceholder('Search')).toBeVisible();
    await expect(page.getByRole('link', { name: 'New Inspiration' })).toBeVisible();
  });
  test('should render table and data', async ({ page }) => {
    await goToPage(page);
    await expect(page.getByRole('columnheader', { name: 'No' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Title' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'URL' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Action' })).toBeVisible();
  });
  test('should show filter result', async ({ page }) => {
    await goToPage(page);
    await page.getByPlaceholder('Search').fill('kelimutu');
    await expect(page.getByRole('cell', { name: 'Kelimutu' }).first()).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Prambanan Temple', exact: true })).not.toBeVisible();
  });
  test('should only can create new inspiration after login', async ({ page }) => {
    await goToPage(page);
    await page.getByRole('link', { name: 'New Inspiration' }).click();
    await page.getByPlaceholder('Inspiration Title').fill('Inspiration');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText('Please provide bearer token in headers')).toBeVisible();
  });
  test('should fill required field when creating new inspiration', async ({ page }) => {
    // Login
    await login(page);
    // go to inspiration page
    await goToPage(page);
    // add new inspiration
    await page.getByRole('link', { name: 'New Inspiration' }).click();
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText(/Creating/)).toBeVisible();
    await expect(page.getByText('Title is required')).toBeVisible();
    await expect(page.getByText('Invalid Image URL')).toBeVisible();
    await expect(page.getByText('Content must be 50 or more characters long')).toBeVisible();
    // Logout
    await logout(page);
  });
  test('should can create new inspiration after login', async ({ page }) => {
    // Login
    await login(page);
    // go to inspiration page
    await goToPage(page);
    // add new inspiration
    await page.getByRole('link', { name: 'New Inspiration' }).click();
    await page.getByPlaceholder('Inspiration Title').fill('New Inspiration Test');
    await page
      .getByPlaceholder('Image URL', { exact: true })
      .fill('https://images.unsplash.com/photo-1682686581580-d99b0230064e?w=500&auto=format&fit=crop&q=60');
    await page
      .locator('#content')
      .getByRole('paragraph')
      .fill(
        'New Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
      );
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText(/Creating/)).toBeVisible();
    await expect(page.getByText('Success add inspiration')).toBeVisible();
    // cek new created inspiration
    await page.reload();
    await goToLastPage(page);
    await expect(page.getByRole('cell', { name: 'New Inspiration Test', exact: true })).toBeVisible();
    // Logout
    await logout(page);
  });
  test('should can edit new created inspiration after login', async ({ page }) => {
    // Login
    await login(page);
    // go to inspiration page
    await goToPage(page);
    // edit inspiration
    await goToLastPage(page);
    await page.getByRole('link', { name: 'Edit New Inspiration Test' }).click();
    await page.getByPlaceholder('Inspiration Title').fill('Edit Inspiration Test');
    await page
      .getByPlaceholder('Image URL', { exact: true })
      .fill('https://images.unsplash.com/photo-1682686581580-d99b0230064e?w=500&auto=format&fit=crop&q=60');
    await page
      .locator('#content')
      .getByRole('paragraph')
      .fill(
        'Edit Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s',
      );
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText('Updating inspiration')).toBeVisible();
    await expect(page.getByText('Success update inspiration')).toBeVisible();
    // cek new edited inspiration
    await page.reload();
    await goToLastPage(page);
    await expect(page.getByRole('cell', { name: 'New Inspiration Test', exact: true })).not.toBeVisible();
    await expect(page.getByRole('cell', { name: 'Edit Inspiration Test', exact: true })).toBeVisible();
    // Logout
    await logout(page);
  });
  test('should can delete inspiration after login', async ({ page }) => {
    // Login
    await login(page);
    // go to inspiration page
    await goToPage(page);
    // delete inspiration
    await goToLastPage(page);
    await page.getByRole('button', { name: 'Delete Edit Inspiration Test' }).click();
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText(/Deleting/)).toBeVisible();
    await expect(page.getByText('Success delete inspiration')).toBeVisible();
    // cek deleted inspiration
    await page.reload();
    await goToLastPage(page);
    await expect(page.getByRole('cell', { name: 'Edit Inspiration Test', exact: true })).not.toBeVisible();
    // Logout
    await logout(page);
  });
});
