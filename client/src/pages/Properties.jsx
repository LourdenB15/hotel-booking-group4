import { useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import PropertyCard from '../components/property/PropertyCard'
import PropertyMap from '../components/property/PropertyMap'

export default function Properties() {
  const [searchParams] = useSearchParams()
  const [sortBy, setSortBy] = useState('recommended')
  const [selectedPropertyId, setSelectedPropertyId] = useState(null)
  const propertyRefs = useRef({})

  const location = searchParams.get('location') || ''
  const checkIn = searchParams.get('checkIn') || ''
  const checkOut = searchParams.get('checkOut') || ''
  const adults = searchParams.get('adults') || '2'
  const children = searchParams.get('children') || '0'
  const rooms = searchParams.get('rooms') || '1'

  const sampleProperties = [
    {
      id: 'prop-1',
      name: 'Cebu Seaside Resort & Spa',
      city: 'Cordova',
      address: 'Seaside Boulevard',
      images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=560&h=400&fit=crop'],
      rating: 4.8,
      reviewCount: 124,
      minPrice: 3500,
      maxPrice: 8000,
      amenities: ['Pool', 'Spa', 'Restaurant', 'Gym', 'Beach Access'],
      latitude: 10.2543,
      longitude: 123.9456,
    },
    {
      id: 'prop-2',
      name: 'Mactan Beachfront Hotel',
      city: 'Lapu-Lapu City',
      address: 'Punta Engaño Road',
      images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=560&h=400&fit=crop'],
      rating: 4.5,
      reviewCount: 89,
      minPrice: 2800,
      maxPrice: 5500,
      amenities: ['Pool', 'Restaurant', 'Bar', 'WiFi'],
      latitude: 10.2875,
      longitude: 124.0092,
    },
    {
      id: 'prop-3',
      name: 'City Center Business Hotel',
      city: 'Cebu City',
      address: 'Osmena Boulevard',
      images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=560&h=400&fit=crop'],
      rating: 4.2,
      reviewCount: 56,
      minPrice: 1800,
      maxPrice: 3200,
      amenities: ['WiFi', 'Restaurant', 'Gym', 'Business Center'],
      latitude: 10.3157,
      longitude: 123.8854,
    },
    {
      id: 'prop-4',
      name: 'Mountain View Lodge',
      city: 'Busay',
      address: 'Cebu Transcentral Highway',
      images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=560&h=400&fit=crop'],
      rating: 4.6,
      reviewCount: 42,
      minPrice: 2200,
      maxPrice: 4000,
      amenities: ['Mountain View', 'Restaurant', 'WiFi', 'Parking'],
      latitude: 10.3512,
      longitude: 123.8421,
    },
    {
      id: 'prop-5',
      name: 'Budget Inn Colon',
      city: 'Cebu City',
      address: 'Colon Street',
      images: ['https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=560&h=400&fit=crop'],
      rating: 3.8,
      reviewCount: 203,
      minPrice: 800,
      maxPrice: 1500,
      amenities: ['WiFi', 'Air Conditioning', '24hr Reception'],
      latitude: 10.2969,
      longitude: 123.8997,
    },
  ]

  const handleMarkerClick = (property) => {
    setSelectedPropertyId(property.id)
    const element = propertyRefs.current[property.id]
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  const propertyCount = sampleProperties.length

  const getSearchSummary = () => {
    const parts = []
    if (location) parts.push(location)
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn)
      const checkOutDate = new Date(checkOut)
      const options = { month: 'short', day: 'numeric' }
      parts.push(`${checkInDate.toLocaleDateString('en-US', options)} - ${checkOutDate.toLocaleDateString('en-US', options)}`)
    }
    const totalGuests = parseInt(adults) + parseInt(children)
    parts.push(`${totalGuests} guest${totalGuests !== 1 ? 's' : ''}`)
    parts.push(`${rooms} room${rooms !== '1' ? 's' : ''}`)
    return parts.join(' · ')
  }

  return (
    <div className="min-h-[calc(100vh-140px)]">
      {/* Search summary bar */}
      <div className="bg-white border-b border-light py-md px-lg">
        <div className="max-w-7xl mx-auto">
          <p className="text-sm text-medium">
            {getSearchSummary()}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-lg py-lg">
        <div className="flex flex-col lg:flex-row gap-lg">
          <div className="hidden lg:block lg:w-1/2 lg:sticky lg:top-4 lg:h-[calc(100vh-200px)]">
            <PropertyMap
              properties={sampleProperties}
              selectedPropertyId={selectedPropertyId}
              onMarkerClick={handleMarkerClick}
            />
          </div>

          <div className="w-full lg:w-1/2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-md mb-lg">
              <div>
                <h1 className="text-xl font-bold text-dark">
                  {location ? `Stays in ${location}` : 'All Properties'}
                </h1>
                <p className="text-sm text-medium mt-xs">
                  {propertyCount} {propertyCount === 1 ? 'property' : 'properties'} found
                </p>
              </div>

              {/* Sort dropdown */}
              <div className="flex items-center gap-sm">
                <label htmlFor="sort" className="text-sm text-medium whitespace-nowrap">
                  Sort by:
                </label>
                <select
                  id="sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-10 px-md pr-8 rounded-lg border border-light bg-white text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 8px center',
                    backgroundSize: '16px'
                  }}
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Guest Rating</option>
                  <option value="distance">Distance</option>
                </select>
              </div>
            </div>

            <div className="space-y-md">
              {sampleProperties.map((property) => (
                <div
                  key={property.id}
                  ref={(el) => (propertyRefs.current[property.id] = el)}
                  className={`transition-all duration-300 ${
                    selectedPropertyId === property.id
                      ? 'ring-2 ring-primary rounded-2xl'
                      : ''
                  }`}
                >
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>

            <div className="mt-xl text-center">
              <p className="text-sm text-medium">
                Showing 5 of {propertyCount} properties
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile map toggle button */}
      <div className="lg:hidden fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
        <button className="bg-dark text-white px-lg py-sm rounded-full shadow-lg flex items-center gap-sm hover:bg-dark/90 transition-colors">
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
            />
          </svg>
          <span className="font-medium">Map</span>
        </button>
      </div>
    </div>
  )
}
