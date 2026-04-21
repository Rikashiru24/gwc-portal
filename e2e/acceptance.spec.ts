import { expect, test } from '@playwright/test'

test.describe('Acceptance testing', () => {
  test('requirement: public visitors can open the announcements board', async ({ page }) => {
    await page.goto('/announcements')

    await expect(page).toHaveURL(/\/announcements$/)
    await expect(page.locator('.ann-title-block h1')).toBeVisible()
    await expect(page.getByText(/Latest:/)).toBeVisible()
  })

  test('requirement: public visitors can read a published article', async ({ page }) => {
    await page.goto('/post/research-colloquium')

    await expect(page.getByRole('heading', { name: 'Research Colloquium' })).toBeVisible()
    await expect(page.getByText('Other Related Articles:')).toBeVisible()
  })

  test('requirement: unknown pages show a recoverable error page', async ({ page }) => {
    await page.goto('/unknown-public-route')

    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
    await page.getByRole('link', { name: 'Go to Homepage' }).click()
    await expect(page).toHaveURL('/')
  })
})
