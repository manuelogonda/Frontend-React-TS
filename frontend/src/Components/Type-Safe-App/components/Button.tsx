import { forwardRef } from "react"
import { cn } from '../utils/cn'
import type { ButtonProps } from "../types"
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = cn(
      'font-semibold rounded-lg transition-all focus:outline-none',
      'focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
    )

    const variantStyles = {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      danger: 'bg-red-500 text-white hover:bg-red-600'
    }

    const sizeStyles = {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
          className
        )}
        {...props}
      >
        {isLoading ? '⏳ Loading...' : children}
      </button>
    )
  }
)

Button.displayName = 'Button'