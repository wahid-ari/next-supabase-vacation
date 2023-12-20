import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/design/custom');
});

test.describe('Testing Design Custom Page', () => {
  test('page has title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Custom/);
  });
  test('page has Heading', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page.getByRole('heading', { name: 'Custom' })).toBeVisible();
  });
  test('page has Table of Contents', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Table of Content' })).toBeVisible();
    await expect(page.locator('#tableofcontent').getByRole('link', { name: 'Pagination' })).toBeVisible();
    await expect(
      page.locator('#tableofcontent').getByRole('link', { name: 'DialogSwiper', exact: true }),
    ).toBeVisible();
  });
});

test.describe('Testing Pagination Component', () => {
  // Pagination ----------------------------------------------------
  test('renders a Pagination component', async ({ page }) => {
    const pagination = page.getByTestId('pagination');
    await expect(pagination).toBeVisible();
    await expect(pagination).toHaveClass(/inline-flex select-none flex-wrap items-center gap-1 text-sm/);
    await expect(page.getByText('Pagination : 1')).toBeVisible();
  });
  test('change page in Pagination component using page button', async ({ page }) => {
    const pagination = page.getByTestId('pagination');
    await expect(page.getByText('Pagination : 1')).toBeVisible();
    await pagination.getByText('2').click();
    await expect(page.getByText('Pagination : 2')).toBeVisible();
    await pagination.getByText('3').click();
    await expect(page.getByText('Pagination : 3')).toBeVisible();
    await pagination.getByText('4').click();
    await expect(page.getByText('Pagination : 4')).toBeVisible();
    await pagination.getByText('5').click();
    await expect(page.getByText('Pagination : 5')).toBeVisible();
    await pagination.getByText('6').click();
    await expect(page.getByText('Pagination : 6')).toBeVisible();
    await pagination.getByText('7').click();
    await expect(page.getByText('Pagination : 7')).toBeVisible();
    await pagination.getByText('8').click();
    await expect(page.getByText('Pagination : 8')).toBeVisible();
    await pagination.getByText('9').click();
    await expect(page.getByText('Pagination : 9')).toBeVisible();
    await pagination.getByText('10').click();
    await expect(page.getByText('Pagination : 10')).toBeVisible();
  });
  test('change page in Pagination component using prev next button', async ({ page }) => {
    const pagination = page.getByTestId('pagination');
    await expect(page.getByText('Pagination : 1')).toBeVisible();
    await pagination.getByLabel('Next').click();
    await expect(page.getByText('Pagination : 2')).toBeVisible();
    await pagination.getByLabel('Next').click();
    await expect(page.getByText('Pagination : 3')).toBeVisible();
    await pagination.getByLabel('Prev').click();
    await expect(page.getByText('Pagination : 2')).toBeVisible();
    await pagination.getByLabel('Prev').click();
    await expect(page.getByText('Pagination : 1')).toBeVisible();
  });
  test('change page in Pagination component using first last button', async ({ page }) => {
    const pagination = page.getByTestId('pagination');
    await expect(page.getByText('Pagination : 1')).toBeVisible();
    await pagination.getByLabel('Last').click();
    await expect(page.getByText('Pagination : 10')).toBeVisible();
    await pagination.getByLabel('First').click();
    await expect(page.getByText('Pagination : 1')).toBeVisible();
  });
  test('Pagination first and prev button should disabled when in first page', async ({ page }) => {
    const pagination = page.getByTestId('pagination');
    await pagination.getByText('1', { exact: true }).click();
    await expect(page.getByText('Pagination : 1')).toBeVisible();
    await expect(pagination.getByLabel('First')).toBeDisabled();
    await expect(pagination.getByLabel('Prev')).toBeDisabled();
  });
  test('Pagination last and next button should disabled when in first page', async ({ page }) => {
    const pagination = page.getByTestId('pagination');
    await pagination.getByText('10').click();
    await expect(page.getByText('Pagination : 10')).toBeVisible();
    await expect(pagination.getByLabel('Last')).toBeDisabled();
    await expect(pagination.getByLabel('Next')).toBeDisabled();
  });
});
