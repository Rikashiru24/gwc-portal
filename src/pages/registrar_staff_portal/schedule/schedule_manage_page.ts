import { ROUTES } from '../../../app/routes'
import { REGISTRAR_STAFF_SHELL_CONFIG, renderPortalShell } from '../../../components/layout/_layout'
import { renderAdminBreadcrumbNav } from '../../../components/ui/nav_breadcrumb'
import { renderSharedPagination, setupSharedPagination } from '../../../components/ui/pagination'
import { renderSharedPopover } from '../../../components/ui/popover'
import { renderSharedModal, setupSharedModal } from '../../../components/ui/modal'
import { schedulingService, statusToBadgeClass, statusToLabel } from '../../../features/scheduling/service'

function renderRows(): string {
  return schedulingService.listSchedules().map((schedule) => {
    const current = schedule.versions.find((version) => version.versionNumber === schedule.currentVersion) ?? schedule.versions[0]
    const first = current.snapshot[0]
    const searchValue = [
      schedule.id,
      schedule.department,
      schedule.term,
      first?.subjectCode ?? '',
      first?.section ?? '',
      first?.faculty ?? '',
      schedule.status,
    ]
      .join(' ')
      .toLowerCase()

    return `
      <tr data-schedule-row data-schedule-id="${schedule.id}" data-search-value="${searchValue}">
        <td>${schedule.id}</td>
        <td>${schedule.term}</td>
        <td>${schedule.department}</td>
        <td>v${schedule.currentVersion}</td>
        <td><span class="admin-pill ${statusToBadgeClass(schedule.status)}">${statusToLabel(schedule.status)}</span></td>
        <td>${schedule.adminFeedback || '-'}</td>
        <td>
          ${renderSharedPopover({
            ariaLabel: 'Schedule row actions',
            actionDataAttribute: 'data-schedule-action',
            actions: [
              { label: 'View', value: 'view' },
              { label: 'Submit', value: 'submit' },
              { label: 'Finalize', value: 'finalize' },
              { label: 'Compare v1', value: 'compare' },
            ],
          })}
        </td>
      </tr>
    `
  }).join('')
}

export function renderregistrar_staff_schedule_manage_page(): string {
  const total = schedulingService.listSchedules().length
  return renderPortalShell(
    REGISTRAR_STAFF_SHELL_CONFIG,
    'schedule',
    `
      <section class="registrar_staff-content">
        ${renderAdminBreadcrumbNav([
          { label: 'Home', href: ROUTES.REGISTRAR_STAFF_DASHBOARD },
          { label: 'Schedule', href: ROUTES.REGISTRAR_STAFF_SCHEDULE },
          { label: 'Manage Schedule', active: true },
        ])}

        <article class="admin-student-page-shell">
          <header class="admin-student-head">
            <h2>Manage Schedule</h2>
            <p>Total Schedules: <strong>${total}</strong></p>
          </header>

          <section class="admin-student-toolbar">
            <div class="admin-student-toolbar-actions">
              <a href="${ROUTES.REGISTRAR_STAFF_SCHEDULE_CREATE}" class="btn btn-primary btn-sm">+ Create Schedule</a>
            </div>
            <label class="admin-directory-search admin-student-search">
              <span class="admin-search-icon" aria-hidden="true"><i class="bi bi-search"></i></span>
              <input type="search" placeholder="Search schedules" aria-label="Search schedules" data-schedule-search />
            </label>
          </section>

          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Term</th>
                  <th>Department</th>
                  <th>Version</th>
                  <th>Status</th>
                  <th>Admin Feedback</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                ${renderRows()}
                <tr class="d-none" data-schedule-empty-row>
                  <td colspan="7" class="text-center py-3">No schedules found.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="admin-student-pagination" data-schedule-pagination>
            ${renderSharedPagination()}
          </div>

          <section class="mt-4">
            <h3 class="h6">Department / Faculty Modification Requests</h3>
            <div class="admin-table-wrap">
              <table class="admin-table">
                <thead>
                  <tr>
                    <th>Request ID</th>
                    <th>Schedule</th>
                    <th>Role</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${schedulingService
                    .listModificationRequests()
                    .map(
                      (request) => `
                        <tr data-mod-row data-mod-id="${request.id}">
                          <td>${request.id}</td>
                          <td>${request.scheduleId}</td>
                          <td>${request.requesterRole}</td>
                          <td>${request.reason}</td>
                          <td>${request.status}</td>
                          <td>
                            <button class="btn btn-sm btn-success" data-mod-action="accept">Accept</button>
                            <button class="btn btn-sm btn-outline-danger" data-mod-action="reject">Reject</button>
                          </td>
                        </tr>
                      `,
                    )
                    .join('')}
                </tbody>
              </table>
            </div>
          </section>
        </article>
      </section>
      ${renderSharedModal('schedule-manage-modal')}
    `,
  )
}

