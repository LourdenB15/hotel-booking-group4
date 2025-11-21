import clsx from 'clsx'

export default function LoadingSpinner({
  size = 'md',
  centered = true,
  className
}) {
  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  }

  return (
    <div
      className={clsx(
        centered && 'flex items-center justify-center h-full',
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <div
        className={clsx(
          'animate-spin rounded-full border-primary border-t-transparent',
          sizeClasses[size]
        )}
      />
      <span className="sr-only">Loading...</span>
    </div>
  )
}
