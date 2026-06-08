export interface Product {
  id: string | number
  name: string
  price: number
  category: string
  icon: string
  description: string
  details: string
  rating: number
  reviews: number
  inStock: boolean
  relatedProducts: (string | number)[]
}

export interface ProductCardProps {
  product: Product
  onClick?: () => void
  isDark: boolean
}

export interface ProductListProps {
  products: Product[]
  loading: boolean
  error: string | null
  onRetry: () => void
  isDark: boolean
}