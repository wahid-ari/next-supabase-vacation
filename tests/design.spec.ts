import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000/design');
});

test.describe('Testing Design Components Page', () => {
  test('page has title', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Components/);
    await expect(page).toHaveURL(/design/);
  });
  test('page has Heading', async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page.getByRole('heading', { name: 'Components' })).toBeVisible();
  });
  test('page has Table of Contents', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Table of Content' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Dialog', exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Modal', exact: true })).toBeVisible();
  });
});

test.describe('Testing Button Component', () => {
  // BUTTON ----------------------------------------------------
  test('renders a Button component', async ({ page }) => {
    const button = page.getByTestId('button-primary');
    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/rounded bg-sky-500 px-3 py-1.5 text-sm font-medium/);
    await expect(button).toBeEnabled();
    await expect(button).toHaveText('Primary');
  });
  test('renders a Button Success component', async ({ page }) => {
    const button = page.getByTestId('button-success');
    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/rounded bg-emerald-600 px-3 py-1.5 text-sm font-medium/);
    await expect(button).toBeEnabled();
    await expect(button).toHaveText('Success');
  });
  test('renders a Button Danger component', async ({ page }) => {
    const button = page.getByTestId('button-danger');
    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/rounded bg-red-600 px-3 py-1.5 text-sm font-medium/);
    await expect(button).toBeEnabled();
    await expect(button).toHaveText('Danger');
  });
  test('renders a Button Secondary component', async ({ page }) => {
    const button = page.getByTestId('button-secondary');
    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/rounded bg-neutral-50 px-3 py-1.5 text-sm font-medium/);
    await expect(button).toBeEnabled();
    await expect(button).toHaveText('Secondary');
  });
  test('renders a Button Tertary component', async ({ page }) => {
    const button = page.getByTestId('button-tertary');
    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/rounded px-3 py-1.5 text-sm font-medium/);
    await expect(button).toBeEnabled();
    await expect(button).toHaveText('Tertary');
  });
  test('renders a Button Disabled component', async ({ page }) => {
    const button = page.getByTestId('button-disabled');
    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/cursor-not-allowed/);
    await expect(button).toBeDisabled();
    await expect(button).toHaveText('Disabled');
    await expect(button).toHaveAttribute('disabled', '');
  });
});

test.describe('Testing LinkButton Component', () => {
  // LINK BUTTON ----------------------------------------------------
  test('renders a Link Button component', async ({ page }) => {
    const linkbutton = page.getByTestId('link-button');
    await expect(linkbutton).toBeVisible();
    await expect(linkbutton).toHaveClass(/rounded bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white/);
    await expect(linkbutton).toHaveText('Link Button');
    await expect(linkbutton).toHaveAttribute('href', '/design#linkbutton');
  });
  test('renders a Link Button Secondary component', async ({ page }) => {
    const linkbutton = page.getByTestId('link-button-secondary');
    await expect(linkbutton).toBeVisible();
    await expect(linkbutton).toHaveClass(
      /rounded border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-sm font-medium text-neutral-800/,
    );
    await expect(linkbutton).toHaveText('Link Button Secondary');
    await expect(linkbutton).toHaveAttribute('href', '/design#linkbutton');
  });
  test('renders a Link Button Tertary component', async ({ page }) => {
    const linkbutton = page.getByTestId('link-button-tertary');
    await expect(linkbutton).toBeVisible();
    await expect(linkbutton).toHaveClass(/rounded px-3 py-1.5 text-sm font-medium text-neutral-600/);
    await expect(linkbutton).toHaveText('Link Button Tertary');
    await expect(linkbutton).toHaveAttribute('href', '/design#linkbutton');
  });
});

test.describe('Testing Heading Component', () => {
  // Heading ----------------------------------------------------
  test('renders a Heading H1 component', async ({ page }) => {
    const heading = page.getByTestId('heading-h1');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveClass(/mb-4 text-3xl font-medium text-neutral-800 dark:text-neutral-100/);
    await expect(heading).toHaveText('Heading 1');
  });
  test('renders a Heading H2 component', async ({ page }) => {
    const heading = page.getByTestId('heading-h2');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveClass(/mb-4 text-2xl font-medium text-neutral-800 dark:text-neutral-100/);
    await expect(heading).toHaveText('Heading 2');
  });
  test('renders a Heading H3 component', async ({ page }) => {
    const heading = page.getByTestId('heading-h3');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveClass(/mb-4 text-xl font-medium text-neutral-800 dark:text-neutral-100/);
    await expect(heading).toHaveText('Heading 3');
  });
  test('renders a Heading H4 component', async ({ page }) => {
    const heading = page.getByTestId('heading-h4');
    await expect(heading).toBeVisible();
    await expect(heading).toHaveClass(/mb-4 text-lg font-medium text-neutral-800 dark:text-neutral-100/);
    await expect(heading).toHaveText(/Heading 4/);
  });
});

test.describe('Testing Container Component', () => {
  // Container ----------------------------------------------------
  test('renders a Container component', async ({ page }) => {
    const container = page.getByTestId('container');
    await expect(container).toBeVisible();
    await expect(container).toHaveClass(/p-8 relative mb-2 rounded-md border bg-white/);
    await expect(container).toHaveText('Container');
  });
  test('renders a Container Small component', async ({ page }) => {
    const container = page.getByTestId('container-small');
    await expect(container).toBeVisible();
    await expect(container).toHaveClass(/p-2 relative mb-2 rounded-md border bg-white/);
    await expect(container).toHaveText('Container Small');
  });
});

