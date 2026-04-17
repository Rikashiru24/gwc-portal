import gwcLogo from '../../assets/gwc-logo.png'
import gwcLogoWhite from '../../assets/gwc-logo-white.png'
import coverImage from '../../assets/cover.png'
import { ROUTES } from '../../app/routes'
import { renderMainSiteFooter } from '../../components/siteFooter'
import { buildMainHeaderActions, renderMainSiteHeader } from '../../components/siteHeader'
import { renderHomeOverlays } from '../../components/siteOverlay'

export function renderHomePage(): string {
  return `
    <main class="home-page">
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

      <section class="home-cover" style="--home-cover-image: url('${coverImage}');" aria-label="Campus cover image"></section>

      <section class="home-hero">
        <div class="container py-5">
          <div class="row align-items-center g-4">
            <div class="col-12 col-lg-7">
              <p class="home-kicker">Future-Ready Education</p>
              <h1 class="home-hero-title">Shaping competent, service-driven, and globally prepared graduates.</h1>
              <p class="home-hero-text">
                Golden West Colleges empowers learners through academic excellence, community engagement, and
                industry-aligned programs.
              </p>
              <div class="d-flex flex-wrap gap-2">
                <a href="${ROUTES.LOGIN}" class="btn btn-warning px-4 fw-semibold">Go to Portal</a>
                <a href="#academics" class="btn btn-outline-light px-4">View Programs</a>
              </div>
            </div>
            <div class="col-12 col-lg-5">
              <article class="home-feature-card">
                <h2>Admissions 2026</h2>
                <p>Applications are now open for incoming freshmen and transferees.</p>
                <ul class="mb-0">
                  <li>Online pre-registration</li>
                  <li>Scholarship screening</li>
                  <li>On-campus enrollment support</li>
                </ul>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section id="academics" class="home-section home-section-light">
        <div class="container py-5">
          <h2 class="home-section-title">Academics</h2>
          <div class="row g-3">
            <div class="col-12 col-md-6 col-lg-3"><article class="home-tile"><h3>Business Education</h3><p>BSA, BSMA, and entrepreneurship pathways.</p></article></div>
            <div class="col-12 col-md-6 col-lg-3"><article class="home-tile"><h3>Computing Studies</h3><p>BSIT and practical digital skills training.</p></article></div>
            <div class="col-12 col-md-6 col-lg-3"><article class="home-tile"><h3>Teacher Education</h3><p>Strong licensure preparation and field practice.</p></article></div>
            <div class="col-12 col-md-6 col-lg-3"><article class="home-tile"><h3>Hospitality & Tourism</h3><p>Industry immersion and global-ready experience.</p></article></div>
          </div>
        </div>
      </section>

      <section id="community" class="home-section home-section-dark">
        <div class="container py-5">
          <h2 class="home-section-title text-white">Community and Extension</h2>
          <p class="home-section-copy text-white-50 mb-4">
            We strengthen local development through outreach, research collaboration, and student-led service initiatives.
          </p>
          <div class="row g-3">
            <div class="col-12 col-lg-4"><article class="home-news-card"><h3>Workforce Development</h3><p>Career readiness and partner-employer matching programs.</p></article></div>
            <div class="col-12 col-lg-4"><article class="home-news-card"><h3>Research Initiatives</h3><p>Applied studies designed to support local policy and innovation.</p></article></div>
            <div class="col-12 col-lg-4"><article class="home-news-card"><h3>Student Services</h3><p>Guidance, health, and library services for holistic growth.</p></article></div>
          </div>
        </div>
      </section>

      <section id="partners" class="home-section home-section-light">
        <div class="container py-5">
          <h2 class="home-section-title">Institutional Partners</h2>
          <div class="home-partner-grid">
            <span>Industry Partners</span>
            <span>Government Units</span>
            <span>Academic Networks</span>
            <span>International Linkages</span>
            <span>Community Organizations</span>
          </div>
        </div>
      </section>

      ${renderMainSiteFooter()}
    </main>
  `
}





