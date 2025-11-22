import { Link } from 'react-router-dom'
import Card from '../components/common/Card'
import Button from '../components/common/Button'
import SearchBar from '../components/search/SearchBar'

export default function Home() {
  const trendingDestinations = [
    {
      id: 1,
      name: 'Cebu City',
      properties: 245,
      image: 'https://images.unsplash.com/photo-1568454537842-d933259bb258?w=400&h=300&fit=crop',
    },
    {
      id: 2,
      name: 'Mactan Island',
      properties: 189,
      image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&h=300&fit=crop',
    },
    {
      id: 3,
      name: 'Cordova',
      properties: 78,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop',
    },
  ]

  const promotionalOffers = [
    {
      id: 1,
      title: 'Summer Getaway',
      description: 'Save up to 30% on beach resorts',
      image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=360&h=240&fit=crop',
      cta: 'Explore deals',
    },
    {
      id: 2,
      title: 'Weekend Escape',
      description: 'Book 2 nights, get 15% off',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=360&h=240&fit=crop',
      cta: 'Book now',
    },
  ]

  return (
    <div className="flex flex-col">
      <section
        className="relative min-h-[400px] flex flex-col items-center justify-center px-md py-3xl"
        style={{
          background: 'linear-gradient(135deg, #4169E1 0%, #6495ED 100%)',
        }}
      >
        <div className="text-center mx-auto mb-xl">
          <h1 className="text-[length:var(--font-size-hero)] font-bold text-white mb-md leading-tight">
            Find your next stay
          </h1>
          <p className="text-[length:var(--font-size-card)] text-white/90">
            Search deals on stays, flights and much more...
          </p>
        </div>

        <SearchBar className="w-full max-w-5xl mx-auto" />
      </section>

      <main className="max-w-7xl mx-auto w-full px-md py-2xl">
        <section className="mb-3xl">
          <h2 className="text-[length:var(--font-size-section)] font-semibold text-dark mb-lg">
            Special Offers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
            {promotionalOffers.map((offer) => (
              <Card key={offer.id} noPadding hoverable className="overflow-hidden">
                <div className="relative h-[200px] md:h-[240px]">
                  <img
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-lg text-white">
                    <h3 className="text-[length:var(--font-size-card)] font-semibold mb-xs">
                      {offer.title}
                    </h3>
                    <p className="text-sm text-white/90 mb-md">
                      {offer.description}
                    </p>
                    <Button variant="secondary" size="sm">
                      {offer.cta}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-3xl">
          <h2 className="text-[length:var(--font-size-section)] font-semibold text-dark mb-lg">
            Trending Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            {trendingDestinations.map((destination) => (
              <Link
                key={destination.id}
                to={`/properties?location=${encodeURIComponent(destination.name)}`}
                className="block"
              >
                <Card noPadding hoverable className="overflow-hidden">
                  <div className="relative h-[200px]">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-lg text-white">
                      <h3 className="text-[length:var(--font-size-card)] font-semibold">
                        {destination.name}
                      </h3>
                      <p className="text-sm text-white/80">
                        {destination.properties} properties
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-[length:var(--font-size-section)] font-semibold text-dark mb-lg">
            Why Book With SkyBridge Travels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            <Card>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-md">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-dark mb-sm">Best Price Guarantee</h3>
                <p className="text-sm text-medium">
                  Find a lower price? We'll match it and give you an additional 10% off.
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-md">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-dark mb-sm">Secure Booking</h3>
                <p className="text-sm text-medium">
                  Your payment information is encrypted and secure with industry-standard protection.
                </p>
              </div>
            </Card>

            <Card>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-md">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-dark mb-sm">24/7 Support</h3>
                <p className="text-sm text-medium">
                  Our customer service team is available around the clock to help with any questions.
                </p>
              </div>
            </Card>
          </div>
        </section>
      </main>
    </div>
  )
}
