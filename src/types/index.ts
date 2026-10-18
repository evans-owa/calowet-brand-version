export interface Product {
  id: string
  slug: string
  nameKey: string
  descriptionKey: string
  category: ProductCategory
  image: string
  imageAlt?: string   // descriptive alt text for screen readers + SEO
  brand?: string
  featured?: boolean
}

export type ProductCategory =
  | 'air-conditioner'
  | 'refrigerator'
  | 'freezer'
  | 'heating'
  | 'commercial-cooling'
  | 'ventilation'

export interface Service {
  id: string
  icon: string
  titleKey: string
  descriptionKey: string
}

export type CustomerSegment = {
  id: string
  icon: string
  titleKey: string
  descriptionKey: string
}

export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
}

export type Locale = 'en' | 'sw'
