import { expect, test } from '@playwright/test'

test.describe('System testing', () => {
  test('renders announcements page from home navigation', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: 'ANNOUNCEMENT' }).click()

    await expect(page).toHaveURL(/\/announcements$/)
    await expect(page.locator('.ann-title-block h1')).toBeVisible()
    await expect(page.getByText('Other Announcements:')).toBeVisible()
  })

  test('loads post detail page and related articles', async ({ page }) => {
    await page.goto('/post/research-colloquium')

    await expect(page.getByRole('heading', { name: 'Research Colloquium' })).toBeVisible()
    await expect(page.getByText('Other Related Articles:')).toBeVisible()
  })

  test('shows 404 page on unknown route', async ({ page }) => {
    await page.goto('/this-page-does-not-exist')

    await expect(page.getByRole('heading', { name: 'Page not found' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Go to Homepage' })).toBeVisible()
  })
})
