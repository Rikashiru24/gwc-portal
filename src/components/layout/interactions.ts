import { ArrowRight, createIcons, Megaphone, Menu, Newspaper, Search } from 'lucide'
import { ROUTES } from '../../app/routes'

export function setupSiteInteractions(root: HTMLElement): () => void {
  const homeHeader = root.querySelector<HTMLElement>('.site-header')
  const overlays = Array.from(root.querySelectorAll<HTMLElement>('[data-overlay]'))
  const openButtons = Array.from(root.querySelectorAll<HTMLElement>('[data-overlay-open]'))
  const closeButtons = Array.from(root.querySelectorAll<HTMLElement>('[data-overlay-close]'))
  const searchForm = root.querySelector<HTMLFormElement>('[data-search-form]')
  const searchInput = root.querySelector<HTMLInputElement>('[data-search-form] input[name="q"]')

  createIcons({
    icons: {
      ArrowRight,
      Megaphone,
      Menu,
      Newspaper,
      Search,
    },
  })

  const lockScroll = (): void => {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.setProperty('--scrollbar-compensation', `${Math.max(0, scrollbarWidth)}px`)
    document.body.style.paddingRight = 'var(--scrollbar-compensation)'
    document.body.classList.add('overlay-open')
  }

  const unlockScroll = (): void => {
    document.body.classList.remove('overlay-open')
    document.body.style.paddingRight = ''
    document.body.style.removeProperty('--scrollbar-compensation')
  }

  const hideAll = (): void => {
    overlays.forEach((overlay) => {
      overlay.classList.remove('is-open')
      overlay.setAttribute('aria-hidden', 'true')
    })
    unlockScroll()
  }

  const openOverlay = (name: string): void => {
    hideAll()
    const target = root.querySelector<HTMLElement>(`[data-overlay="${name}"]`)
    if (!target) return
    target.classList.add('is-open')
    target.setAttribute('aria-hidden', 'false')
    lockScroll()

    if (name === 'search' && searchInput) {
      requestAnimationFrame(() => searchInput.focus())
    }
  }

  const onOpenClick = (event: Event): void => {
    const trigger = event.currentTarget as HTMLElement
    const targetName = trigger.getAttribute('data-overlay-open')
    if (!targetName) return
    openOverlay(targetName)
  }

  const onCloseClick = (): void => {
    hideAll()
  }

  const onKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      hideAll()
    }
  }

  const onSearchSubmit = (event: Event): void => {
    event.preventDefault()
    const query = searchInput?.value.trim() ?? ''
    hideAll()
    const target = query ? `${ROUTES.SEARCH}?q=${encodeURIComponent(query)}` : ROUTES.SEARCH
    window.location.assign(target)
  }

  const updateHeaderScrollState = (): void => {
    if (!homeHeader) return
    if (homeHeader.classList.contains('site-header-solid')) {
      homeHeader.classList.remove('is-scrolled')
      return
    }
    homeHeader.classList.toggle('is-scrolled', window.scrollY > 24)
  }

  const markHeaderReady = (): void => {
    if (!homeHeader || homeHeader.classList.contains('is-ready')) return
    updateHeaderScrollState()
    requestAnimationFrame(() => {
      updateHeaderScrollState()
      homeHeader.classList.add('is-ready')
    })
  }

  const onWindowLoad = (): void => {
    markHeaderReady()
  }

  const onPageShow = (): void => {
    // Browser scroll restoration can be applied after initial script run.
    // Re-check once page is shown before enabling header transitions.
    markHeaderReady()
  }

  // Keep transitions disabled until scroll restoration has settled.
  updateHeaderScrollState()
  requestAnimationFrame(() => {
    updateHeaderScrollState()
    requestAnimationFrame(() => {
      updateHeaderScrollState()
      markHeaderReady()
    })
  })
  window.addEventListener('load', onWindowLoad, { once: true })
  window.addEventListener('pageshow', onPageShow, { once: true })

  openButtons.forEach((button) => button.addEventListener('click', onOpenClick))
  closeButtons.forEach((button) => button.addEventListener('click', onCloseClick))
  document.addEventListener('keydown', onKeydown)
  searchForm?.addEventListener('submit', onSearchSubmit)
  window.addEventListener('scroll', updateHeaderScrollState, { passive: true })

  return () => {
    openButtons.forEach((button) => button.removeEventListener('click', onOpenClick))
    closeButtons.forEach((button) => button.removeEventListener('click', onCloseClick))
    document.removeEventListener('keydown', onKeydown)
    searchForm?.removeEventListener('submit', onSearchSubmit)
    window.removeEventListener('scroll', updateHeaderScrollState)
    window.removeEventListener('load', onWindowLoad)
    window.removeEventListener('pageshow', onPageShow)
    unlockScroll()
  }
}


