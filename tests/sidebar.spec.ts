import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');
});

test.describe('Testing Sidebar Link', () => {
  test('should in Dashboard page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Dashboard' })).toHaveAttribute('href', '/dashboard');
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    await expect(page).toHaveTitle(/Dashboard/);
  });
  test('should open Search page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Search' })).toHaveAttribute('href', '/search');
    await page.getByRole('link', { name: 'Search' }).click();
    await expect(page).toHaveURL(/search/);
    await expect(page).toHaveTitle(/Search/);
  });
  test('should open Author page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Author', exact: true })).toHaveAttribute('href', '/author');
    await page.getByRole('link', { name: 'Author', exact: true }).click();
    await expect(page).toHaveURL(/author/);
    await expect(page).toHaveTitle(/Author/);
  });
  test('should open Book page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Book', exact: true })).toHaveAttribute('href', '/book');
    await page.getByRole('link', { name: 'Book', exact: true }).click();
    await expect(page).toHaveURL(/book/);
    await expect(page).toHaveTitle(/Book/);
  });
  test('should open Genre page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Genre', exact: true })).toHaveAttribute('href', '/genre');
    await page.getByRole('link', { name: 'Genre', exact: true }).click();
    await expect(page).toHaveURL(/genre/);
    await expect(page).toHaveTitle(/Genre/);
  });
  test('should open Setting page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Setting' })).toHaveAttribute('href', '/setting');
    await page.getByRole('link', { name: 'Setting' }).click();
    await expect(page).toHaveURL(/setting/);
    await expect(page).toHaveTitle(/Setting/);
  });
});
