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
