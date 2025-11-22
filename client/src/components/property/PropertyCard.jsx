import { Link } from 'react-router-dom'
import clsx from 'clsx'
import Card from '../common/Card'
import Button from '../common/Button'

export default function PropertyCard({ property, className }) {
  const {
    id,
    name,
    city,
    address,
    images = [],
    rating = 0,
    reviewCount = 0,
    minPrice = 0,
    maxPrice = 0,
    amenities = [],
  } = property

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return 'bg-success'
    if (rating >= 3.5) return 'bg-primary'
    if (rating >= 2.5) return 'bg-warning'
    return 'bg-medium'
  }

  const imageUrl = images[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=560&h=400&fit=crop'

  return (
    <Card
      noPadding
      hoverable
      className={clsx('overflow-hidden', className)}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-[280px] h-[200px] shrink-0">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
          {rating > 0 && (
            <div
              className={clsx(
                'absolute top-3 right-3 px-2 py-1 rounded-md text-white text-sm font-semibold',
                getRatingColor(rating)
              )}
            >
              {rating.toFixed(1)}
            </div>
          )}
        </div>

        <div className="flex flex-col flex-1 p-lg">
          <h3 className="font-semibold text-lg text-dark mb-1 line-clamp-1">
            {name}
          </h3>

          <div className="flex items-center gap-1 text-medium text-sm mb-2">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
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
            <span className="line-clamp-1">{city}{address && `, ${address}`}</span>
          </div>

          {amenities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {amenities.slice(0, 3).map((amenity, index) => (
                <span
                  key={index}
                  className="text-xs bg-lightest text-medium px-2 py-1 rounded"
                >
                  {amenity}
                </span>
              ))}
              {amenities.length > 3 && (
                <span className="text-xs text-medium">
                  +{amenities.length - 3} more
                </span>
              )}
            </div>
          )}

          {reviewCount > 0 && (
            <p className="text-sm text-medium mb-3">
              {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
            </p>
          )}

          <div className="flex-1" />

          <div className="flex items-end justify-between mt-auto">
            <div>
              <p className="text-lg font-bold text-dark">
                {formatPrice(minPrice)}
              </p>
              <p className="text-sm text-medium">per night</p>
            </div>
            <Link to={`/properties/${id}`}>
              <Button variant="primary" size="sm">
                See availability
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}