test.describe('Testing Badge Component', () => {
  // Badge ----------------------------------------------------
  test('renders a Badge component', async ({ page }) => {
    const badge = page.getByTestId('badge');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-xs whitespace-nowrap bg-sky-100 font-semibold text-sky-500 dark:bg-sky-500 dark:bg-opacity-10/,
    );
    await expect(badge).toHaveText('badge');
  });
  test('renders a Badge Dark component', async ({ page }) => {
    const badge = page.getByTestId('badge-dark');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-xs whitespace-nowrap bg-neutral-100 font-semibold text-neutral-600 dark:bg-neutral-600 dark:bg-opacity-10 dark:text-neutral-400/,
    );
    await expect(badge).toHaveText('dark');
  });
  test('renders a Badge Red component', async ({ page }) => {
    const badge = page.getByTestId('badge-red');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-xs whitespace-nowrap bg-red-100 font-semibold text-red-600 dark:bg-red-600 dark:bg-opacity-10/,
    );
    await expect(badge).toHaveText('red');
  });
  test('renders a Badge Green component', async ({ page }) => {
    const badge = page.getByTestId('badge-green');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-xs whitespace-nowrap bg-green-100 font-semibold text-green-600 dark:bg-green-600 dark:bg-opacity-10/,
    );
    await expect(badge).toHaveText('green');
  });
  test('renders a Badge Yellow component', async ({ page }) => {
    const badge = page.getByTestId('badge-yellow');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-xs whitespace-nowrap bg-yellow-100 font-semibold text-yellow-600 dark:bg-yellow-600 dark:bg-opacity-10/,
    );
    await expect(badge).toHaveText('yellow');
  });
  test('renders a Badge Indigo component', async ({ page }) => {
    const badge = page.getByTestId('badge-indigo');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-xs whitespace-nowrap bg-indigo-100 font-semibold text-indigo-600 dark:bg-indigo-600 dark:bg-opacity-10/,
    );
    await expect(badge).toHaveText('indigo');
  });
  test('renders a Badge Purple component', async ({ page }) => {
    const badge = page.getByTestId('badge-purple');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-xs whitespace-nowrap bg-purple-100 font-semibold text-purple-600 dark:bg-purple-600 dark:bg-opacity-10/,
    );
    await expect(badge).toHaveText('purple');
  });
  test('renders a Badge Pink component', async ({ page }) => {
    const badge = page.getByTestId('badge-pink');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-xs whitespace-nowrap bg-pink-100 font-semibold text-pink-600 dark:bg-pink-600 dark:bg-opacity-10/,
    );
    await expect(badge).toHaveText('pink');
  });

  // Badge Large ----------------------------------------------------
  test('renders a Badge Large component', async ({ page }) => {
    const badge = page.getByTestId('badge-large');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-sm whitespace-nowrap bg-sky-100 font-semibold text-sky-500 dark:bg-sky-500 dark:bg-opacity-10/,
    );
    await expect(badge).toHaveText('badge');
  });
  test('renders a Badge Dark Large component', async ({ page }) => {
    const badge = page.getByTestId('badge-dark-large');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-sm whitespace-nowrap bg-neutral-100 font-semibold text-neutral-600 dark:bg-neutral-600 dark:bg-opacity-10 dark:text-neutral-400/,
    );
    await expect(badge).toHaveText('dark');
  });
  test('renders a Badge Red Large component', async ({ page }) => {
    const badge = page.getByTestId('badge-red-large');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-sm whitespace-nowrap bg-red-100 font-semibold text-red-600 dark:bg-red-600 dark:bg-opacity-10/,
    );
    await expect(badge).toHaveText('red');
  });
  test('renders a Badge Green Large component', async ({ page }) => {
    const badge = page.getByTestId('badge-green-large');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-sm whitespace-nowrap bg-green-100 font-semibold text-green-600 dark:bg-green-600 dark:bg-opacity-10/,
    );
    await expect(badge).toHaveText('green');
  });
  test('renders a Badge Yellow Large component', async ({ page }) => {
    const badge = page.getByTestId('badge-yellow-large');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-sm whitespace-nowrap bg-yellow-100 font-semibold text-yellow-600 dark:bg-yellow-600 dark:bg-opacity-10/,
    );
    await expect(badge).toHaveText('yellow');
  });
  test('renders a Badge Indigo Large component', async ({ page }) => {
    const badge = page.getByTestId('badge-indigo-large');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-sm whitespace-nowrap bg-indigo-100 font-semibold text-indigo-600 dark:bg-indigo-600 dark:bg-opacity-10/,
    );
    await expect(badge).toHaveText('indigo');
  });
  test('renders a Badge Purple Large component', async ({ page }) => {
    const badge = page.getByTestId('badge-purple-large');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-sm whitespace-nowrap bg-purple-100 font-semibold text-purple-600 dark:bg-purple-600 dark:bg-opacity-10/,
    );
    await expect(badge).toHaveText('purple');
  });
  test('renders a Badge Pink Large component', async ({ page }) => {
    const badge = page.getByTestId('badge-pink-large');
    await expect(badge).toBeVisible();
    await expect(badge).toHaveClass(
      /text-sm whitespace-nowrap bg-pink-100 font-semibold text-pink-600 dark:bg-pink-600 dark:bg-opacity-10/,
    );
    await expect(badge).toHaveText('pink');
  });
});

test.describe('Testing Checkbox Component', () => {
  // Checkbox ----------------------------------------------------
  test('renders a Checkbox component', async ({ page }) => {
    const checkbox = page.getByTestId('checkbox');
    const checkboxLabel = page.locator('label').filter({ hasText: /^Checkbox$/ });
    await expect(checkbox).toBeVisible();
    await expect(checkbox).not.toBeChecked();
    await expect(checkbox).toHaveClass(
      /h-4 w-4 rounded border-neutral-300 dark:border-neutral-700 text-sky-500 dark:bg-neutral-900 dark:checked:bg-sky-500/,
    );
    await expect(checkboxLabel).toContainText('Checkbox');
  });
  test('renders a Checkbox Checked component', async ({ page }) => {
    const checkbox = page.getByTestId('checkbox-checked');
    const checkboxLabel = page.locator('label').filter({ hasText: /^Checkbox Checked$/ });
    await expect(checkbox).toBeVisible();
    await expect(checkbox).toBeChecked();
    await expect(checkbox).toHaveClass(
      /h-4 w-4 rounded border-neutral-300 dark:border-neutral-700 text-sky-500 dark:bg-neutral-900 dark:checked:bg-sky-500/,
    );
    await expect(checkboxLabel).toContainText('Checkbox Checked');
  });
  test('renders a Checkbox Disabled component', async ({ page }) => {
    const checkbox = page.getByTestId('checkbox-disabled');
    const checkboxLabel = page.locator('label').filter({ hasText: /^Checkbox Disabled$/ });
    await expect(checkbox).toBeVisible();
    await expect(checkbox).not.toBeChecked();
    await expect(checkbox).toBeDisabled();
    await expect(checkbox).toHaveAttribute('disabled', '');
    await expect(checkbox).toHaveClass(/group-hover:disabled:cursor-not-allowed/);
    await expect(checkboxLabel).toContainText('Checkbox Disabled');
  });
  test('renders a Checkbox Checked Disabled component', async ({ page }) => {
    const checkbox = page.getByTestId('checkbox-checked-disabled');
    const checkboxLabel = page.locator('label').filter({ hasText: /^Checkbox Checked Disabled$/ });
    await expect(checkbox).toBeVisible();
    await expect(checkbox).toBeChecked();
    await expect(checkbox).toBeDisabled();
    await expect(checkbox).toHaveAttribute('disabled', '');
    await expect(checkbox).toHaveClass(
      /disabled:bg-neutral-100 dark:disabled:bg-neutral-800 disabled:checked:bg-sky-500 dark:disabled:checked:bg-sky-500/,
    );
    await expect(checkboxLabel).toContainText('Checkbox Checked Disabled');
  });
});

