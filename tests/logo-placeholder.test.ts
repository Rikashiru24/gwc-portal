import { describe, expect, it } from 'vitest'

import {
  isImageLoaded,
  LOGO_PLACEHOLDER_SESSION_KEY,
  shouldRunLogoPlaceholder,
} from '../src/app/logo_placeholder'

describe('logo placeholder helpers', () => {
  it('runs placeholder only once per storage key', () => {
    const memory = new Map<string, string>()
    const storage = {
      getItem: (key: string) => memory.get(key) ?? null,
      setItem: (key: string, value: string) => {
        memory.set(key, value)
      },
    }

    expect(shouldRunLogoPlaceholder(storage)).toBe(true)
    expect(shouldRunLogoPlaceholder(storage)).toBe(false)
    expect(memory.get(LOGO_PLACEHOLDER_SESSION_KEY)).toBe('1')
  })

  it('uses custom cache key without affecting default key state', () => {
    const memory = new Map<string, string>()
    const storage = {
      getItem: (key: string) => memory.get(key) ?? null,
      setItem: (key: string, value: string) => {
        memory.set(key, value)
      },
    }

    expect(shouldRunLogoPlaceholder(storage, 'custom-key')).toBe(true)
    expect(shouldRunLogoPlaceholder(storage, 'custom-key')).toBe(false)
    expect(shouldRunLogoPlaceholder(storage)).toBe(true)
  })

  it('still runs when storage cache access throws', () => {
    const storage = {
      getItem: (_key: string) => {
        throw new Error('storage blocked')
      },
      setItem: (_key: string, _value: string) => {
        throw new Error('storage blocked')
      },
    }

    expect(shouldRunLogoPlaceholder(storage)).toBe(true)
  })

  it('runs placeholder when storage is unavailable', () => {
    expect(shouldRunLogoPlaceholder(null)).toBe(true)
  })

  it('treats image as loaded only when complete and naturalWidth > 0', () => {
    expect(isImageLoaded({ complete: true, naturalWidth: 10 })).toBe(true)
    expect(isImageLoaded({ complete: true, naturalWidth: 0 })).toBe(false)
    expect(isImageLoaded({ complete: false, naturalWidth: 10 })).toBe(false)
  })
})
