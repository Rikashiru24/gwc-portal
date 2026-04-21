// e2e/smoke.spec.ts
import { test, expect } from '@playwright/test';

test('home page loads', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/golden west colleges/i);
});
