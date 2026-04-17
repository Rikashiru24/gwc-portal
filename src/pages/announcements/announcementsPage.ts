import gwcLogo from '../../assets/gwc-logo.png'
import gwcLogoWhite from '../../assets/gwc-logo-white.png'
import { ROUTES } from '../../app/routes'
import { renderMainSiteHeader } from '../../components/siteHeader'
import { renderHomeOverlays } from '../../components/siteOverlay'

const cards = [
  {
    title: 'Enrollment Advisory for New Students',
    date: 'August 14, 2026',
    text: 'Please prepare your original credentials and complete online pre-registration before visiting campus.',
  },
  {
    title: 'Scholarship Screening Schedule',
    date: 'August 10, 2026',
    text: 'Qualified applicants may proceed to the Guidance Office for screening and interview schedule confirmation.',
  },
  {
    title: 'Faculty Consultation Week',
    date: 'August 05, 2026',
    text: 'Departments are opening consultation sessions to guide students on subject loads and academic pathways.',
  },
]

export function renderAnnouncementsPage(): string {
  return `
    <main class="ann-page">
      ${renderMainSiteHeader({
        brandHref: ROUTES.HOME,
        logoSrc: gwcLogo,
        logoAlt: 'Golden West Colleges logo',
        actions: [
          { type: 'button', icon: 'search', label: 'SEARCH', attrs: 'data-overlay-open="search"' },
          { type: 'button', icon: 'menu', label: 'MENU', attrs: 'data-overlay-open="menu"' },
        ],
      })}

      ${renderHomeOverlays({
        logoSrc: gwcLogoWhite,
        logoAlt: 'Golden West Colleges logo',
        shortBrand: 'GWC, INC.',
        searchAriaLabel: 'Search announcements',
      })}

      <section class="ann-title-block">
        <h1>ANNOUNCEMENTS <i data-lucide="megaphone"></i></h1>
      </section>

      <section class="ann-highlight">
        <p>No Recent Announcement Found</p>
      </section>

      <section class="ann-list-wrap">
        <h2>Other Announcements:</h2>
        <div class="ann-grid">
          ${cards
            .map(
              (card) => `
            <article class="ann-card">
              <div class="ann-card-top"></div>
              <div class="ann-card-body">
                <p class="ann-card-date">${card.date}</p>
                <h3>${card.title}</h3>
                <p>${card.text}</p>
              </div>
            </article>
          `,
            )
            .join('')}
        </div>
      </section>
    </main>
  `
}


