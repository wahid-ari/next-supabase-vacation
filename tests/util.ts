import { expect, type Page } from '@playwright/test';

export async function login(page: Page) {
  await page.goto('http://localhost:3000/login');
  await page.getByPlaceholder('Username').fill('develop');
  await page.getByPlaceholder('Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Success Login')).toBeVisible();
  await expect(page).toHaveURL(/dashboard/);
}

export async function logout(page: Page) {
  // Logout using button in sidebar
  await page.getByTestId('button-logout').click();
  await page.getByTestId('confirm-logout').click();
  await expect(page).toHaveURL('http://localhost:3000');
  await expect(page).toHaveTitle(/Home/);
  // Logout using menu in navbar
  // await page.getByRole('button', { name: 'Develop' }).click();
  // await page.getByRole('menuitem', { name: 'Logout' }).click();
  // await page.getByRole('button', { name: 'Logout' }).click();
  // await expect(page).toHaveURL('http://localhost:3000');
  // await expect(page).toHaveTitle(/Home/);
}

export async function goToLastPage(page: Page) {
  await page.reload();
  const button = page.getByRole('button', { name: 'Last' });
  const isButtonEnabled = await button.isEnabled();
  if (isButtonEnabled) {
    await page.getByRole('button', { name: 'Last' }).click();
  }
}
