export const LOGO_PLACEHOLDER_SESSION_KEY = 'gwc_logo_placeholder_shown_v1'

type StorageLike = Pick<Storage, 'getItem' | 'setItem'>

export function shouldRunLogoPlaceholder(
  storage: StorageLike | null | undefined,
  key = LOGO_PLACEHOLDER_SESSION_KEY,
): boolean {
  if (!storage) return true

  try {
    if (storage.getItem(key) === '1') {
      return false
    }
    storage.setItem(key, '1')
    return true
  } catch {
    return true
  }
}

export function isImageLoaded(image: Pick<HTMLImageElement, 'complete' | 'naturalWidth'>): boolean {
  return image.complete && image.naturalWidth > 0
}

type LogoImageLike = Pick<HTMLImageElement, 'complete' | 'naturalWidth' | 'classList' | 'decode'> & {
  addEventListener: (type: 'load' | 'error', cb: () => void, options?: { once?: boolean }) => void
  removeEventListener: (type: 'load' | 'error', cb: () => void) => void
}

type LogoRootLike = {
  querySelectorAll: (selector: string) => ArrayLike<LogoImageLike> | Iterable<LogoImageLike>
}

export function applyLogoPlaceholders(
  root: LogoRootLike,
  storage: StorageLike | null | undefined,
  setTimeoutFn: (cb: () => void, ms: number) => number = (cb, ms) => window.setTimeout(cb, ms),
): void {
  if (!shouldRunLogoPlaceholder(storage)) return

  const logoImages = Array.from(root.querySelectorAll('img[src*="gwc_logo"]'))

  logoImages.forEach((image) => {
    const markLoaded = (): void => {
      if (!image.classList.contains('logo-placeholder')) return
      image.classList.add('is-loaded')
      setTimeoutFn(() => {
        image.classList.remove('logo-placeholder', 'is-loaded')
      }, 120)
      image.removeEventListener('load', markLoaded)
      image.removeEventListener('error', markLoaded)
    }

    if (isImageLoaded(image)) {
      return
    }

    image.classList.add('logo-placeholder')
    image.addEventListener('load', markLoaded, { once: true })
    image.addEventListener('error', markLoaded, { once: true })

    if (typeof image.decode === 'function') {
      void image.decode().then(markLoaded, markLoaded)
    }
  })
}
