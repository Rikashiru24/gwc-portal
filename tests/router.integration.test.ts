// @vitest-environment jsdom
import { describe, expect, it } from 'vitest'

import { renderRoute } from '../src/app/router'
import { ROUTES } from '../src/app/routes'

function createAppRoot(): HTMLDivElement {
  const app = document.createElement('div')
  app.id = 'app'
  document.body.innerHTML = ''
  document.body.appendChild(app)
  return app
}

describe('router integration', () => {
  it('renders home page content for root route', () => {
    const app = createAppRoot()

    renderRoute(app, ROUTES.HOME)

    expect(app.querySelector('h1')?.textContent).toContain('Golden West Colleges, Inc. in Action')
  })

  it('renders announcements page content for announcements route', () => {
    const app = createAppRoot()

    renderRoute(app, ROUTES.ANNOUNCEMENTS)

    expect(app.querySelector('.ann-title-block h1')?.textContent).toContain('ANNOUNCEMENTS')
    expect(app.textContent).toContain('Other Announcements:')
  })

  it('renders post page for a valid post slug route', () => {
    const app = createAppRoot()

    renderRoute(app, '/post/research-colloquium')

    expect(app.querySelector('.post-title')?.textContent).toContain('Research Colloquium')
    expect(app.textContent).toContain('Other Related Articles:')
  })

  it('renders not found page for unknown routes', () => {
    const app = createAppRoot()

    renderRoute(app, '/missing-page')

    expect(app.textContent).toContain('Page not found')
    expect(app.textContent).toContain('Go to Homepage')
  })
})
