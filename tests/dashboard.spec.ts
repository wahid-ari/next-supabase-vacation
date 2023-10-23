import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');
});

test.describe('Testing Dashboard Page', () => {
  test('page has title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });
});

test.describe('Testing Data Count', () => {
  test('page show total author', async ({ page }) => {
    const author = page.getByTestId('author-count');
    await expect(author).toBeVisible();
    await expect(author).toContainText('Author');
    await expect(author).toHaveClass(/group flex items-center justify-between gap-2 rounded-md border p-4 shadow/);
    await expect(author).toHaveAttribute('href', '/author');
  });
  test('page show total book', async ({ page }) => {
    const book = page.getByTestId('book-count');
    await expect(book).toBeVisible();
    await expect(book).toContainText('Book');
    await expect(book).toHaveClass(/group flex items-center justify-between gap-2 rounded-md border p-4 shadow/);
    await expect(book).toHaveAttribute('href', '/book');
  });
  test('page show total genre', async ({ page }) => {
    const genre = page.getByTestId('genre-count');
    await expect(genre).toBeVisible();
    await expect(genre).toContainText('Genre');
    await expect(genre).toHaveClass(/group flex items-center justify-between gap-2 rounded-md border p-4 shadow/);
    await expect(genre).toHaveAttribute('href', '/genre');
  });
});

test.describe('Testing Statistic', () => {
  test('page show statistic Total Book by Genre', async ({ page }) => {
    const bookByGenre = page.getByText('Total Book by Genre');
    await expect(bookByGenre).toBeVisible();
    await expect(bookByGenre).toContainText('Total Book by Genre');
    await expect(bookByGenre).toHaveClass(/text-sm font-medium text-neutral-700 dark:text-neutral-200/);
  });
  test('page show statistic Total Book by Author', async ({ page }) => {
    const bookByAuthor = page.getByText('Total Book by Author');
    await expect(bookByAuthor).toBeVisible();
    await expect(bookByAuthor).toContainText('Total Book by Author');
    await expect(bookByAuthor).toHaveClass(/text-sm font-medium text-neutral-700 dark:text-neutral-200/);
  });
});

test.describe('Testing Link in Dashboard', () => {
  test('should open Author page', async ({ page }) => {
    await page.getByTestId('author-count').click();
    await expect(page).toHaveURL(/author/);
    await expect(page).toHaveTitle(/Author/);
  });
  test('should open Book page', async ({ page }) => {
    await page.getByTestId('book-count').click();
    await expect(page).toHaveURL(/book/);
    await expect(page).toHaveTitle(/Book/);
  });
  test('should open Genre page', async ({ page }) => {
    await page.getByTestId('genre-count').click();
    await expect(page).toHaveURL(/genre/);
    await expect(page).toHaveTitle(/Genre/);
  });
});
