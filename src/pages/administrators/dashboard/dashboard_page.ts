import { ADMIN_SHELL_CONFIG, renderPortalShell } from '../../../components/layout/_layout'
import { renderSharedModal } from '../../../components/ui/modal'
import { renderSharedPopover } from '../../../components/ui/popover'
import { schedulingService } from '../../../features/scheduling/service'

export function renderadministrators_dashboard_page(): string {
  const pending = schedulingService.listPendingApprovals()

  return renderPortalShell(
    ADMIN_SHELL_CONFIG,
    'dashboard',
    `
      <section class="admin-content">
        <article class="admin-panel">
          <h3>Approval Dashboard</h3>
          <p>Pending approvals: <strong>${pending.length}</strong></p>
          <div class="admin-table-wrap mt-3">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Schedule ID</th>
                  <th>Department</th>
                  <th>Term</th>
                  <th>Status</th>
                  <th>Registrar Notes</th>
                  <th>Decision</th>
                </tr>
              </thead>
              <tbody>
                ${pending
                  .map(
                    (schedule) => `
                      <tr data-admin-schedule-row data-schedule-id="${schedule.id}">
                        <td>${schedule.id}</td>
                        <td>${schedule.department}</td>
                        <td>${schedule.term}</td>
                        <td>${schedule.status}</td>
                        <td>${schedule.registrarNotes || '-'}</td>
                        <td>
                          ${renderSharedPopover({
                            ariaLabel: 'Approval actions',
                            triggerLabel: '<i class="bi bi-three-dots-vertical" aria-hidden="true"></i>',
                            actionDataAttribute: 'data-admin-action',
                            actions: [
                              { label: 'Approve', value: 'approve' },
                              { label: 'Reject', value: 'reject', danger: true },
                              { label: 'Feedback', value: 'feedback' },
                            ],
                          })}
                        </td>
                      </tr>
                    `,
                  )
                  .join('')}
              </tbody>
            </table>
          </div>
        </article>
      </section>
      ${renderSharedModal('admin-decision-modal')}
    `,
  )
}