test.describe('Testing Radio Component', () => {
  // Radio ----------------------------------------------------
  test('renders a Radio component', async ({ page }) => {
    const radio = page.getByTestId('radio');
    const radioLabel = page.locator('label').filter({ hasText: /^Blue$/ });
    await expect(radio).toBeVisible();
    await expect(radio).not.toBeChecked();
    await expect(radio).toHaveClass(
      /h-4 w-4 border-neutral-300 dark:border-neutral-700 text-sky-500 dark:bg-neutral-900 dark:checked:bg-sky-500/,
    );
    await expect(radioLabel).toContainText('Blue');
  });
  test('renders a Radio Checked component', async ({ page }) => {
    const radio = page.getByTestId('radio-checked');
    const radioLabel = page.locator('label').filter({ hasText: /^Red$/ });
    await expect(radio).toBeVisible();
    await expect(radio).toBeChecked();
    await expect(radio).toHaveClass(
      /h-4 w-4 border-neutral-300 dark:border-neutral-700 text-sky-500 dark:bg-neutral-900 dark:checked:bg-sky-500/,
    );
    await expect(radioLabel).toContainText('Red');
  });
  test('renders a Radio Disabled component', async ({ page }) => {
    const radio = page.getByTestId('radio-disabled');
    const radioLabel = page.locator('label').filter({ hasText: /^Radio Disabled$/ });
    await expect(radio).toBeVisible();
    await expect(radio).not.toBeChecked();
    await expect(radio).toBeDisabled();
    await expect(radio).toHaveAttribute('disabled', '');
    await expect(radio).toHaveClass(/group-hover:disabled:cursor-not-allowed/);
    await expect(radioLabel).toContainText('Radio Disabled');
  });
  test('renders a Radio Checked Disabled component', async ({ page }) => {
    const radio = page.getByTestId('radio-checked-disabled');
    const radioLabel = page.locator('label').filter({ hasText: /^Radio Checked Disabled$/ });
    await expect(radio).toBeVisible();
    await expect(radio).toBeChecked();
    await expect(radio).toBeDisabled();
    await expect(radio).toHaveAttribute('disabled', '');
    await expect(radio).toHaveClass(
      /disabled:bg-neutral-100 dark:disabled:bg-neutral-800 disabled:checked:bg-sky-500 dark:disabled:checked:bg-sky-500/,
    );
    await expect(radioLabel).toContainText('Radio Checked Disabled');
  });
});

test.describe('Testing Input Component', () => {
  // Input ----------------------------------------------------
  test('renders a Input component', async ({ page }) => {
    const input = page.getByTestId('input');
    await expect(input).toBeVisible();
    await expect(input).toBeEnabled();
    await expect(input).toBeEditable();
    await expect(input).toHaveValue('');
    await expect(input).toHaveClass(/mt-2 w-full rounded-md border border-neutral-300 px-4/);
  });
  test('renders a Input Disabled component', async ({ page }) => {
    const input = page.getByTestId('input-disabled');
    await expect(input).toBeVisible();
    await expect(input).not.toBeEnabled();
    await expect(input).not.toBeEditable();
    await expect(input).toHaveValue('Has a value');
    await expect(input).toHaveClass(
      /disabled:bg-neutral-200 dark:disabled:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50/,
    );
  });
});

test.describe('Testing Label Component', () => {
  // Label ----------------------------------------------------
  test('renders a Label component', async ({ page }) => {
    const label = page.getByTestId('label');
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Label');
    await expect(label).toHaveClass(/block text-neutral-800 dark:text-neutral-300/);
  });
});

test.describe('Testing LabeledInput Component', () => {
  // LabeledInput ----------------------------------------------------
  test('renders a LabeledInput component', async ({ page }) => {
    const input = page.getByTestId('labeledinput');
    await expect(input).toBeVisible();
    await expect(input).toBeEnabled();
    await expect(input).toBeEditable();
    await expect(input).toHaveValue('');
    await expect(input).toHaveClass(/mt-2 w-full rounded-md border border-neutral-300 px-4/);
  });
  test('renders a LabeledInput type Password component', async ({ page }) => {
    const input = page.getByTestId('labeledinput-password');
    await expect(input).toBeVisible();
    await expect(input).toBeEnabled();
    await expect(input).toBeEditable();
    await expect(input).toHaveValue('');
    await expect(input).toHaveAttribute('type', 'password');
    await expect(input).toHaveClass(
      /disabled:bg-neutral-200 dark:disabled:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50/,
    );
  });
  test('renders a LabeledInput Disabled component', async ({ page }) => {
    const input = page.getByTestId('labeledinput-disabled');
    await expect(input).toBeVisible();
    await expect(input).not.toBeEnabled();
    await expect(input).not.toBeEditable();
    await expect(input).toHaveClass(/mt-2 w-full rounded-md border border-neutral-300 px-4/);
  });
});

test.describe('Testing Input (Debounce Hook) Component', () => {
  // Input (Debounce Hook) ----------------------------------------------------
  test('renders a Input (Debounce Hook) component', async ({ page }) => {
    const input = page.getByTestId('input-debounce-hook');
    await expect(input).toBeVisible();
    await expect(input).toBeEnabled();
    await expect(input).toBeEditable();
    await expect(input).toHaveValue('');
    await expect(input).toHaveClass(/mt-2 w-full rounded-md border border-neutral-300 px-4/);
    await page.getByTestId('input-debounce-hook').fill('input debounce hook');
    const text = page.getByTestId('input-debounce-hook-text');
    await expect(text).toHaveText('input debounce hook');
  });
});

test.describe('Testing InputDebounce Component', () => {
  // InputDebounce ----------------------------------------------------
  test('renders a InputDebounce component', async ({ page }) => {
    const input = page.getByTestId('inputdebounce');
    await expect(input).toBeVisible();
    await expect(input).toBeEnabled();
    await expect(input).toBeEditable();
    await expect(input).toHaveValue('');
    await expect(input).toHaveClass(/mt-2 w-full rounded-md border border-neutral-300 px-4/);
    await page.getByTestId('inputdebounce').fill('inputdebounce');
    const text = page.getByTestId('inputdebounce-text');
    await expect(text).toHaveText('inputdebounce');
  });
});

