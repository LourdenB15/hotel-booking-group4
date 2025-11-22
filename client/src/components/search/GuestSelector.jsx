import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import Button from '../common/Button'

export default function GuestSelector({
  adults = 2,
  children = 0,
  rooms = 1,
  onAdultsChange,
  onChildrenChange,
  onRoomsChange,
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const totalGuests = adults + children
  const guestText = totalGuests === 1 ? '1 Guest' : `${totalGuests} Guests`
  const roomText = rooms === 1 ? '1 Room' : `${rooms} Rooms`

  const Counter = ({ label, value, onIncrement, onDecrement, min = 0, max = 10 }) => (
    <div className="flex items-center justify-between py-sm">
      <span className="text-sm font-medium text-dark">{label}</span>
      <div className="flex items-center gap-sm">
        <button
          type="button"
          onClick={onDecrement}
          disabled={value <= min}
          className={clsx(
            'w-8 h-8 rounded-full border flex items-center justify-center transition-colors',
            value <= min
              ? 'border-light text-light cursor-not-allowed'
              : 'border-primary text-primary hover:bg-primary hover:text-white'
          )}
          aria-label={`Decrease ${label.toLowerCase()}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        <span className="w-8 text-center font-medium text-dark">{value}</span>
        <button
          type="button"
          onClick={onIncrement}
          disabled={value >= max}
          className={clsx(
            'w-8 h-8 rounded-full border flex items-center justify-center transition-colors',
            value >= max
              ? 'border-light text-light cursor-not-allowed'
              : 'border-primary text-primary hover:bg-primary hover:text-white'
          )}
          aria-label={`Increase ${label.toLowerCase()}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>
    </div>
  )

  return (
    <div ref={containerRef} className={clsx('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'w-full h-[48px] px-md bg-lightest rounded-lg border text-left',
          'flex items-center justify-between',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          isOpen ? 'border-primary ring-2 ring-primary' : 'border-light'
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="flex items-center gap-sm">
          <svg
            className="w-5 h-5 text-medium"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="text-sm text-dark truncate">
            {guestText}, {roomText}
          </span>
        </div>
        <svg
          className={clsx('w-4 h-4 text-medium transition-transform', isOpen && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-sm w-full min-w-[280px] bg-white rounded-xl shadow-xl border border-light p-md">
          <Counter
            label="Adults"
            value={adults}
            min={1}
            max={10}
            onIncrement={() => onAdultsChange?.(adults + 1)}
            onDecrement={() => onAdultsChange?.(adults - 1)}
          />

          <div className="border-t border-light" />

          <Counter
            label="Children"
            value={children}
            min={0}
            max={6}
            onIncrement={() => onChildrenChange?.(children + 1)}
            onDecrement={() => onChildrenChange?.(children - 1)}
          />

          <div className="border-t border-light" />

          <Counter
            label="Rooms"
            value={rooms}
            min={1}
            max={5}
            onIncrement={() => onRoomsChange?.(rooms + 1)}
            onDecrement={() => onRoomsChange?.(rooms - 1)}
          />

          <div className="mt-md">
            <Button
              variant="primary"
              size="sm"
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              Done
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
