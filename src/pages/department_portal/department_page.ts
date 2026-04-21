import '../../styles/department.css'
import { DEPARTMENT_SHELL_CONFIG, setupPortalShell } from '../../components/layout/_layout'
import { setupSharedModal } from '../../components/ui/modal'
import { schedulingService } from '../../features/scheduling/service'

export { renderdepartment_dashboard_page } from './dashboard/dashboard_page'
export { renderdepartment_schedule_page } from './schedule/schedule_page'

export function setupdepartment_page(root: HTMLElement): () => void {
  return setupPortalShell(root, DEPARTMENT_SHELL_CONFIG)
}

export function setupdepartment_schedule_page(root: HTMLElement): () => void {
  const cleanup = setupPortalShell(root, DEPARTMENT_SHELL_CONFIG)
  const modal = setupSharedModal(root, { modalSelector: '#department-schedule-request-modal' })
  let selectedScheduleId: string | null = null

  const onClick = (event: Event): void => {
    const target = event.target as HTMLElement | null
    const button = target?.closest<HTMLButtonElement>('[data-department-action="request"]')
    if (!button) return

    const row = button.closest<HTMLElement>('[data-schedule-id]')
    const scheduleId = row?.getAttribute('data-schedule-id')
    if (!scheduleId) return

    selectedScheduleId = scheduleId
    modal.setMode('form')
    modal.setOnConfirm(() => {
      if (!selectedScheduleId) return

      const reason =
        root.querySelector<HTMLTextAreaElement>('#department-change-reason-modal')?.value.trim() ||
        'Department requested schedule adjustment.'
      const proposedChange =
        root.querySelector<HTMLInputElement>('#department-proposed-change-modal')?.value.trim() ||
        'Adjust instructor/room allocation.'

      schedulingService.createModificationRequest({
        scheduleId: selectedScheduleId,
        requesterRole: 'DEPARTMENT',
        requesterId: 'dept-ccs',
        reason,
        proposedChange,
      })

      modal.close()
      window.location.reload()
    })

    modal.open({
      title: `Request Modification: ${scheduleId}`,
      confirmLabel: 'Submit Request',
      bodyHtml: `
        <div class="shared-modal-grid shared-modal-grid-1">
          <div class="form-floating">
            <input id="department-proposed-change-modal" class="form-control" placeholder="Proposed change" />
            <label for="department-proposed-change-modal">Proposed Change</label>
          </div>
          <div class="form-floating">
            <textarea id="department-change-reason-modal" class="form-control" placeholder="Reason" style="min-height: 110px;"></textarea>
            <label for="department-change-reason-modal">Reason</label>
          </div>
        </div>
      `,
    })
  }

  root.addEventListener('click', onClick)
  return () => {
    root.removeEventListener('click', onClick)
    modal.destroy()
    cleanup()
  }
}