test.describe('Testing TextArea Component', () => {
  // TextArea ----------------------------------------------------
  test('renders a TextArea component', async ({ page }) => {
    const textarea = page.getByTestId('textarea');
    await expect(textarea).toBeVisible();
    await expect(textarea).toBeEnabled();
    await expect(textarea).toBeEditable();
    await expect(textarea).toHaveValue('');
    await expect(textarea).toHaveClass(
      /mt-2 w-full rounded-md bg-white p-3 text-sm outline-none transition-all dark:bg-neutral-900 dark:text-white/,
    );
  });
  test('renders a TextArea Disabled component', async ({ page }) => {
    const textarea = page.getByTestId('textarea-disabled');
    await expect(textarea).toBeVisible();
    await expect(textarea).not.toBeEnabled();
    await expect(textarea).not.toBeEditable();
    await expect(textarea).toHaveValue('');
    await expect(textarea).toHaveClass(
      /disabled:bg-neutral-200 dark:disabled:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50/,
    );
  });
});

test.describe('Testing FileInput Component', () => {
  // FileInput ----------------------------------------------------
  test('renders a FileInput component', async ({ page }) => {
    const fileinput = page.getByTestId('fileinput');
    await expect(fileinput).not.toBeVisible();
    await expect(fileinput).toBeEnabled();
    await expect(fileinput).toBeEditable();
    await expect(fileinput).toHaveValue('');
    await expect(fileinput).toHaveClass(/mt-2 hidden h-12 w-full rounded-md bg-white px-4/);
  });
});

test.describe('Testing Select Component', () => {
  // Select ----------------------------------------------------
  test('renders a Select component', async ({ page }) => {
    const select = page.getByTestId('select');
    await expect(select).toBeVisible();
    await expect(select).toBeEnabled();
    await expect(select).toBeEditable();
    await expect(select).toHaveValue('blue');
    await expect(select).toHaveClass(/mt-2 block w-full cursor-pointer rounded-md border/);
    await expect(page.getByTestId('selectoption-red')).toBeVisible();
    await expect(page.getByTestId('selectoption-red')).toHaveAttribute('value', 'red');
    await expect(page.getByTestId('selectoption-red')).toHaveText('Red');
    await expect(page.getByTestId('selectoption-blue')).toBeVisible();
    await expect(page.getByTestId('selectoption-blue')).toHaveAttribute('value', 'blue');
    await expect(page.getByTestId('selectoption-blue')).toHaveText('Blue');
    await expect(page.getByTestId('selectoption-green')).toBeVisible();
    await expect(page.getByTestId('selectoption-green')).toHaveAttribute('value', 'green');
    await expect(page.getByTestId('selectoption-green')).toHaveText('Green');
  });
});

test.describe('Testing Progress Component', () => {
  // Progress ----------------------------------------------------
  test('renders a Progress component', async ({ page }) => {
    const progress = page.getByTestId('progress');
    await expect(progress).toBeVisible();
    await expect(progress).toHaveClass(/h-1.5 rounded-full bg-sky-500/);
    // await expect(progress).toHaveCSS('width', '45%');
    await expect(progress).toHaveCSS('width', '420.297px');
  });
  test('renders a ProgressPercentage Zero component', async ({ page }) => {
    const progress = page.getByTestId('progress-zero');
    await expect(progress).toBeVisible();
    await expect(progress).toHaveText('0%');
    await expect(progress).toHaveClass(/rounded-full p-0.5 text-center text-xs font-medium leading-none/);
    // await expect(progress).toHaveCSS('width', '0%');
    await expect(progress).toHaveCSS('width', '4px');
  });
  test('renders a ProgressPercentage Percent component', async ({ page }) => {
    const progress = page.getByTestId('progress-percent');
    await expect(progress).toBeVisible();
    await expect(progress).toHaveText('75 %');
    await expect(progress).toHaveClass(/rounded-full p-0.5 text-center text-xs font-medium leading-none/);
    // await expect(progress).toHaveCSS('width', '75%');
    await expect(progress).toHaveCSS('width', '700.5px');
  });
});

test.describe('Testing Shimmer Component', () => {
  // Shimmer ----------------------------------------------------
  test('renders a Shimmer component', async ({ page }) => {
    const shimmer = page.getByTestId('shimmer');
    await expect(shimmer).toBeVisible();
    await expect(shimmer).toHaveClass(/relative overflow-hidden rounded/);
  });
});

test.describe('Testing Tabs Component', () => {
  // Tabs ----------------------------------------------------
  test('renders a Tabs component', async ({ page }) => {
    const tabs = page.getByTestId('tabs');
    await expect(tabs).toBeVisible();
    await expect(tabs).toHaveClass(
      /flex whitespace-nowrap border-b border-neutral-200 font-medium dark:border-neutral-800/,
    );
    await expect(tabs).toHaveAttribute('role', 'tablist');
    await expect(tabs).toContainText('Tab A');
    await expect(tabs).toContainText('Tab B');
    await expect(tabs).toContainText('Tab C');
  });
  test('renders a Tabs.panel component', async ({ page }) => {
    const tabs = page.getByTestId('tabs-panel');
    await expect(tabs).toBeVisible();
    await expect(tabs).toHaveClass(
      /rounded py-2 text-neutral-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-0 dark:text-neutral-200/,
    );
    await expect(tabs).toHaveAttribute('role', 'tabpanel');
    await expect(tabs).toContainText('Tabs Panel');
  });
});

test.describe('Testing Table Component', () => {
  // Table ----------------------------------------------------
  test('renders a Table component', async ({ page }) => {
    const table = page.getByTestId('table');
    await expect(table).toBeVisible();
    await expect(table).toHaveClass(/w-full table-auto whitespace-nowrap text-neutral-800 dark:text-neutral-100/);
  });
  test('renders a Table.tr component', async ({ page }) => {
    const table = page.getByTestId('table-tr');
    await expect(table).toBeVisible();
    await expect(table).toHaveClass(
      /border-b bg-white text-sm text-neutral-600 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-transparent dark:text-neutral-200/,
    );
  });
  test('renders a Table.td component', async ({ page }) => {
    const table = page.getByTestId('table-td');
    await expect(table).toBeVisible();
    await expect(table).toHaveClass(/p-3/);
  });
});

test.describe('Testing TableSimple Component', () => {
  // TableSimple ----------------------------------------------------
  test('renders a TableSimple component', async ({ page }) => {
    const table = page.getByTestId('table-simple');
    await expect(table).toBeVisible();
    await expect(table).toHaveClass(/w-full whitespace-nowrap text-neutral-800 dark:text-neutral-100/);
  });
  test('renders a TableSimple.tr component', async ({ page }) => {
    const table = page.getByTestId('tablesimple-tr');
    await expect(table).toBeVisible();
    await expect(table).toHaveClass(
      /border-b bg-white text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200/,
    );
  });
  test('renders a TableSimple.td component', async ({ page }) => {
    const table = page.getByTestId('tablesimple-td');
    await expect(table).toBeVisible();
    await expect(table).toHaveClass(/p-3/);
  });
});

