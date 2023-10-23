import { expect, test, type Page } from '@playwright/test';

async function goToPage(page: Page) {
  await page.goto('http://localhost:3000/genre');
}

async function logout(page: Page) {
  await page.goto('http://localhost:3000/session');
  await page.getByRole('button', { name: 'Delete All' }).click();
  await expect(page.getByRole('heading', { name: 'Delete All Session' })).toBeVisible();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('Deleting All Session')).toBeVisible();
  await expect(page.getByText('Success delete all session')).toBeVisible();
  await page.goto('http://localhost:3000/logout');
  // await expect(page).toHaveTitle(/Dashboard/);
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
}

async function login(page: Page) {
  await page.goto('http://localhost:3000/login');
  await page.getByPlaceholder('Username').fill('develop');
  await page.getByPlaceholder('Password').fill('');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Success Login')).toBeVisible();
}

test.describe('Testing Genre Page', () => {
  test('should have title, url, search form and add button', async ({ page }) => {
    await goToPage(page);
    await expect(page).toHaveURL(/genre/);
    await expect(page).toHaveTitle(/Genre/);
    await expect(page.getByRole('heading', { name: 'Genre' })).toBeVisible();
    await expect(page.getByPlaceholder('Search')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Add New Genre' })).toBeVisible();
  });
  test('should render table and data', async ({ page }) => {
    await goToPage(page);
    await expect(page.getByRole('cell', { name: 'No', exact: true })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Action' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Art' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Biography' })).toBeVisible();
  });
  test('should show filter result', async ({ page }) => {
    await goToPage(page);
    await page.getByPlaceholder('Search').fill('art');
    await expect(page.getByRole('cell', { name: 'Art' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Biography' })).not.toBeVisible();
  });
  test('should only can create new genre after login', async ({ page }) => {
    await goToPage(page);
    await page.getByRole('button', { name: 'Add New Genre' }).click();
    await page.getByPlaceholder('Genre Name').fill('Genre');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Please provide bearer token in headers')).toBeVisible();
  });
  // test('should fill required field when creating new genre', async ({ page }) => {
  //   // Login
  //   await login(page);
  //   // go to genre page
  //   await page.getByRole('link', { name: 'Genre', exact: true }).click();
  //   // add new genre
  //   await page.getByRole('button', { name: 'Add New Genre' }).click();
  //   await page.getByRole('button', { name: 'Save' }).click();
  //   await expect(page.getByText(/Creating/)).toBeVisible();
  //   await expect(page.getByText('Name required')).toBeVisible();
  // });
  // test('should can create new genre after login', async ({ page }) => {
  //   // Login
  //   await login(page);
  //   // go to genre page
  //   await page.getByRole('link', { name: 'Genre', exact: true }).click();
  //   // add new genre
  //   await page.getByRole('button', { name: 'Add New Genre' }).click();
  //   await page.getByPlaceholder('Genre Name').fill('New Genre Test');
  //   await page.getByRole('button', { name: 'Save' }).click();
  //   await expect(page.getByText(/Creating/)).toBeVisible();
  //   await expect(page.getByText('Success add genre')).toBeVisible();
  //   // cek new created genre
  //   await page.reload();
  //   await expect(page.getByRole('cell', { name: 'New Genre Test' })).toBeVisible();
  // });
  // test('should can edit new created genre after login', async ({ page }) => {
  //   // Login
  //   await login(page);
  //   // go to genre page
  //   await page.getByRole('link', { name: 'Genre', exact: true }).click();
  //   // edit genre
  //   await page
  //     .getByRole('row', { name: '31 New Genre Test Edit Delete' })
  //     .getByRole('button', { name: 'Edit' })
  //     .click();
  //   await page.getByLabel('Name').fill('Edit Genre Test');
  //   await page.getByRole('button', { name: 'Update' }).click();
  //   await expect(page.getByText('Updating genre')).toBeVisible();
  //   await expect(page.getByText('Success update genre')).toBeVisible();
  //   // cek new edited genre
  //   await page.reload();
  //   await expect(page.getByRole('cell', { name: 'New Genre Test' })).not.toBeVisible();
  //   await expect(page.getByRole('cell', { name: 'Edit Genre Test' })).toBeVisible();
  // });
  // test('should can delete genre after login', async ({ page }) => {
  //   // Login
  //   await login(page);
  //   // go to genre page
  //   await page.getByRole('link', { name: 'Genre', exact: true }).click();
  //   // delete genre
  //   await page
  //     .getByRole('row', { name: '31 Edit Genre Test Edit Delete' })
  //     .getByRole('button', { name: 'Delete' })
  //     .click();
  //   await page.getByRole('button', { name: 'Delete' }).click();
  //   await expect(page.getByText(/Deleting/)).toBeVisible();
  //   await expect(page.getByText('Success delete genre')).toBeVisible();
  //   // cek deleted genre
  //   await page.reload();
  //   await expect(page.getByRole('cell', { name: 'Edit Genre Test' })).not.toBeVisible();

  //   await logout(page);
  // });
});