export function setupschedule_manage_page(root: HTMLElement): () => void {
  const modal = setupSharedModal(root, { modalSelector: '#schedule-manage-modal' })
  const searchInput = root.querySelector<HTMLInputElement>('[data-schedule-search]')
  const allRows = Array.from(root.querySelectorAll<HTMLTableRowElement>('[data-schedule-row]'))
  const emptyRow = root.querySelector<HTMLTableRowElement>('[data-schedule-empty-row]')
  const paginationRoot = root.querySelector<HTMLElement>('[data-schedule-pagination]')
  const pageSize = 10
  let currentPage = 1
  let filteredRows = [...allRows]

  const pagination = paginationRoot
    ? setupSharedPagination(paginationRoot, {
        pageSize,
        totalItems: filteredRows.length,
        currentPage,
        onPageChange: (page): void => {
          currentPage = page
          renderVisibleRows()
        },
      })
    : null

  const renderVisibleRows = (): void => {
    allRows.forEach((row) => row.classList.add('d-none'))
    const totalItems = filteredRows.length
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
    if (currentPage > totalPages) currentPage = totalPages

    const start = (currentPage - 1) * pageSize
    const end = start + pageSize
    filteredRows.slice(start, end).forEach((row) => row.classList.remove('d-none'))
    emptyRow?.classList.toggle('d-none', totalItems > 0)
    pagination?.update({ totalItems, currentPage })
  }

  const applySearch = (): void => {
    const query = (searchInput?.value ?? '').trim().toLowerCase()
    filteredRows = allRows.filter((row) => (row.dataset.searchValue ?? '').includes(query))
    currentPage = 1
    renderVisibleRows()
  }

  const renderScheduleDetail = (scheduleId: string): string => {
    const schedule = schedulingService.listSchedules().find((item) => item.id === scheduleId)
    if (!schedule) return '<p class="mb-0">Schedule not found.</p>'

    const current = schedule.versions.find((version) => version.versionNumber === schedule.currentVersion) ?? schedule.versions[0]
    return `
      <p><strong>Status:</strong> ${statusToLabel(schedule.status)}</p>
      <p><strong>Registrar Notes:</strong> ${schedule.registrarNotes || '-'}</p>
      <p><strong>Admin Feedback:</strong> ${schedule.adminFeedback || '-'}</p>
      <p><strong>Items in v${schedule.currentVersion}:</strong> ${current.snapshot.length}</p>
      <ul>${current.snapshot.slice(0, 5).map((item) => `<li>${item.subjectCode} ${item.section} ${item.day} ${item.startTime}-${item.endTime} (${item.room})</li>`).join('')}</ul>
    `
  }

  const onActionClick = (event: Event): void => {
    const target = event.target as HTMLElement | null
    const modBtn = target?.closest<HTMLButtonElement>('[data-mod-action]')
    if (modBtn) {
      const modRow = modBtn.closest<HTMLTableRowElement>('[data-mod-row]')
      const requestId = modRow?.dataset.modId
      if (!requestId) return

      schedulingService.resolveModificationRequest(requestId, modBtn.dataset.modAction === 'accept', 'registrar-1')
      modal.setMode('confirm')
      modal.setOnConfirm(() => window.location.reload())
      modal.open({
        title: 'Request Updated',
        confirmLabel: 'Refresh',
        bodyHtml: '<p class="mb-0">Modification request status updated.</p>',
      })
      return
    }

    const actionBtn = target?.closest<HTMLButtonElement>('[data-schedule-action]')
    if (!actionBtn) return

    const row = actionBtn.closest<HTMLTableRowElement>('[data-schedule-row]')
    if (!row) return

    const scheduleId = row.dataset.scheduleId
    if (!scheduleId) return

    const action = actionBtn.dataset.scheduleAction

    if (action === 'view') {
      modal.setMode('form')
      modal.setOnConfirm(null)
      modal.open({ title: `Schedule ${scheduleId}`, bodyHtml: renderScheduleDetail(scheduleId), hideConfirm: true })
      return
    }

    if (action === 'submit') {
      schedulingService.submitForApproval(scheduleId, 'registrar-1', 'Resubmitted from manage page')
      modal.setMode('confirm')
      modal.setOnConfirm(() => window.location.reload())
      modal.open({
        title: 'Submitted',
        confirmLabel: 'Refresh',
        bodyHtml: '<p class="mb-0">Schedule submitted to admin review queue.</p>',
      })
      return
    }

    if (action === 'finalize') {
      const done = schedulingService.finalizeSchedule(scheduleId, 'admin-1')
      modal.setMode('confirm')
      modal.setOnConfirm(() => window.location.reload())
      modal.open({
        title: done ? 'Finalized' : 'Cannot Finalize',
        confirmLabel: 'Refresh',
        bodyHtml: `<p class="mb-0">${done ? 'Schedule moved to FINALIZED.' : 'Only APPROVED schedules can be finalized.'}</p>`,
      })
      return
    }

    if (action === 'compare') {
      const diff = schedulingService.compareVersions(scheduleId, 1, 2)
      modal.setMode('form')
      modal.setOnConfirm(null)
      modal.open({
        title: `Version Diff ${scheduleId}`,
        bodyHtml: diff.length
          ? `<ul>${diff.map((line) => `<li>${line}</li>`).join('')}</ul>`
          : '<p class="mb-0">No comparable changes yet (need at least v2).</p>',
        hideConfirm: true,
      })
    }

  }

  searchInput?.addEventListener('input', applySearch)
  root.addEventListener('click', onActionClick)
  renderVisibleRows()

  return () => {
    modal.destroy()
    pagination?.destroy()
    searchInput?.removeEventListener('input', applySearch)
    root.removeEventListener('click', onActionClick)
  }
}
