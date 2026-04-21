import { ROUTES } from '../../../app/routes'
import { REGISTRAR_STAFF_SHELL_CONFIG, renderPortalShell } from '../../../components/layout/_layout'
import { renderAdminBreadcrumbNav } from '../../../components/ui/nav_breadcrumb'
import { schedulingService } from '../../../features/scheduling/service'

export function renderregistrar_staff_schedule_page(): string {
  const analytics = schedulingService.getAnalytics()
  const notifications = schedulingService.listNotifications('REGISTRAR').slice(0, 5)
  const pending = schedulingService.listPendingApprovals().slice(0, 5)
  const schedules = schedulingService.listSchedules().slice(0, 6)

  return renderPortalShell(
    REGISTRAR_STAFF_SHELL_CONFIG,
    'schedule',
    `
      <section class="registrar_staff-content">
        ${renderAdminBreadcrumbNav([
          { label: 'Home', href: ROUTES.REGISTRAR_STAFF_DASHBOARD },
          { label: 'Schedule', active: true },
        ])}

        <article class="registrar-dashboard">
          <header class="registrar-dashboard-head">
            <div>
              <h2>Schedule Workflow</h2>
              <p>Build, review, and release schedules with full visibility on conflicts and approvals.</p>
            </div>
            <div class="registrar-dashboard-actions">
              <a href="${ROUTES.REGISTRAR_STAFF_SCHEDULE_MANAGE}" class="btn btn-outline-primary">Manage Schedule</a>
              <a href="${ROUTES.REGISTRAR_STAFF_SCHEDULE_CREATE}" class="btn btn-primary">Create Schedule</a>
            </div>
          </header>

          <section class="registrar-kpi-grid mt-3">
            <article class="registrar-kpi-card"><p>Total Schedules</p><strong>${analytics.totalSchedules}</strong></article>
            <article class="registrar-kpi-card"><p>Pending Approvals</p><strong>${analytics.pendingApprovals}</strong></article>
            <article class="registrar-kpi-card"><p>Unresolved Conflicts</p><strong>${analytics.unresolvedConflicts}</strong></article>
            <article class="registrar-kpi-card"><p>Completion Rate</p><strong>${analytics.completionRate.toFixed(1)}%</strong></article>
            <article class="registrar-kpi-card"><p>Finalized</p><strong>${analytics.finalizedSchedules}</strong></article>
            <article class="registrar-kpi-card"><p>Avg Approval Time</p><strong>${analytics.avgApprovalHours.toFixed(2)}h</strong></article>
          </section>

          <section class="registrar-dashboard-grid mt-3">
            <article class="registrar-dashboard-card">
              <h4>Pending Review Queue</h4>
              <ul class="registrar-list">
                ${
                  pending.length
                    ? pending.map((item) => `<li><strong>${item.id}</strong> - ${item.department} - ${item.status}</li>`).join('')
                    : '<li>No pending schedules.</li>'
                }
              </ul>
            </article>

            <article class="registrar-dashboard-card">
              <h4>Recent Schedule Batches</h4>
              <ul class="registrar-list">
                ${
                  schedules.length
                    ? schedules.map((item) => `<li><strong>${item.id}</strong> - v${item.currentVersion} - ${item.status}</li>`).join('')
                    : '<li>No schedules yet.</li>'
                }
              </ul>
            </article>

            <article class="registrar-dashboard-card">
              <h4>Recent Registrar Notifications</h4>
              <ul class="registrar-list">
                ${notifications.length ? notifications.map((note) => `<li>${note.message}</li>`).join('') : '<li>No notifications yet.</li>'}
              </ul>
            </article>

            <article class="registrar-dashboard-card">
              <h4>Quick Actions</h4>
              <div class="registrar-quick-links">
                <a href="${ROUTES.REGISTRAR_STAFF_SCHEDULE_CREATE}" class="btn btn-sm btn-outline-primary">New Schedule Draft</a>
                <a href="${ROUTES.REGISTRAR_STAFF_SCHEDULE_MANAGE}" class="btn btn-sm btn-outline-primary">Process Requests</a>
                <a href="${ROUTES.REGISTRAR_STAFF_REQUESTS}" class="btn btn-sm btn-outline-primary">Open Requests</a>
              </div>
            </article>
          </section>
        </article>
      </section>
    `,
  )
}
