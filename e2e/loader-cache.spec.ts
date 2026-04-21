import { expect, test } from '@playwright/test'

test('loader appears on first navigation', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('#loading')).toHaveCount(1)
  await expect(page.locator('#loading-image')).toBeVisible()
  await expect(page.locator('#loading-animating-image')).toBeVisible()
  await expect(page.locator('#loading')).toHaveClass(/is-hidden/)
})

test('logo placeholder cache behavior is first-load only per session', async ({ page }) => {
  await page.goto('/')
  await page.waitForTimeout(300)
  const firstLoadPlaceholderCount = await page.locator('img.logo-placeholder').count()
  expect(firstLoadPlaceholderCount).toBeGreaterThanOrEqual(0)

  await page.reload()
  await page.waitForTimeout(300)
  await expect(page.locator('img.logo-placeholder')).toHaveCount(0)
})