test.describe('Testing Text Component', () => {
  // Text ----------------------------------------------------
  test('renders a Text component', async ({ page }) => {
    const text = page.getByTestId('text');
    await expect(text).toBeVisible();
    await expect(text).toHaveClass(/text-sm text-neutral-700 dark:text-neutral-200/);
    await expect(text).toHaveText('Default');
  });
  test('renders a Text.light component', async ({ page }) => {
    const text = page.getByTestId('text-light');
    await expect(text).toBeVisible();
    await expect(text).toHaveClass(/text-sm font-light text-neutral-700 dark:text-neutral-200/);
    await expect(text).toHaveText('Light');
  });
  test('renders a Text.medium component', async ({ page }) => {
    const text = page.getByTestId('text-medium');
    await expect(text).toBeVisible();
    await expect(text).toHaveClass(/text-sm font-medium text-neutral-700 dark:text-neutral-200/);
    await expect(text).toHaveText('Medium');
  });
  test('renders a Text.semibold component', async ({ page }) => {
    const text = page.getByTestId('text-semibold');
    await expect(text).toBeVisible();
    await expect(text).toHaveClass(/text-sm font-semibold text-neutral-700 dark:text-neutral-200/);
    await expect(text).toHaveText('Semibold');
  });
  test('renders a Text.bold component', async ({ page }) => {
    const text = page.getByTestId('text-bold');
    await expect(text).toBeVisible();
    await expect(text).toHaveClass(/text-sm font-bold text-neutral-700 dark:text-neutral-200/);
    await expect(text).toHaveText('Bold');
  });
  test('renders a Text.extrabold component', async ({ page }) => {
    const text = page.getByTestId('text-extrabold');
    await expect(text).toBeVisible();
    await expect(text).toHaveClass(/text-sm font-extrabold text-neutral-700 dark:text-neutral-200/);
    await expect(text).toHaveText('Extrabold');
  });
});

test.describe('Testing Card Component', () => {
  // Card ----------------------------------------------------
  test('renders a Card component', async ({ page }) => {
    const card = page.getByTestId('card');
    await expect(card).toBeVisible();
    await expect(card).toHaveClass(/rounded-lg border p-3 dark:border-neutral-800 lg:p-6/);
    await expect(card).toHaveText('Card Content');
  });
});

test.describe('Testing Section Component', () => {
  // Section ----------------------------------------------------
  test('renders a Section component', async ({ page }) => {
    const section = page.getByTestId('section');
    await expect(section).toBeVisible();
    await expect(section).toHaveClass(/my-2 rounded-md border bg-white p-8 py-4/);
    await expect(section).toHaveText('Section Default');
  });
  test('renders a Section.small component', async ({ page }) => {
    const section = page.getByTestId('section-small');
    await expect(section).toBeVisible();
    await expect(section).toHaveClass(/my-2 rounded-md border bg-white p-8 py-2/);
    await expect(section).toHaveText('Section Small');
  });
});

test.describe('Testing ShowMore Component', () => {
  // ShowMore ----------------------------------------------------
  test('renders a ShowMore component', async ({ page }) => {
    const showmore = page.getByTestId('showmore');
    await expect(showmore).toBeVisible();
    await expect(showmore).toHaveClass(/relative/);
    await expect(showmore).toContainText(
      `Id amet commodo exercitation aliqua irure exercitation adipisicing ipsum cillum elit. Cillum non dolor cillum mollit incididunt tempor quis reprehenderit labore velit sunt anim ipsum quis. Id nostrud ...`,
    );
  });
  test('renders a ShowMore component and Click Button', async ({ page }) => {
    const showmore = page.getByTestId('showmore');
    await expect(showmore).toBeVisible();
    await expect(showmore).toContainText(
      `Id amet commodo exercitation aliqua irure exercitation adipisicing ipsum cillum elit. Cillum non dolor cillum mollit incididunt tempor quis reprehenderit labore velit sunt anim ipsum quis. Id nostrud ...`,
    );
    await page.getByLabel('Show More').click();
    await expect(showmore).toContainText(
      `Id amet commodo exercitation aliqua irure exercitation adipisicing ipsum cillum elit. Cillum non dolor cillum
          mollit incididunt tempor quis reprehenderit labore velit sunt anim ipsum quis. Id nostrud anim ut excepteur
          pariatur. Eu ad esse nisi et fugiat. Exercitation culpa cupidatat consequat veniam commodo aute id enim Lorem
          id consectetur aliqua. Quis culpa do est non irure aliquip proident exercitation aliqua mollit anim dolor
          labore.`,
    );
  });
});

test.describe('Testing HoverCard Component', () => {
  // HoverCard ----------------------------------------------------
  test('renders a HoverCard component', async ({ page }) => {
    const hovercard = page.getByTestId('hovercard');
    await expect(hovercard).toBeVisible();
    await expect(hovercard).toHaveClass(/rounded text-sm font-medium transition-all duration-200 hover:text-sky-500/);
    await expect(hovercard).toContainText('Hover Me');
    await expect(hovercard).toHaveAttribute('data-state', 'closed');
  });
  test('renders a HoverCard component and Hover', async ({ page }) => {
    const hovercard = page.getByTestId('hovercard');
    await expect(hovercard).toBeVisible();
    await expect(hovercard).toHaveClass(/rounded text-sm font-medium transition-all duration-200 hover:text-sky-500/);
    await expect(hovercard).toContainText('Hover Me');
    await expect(hovercard).toHaveAttribute('data-state', 'closed');
    await hovercard.hover();
    await expect(hovercard).toHaveAttribute('data-state', 'open');
    const hovercardContent = page.getByTestId('hovercard-content');
    await expect(hovercardContent).toBeVisible();
    await expect(hovercardContent)
      .toContainText(`Laborum sint culpa nisi commodo. Reprehenderit et laborum do commodo et fugiat elit ullamco. Tempor culpa
              elit officia deserunt est amet anim. Irure nostrud esse aliquip commodo. Veniam ullamco irure non sunt
              elit nulla cillum. Tempor ea anim non laboris consectetur aliqua laborum do enim. Anim aliquip tempor
              dolore irure.`);
  });
});

