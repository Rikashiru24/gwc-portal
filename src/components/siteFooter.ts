type MainSiteFooterOptions = {
  copyrightText?: string
  addressText?: string
}

type PortalSiteFooterOptions = {
  text?: string
}

export function renderMainSiteFooter(options: MainSiteFooterOptions = {}): string {
  const copyrightText = options.copyrightText ?? '© Golden West Colleges, Inc.'
  const addressText = options.addressText ?? 'San Jose Drive, Alaminos City, Pangasinan 2404'

  return `
      <footer class="home-footer">
        <div class="container py-4 d-flex flex-column flex-md-row justify-content-between gap-2">
          <p class="mb-0">${copyrightText}</p>
          <p class="mb-0">${addressText}</p>
        </div>
      </footer>
  `
}

export function renderPortalSiteFooter(options: PortalSiteFooterOptions = {}): string {
  const text = options.text ?? 'All rights reserved, GOLDEN WEST COLLEGES, INC.'

  return `
      <footer class="portal-footer">
        <p class="mb-0">${text}</p>
      </footer>
  `
}
