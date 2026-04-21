import { describe, expect, it } from 'vitest'

import { ROUTES, getPostListsRoute } from '../src/app/routes'

describe('route helpers', () => {
  it('exposes stable route constants', () => {
    expect(ROUTES.HOME).toBe('/')
    expect(ROUTES.POST_LISTS).toBe('/post/lists')
    expect(ROUTES.ADMINISTRATORS).toBe('/administrators/dashboard')
  })

  it('creates encoded post list route', () => {
    expect(getPostListsRoute('community updates')).toBe('/post/lists/community%20updates')
  })
})
