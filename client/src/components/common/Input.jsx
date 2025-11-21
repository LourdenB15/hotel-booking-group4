import { forwardRef } from 'react'
import clsx from 'clsx'

const Input = forwardRef(({
  type = 'text',
  label,
  error,
  helperText,
  className,
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-dark mb-sm"
        >
          {label}
          {props.required && <span className="text-error ml-1">*</span>}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        type={type}
        className={clsx(
          'w-full h-[48px] px-md rounded-lg border bg-white',
          'text-body text-dark placeholder:text-medium',
          'transition-colors duration-200',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
          error
            ? 'border-error focus:ring-error focus:border-error'
            : 'border-light hover:border-medium',
          'disabled:bg-lighter disabled:cursor-not-allowed disabled:opacity-60',
          className
        )}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error || helperText ? `${inputId}-description` : undefined
        }
        {...props}
      />

      {(error || helperText) && (
        <p
          id={`${inputId}-description`}
          className={clsx(
            'mt-sm text-sm',
            error ? 'text-error' : 'text-medium'
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
