import { STUDENT_SHELL_CONFIG, renderPortalShell } from '../../../components/layout/_layout'
import { schedulingService } from '../../../features/scheduling/service'

export function renderstudent_dashboard_page(): string {
  const notes = schedulingService.listNotifications('STUDENT').slice(0, 5)

  return renderPortalShell(
    STUDENT_SHELL_CONFIG,
    'dashboard',
    `
      <section class="student-content">
        <article class="student-panel">
          <h3>Student Dashboard</h3>
          <p>Latest schedule notifications.</p>
          <ul>${notes.map((note) => `<li>${note.message}</li>`).join('') || '<li>No updates yet.</li>'}</ul>
        </article>
      </section>
    `,
  )
}
