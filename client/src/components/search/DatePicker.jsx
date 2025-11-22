import { useState, useRef, useEffect } from 'react'
import { DayPicker } from 'react-day-picker'
import { format, addDays, isBefore, startOfDay } from 'date-fns'
import clsx from 'clsx'
import 'react-day-picker/style.css'

export default function DatePicker({
  checkIn,
  checkOut,
  onCheckInChange,
  onCheckOutChange,
  className,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectingCheckOut, setSelectingCheckOut] = useState(false)
  const containerRef = useRef(null)

  const checkInDate = checkIn ? new Date(checkIn) : undefined
  const checkOutDate = checkOut ? new Date(checkOut) : undefined

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
        setSelectingCheckOut(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const handleDayClick = (day) => {
    if (!selectingCheckOut) {
      onCheckInChange(format(day, 'yyyy-MM-dd'))
      onCheckOutChange('')
      setSelectingCheckOut(true)
    } else {
      if (checkInDate && isBefore(day, checkInDate)) {
        onCheckOutChange(format(checkInDate, 'yyyy-MM-dd'))
        onCheckInChange(format(day, 'yyyy-MM-dd'))
      } else {
        onCheckOutChange(format(day, 'yyyy-MM-dd'))
      }
      setSelectingCheckOut(false)
      setIsOpen(false)
    }
  }

  const disabledDays = {
    before: startOfDay(new Date()),
  }

  const disabledMatcher = selectingCheckOut && checkInDate
    ? [disabledDays, { before: addDays(checkInDate, 1) }]
    : disabledDays

  const formatDisplayDate = (date) => {
    if (!date) return ''
    return format(new Date(date), 'M/d/yy')
  }

  const selectedRange = checkInDate && checkOutDate
    ? { from: checkInDate, to: checkOutDate }
    : checkInDate
      ? { from: checkInDate, to: checkInDate }
      : undefined

  return (
    <div ref={containerRef} className={clsx('relative', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'w-full h-[48px] px-md pl-10 rounded-lg border border-light',
          'bg-lightest text-left text-dark',
          'focus:outline-none focus:ring-2 focus:ring-primary',
          'flex items-center gap-sm'
        )}
      >
        <svg
          className="absolute left-3 w-5 h-5 text-medium"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>

        <div className="flex-1 flex items-center gap-xs">
          <span className={clsx('flex-1 text-left', !checkIn && 'text-medium')}>
            {checkIn ? formatDisplayDate(checkIn) : 'Date'}
          </span>
          <div className="w-px h-8 bg-light" />
          <span className={clsx('flex-1 text-left', !checkOut && 'text-medium')}>
            {checkOut ? formatDisplayDate(checkOut) : 'Date'}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 z-50 bg-white rounded-xl shadow-xl border border-light p-md">
          <div className="mb-sm text-small text-medium text-center">
            {selectingCheckOut ? 'Select check-out date' : 'Select check-in date'}
          </div>
          <DayPicker
            mode="single"
            selected={selectingCheckOut ? checkOutDate : checkInDate}
            onDayClick={handleDayClick}
            disabled={disabledMatcher}
            modifiers={{
              range_start: checkInDate,
              range_end: checkOutDate,
              range_middle: selectedRange && checkInDate && checkOutDate
                ? { from: addDays(checkInDate, 1), to: addDays(checkOutDate, -1) }
                : undefined,
            }}
            modifiersStyles={{
              range_start: {
                backgroundColor: '#4169E1',
                color: 'white',
                borderRadius: '50%',
              },
              range_end: {
                backgroundColor: '#4169E1',
                color: 'white',
                borderRadius: '50%',
              },
              range_middle: {
                backgroundColor: 'rgba(65, 105, 225, 0.1)',
                borderRadius: '0',
              },
              selected: {
                backgroundColor: '#4169E1',
                color: 'white',
              },
              today: {
                fontWeight: 'bold',
                color: '#4169E1',
              },
            }}
            styles={{
              caption: { color: '#1A1A1A' },
              head_cell: { color: '#6B7280' },
              day: {
                borderRadius: '50%',
                margin: '2px',
              },
              nav_button: {
                color: '#4169E1',
              },
            }}
            numberOfMonths={1}
            defaultMonth={checkInDate || new Date()}
          />
        </div>
      )}
    </div>
  )
}