test.describe('Testing Toast Component', () => {
  // Toast ----------------------------------------------------
  test('renders a Toast Success component', async ({ page }) => {
    const toastbutton = page.getByTestId('toastbutton');
    await expect(toastbutton).toBeVisible();
    await expect(toastbutton).toContainText('Show Me Toast');
    await toastbutton.click();
    await expect(page.getByText('This is a success toast message')).toBeVisible();
  });
  test('renders a Toast Error component', async ({ page }) => {
    const toastbutton = page.getByTestId('toastbutton-error');
    await expect(toastbutton).toBeVisible();
    await expect(toastbutton).toContainText('Show Me Error Toast');
    await toastbutton.click();
    await expect(page.getByText('This is a error toast message')).toBeVisible();
  });
  test('renders a Toast Async component', async ({ page }) => {
    const toastbutton = page.getByTestId('toastbutton-async');
    await expect(toastbutton).toBeVisible();
    await expect(toastbutton).toContainText('Toast with async');
    await toastbutton.click();
    await expect(page.getByText('Loading Posting Async Data')).toBeVisible();
    await expect(page.getByText('Posting Data Async Success')).toBeVisible();
  });
});

test.describe('Testing RactTable Component', () => {
  // RactTable ----------------------------------------------------
  test('renders a RactTable component', async ({ page }) => {
    const reacttable = page.getByTestId('reacttable');
    await expect(reacttable).toBeVisible();
    await expect(reacttable).toHaveClass('w-full whitespace-nowrap text-neutral-800 dark:text-neutral-100');
    // Head
    await expect(reacttable).toContainText('No');
    await expect(reacttable).toContainText('Name');
    await expect(reacttable).toContainText('Email');
    // Body
    await expect(reacttable).toContainText('1');
    await expect(reacttable).toContainText('Amparo Mooney');
    await expect(reacttable).toContainText('amparo@qnekt.com');
  });
});

test.describe('Testing RactSelect Component', () => {
  // RactSelect ----------------------------------------------------
  test('renders a RactSelect component', async ({ page }) => {
    const reactselect = page.locator('.react-select__input-container');
    await expect(reactselect).toBeVisible();
    await expect(reactselect).toHaveClass(/react-select__input-container/);
    await page.locator('.react-select__input-container').click();
    await expect(page.getByText('Comedy', { exact: true })).toBeVisible();
    await page.getByText('Comedy', { exact: true }).click();
    await expect(page.getByText('Comedy', { exact: true })).toBeVisible();
    await page.getByRole('combobox', { name: 'React Select' }).fill('history');
    await expect(page.getByText('History', { exact: true })).toBeVisible();
    await page.getByText('History', { exact: true }).click();
    await expect(page.getByText('History', { exact: true })).toBeVisible();
  });
});

