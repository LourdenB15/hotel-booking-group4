import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../common/Card'
import Button from '../common/Button'
import DatePicker from './DatePicker'
import GuestSelector from './GuestSelector'

export default function SearchBar({ className = '' }) {
  const navigate = useNavigate()

  const [location, setLocation] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [rooms, setRooms] = useState(1)

  const handleSearch = (e) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (checkIn) params.set('checkIn', checkIn)
    if (checkOut) params.set('checkOut', checkOut)
    if (adults) params.set('adults', adults.toString())
    if (children) params.set('children', children.toString())
    if (rooms) params.set('rooms', rooms.toString())

    const queryString = params.toString()
    navigate(`/properties${queryString ? `?${queryString}` : ''}`)
  }

  return (
    <div className={className}>
      <Card className="p-lg">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col min-[900px]:flex-row gap-md items-stretch">
            <div className="flex-1">
              <label
                htmlFor="search-location"
                className="block text-sm font-medium text-medium mb-xs"
              >
                Location
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-md flex items-center pointer-events-none">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <input
                  id="search-location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where are you going?"
                  className="w-full h-[48px] pl-11 pr-md bg-lightest rounded-lg border border-light
                    focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                    placeholder:text-medium"
                />
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-medium mb-xs">
                Check-in / Check-out
              </label>
              <DatePicker
                checkIn={checkIn}
                checkOut={checkOut}
                onCheckInChange={setCheckIn}
                onCheckOutChange={setCheckOut}
              />
            </div>

            <div className="flex-1 min-[900px]:flex-none min-[900px]:w-56">
              <label className="block text-sm font-medium text-medium mb-xs">
                Guests
              </label>
              <GuestSelector
                adults={adults}
                children={children}
                rooms={rooms}
                onAdultsChange={setAdults}
                onChildrenChange={setChildren}
                onRoomsChange={setRooms}
              />
            </div>

            <div className="flex items-end">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full min-[900px]:w-auto px-xl"
              >
                <svg
                  className="w-5 h-5 mr-sm"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Search
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </div>
  )
}
