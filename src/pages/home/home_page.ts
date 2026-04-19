import gwcLogo from '../../assets/gwc_logo\.avif'
import gwcLogoWhite from '../../assets/gwc_logo_white\.avif'
import coverImage from '../../assets/cover\.avif'
import { ROUTES } from '../../app/routes'
import { buildMainHeaderActions, renderMainSiteHeader } from '../../components/layout/header'
import { renderMainSiteFooter } from '../../components/layout/footer'
import { renderHomeOverlays } from '../../components/layout/overlay'

export function renderhome_page(): string {
  return `
    <main id="main" class="site-page site-post-page">
      ${renderMainSiteHeader({
        brandHref: ROUTES.HOME,
        logoSrc: gwcLogo,
        logoAlt: 'Golden West Colleges logo',
        actions: buildMainHeaderActions(ROUTES.ANNOUNCEMENTS),
      })}

      ${renderHomeOverlays({
        logoSrc: gwcLogoWhite,
        logoAlt: 'Golden West Colleges logo',
        shortBrand: 'GWC, INC.',
        searchAriaLabel: 'Search site',
      })}

      <section class="site-cover site-post-cover" style="--site-cover-image: url('${coverImage}');" aria-label="Campus cover image">
        <div class="site-cover-overlay">
          <div class="container">
            <p class="site-post-eyebrow">Official GWC Updates</p>
            <h1 class="site-post-title">Golden West Colleges, Inc. in Action</h1>
          </div>
        </div>
      </section>

      <section id="global-arena" class="site-post-section site-post-section-light">
        <div class="container py-5">
          <h2 class="site-post-section-title">GWC in the Global Arena</h2>
          <article class="site-story-layout">
            <div class="site-story-main">
              <article class="site-story-card">
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80" alt="Students in a seminar event" class="site-story-image" />
                <div class="site-story-body">
                  <h3>Delegates Join International Academic Exchange Program</h3>
                  <p>
                    GWC strengthens global engagement through exchange dialogues, collaborative research sessions, and
                    international networking opportunities for students and faculty.
                  </p>
                  <a href="${ROUTES.ANNOUNCEMENTS}" class="site-story-link">Read More</a>
                </div>
              </article>
            </div>
            <aside class="site-story-side">
              <h4>More Stories:</h4>
              <a href="${ROUTES.ANNOUNCEMENTS}" class="site-mini-story">
                <img src="https://picsum.photos/seed/gwc-campus-event/320/320" alt="Campus event thumbnail" />
                <span>STEM Fair 2026</span>
              </a>
              <a href="${ROUTES.ANNOUNCEMENTS}" class="site-mini-story">
                <img src="https://images.unsplash.com/photo-1519452575417-564c1401ecc0?auto=format&fit=crop&w=640&q=80" alt="Research conference thumbnail" />
                <span>Research Colloquium</span>
              </a>
            </aside>
          </article>
        </div>
      </section>

      <section id="community" class="site-post-section site-post-section-dark">
        <div class="container py-5">
          <h2 class="site-post-section-title">GWC in the Community</h2>
          <article class="site-story-layout">
            <div class="site-story-main">
              <article class="site-story-card site-story-card-on-dark">
                <img src="https://picsum.photos/seed/gwc-community-extension/1200/720" alt="Community extension program" class="site-story-image" />
                <div class="site-story-body">
                  <h3>Youth Extension Program Reaches Local Barangays</h3>
                  <p>
                    Student volunteers and faculty facilitators continue literacy, livelihood, and mentoring activities with
                    partner communities across Alaminos.
                  </p>
                  <a href="${ROUTES.ANNOUNCEMENTS}" class="site-story-link">Read More</a>
                </div>
              </article>
            </div>
            <aside class="site-story-side site-story-side-on-dark">
              <h4>More Stories:</h4>
              <a href="${ROUTES.ANNOUNCEMENTS}" class="site-mini-story">
                <img src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=640&q=80" alt="Outreach program thumbnail" />
                <span>Reading Outreach</span>
              </a>
              <a href="${ROUTES.ANNOUNCEMENTS}" class="site-mini-story">
                <img src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=640&q=80" alt="Community service thumbnail" />
                <span>Campus Volunteers</span>
              </a>
            </aside>
          </article>
        </div>
      </section>

      <section id="events" class="site-post-section site-post-section-light">
        <div class="container py-5">
          <h2 class="site-post-section-title">Events</h2>
          <div class="site-events-list">
            <article class="site-event-item">
              <p class="site-event-date">May 10, 2026</p>
              <h3>Foundation Day Celebration</h3>
            </article>
            <article class="site-event-item">
              <p class="site-event-date">June 7, 2026</p>
              <h3>Alumni Homecoming</h3>
            </article>
            <article class="site-event-item">
              <p class="site-event-date">June 21, 2026</p>
              <h3>Research and Innovation Forum</h3>
            </article>
          </div>
        </div>
      </section>

      <section id="perspective" class="site-post-section site-post-section-primary">
        <div class="container py-5">
          <h2 class="site-post-section-title">Perspectives + Opinions</h2>
          <article class="site-story-card site-story-card-dark">
            <img src="https://images.unsplash.com/photo-1463320726281-696a485928c7?auto=format&fit=crop&w=1200&q=80" alt="Sustainability article" class="site-story-image" />
            <div class="site-story-body">
              <h3>Campus Sustainability and Student Leadership</h3>
              <p>
                A reflection on how student-led initiatives are shaping responsible campus culture and practical
                environmental action.
              </p>
              <a href="${ROUTES.ANNOUNCEMENTS}" class="site-story-link site-story-link-dark">Read More</a>
            </div>
          </article>
        </div>
      </section>

      <section id="careers" class="site-post-section site-post-section-light">
        <div class="container py-5">
          <header class="site-careers-head">
            <h2 class="site-post-section-title">Be Part of Our Team</h2>
            <p class="site-careers-subtitle">Currently no vacant position available</p>
            <p class="site-careers-caption">Available Faculty Positions:</p>
          </header>
          <div class="site-job-list site-job-list-wide">
            <article class="site-job-item"><span class="site-job-count">2</span><strong>Instructor I</strong><span>SG 12 - ₱ 22,500.00</span></article>
            <article class="site-job-item"><span class="site-job-count">1</span><strong>Instructor II</strong><span>SG 13 - ₱ 24,800.00</span></article>
            <article class="site-job-item"><span class="site-job-count">1</span><strong>Instructor III</strong><span>SG 14 - ₱ 27,200.00</span></article>
          </div>
        </div>
      </section>

      ${renderMainSiteFooter()}
    </main>
  `
}






