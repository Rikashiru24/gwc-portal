import { describe, expect, it } from 'vitest'

import { renderannouncements_page } from '../src/pages/announcements/announcements_page'
import { renderpost_page } from '../src/pages/post/post_page'
import { rendernot_found_page } from '../src/pages/not-found/not_found_page'

describe('router integration', () => {
  it('renders announcements view with key sections', () => {
    const html = renderannouncements_page()

    expect(html).toContain('ANNOUNCEMENTS')
    expect(html).toContain('Other Announcements:')
  })

  it('renders post page for a valid slug', () => {
    const html = renderpost_page('research-colloquium')

    expect(html).toBeTruthy()
    expect(html).toContain('Research Colloquium')
    expect(html).toContain('Other Related Articles:')
  })

  it('returns null for an unknown post slug', () => {
    const html = renderpost_page('missing-slug')

    expect(html).toBeNull()
  })

  it('renders not found page content', () => {
    const html = rendernot_found_page()

    expect(html).toContain('Page not found')
    expect(html).toContain('Go to Homepage')
  })
})
