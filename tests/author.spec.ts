import { expect, test, type Page } from '@playwright/test';

async function goToPage(page: Page) {
  await page.goto('http://localhost:3000/author');
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

async function goToLastPage(page: Page) {
  await page.reload();
  await page.getByRole('button', { name: 'Last' }).click();
}

test.describe('Testing Author Page', () => {
  test('should have title, url, search form and add button', async ({ page }) => {
    await goToPage(page);
    await expect(page).toHaveURL(/author/);
    await expect(page).toHaveTitle(/Author/);
    await expect(page.getByRole('heading', { name: 'Author' })).toBeVisible();
    await expect(page.getByPlaceholder('Search')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Add New Author' })).toBeVisible();
  });
  test('should render table and data', async ({ page }) => {
    await goToPage(page);
    await expect(page.getByRole('columnheader', { name: 'No' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Born' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Web' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Action' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Suzanne Collins' })).toBeVisible();
    await expect(
      page
        .getByRole('row', { name: '1 Suzanne Collins The United States Open Edit Delete' })
        .getByRole('cell', { name: 'Suzanne Collins' })
    ).toBeVisible();
  });
  test('should show filter result', async ({ page }) => {
    await goToPage(page);
    await page.getByPlaceholder('Search').fill('john');
    await expect(page.getByRole('cell', { name: 'John Green' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'John Boyne' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Jane Austen' })).not.toBeVisible();
    await expect(page.getByRole('cell', { name: 'Suzanne Collins' })).not.toBeVisible();
  });
  test('should only can create new author after login', async ({ page }) => {
    await goToPage(page);
    await page.getByRole('link', { name: 'Add New Author' }).click();
    await page.getByPlaceholder('Author Name').fill('New Author');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Please provide bearer token in headers')).toBeVisible();
  });
  // test('should fill required field when creating new author', async ({ page }) => {
  //   await login(page);
  //   // go to author page
  //   await page.getByRole('link', { name: 'Author', exact: true }).click();
  //   // go to add author page
  //   await page.getByRole('link', { name: 'Add New Author' }).click();
  //   // save without fill any field
  //   await page.getByRole('button', { name: 'Save' }).click();
  //   await expect(page.getByText(/Creating/)).toBeVisible();
  //   await expect(page.getByText('Name required')).toBeVisible();
  // });
  // test('should can create new author after login', async ({ page }) => {
  //   await login(page);
  //   // go to author page
  //   await page.getByRole('link', { name: 'Author', exact: true }).click();
  //   // go to add author page
  //   await page.getByRole('link', { name: 'Add New Author' }).click();
  //   // create author
  //   await page.getByPlaceholder('Author Name').fill('New Author');
  //   await page.getByRole('button', { name: 'Save' }).click();
  //   await expect(page.getByText(/Creating/)).toBeVisible();
  //   await expect(page.getByText('Success add author')).toBeVisible();
  //   // cek new created author
  //   await goToLastPage(page);
  //   await expect(page.getByRole('cell', { name: 'New Author' })).toBeVisible();
  // });
  // test('should can edit new created author after login', async ({ page }) => {
  //   await login(page);
  //   // go to author page
  //   await page.getByRole('link', { name: 'Author', exact: true }).click();
  //   // go to table last page
  //   await page.getByRole('button', { name: 'Last' }).click();
  //   await expect(page.getByRole('cell', { name: 'New Author' })).toBeVisible();
  //   // edit new created author
  //   await page.getByRole('row', { name: '289 New Author - - Edit Delete' }).getByRole('link', { name: 'Edit' }).click();
  //   await page.getByPlaceholder('Author Name').fill('New Author Edit');
  //   await page.getByRole('button', { name: 'Update' }).click();
  //   await expect(page.getByText(/Updating/)).toBeVisible();
  //   await expect(page.getByText('Success update author')).toBeVisible();
  //   // cek new edited author
  //   await goToLastPage(page);
  //   await expect(page.getByRole('cell', { name: 'New Author Edit' })).toBeVisible();
  // });
  // test('should can delete author after login', async ({ page }) => {
  //   await login(page);
  //   // go to author page
  //   await page.getByRole('link', { name: 'Author', exact: true }).click();
  //   // go to table last page
  //   await page.getByRole('button', { name: 'Last' }).click();
  //   // delete author
  //   await page
  //     .getByRole('row', { name: '289 New Author Edit - - Edit Delete' })
  //     .getByRole('button', { name: 'Delete' })
  //     .click();
  //   await expect(page.getByRole('heading', { name: 'Delete Author' })).toBeVisible();
  //   await page.getByRole('button', { name: 'Delete' }).click();
  //   await expect(page.getByText(/Deleting/)).toBeVisible();
  //   await expect(page.getByText('Success delete author')).toBeVisible();
  //   // cek deleted author
  //   await goToLastPage(page);
  //   await expect(page.getByRole('cell', { name: 'New Author Edit' })).not.toBeVisible();

  //   await logout(page);
  // });
});
