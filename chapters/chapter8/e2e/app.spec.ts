import { expect, test } from '@playwright/test';

test('loads the chapter app', async ({ page }) => {
  await page.goto('/');

  await expect(page.locator('my-app')).toContainText('Hello World!');
});
