import { ROUTES } from '../../../app/routes'
import { ADMIN_SHELL_CONFIG } from '../../../components/layout/_layout'
import { renderBreadcrumbNav } from '../../../components/ui/nav_breadcrumb'
import { renderSectionPlaceholderPage } from '../../../components/ui/section_placeholder'

export function rendersystem_logs_page(): string {
  return renderSectionPlaceholderPage(
    ADMIN_SHELL_CONFIG,
    { contentClass: 'admin-content', panelClass: 'admin-panel' },
    'system_logs',
    'System Logs',
    'Monitor audit events, login history, and system activities.',
    {
      breadcrumbHtml: renderBreadcrumbNav([
        { label: 'Home', href: ROUTES.ADMINISTRATORS },
        { label: 'System Logs', active: true },
      ]),
    },
  )
}
