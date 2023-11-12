import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard');
});

test.describe('Testing Sidebar Link', () => {
  test('should in Dashboard page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Dashboard', exact: true })).toHaveAttribute('href', '/dashboard');
    await expect(page).toHaveURL('http://localhost:3000/dashboard');
    await expect(page).toHaveTitle(/Dashboard/);
  });
  test('should open Search page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Search', exact: true })).toHaveAttribute('href', '/search');
    await page.getByRole('link', { name: 'Search', exact: true }).click();
    await expect(page).toHaveURL(/search/);
    await expect(page).toHaveTitle(/Search/);
  });
  test('should open Destination page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Destination', exact: true })).toHaveAttribute('href', '/destination');
    await page.getByRole('link', { name: 'Destination', exact: true }).click();
    await expect(page).toHaveURL(/destination/);
    await expect(page).toHaveTitle(/Destination/);
  });
  test('should open Category page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Category', exact: true })).toHaveAttribute('href', '/category');
    await page.getByRole('link', { name: 'Category', exact: true }).click();
    await expect(page).toHaveURL(/category/);
    await expect(page).toHaveTitle(/Category/);
  });
  test('should open Island page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Island', exact: true })).toHaveAttribute('href', '/island');
    await page.getByRole('link', { name: 'Island', exact: true }).click();
    await expect(page).toHaveURL(/island/);
    await expect(page).toHaveTitle(/Island/);
  });
  test('should open Province page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Province', exact: true })).toHaveAttribute('href', '/province');
    await page.getByRole('link', { name: 'Province', exact: true }).click();
    await expect(page).toHaveURL(/province/);
    await expect(page).toHaveTitle(/Province/);
  });
  test('should open Video page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Video', exact: true })).toHaveAttribute('href', '/video');
    await page.getByRole('link', { name: 'Video', exact: true }).click();
    await expect(page).toHaveURL(/video/);
    await expect(page).toHaveTitle(/Video/);
  });
  test('should open Setting page', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Setting', exact: true })).toHaveAttribute('href', '/setting');
    await page.getByRole('link', { name: 'Setting', exact: true }).click();
    await expect(page).toHaveURL(/setting/);
    await expect(page).toHaveTitle(/Setting/);
  });
});

test.describe('Testing Sidebar Activity Accordion', () => {
  test('should open Log page', async ({ page }) => {
    await page.getByRole('button', { name: 'Activity', exact: true }).click();
    await expect(page.getByRole('link', { name: 'Log', exact: true })).toHaveAttribute('href', '/activity');
    await page.getByRole('link', { name: 'Log', exact: true }).click();
    await expect(page).toHaveURL(/activity/);
    await expect(page).toHaveTitle(/Log/);
  });
  test('should open Session page', async ({ page }) => {
    await page.getByRole('button', { name: 'Activity', exact: true }).click();
    await expect(page.getByRole('link', { name: 'Session', exact: true })).toHaveAttribute('href', '/activity/session');
    await page.getByRole('link', { name: 'Session', exact: true }).click();
    await expect(page).toHaveURL(/session/);
    await expect(page).toHaveTitle(/Session/);
  });
});
