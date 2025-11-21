import clsx from 'clsx'

export default function ErrorMessage({
  message,
  variant = 'block',
  onRetry,
  retryText = 'Try again',
  className,
  ...props
}) {
  if (!message) return null

  const isInline = variant === 'inline'

  return (
    <div
      role="alert"
      aria-live="polite"
      className={clsx(
        'text-error',
        isInline
          ? 'inline-flex items-center gap-xs'
          : 'flex flex-col items-center justify-center gap-sm p-lg bg-error/10 rounded-lg',
        className
      )}
      {...props}
    >
      <div className={clsx('flex-shrink-0', isInline ? '' : 'mb-xs')}>
        <svg
          className={clsx(isInline ? 'w-4 h-4' : 'w-6 h-6')}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>

      <span className={clsx(isInline ? 'text-sm' : 'text-base text-center')}>
        {message}
      </span>

      {onRetry && !isInline && (
        <button
          type="button"
          onClick={onRetry}
          className={clsx(
            'mt-sm px-md py-xs text-sm font-medium',
            'text-error hover:text-error/80',
            'border border-error rounded-md',
            'hover:bg-error/10 transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error focus-visible:ring-offset-2'
          )}
        >
          {retryText}
        </button>
      )}
    </div>
  )
}
