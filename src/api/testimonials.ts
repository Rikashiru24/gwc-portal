import { testimonials as seedTestimonials, type Testimonial } from '../data/testimonials'

const STORAGE_KEY = 'gwc_admin_testimonials'

export type CreateTestimonialPayload = {
  name: string
  role: string
  message: string
  image: string
  category?: string
  featured?: boolean
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
}

export function getTestimonials(): Testimonial[] {
  if (!isBrowser()) return seedTestimonials
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return seedTestimonials

  try {
    const parsed = JSON.parse(raw) as Testimonial[]
    if (!Array.isArray(parsed)) return seedTestimonials
    return parsed
  } catch {
    return seedTestimonials
  }
}

export function createTestimonial(payload: CreateTestimonialPayload): Testimonial {
  const nextItem: Testimonial = {
    id: String(Date.now()),
    name: payload.name,
    role: payload.role,
    message: payload.message,
    image: payload.image,
    category: payload.category,
    featured: payload.featured,
  }

  const next = [nextItem, ...getTestimonials()]
  if (isBrowser()) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }

  return nextItem
}
