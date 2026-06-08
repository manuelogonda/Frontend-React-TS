import type { SpinnerProps } from "../types"
import { cn } from '../utils/cn'
export const Spinner: React.FC<SpinnerProps> = ({ isDark, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          sizeClasses[size],
          'border-4 rounded-full animate-spin',
          isDark
            ? 'border-gray-700 border-t-blue-500'
            : 'border-gray-200 border-t-blue-500'
        )}
      />
    </div>
  )
}

Spinner.displayName = 'Spinner'