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
  test('page show total destination', async ({ page }) => {
    const destination = page.getByTestId('destination-count');
    await expect(destination).toBeVisible();
    await expect(destination).toContainText('Destination');
    await expect(destination).toHaveClass(/group flex items-center justify-between gap-2 rounded-md border p-4 shadow/);
    await expect(destination).toHaveAttribute('href', '/destination');
  });
  test('page show total category', async ({ page }) => {
    const category = page.getByTestId('category-count');
    await expect(category).toBeVisible();
    await expect(category).toContainText('Category');
    await expect(category).toHaveClass(/group flex items-center justify-between gap-2 rounded-md border p-4 shadow/);
    await expect(category).toHaveAttribute('href', '/category');
  });
  test('page show total island', async ({ page }) => {
    const island = page.getByTestId('island-count');
    await expect(island).toBeVisible();
    await expect(island).toContainText('Island');
    await expect(island).toHaveClass(/group flex items-center justify-between gap-2 rounded-md border p-4 shadow/);
    await expect(island).toHaveAttribute('href', '/island');
  });
  test('page show total province', async ({ page }) => {
    const province = page.getByTestId('province-count');
    await expect(province).toBeVisible();
    await expect(province).toContainText('Province');
    await expect(province).toHaveClass(/group flex items-center justify-between gap-2 rounded-md border p-4 shadow/);
    await expect(province).toHaveAttribute('href', '/province');
  });
  test('page show total video', async ({ page }) => {
    const video = page.getByTestId('video-count');
    await expect(video).toBeVisible();
    await expect(video).toContainText('Video');
    await expect(video).toHaveClass(/group flex items-center justify-between gap-2 rounded-md border p-4 shadow/);
    await expect(video).toHaveAttribute('href', '/video');
  });
});

test.describe('Testing Statistic', () => {
  test('page show statistic Total Destination by Province', async ({ page }) => {
    const bookByGenre = page.getByText('Total Destination by Province');
    await expect(bookByGenre).toBeVisible();
    await expect(bookByGenre).toContainText('Total Destination by Province');
    await expect(bookByGenre).toHaveClass(/text-sm font-medium text-neutral-700 dark:text-neutral-200/);
  });
  test('page show statistic Total Destination by Island', async ({ page }) => {
    const bookByAuthor = page.getByText('Total Destination by Island');
    await expect(bookByAuthor).toBeVisible();
    await expect(bookByAuthor).toContainText('Total Destination by Island');
    await expect(bookByAuthor).toHaveClass(/text-sm font-medium text-neutral-700 dark:text-neutral-200/);
  });
});

test.describe('Testing Link in Dashboard', () => {
  test('should open Destination page', async ({ page }) => {
    await page.getByTestId('destination-count').click();
    await expect(page).toHaveURL(/destination/);
    await expect(page).toHaveTitle(/Destination/);
  });
  test('should open Category page', async ({ page }) => {
    await page.getByTestId('category-count').click();
    await expect(page).toHaveURL(/category/);
    await expect(page).toHaveTitle(/Category/);
  });
  test('should open Island page', async ({ page }) => {
    await page.getByTestId('island-count').click();
    await expect(page).toHaveURL(/island/);
    await expect(page).toHaveTitle(/Island/);
  });
  test('should open Province page', async ({ page }) => {
    await page.getByTestId('province-count').click();
    await expect(page).toHaveURL(/province/);
    await expect(page).toHaveTitle(/Province/);
  });
  test('should open Video page', async ({ page }) => {
    await page.getByTestId('video-count').click();
    await expect(page).toHaveURL(/video/);
    await expect(page).toHaveTitle(/Video/);
  });
});
