import { expect, test, type Page } from '@playwright/test'

const waitForLoaderToFinish = async (page: Page): Promise<void> => {
  await page.waitForFunction(() => {
    const loader = document.querySelector('#loading')
    if (!loader) return true
    return loader.classList.contains('is-hidden')
  })
}

const waitForAosAnimations = async (page: Page): Promise<void> => {
  await page.waitForFunction(() => {
    return document.querySelectorAll('[data-aos].aos-animate').length > 0
  })
}

test('AOS animations trigger again after home page reload', async ({ page }) => {
  await page.goto('/')
  await page.waitForSelector('[data-aos]')
  await waitForLoaderToFinish(page)

  await page.reload({ waitUntil: 'domcontentloaded' })
  await page.waitForSelector('[data-aos]')
  await waitForLoaderToFinish(page)
  await waitForAosAnimations(page)

  const animatedCount = await page.locator('[data-aos].aos-animate').count()
  expect(animatedCount).toBeGreaterThan(0)
})
