import { describe, expect, it, vi } from 'vitest'
import { AOS_OPTIONS, createAosRunner, resetAosAnimatedState, syncAosAfterLoad } from '../src/app/aos'

describe('AOS sync helpers', () => {
  it('initializes AOS on first run with shared options', () => {
    const aos = {
      init: vi.fn(),
      refreshHard: vi.fn(),
    }

    const runAos = createAosRunner(aos)
    runAos()

    expect(aos.init).toHaveBeenCalledTimes(1)
    expect(aos.init).toHaveBeenCalledWith(AOS_OPTIONS)
    expect(aos.refreshHard).not.toHaveBeenCalled()
  })

  it('refreshes AOS on subsequent runs', () => {
    const aos = {
      init: vi.fn(),
      refreshHard: vi.fn(),
    }

    const runAos = createAosRunner(aos)
    runAos()
    runAos()

    expect(aos.init).toHaveBeenCalledTimes(1)
    expect(aos.refreshHard).toHaveBeenCalledTimes(1)
  })

  it('removes animated classes from all AOS nodes', () => {
    const first = { classList: { remove: vi.fn() } }
    const second = { classList: { remove: vi.fn() } }
    const root = {
      querySelectorAll: vi.fn(() => [first, second]),
    }

    resetAosAnimatedState(root)

    expect(root.querySelectorAll).toHaveBeenCalledWith('[data-aos]')
    expect(first.classList.remove).toHaveBeenCalledWith('aos-animate')
    expect(second.classList.remove).toHaveBeenCalledWith('aos-animate')
  })

  it('resets state and runs AOS after load', () => {
    const runAos = vi.fn()
    const notifyViewport = vi.fn()
    const root = {
      querySelectorAll: vi.fn(() => [{ classList: { remove: vi.fn() } }]),
    }

    syncAosAfterLoad(root, runAos, notifyViewport)

    expect(root.querySelectorAll).toHaveBeenCalledWith('[data-aos]')
    expect(runAos).toHaveBeenCalledTimes(1)
    expect(notifyViewport).toHaveBeenCalledTimes(1)
  })
})
