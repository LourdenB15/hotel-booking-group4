import { clsx } from 'clsx'

export default function Card({
  children,
  hoverable = false,
  noPadding = false,
  className,
  ...props
}) {
  return (
    <div
      className={clsx(
        'bg-white rounded-2xl shadow-md',
        !noPadding && 'p-lg',
        hoverable && 'transition-shadow duration-200 hover:shadow-xl',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
