import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

const createCustomIcon = (isSelected = false) => {
  const color = isSelected ? '#3457B1' : '#4169E1'
  const size = isSelected ? 40 : 32

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  })
}

function MapBounds({ properties }) {
  const map = useMap()

  useEffect(() => {
    if (properties && properties.length > 0) {
      const validProperties = properties.filter(
        p => p.latitude && p.longitude
      )

      if (validProperties.length > 0) {
        const bounds = L.latLngBounds(
          validProperties.map(p => [p.latitude, p.longitude])
        )
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 })
      }
    }
  }, [map, properties])

  return null
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(price)
}

export default function PropertyMap({
  properties = [],
  selectedPropertyId = null,
  onMarkerClick = () => {},
  center = [10.3157, 123.8854],
  zoom = 11,
  className = ''
}) {
  const validProperties = properties.filter(
    p => p.latitude && p.longitude
  )

  return (
    <div className={`w-full h-full ${className}`}>
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        className="w-full h-full rounded-2xl z-0"
        style={{ minHeight: '300px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {validProperties.length > 0 && (
          <MapBounds properties={validProperties} />
        )}

        {validProperties.map((property) => (
          <Marker
            key={property.id}
            position={[property.latitude, property.longitude]}
            icon={createCustomIcon(property.id === selectedPropertyId)}
            eventHandlers={{
              click: () => onMarkerClick(property),
            }}
          >
            <Popup className="property-popup">
              <div className="min-w-[200px]">
                {property.images && property.images[0] && (
                  <img
                    src={property.images[0]}
                    alt={property.name}
                    className="w-full h-24 object-cover rounded-t-lg -mt-3 -mx-3 mb-2"
                    style={{ width: 'calc(100% + 24px)' }}
                  />
                )}
                <h3 className="font-semibold text-dark text-sm line-clamp-1">
                  {property.name}
                </h3>
                <p className="text-xs text-medium mt-1">
                  {property.city}
                </p>
                {property.rating && (
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs font-medium text-primary">
                      ★ {property.rating}
                    </span>
                    {property.reviewCount && (
                      <span className="text-xs text-medium">
                        ({property.reviewCount})
                      </span>
                    )}
                  </div>
                )}
                {property.minPrice && (
                  <p className="text-sm font-bold text-dark mt-2">
                    {formatPrice(property.minPrice)}
                    <span className="text-xs font-normal text-medium"> /night</span>
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
