import { describe, expect, it } from 'vitest'

import { renderBreadcrumbNav } from '../src/components/ui/nav_breadcrumb'
import { renderSharedPopover } from '../src/components/ui/popover'

describe('ui helpers', () => {
  it('renders breadcrumb links and active item', () => {
    const html = renderBreadcrumbNav([
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Students', active: true },
    ])

    expect(html).toContain('aria-label="Breadcrumb"')
    expect(html).toContain('<a href="/dashboard">Dashboard</a>')
    expect(html).toContain('<li class="breadcrumb-item active" aria-current="page">Students</li>')
  })

  it('renders shared popover with custom action attribute and danger action', () => {
    const html = renderSharedPopover({
      ariaLabel: 'Row actions',
      triggerLabel: 'Manage',
      actionDataAttribute: 'data-row-action',
      actions: [
        { label: 'Edit', value: 'edit' },
        { label: 'Delete', value: 'delete', danger: true },
      ],
    })

    expect(html).toContain('data-admin-actions-trigger')
    expect(html).toContain('aria-label="Row actions"')
    expect(html).toContain('data-row-action="edit"')
    expect(html).toContain('class="is-danger" data-row-action="delete"')
  })
})
