import type { ProductCardProps } from "../types"
import { cn } from '../utils/cn'

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onClick,
  isDark
}) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'p-6 rounded-lg transition-all cursor-pointer transform hover:scale-105 hover:shadow-lg',
        isDark
          ? 'bg-gray-800 hover:bg-gray-700'
          : 'bg-gray-50 hover:bg-gray-100'
      )}
    >
      {/* Icon */}
      <div className="text-5xl mb-3 text-center">{product.icon}</div>

      {/* Name */}
      <h3 className="font-bold mb-2 text-lg line-clamp-2">
        {product.name}
      </h3>

      {/* Description */}
      <p className={cn(
        'text-sm mb-4 h-10 overflow-hidden',
        isDark ? 'text-gray-400' : 'text-gray-600'
      )}>
        {product.description}
      </p>

      {/* Price & Rating */}
      <div className="flex justify-between items-center mb-4">
        <p className={cn(
          'text-xl font-bold',
          isDark ? 'text-blue-400' : 'text-blue-600'
        )}>
          KES {product.price}
        </p>

        <div className="flex items-center gap-1">
          <span className="text-yellow-400">⭐</span>
          <span className="text-sm">{product.rating}</span>
        </div>
      </div>

      {/* Stock Status */}
      <div className="mb-4">
        <span className={cn(
          'inline-block px-3 py-1 rounded-full text-sm font-semibold',
          product.inStock
            ? isDark
              ? 'bg-green-900/30 text-green-400'
              : 'bg-green-100 text-green-700'
            : isDark
            ? 'bg-red-900/30 text-red-400'
            : 'bg-red-100 text-red-700'
        )}>
          {product.inStock ? '✅ In Stock' : '❌ Out of Stock'}
        </span>
      </div>

      {/* Button */}
      <button className={cn(
        'w-full py-2 rounded-lg font-medium transition-all',
        isDark
          ? 'bg-blue-600 text-white hover:bg-blue-700'
          : 'bg-blue-500 text-white hover:bg-blue-600'
      )}>
        View Details
      </button>
    </div>
  )
}

ProductCard.displayName = 'ProductCard'