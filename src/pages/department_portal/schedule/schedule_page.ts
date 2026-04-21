import { ROUTES } from '../../../app/routes'
import { DEPARTMENT_SHELL_CONFIG, renderPortalShell } from '../../../components/layout/_layout'
import { renderSharedModal } from '../../../components/ui/modal'
import { renderBreadcrumbNav } from '../../../components/ui/nav_breadcrumb'
import { schedulingService } from '../../../features/scheduling/service'

export function renderdepartment_schedule_page(): string {
  const schedules = schedulingService.listApprovedByDepartment('College of Computer Studies')

  return renderPortalShell(
    DEPARTMENT_SHELL_CONFIG,
    'schedule',
    `
      <section class="department-content">
        ${renderBreadcrumbNav([
          { label: 'Home', href: ROUTES.DEPARTMENT_DASHBOARD },
          { label: 'Schedule Review', active: true },
        ])}

        <article class="department-panel">
          <h3>Approved Schedule Review</h3>
          <p>Review department schedules and request modifications.</p>

          <div class="admin-table-wrap mt-3">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Schedule Code</th>
                  <th>Term</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${schedules
                  .map(
                    (schedule) => `
                      <tr data-department-row data-schedule-id="${schedule.id}">
                        <td>${schedule.id}</td>
                        <td>${schedule.term}</td>
                        <td>${schedule.status}</td>
                        <td><button class="btn btn-sm btn-outline-primary" data-department-action="request">Request Modification</button></td>
                      </tr>
                    `,
                  )
                  .join('')}
              </tbody>
            </table>
          </div>
        </article>
      </section>
      ${renderSharedModal('department-schedule-request-modal')}
    `,
  )
}