test.describe('Testing SelectBox Component', () => {
  // SelectBox ----------------------------------------------------
  test('renders a SelectBox component', async ({ page }) => {
    const selectbox = page.getByTestId('selectbox');
    await expect(selectbox).toBeVisible();
    await expect(selectbox).toHaveClass(
      /h-10 relative my-2 w-full text-left border transition-all rounded-md cursor-pointer text-sm/,
    );
  });
  test('selecting option in SelectBox component', async ({ page }) => {
    const selectbox = page.getByTestId('selectbox');
    await selectbox.click();
    await expect(page.getByRole('option', { name: 'Select 1' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Select 1' })).toHaveClass(
      /relative cursor-pointer py-2 pr-4 pl-10 text-neutral-900 dark:text-white/,
    );
    await page.getByRole('option', { name: 'Select 1' }).click();
    await expect(page.getByRole('option', { name: 'Select 1' })).toHaveAttribute('aria-selected', 'true');
    await expect(selectbox).toHaveText('Select 1');
  });
});

test.describe('Testing SearchBox Component', () => {
  // SearchBox ----------------------------------------------------
  test('renders a SearchBox component', async ({ page }) => {
    const searchbox = page.getByTestId('searchbox');
    await expect(searchbox).toBeVisible();
    await expect(searchbox).toHaveClass(
      /w-full rounded-md py-2 pl-3 pr-10 text-sm text-neutral-900 dark:bg-neutral-900 dark:text-white/,
    );
  });
  test('selecting option in SearchBox component', async ({ page }) => {
    const searchbox = page.getByTestId('searchbox');
    await searchbox.fill('Option 1');
    await expect(page.getByRole('option', { name: 'Option 1' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Option 1' })).toHaveClass(/relative cursor-pointer py-2 pl-10 pr-4/);
    await page.getByRole('option', { name: 'Option 1' }).click();
    // await expect(page.getByRole('option', { name: 'Option 1' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByTestId('searchbox-value')).toHaveText('Option 1');
    await searchbox.fill('Option 2');
    await expect(page.getByRole('option', { name: 'Option 2' })).toBeVisible();
    await expect(page.getByRole('option', { name: 'Option 2' })).toHaveClass(/relative cursor-pointer py-2 pl-10 pr-4/);
    await page.getByRole('option', { name: 'Option 2' }).click();
    // await expect(page.getByRole('option', { name: 'Option 2' })).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByTestId('searchbox-value')).toHaveText('Option 2');
  });
});

test.describe('Testing Modal Component', () => {
  // Modal ----------------------------------------------------
  test('renders a Modal component', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Modal' }).click();
    const modal = page.getByTestId('modal');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveClass(/relative inline-block max-w-lg transform overflow-hidden rounded-lg bg-white/);
    await expect(modal).toContainText('Confirmation');
    await expect(modal)
      .toContainText(`Mollit incididunt ex exercitation sunt incididunt culpa reprehenderit esse magna laborum. Do velit ipsum
      consectetur aliquip mollit nisi irure quis Lorem eu non sit.`);
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(modal).not.toBeVisible();
  });
  test('renders a Modal Danger component', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Danger Modal' }).click();
    const modal = page.getByTestId('modal-danger');
    await expect(modal).toBeVisible();
    await expect(modal).toHaveClass(/relative inline-block max-w-lg transform overflow-hidden rounded-lg bg-white/);
    await expect(modal).toContainText('Delete Confirmation');
    await expect(modal).toContainText(
      `Danger Content Fugiat consectetur nulla qui veniam. Aliquip ipsum dolore eiusmod Lorem ipsum fugiat.`,
    );
    await page.getByTestId('modal-danger').getByRole('button', { name: 'Delete' }).click();
    await expect(modal).not.toBeVisible();
  });
});

test.describe('Testing Dialog Component', () => {
  // Dialog ----------------------------------------------------
  test('renders a Dialog component', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Dialog' }).click();
    const dialog = page.getByTestId('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveClass(/bg-white dark:bg-neutral-900 opacity-100 scale-100/);
    await expect(dialog).toContainText('Confirmation');
    await expect(dialog)
      .toContainText(`Mollit incididunt ex exercitation sunt incididunt culpa reprehenderit esse magna laborum. Do velit ipsum
      consectetur aliquip mollit nisi irure quis Lorem eu non sit.`);
    await page.getByRole('button', { name: 'Cancel' }).click();
    await expect(dialog).not.toBeVisible();
  });
  test('renders a Dialog Danger component', async ({ page }) => {
    await page.getByRole('button', { name: 'Open Danger Dialog' }).click();
    const dialog = page.getByTestId('dialog-danger');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveClass(/bg-white dark:bg-neutral-900 opacity-100 scale-100/);
    await expect(dialog).toContainText('Delete Confirmation');
    await expect(dialog).toContainText(
      `Danger Content Fugiat consectetur nulla qui veniam. Aliquip ipsum dolore eiusmod Lorem ipsum fugiat.`,
    );
    await page.getByTestId('dialog-danger').getByRole('button', { name: 'Delete' }).click();
    await expect(dialog).not.toBeVisible();
  });
});

test.describe('Testing Code Component', () => {
  // Code ----------------------------------------------------
  test('renders a Code component', async ({ page }) => {
    const code = page.getByTestId('code');
    await expect(code).toBeVisible();
    await expect(code).toHaveClass(/Code relative rounded-md text-sm/);
    await expect(code).toContainText('import useToast from');
  });
  test('renders a Code component and click copy', async ({ page }) => {
    const code = page.getByTestId('code');
    await expect(code).toBeVisible();
    await expect(code.getByRole('button', { name: 'Copy Code' })).toBeVisible();
    await code.getByRole('button', { name: 'Copy Code' }).click();
    // await page.evaluate("navigator.clipboard.writeText('123')");
    let clipboardText = await page.evaluate('navigator.clipboard.readText()');
    // expect(clipboardText).toContain('123');
    expect(clipboardText).toContain('import useToast from');
  });
});

test.describe('Testing LoadingDots Component', () => {
  // LoadingDots ----------------------------------------------------
  test('renders a LoadingDots component', async ({ page }) => {
    const loadingdots = page.getByTestId('loadingdots');
    await expect(loadingdots).toBeVisible();
    await expect(loadingdots).toHaveClass(/inline-flex items-center gap-1 text-center leading-7/);
  });
  test('renders a LoadingDots Medium component', async ({ page }) => {
    const loadingdots = page.getByTestId('loadingdots-medium');
    await expect(loadingdots).toBeVisible();
    await expect(loadingdots).toHaveClass(/inline-flex items-center gap-1 text-center leading-7/);
  });
  test('renders a LoadingDots Large component', async ({ page }) => {
    const loadingdots = page.getByTestId('loadingdots-large');
    await expect(loadingdots).toBeVisible();
    await expect(loadingdots).toHaveClass(/inline-flex items-center gap-1 text-center leading-7/);
  });
});

test.describe('Testing ZOD Validation Component', () => {
  // ZOD Validation ----------------------------------------------------
  test('All fields empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Submit Zod', exact: true }).click();
    await expect(page.getByText('Username is required')).toBeVisible();
    await expect(page.getByText('Username must be alphabet without space')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Invalid email address')).toBeVisible();
    await expect(page.getByText('Age is required')).toBeVisible();
    await expect(page.getByText('Password is required', { exact: true })).toBeVisible();
    await expect(page.getByText('Password length minimal is 8', { exact: true })).toBeVisible();
    await expect(page.getByText('Confirm Password is required')).toBeVisible();
  });
  test('Username fill', async ({ page }) => {
    await page.getByTestId('username-zod').fill('username');
    await page.getByRole('button', { name: 'Submit Zod', exact: true }).click();
    await expect(page.getByText('Username is required')).not.toBeVisible();
    await expect(page.getByText('Username must be alphabet without space')).not.toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Invalid email address')).toBeVisible();
    await expect(page.getByText('Age is required')).toBeVisible();
    await expect(page.getByText('Password is required', { exact: true })).toBeVisible();
    await expect(page.getByText('Password length minimal is 8', { exact: true })).toBeVisible();
    await expect(page.getByText('Confirm Password is required')).toBeVisible();
  });
  test('Email fill', async ({ page }) => {
    await page.getByTestId('username-zod').fill('username');
    await page.getByTestId('email-zod').fill('username@gmail.com');
    await page.getByRole('button', { name: 'Submit Zod', exact: true }).click();
    await expect(page.getByText('Username is required')).not.toBeVisible();
    await expect(page.getByText('Username must be alphabet without space')).not.toBeVisible();
    await expect(page.getByText('Email is required')).not.toBeVisible();
    await expect(page.getByText('Invalid email address')).not.toBeVisible();
    await expect(page.getByText('Age is required')).toBeVisible();
    await expect(page.getByText('Password is required', { exact: true })).toBeVisible();
    await expect(page.getByText('Password length minimal is 8', { exact: true })).toBeVisible();
    await expect(page.getByText('Confirm Password is required')).toBeVisible();
  });
  test('Age fill', async ({ page }) => {
    await page.getByTestId('username-zod').fill('username');
    await page.getByTestId('email-zod').fill('username@gmail.com');
    await page.getByTestId('age-zod').fill('18');
    await page.getByRole('button', { name: 'Submit Zod', exact: true }).click();
    await expect(page.getByText('Username is required')).not.toBeVisible();
    await expect(page.getByText('Username must be alphabet without space')).not.toBeVisible();
    await expect(page.getByText('Email is required')).not.toBeVisible();
    await expect(page.getByText('Invalid email address')).not.toBeVisible();
    await expect(page.getByText('Age is required')).not.toBeVisible();
    await expect(page.getByText('Password is required', { exact: true })).toBeVisible();
    await expect(page.getByText('Password length minimal is 8', { exact: true })).toBeVisible();
    await expect(page.getByText('Confirm Password is required')).toBeVisible();
  });
  test('Password fill', async ({ page }) => {
    await page.getByTestId('username-zod').fill('username');
    await page.getByTestId('email-zod').fill('username@gmail.com');
    await page.getByTestId('age-zod').fill('18');
    await page.getByTestId('password-zod').fill('password');
    await page.getByRole('button', { name: 'Submit Zod', exact: true }).click();
    await expect(page.getByText('Username is required')).not.toBeVisible();
    await expect(page.getByText('Username must be alphabet without space')).not.toBeVisible();
    await expect(page.getByText('Email is required')).not.toBeVisible();
    await expect(page.getByText('Invalid email address')).not.toBeVisible();
    await expect(page.getByText('Age is required')).not.toBeVisible();
    await expect(page.getByText('Password is required', { exact: true })).not.toBeVisible();
    await expect(page.getByText('Password length minimal is 8', { exact: true })).not.toBeVisible();
    await expect(page.getByText('Confirm Password is required')).toBeVisible();
    await expect(page.getByText('Oops! Password doesnt match')).toBeVisible();
  });
  test('All filled', async ({ page }) => {
    await page.getByTestId('username-zod').fill('username');
    await page.getByTestId('email-zod').fill('username@gmail.com');
    await page.getByTestId('age-zod').fill('18');
    await page.getByTestId('password-zod').fill('password');
    await page.getByTestId('confirmPassword-zod').fill('password');
    await page.getByRole('button', { name: 'Submit Zod', exact: true }).click();
    await expect(page.getByText('Username is required')).not.toBeVisible();
    await expect(page.getByText('Username must be alphabet without space')).not.toBeVisible();
    await expect(page.getByText('Email is required')).not.toBeVisible();
    await expect(page.getByText('Invalid email address')).not.toBeVisible();
    await expect(page.getByText('Age is required')).not.toBeVisible();
    await expect(page.getByText('Password is required', { exact: true })).not.toBeVisible();
    await expect(page.getByText('Password length minimal is 8', { exact: true })).not.toBeVisible();
    await expect(page.getByText('Confirm Password is required')).not.toBeVisible();
    await expect(page.getByText('Oops! Password doesnt match')).not.toBeVisible();
    await expect(page.getByText('Posting ZOD Data')).toBeVisible();
    await expect(page.getByText('Success Posting ZOD Data')).toBeVisible();
  });
});

test.describe('Testing ZOD Object Validation Component', () => {
  // ZOD Validation ----------------------------------------------------
  test('All fields empty', async ({ page }) => {
    await page.getByRole('button', { name: 'Submit Zod Object' }).click();
    await expect(page.getByText('Username is required')).toBeVisible();
    await expect(page.getByText('Email is required')).toBeVisible();
    await expect(page.getByText('Age is required')).toBeVisible();
    await expect(page.getByText('Password is required', { exact: true })).toBeVisible();
    await expect(page.getByText('Confirm Password is required')).toBeVisible();
  });
  test('Username fill but invalid', async ({ page }) => {
    await page.getByTestId('username-object').fill('username123');
    await page.getByRole('button', { name: 'Submit Zod Object' }).click();
    await expect(page.getByText('Username is required')).not.toBeVisible();
    await expect(page.getByText('Username must be alphabet without space')).toBeVisible();
  });
  test('Username fill valid', async ({ page }) => {
    await page.getByTestId('username-object').fill('username');
    await page.getByRole('button', { name: 'Submit Zod Object' }).click();
    await expect(page.getByText('Username is required')).not.toBeVisible();
    await expect(page.getByText('Username must be alphabet without space')).not.toBeVisible();
  });
  test('Email fill but invalid', async ({ page }) => {
    await page.getByTestId('email-object').fill('email@a.c');
    await page.getByRole('button', { name: 'Submit Zod Object' }).click();
    await expect(page.getByText('Invalid email address')).toBeVisible();
    await expect(page.getByText('Email is required')).not.toBeVisible();
  });
  test('Email fill valid', async ({ page }) => {
    await page.getByTestId('email-object').fill('email@gmail.com');
    await page.getByRole('button', { name: 'Submit Zod Object' }).click();
    await expect(page.getByText('Invalid email address')).not.toBeVisible();
    await expect(page.getByText('Email is required')).not.toBeVisible();
  });
  test('Age fill but invalid', async ({ page }) => {
    await page.getByTestId('age-object').fill('0');
    await page.getByRole('button', { name: 'Submit Zod Object' }).click();
    await expect(page.getByText('Age must be a greater than 17')).toBeVisible();
    await expect(page.getByText('Age is required')).not.toBeVisible();
  });
  test('Age fill valid', async ({ page }) => {
    await page.getByTestId('age-object').fill('18');
    await page.getByRole('button', { name: 'Submit Zod Object' }).click();
    await expect(page.getByText('Age must be a greater than 17')).not.toBeVisible();
    await expect(page.getByText('Age is required')).not.toBeVisible();
  });
  test('Password fill but invalid', async ({ page }) => {
    await page.getByTestId('password-object').fill('pass');
    await page.getByRole('button', { name: 'Submit Zod Object' }).click();
    await expect(page.getByText('Password length minimal is 8')).toBeVisible();
    await expect(page.getByText('Password is required', { exact: true })).not.toBeVisible();
  });
  test('Password fill valid', async ({ page }) => {
    await page.getByTestId('password-object').fill('password');
    await page.getByRole('button', { name: 'Submit Zod Object' }).click();
    await expect(page.getByText('Password must be a greater than 17')).not.toBeVisible();
    await expect(page.getByText('Password is required', { exact: true })).not.toBeVisible();
  });
  test('Confirm Password fill but invalid', async ({ page }) => {
    await page.getByTestId('username-object').fill('username');
    await page.getByTestId('email-object').fill('email@gmail.com');
    await page.getByTestId('age-object').fill('18');
    await page.getByTestId('password-object').fill('password');
    await page.getByTestId('confirmPassword-object').fill('');
    await page.getByRole('button', { name: 'Submit Zod Object' }).click();
    await expect(page.getByText('Oops! Password doesnt match', { exact: true })).toBeVisible();
  });
  test('Confirm Password fill valid', async ({ page }) => {
    await page.getByTestId('username-object').fill('username');
    await page.getByTestId('email-object').fill('email@gmail.com');
    await page.getByTestId('age-object').fill('18');
    await page.getByTestId('password-object').fill('password');
    await page.getByTestId('confirmPassword-object').fill('password');
    await page.getByRole('button', { name: 'Submit Zod Object' }).click();
    await expect(page.getByText('Oops! Password doesnt match', { exact: true })).not.toBeVisible();
  });
  test('All fields valid', async ({ page }) => {
    await page.getByTestId('username-object').fill('username');
    await page.getByTestId('email-object').fill('email@gmail.com');
    await page.getByTestId('age-object').fill('18');
    await page.getByTestId('password-object').fill('password');
    await page.getByTestId('confirmPassword-object').fill('password');
    await page.getByRole('button', { name: 'Submit Zod Object' }).click();
    await expect(page.getByText('Oops! Password doesnt match', { exact: true })).not.toBeVisible();
    await expect(page.getByText('Password must be a greater than 17')).not.toBeVisible();
    await expect(page.getByText('Password is required', { exact: true })).not.toBeVisible();
    await expect(page.getByText('Age must be a greater than 17')).not.toBeVisible();
    await expect(page.getByText('Age is required')).not.toBeVisible();
    await expect(page.getByText('Invalid email address')).not.toBeVisible();
    await expect(page.getByText('Email is required')).not.toBeVisible();
    await expect(page.getByText('Username is required')).not.toBeVisible();
    await expect(page.getByText('Username must be alphabet without space')).not.toBeVisible();
    await expect(page.getByText('Posting ZOD Object Data')).toBeVisible();
    await expect(page.getByText('Success Posting ZOD Object Data')).toBeVisible();
  });
});
