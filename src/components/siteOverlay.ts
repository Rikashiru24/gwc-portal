import { ROUTES } from '../app/routes'

type HomeOverlayOptions = {
  logoSrc: string
  logoAlt: string
  shortBrand: string
  searchAriaLabel: string
}

export function renderHomeOverlays(options: HomeOverlayOptions): string {
  return `
      <section class="home-overlay" data-overlay="menu" aria-hidden="true">
        <div class="home-overlay-backdrop" data-overlay-close></div>
        <div class="home-overlay-panel home-overlay-panel-menu">
          <div class="home-overlay-topbar">
            <a href="${ROUTES.HOME}" class="home-overlay-brand text-decoration-none" data-overlay-close>
              <img src="${options.logoSrc}" alt="${options.logoAlt}" class="home-overlay-brand-logo" />
              <span class="home-overlay-brand-title home-overlay-brand-title-full">GOLDEN WEST COLLEGES, INC.</span>
              <span class="home-overlay-brand-title home-overlay-brand-title-short">${options.shortBrand}</span>
            </a>
            <button type="button" class="home-overlay-close" data-overlay-close aria-label="Close menu">×</button>
          </div>
          <div class="home-overlay-accent-line"></div>
          <div class="home-overlay-menu-layout">
            <nav class="home-overlay-menu-col">
              <a href="#academics" data-overlay-close>ACADEMICS</a>
              <a href="${ROUTES.LOGIN}" data-overlay-close>STUDENT PORTAL</a>
              <a href="#partners" data-overlay-close>ABOUT GWC</a>
            </nav>
            <div class="home-overlay-menu-divider" aria-hidden="true"></div>
            <div class="home-overlay-menu-blank" aria-hidden="true"></div>
          </div>
        </div>
      </section>

      <section class="home-overlay" data-overlay="search" aria-hidden="true">
        <div class="home-overlay-backdrop" data-overlay-close></div>
        <div class="home-overlay-panel home-overlay-panel-search">
          <div class="home-overlay-topbar">
            <a href="${ROUTES.HOME}" class="home-overlay-brand text-decoration-none" data-overlay-close>
              <img src="${options.logoSrc}" alt="${options.logoAlt}" class="home-overlay-brand-logo" />
              <span class="home-overlay-brand-title home-overlay-brand-title-full">GOLDEN WEST COLLEGES, INC.</span>
              <span class="home-overlay-brand-title home-overlay-brand-title-short">${options.shortBrand}</span>
            </a>
            <button type="button" class="home-overlay-close" data-overlay-close aria-label="Close search">×</button>
          </div>
          <div class="home-overlay-accent-line"></div>
          <div class="home-search-center">
            <form class="home-search-form" data-search-form autocomplete="off">
              <input type="search" name="q" placeholder="type keyword(s) here" aria-label="${options.searchAriaLabel}" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" required />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>
      </section>
  `
}
