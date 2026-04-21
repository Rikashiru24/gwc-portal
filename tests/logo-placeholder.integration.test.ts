import { describe, expect, it } from 'vitest'

import { applyLogoPlaceholders } from '../src/app/logo_placeholder'

class FakeClassList {
  private classes = new Set<string>()

  add(...tokens: string[]): void {
    tokens.forEach((token) => this.classes.add(token))
  }

  remove(...tokens: string[]): void {
    tokens.forEach((token) => this.classes.delete(token))
  }

  contains(token: string): boolean {
    return this.classes.has(token)
  }
}

class FakeImage {
  complete: boolean
  naturalWidth: number
  classList = new FakeClassList()
  decode?: () => Promise<void>
  private listeners: Record<'load' | 'error', Array<() => void>> = { load: [], error: [] }

  constructor(loaded: boolean) {
    this.complete = loaded
    this.naturalWidth = loaded ? 100 : 0
  }

  addEventListener(type: 'load' | 'error', cb: () => void): void {
    this.listeners[type].push(cb)
  }

  removeEventListener(type: 'load' | 'error', cb: () => void): void {
    this.listeners[type] = this.listeners[type].filter((listener) => listener !== cb)
  }

  emit(type: 'load' | 'error'): void {
    this.listeners[type].slice().forEach((cb) => cb())
  }
}

describe('logo placeholder integration', () => {
  it('applies placeholder only on first cache run and clears after load', () => {
    const memory = new Map<string, string>()
    const storage = {
      getItem: (key: string) => memory.get(key) ?? null,
      setItem: (key: string, value: string) => {
        memory.set(key, value)
      },
    }

    const pending = new FakeImage(false)
    const loaded = new FakeImage(true)
    const root = {
      querySelectorAll: (_selector: string) => [pending, loaded],
    }

    const timers: Array<() => void> = []
    const setTimeoutFn = (cb: () => void, _ms: number): number => {
      timers.push(cb)
      return timers.length
    }

    applyLogoPlaceholders(root, storage, setTimeoutFn)
    expect(pending.classList.contains('logo-placeholder')).toBe(true)
    expect(loaded.classList.contains('logo-placeholder')).toBe(false)

    pending.emit('load')
    expect(pending.classList.contains('is-loaded')).toBe(true)
    timers.forEach((cb) => cb())
    expect(pending.classList.contains('logo-placeholder')).toBe(false)
    expect(pending.classList.contains('is-loaded')).toBe(false)

    const secondPending = new FakeImage(false)
    const secondRoot = {
      querySelectorAll: (_selector: string) => [secondPending],
    }

    applyLogoPlaceholders(secondRoot, storage, setTimeoutFn)
    expect(secondPending.classList.contains('logo-placeholder')).toBe(false)
  })
})
