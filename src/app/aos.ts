import type Aos from 'aos'

export const AOS_OPTIONS: Aos.AosOptions = {
  offset: 120,
  delay: 0,
  easing: 'ease-out-cubic',
  duration: 700,
  once: false,
}

type AosController = {
  init: (options?: Aos.AosOptions) => void
  refreshHard: () => void
}

type AosElementLike = {
  classList: Pick<DOMTokenList, 'remove'>
}

type AosRootLike = {
  querySelectorAll: (selector: string) => ArrayLike<AosElementLike> | Iterable<AosElementLike>
}

export function createAosRunner(
  aos: AosController,
  options: Aos.AosOptions = AOS_OPTIONS,
): () => void {
  let initialized = false

  return () => {
    if (!initialized) {
      aos.init(options)
      initialized = true
      return
    }

    aos.refreshHard()
  }
}

export function resetAosAnimatedState(root: AosRootLike): void {
  const animatedElements = Array.from(root.querySelectorAll('[data-aos]'))

  animatedElements.forEach((element) => {
    element.classList.remove('aos-animate')
  })
}

const notifyViewportChange = (): void => {
  if (typeof window === 'undefined') return

  window.requestAnimationFrame(() => {
    window.dispatchEvent(new Event('scroll'))
  })
}

export function syncAosAfterLoad(
  root: AosRootLike,
  runAos: () => void,
  notifyViewport: () => void = notifyViewportChange,
): void {
  resetAosAnimatedState(root)
  runAos()
  notifyViewport()
}
