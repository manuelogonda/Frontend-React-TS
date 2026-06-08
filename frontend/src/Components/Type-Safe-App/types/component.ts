export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export interface SpinnerProps {
  isDark: boolean
  size?: 'sm' | 'md' | 'lg'
}

export interface ErrorAlertProps {
  isDark: boolean
  message: string
  onRetry?: () => void
}