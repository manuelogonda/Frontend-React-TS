import type { ErrorAlertProps } from '../types'
import { cn } from '../utils/cn'
import { Button } from './Button'
export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  isDark,
  message,
  onRetry
}) => {
  return (
    <div className={cn(
      'p-6 rounded-lg border-l-4',
      isDark
        ? 'bg-red-900/20 border-red-500 text-red-400'
        : 'bg-red-50 border-red-500 text-red-700'
    )}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-lg mb-2">⚠️ Error</h3>
          <p className="text-sm leading-relaxed">{message}</p>
        </div>

        {onRetry && (
          <Button
            variant="danger"
            size="sm"
            onClick={onRetry}
            className="ml-4"
          >
            Retry
          </Button>
        )}
      </div>
    </div>
  )
}

ErrorAlert.displayName = 'ErrorAlert'