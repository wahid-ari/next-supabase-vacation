import { expect, test, type Page } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/book');
});

async function logout(page: Page) {
  await page.goto('http://localhost:3000/session');
  await page.getByRole('button', { name: 'Delete All' }).click();
  await expect(page.getByRole('heading', { name: 'Delete All Session' })).toBeVisible();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('Deleting All Session')).toBeVisible();
  await expect(page.getByText('Success delete all session')).toBeVisible();
  await page.goto('http://localhost:3000/logout');
  await expect(page).toHaveTitle(/Dashboard/);
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

test.describe('Testing Book Page', () => {
  test('should have title, url, search form and add button', async ({ page }) => {
    await expect(page).toHaveURL(/book/);
    await expect(page).toHaveTitle(/Book/);
    await expect(page.getByRole('heading', { name: 'Book' })).toBeVisible();
    await expect(page.getByPlaceholder('Search')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Add New Book' })).toBeVisible();
  });
  test('should render table and data', async ({ page }) => {
    await expect(page.getByRole('columnheader', { name: 'No' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Title' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Author' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Year' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Action' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Pride and Prejudice' })).toBeVisible();
    await expect(
      page
        .getByRole('row', { name: '3 Pride and Prejudice Jane Austen 1813 Edit Delete' })
        .getByRole('cell', { name: 'Jane Austen' })
    ).toBeVisible();
  });
  test('should show filter result', async ({ page }) => {
    await page.getByPlaceholder('Search').fill('pride');
    await expect(page.getByRole('cell', { name: 'Pride and Prejudice' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'Jane Austen' })).toBeVisible();
    await expect(page.getByRole('cell', { name: 'The Lovely Bones' })).not.toBeVisible();
    await expect(page.getByRole('cell', { name: 'Alice Sebold' })).not.toBeVisible();
  });
  test('should only can create new book after login', async ({ page }) => {
    await page.getByRole('link', { name: 'Add New Book' }).click();
    await expect(page.getByPlaceholder('Search and Select Author')).toBeVisible();
    await expect(page.locator('label').filter({ hasText: 'Genre' })).toBeVisible();
    await page.getByPlaceholder('Book Title').fill('New Book');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Please provide bearer token in headers')).toBeVisible();
  });
  // test('should fill required field when creating new book', async ({ page }) => {
  //   await login(page);
  //   // go to book page
  //   await page.getByRole('link', { name: 'Book', exact: true }).click();
  //   // go to add book page
  //   await page.getByRole('link', { name: 'Add New Book' }).click();
  //   // save without fill any field
  //   await page.getByRole('button', { name: 'Save' }).click();
  //   await expect(page.getByText(/Creating/)).toBeVisible();
  //   await expect(page.getByText('Title required')).toBeVisible();
  // });
  // test('should can create new book after login', async ({ page }) => {
  //   await login(page);
  //   // go to book page
  //   await page.getByRole('link', { name: 'Book', exact: true }).click();
  //   // go to add book page
  //   await page.getByRole('link', { name: 'Add New Book' }).click();
  //   // create book
  //   await page.getByPlaceholder('Book Title').fill('New Book');
  //   await page.getByRole('button', { name: 'Author Show options' }).click();
  //   await page.getByRole('option', { name: 'Suzanne Collins' }).click();
  //   await page.getByRole('button', { name: 'Save' }).click();
  //   await expect(page.getByText(/Creating/)).toBeVisible();
  //   await expect(page.getByText('Success add book')).toBeVisible();
  //   // cek new created book
  //   await goToLastPage(page);
  //   await expect(page.getByRole('cell', { name: 'New Book' })).toBeVisible();
  // });
  // test('should can edit new created book after login', async ({ page }) => {
  //   await login(page);
  //   // go to book page
  //   await page.getByRole('link', { name: 'Book', exact: true }).click();
  //   // go to table last page
  //   await page.getByRole('button', { name: 'Last' }).click();
  //   await expect(page.getByRole('cell', { name: 'New Book' })).toBeVisible();
  //   // edit new created book
  //   await page
  //     .getByRole('row', { name: '301 New Book Suzanne Collins - Edit Delete' })
  //     .getByRole('link', { name: 'Edit' })
  //     .click();
  //   await page.getByPlaceholder('Book Title').fill('New Book Edit');
  //   await page.getByRole('button', { name: 'Author Show options' }).click();
  //   await page.getByRole('option', { name: 'Jane Austen' }).click();
  //   await page.getByRole('button', { name: 'Update' }).click();
  //   await expect(page.getByText(/Updating/)).toBeVisible();
  //   await expect(page.getByText('Success update book')).toBeVisible();
  //   // cek new edited book
  //   await goToLastPage(page);
  //   await expect(page.getByRole('cell', { name: 'New Book Edit' })).toBeVisible();
  // });
  // test('should can delete book after login', async ({ page }) => {
  //   await login(page);
  //   // go to book page
  //   await page.getByRole('link', { name: 'Book', exact: true }).click();
  //   // go to table last page
  //   await page.getByRole('button', { name: 'Last' }).click();
  //   // delete book
  //   await page
  //     .getByRole('row', { name: '301 New Book Edit Jane Austen - Edit Delete' })
  //     .getByRole('button', { name: 'Delete' })
  //     .click();
  //   await expect(page.getByRole('heading', { name: 'Delete Book' })).toBeVisible();
  //   await page.getByRole('button', { name: 'Delete' }).click();
  //   await expect(page.getByText(/Deleting/)).toBeVisible();
  //   await expect(page.getByText('Success delete book')).toBeVisible();
  //   // cek deleted book
  //   await goToLastPage(page);
  //   await expect(page.getByRole('cell', { name: 'New Book Edit' })).not.toBeVisible();

  //   await logout(page);
  // });
});
