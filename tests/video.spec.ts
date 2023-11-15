import { goToLastPage, login, logout } from '@/tests/util';
import { expect, test, type Page } from '@playwright/test';

async function goToPage(page: Page) {
  await page.goto('http://localhost:3000/video');
}

test.describe('Testing Video Page', () => {
  test('should have title, url, search form and add button', async ({ page }) => {
    await goToPage(page);
    await expect(page).toHaveURL(/video/);
    await expect(page).toHaveTitle(/Video/);
    await expect(page.getByRole('heading', { name: 'Video' })).toBeVisible();
    await expect(page.getByPlaceholder('Search')).toBeVisible();
    await expect(page.getByRole('button', { name: 'New Video' })).toBeVisible();
  });
  test('should render table and data', async ({ page }) => {
    await goToPage(page);
    await expect(page.getByRole('columnheader', { name: 'No' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Title' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Province' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Island' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Action' })).toBeVisible();
  });
  test('should show filter result', async ({ page }) => {
    await goToPage(page);
    await page.getByPlaceholder('Search').fill('The Heartbeat of Toba');
    await expect(page.getByRole('cell', { name: 'The Heartbeat of Toba' }).first()).toBeVisible();
    await expect(
      page.getByRole('cell', { name: 'Mandalika - Where the Waves Collide', exact: true }),
    ).not.toBeVisible();
  });
  test('should only can create new video after login', async ({ page }) => {
    await goToPage(page);
    await page.getByRole('button', { name: 'New Video' }).click();
    await page.getByPlaceholder('Video Name').fill('Video');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText('Please provide bearer token in headers')).toBeVisible();
  });
});

test.describe('Testing Create Data with Empty field in Video Page', () => {
  test('should fill required field when creating new video', async ({ page }) => {
    // Login
    await login(page);
    // go to video page
    await goToPage(page);
    // add new video
    await page.getByRole('button', { name: 'New Video' }).click();
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText(/Creating/)).toBeVisible();
    await expect(page.getByText('Title is required')).toBeVisible();
    await expect(page.getByText('Invalid Video URL')).toBeVisible();
    // close modal
    await page.getByRole('button', { name: 'Cancel' }).click();
    // Logout
    await logout(page);
  });
});

test.describe('Testing Create Data in Video Page', () => {
  test('should can create new video after login', async ({ page }) => {
    // Login
    await login(page);
    // go to video page
    await goToPage(page);
    // add new video
    await page.getByRole('button', { name: 'New Video' }).click();
    await page.getByPlaceholder('Video Name').fill('New Video Test');
    await page.getByPlaceholder('Video URL').fill('https://www.youtube.com/watch?v=GfO-3Oir-qM');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText(/Creating/)).toBeVisible();
    await expect(page.getByText('Success add video')).toBeVisible();
    // cek new created video
    await page.reload();
    await goToLastPage(page);
    await expect(page.getByRole('cell', { name: 'New Video Test', exact: true })).toBeVisible();
    // Logout
    await logout(page);
  });
});

test.describe('Testing Edit Data in Video Page', () => {
  test('should can edit new created video after login', async ({ page }) => {
    // Login
    await login(page);
    // go to video page
    await goToPage(page);
    // edit video
    await goToLastPage(page);
    await page.getByRole('button', { name: 'Edit New Video Test' }).click();
    await page.getByPlaceholder('Video Name').fill('Edit Video Test');
    await page.getByPlaceholder('Video URL').fill('https://www.youtube.com/watch?v=GfO-3Oir-qM');
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText('Updating video')).toBeVisible();
    await expect(page.getByText('Success update video')).toBeVisible();
    // cek new edited video
    await page.reload();
    await goToLastPage(page);
    await expect(page.getByRole('cell', { name: 'New Video Test', exact: true })).not.toBeVisible();
    await expect(page.getByRole('cell', { name: 'Edit Video Test', exact: true })).toBeVisible();
    // Logout
    await logout(page);
  });
});

test.describe('Testing Delete Data in Video Page', () => {
  test('should can delete video after login', async ({ page }) => {
    // Login
    await login(page);
    // go to video page
    await goToPage(page);
    // delete video
    await goToLastPage(page);
    await page.getByRole('button', { name: 'Delete Edit Video Test' }).click();
    await page.getByRole('button', { name: 'Save changes' }).click();
    await expect(page.getByText(/Deleting/)).toBeVisible();
    await expect(page.getByText('Success delete video')).toBeVisible();
    // cek deleted video
    await page.reload();
    await goToLastPage(page);
    await expect(page.getByRole('cell', { name: 'Edit Video Test', exact: true })).not.toBeVisible();
    // Logout
    await logout(page);
  });
});
