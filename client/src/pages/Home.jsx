import { useState } from 'react'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Card from '../components/common/Card'
import LoadingSpinner from '../components/common/LoadingSpinner'
import ErrorMessage from '../components/common/ErrorMessage'

export default function Home() {
  const [loading, setLoading] = useState(false)

  const handleLoadingTest = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="p-lg max-w-4xl mx-auto">
      <h1 className="text-[length:var(--font-size-title)] font-bold text-dark mb-md">
        Welcome to SkyBridge Travels
      </h1>
      <p className="text-medium mb-2xl">
        Find and book the perfect accommodation for your next trip.
      </p>

      <div className="space-y-2xl">
        <section>
          <h2 className="text-[length:var(--font-size-section)] font-semibold text-dark mb-lg">
            Button Component Tests
          </h2>

          <div className="space-y-lg">
            <div>
              <h3 className="text-sm font-medium text-medium mb-sm">Variants</h3>
              <div className="flex flex-wrap gap-md">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-medium mb-sm">Sizes</h3>
              <div className="flex flex-wrap items-center gap-md">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-medium mb-sm">States</h3>
              <div className="flex flex-wrap gap-md">
                <Button disabled>Disabled</Button>
                <Button loading={loading} onClick={handleLoadingTest}>
                  {loading ? 'Loading...' : 'Click for Loading'}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[length:var(--font-size-section)] font-semibold text-dark mb-lg">
            Input Component Tests
          </h2>

          <div className="space-y-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              <Input
                label="Text Input"
                type="text"
                placeholder="Enter text..."
              />
              <Input
                label="Email Input"
                type="email"
                placeholder="email@example.com"
              />
              <Input
                label="Password Input"
                type="password"
                placeholder="Enter password..."
              />
              <Input
                label="Number Input"
                type="number"
                placeholder="0"
              />
            </div>

            <div>
              <Input
                label="Required Field"
                type="text"
                placeholder="This field is required"
                required
              />
            </div>

            <div>
              <Input
                label="With Helper Text"
                type="text"
                placeholder="Enter your username"
                helperText="Username must be at least 3 characters"
              />
            </div>

            <div>
              <Input
                label="Error State"
                type="email"
                placeholder="email@example.com"
                error="Please enter a valid email address"
                defaultValue="invalid-email"
              />
            </div>

            <div>
              <Input
                label="Disabled Input"
                type="text"
                placeholder="Cannot edit this"
                disabled
                defaultValue="Disabled value"
              />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[length:var(--font-size-section)] font-semibold text-dark mb-lg">
            Card Component Tests
          </h2>

          <div className="space-y-lg">
            <div>
              <h3 className="text-sm font-medium text-medium mb-sm">Basic Card</h3>
              <Card>
                <p className="text-dark">
                  This is a basic card with white background, 16px border radius, 24px padding, and medium shadow.
                </p>
              </Card>
            </div>

            <div>
              <h3 className="text-sm font-medium text-medium mb-sm">Hoverable Card</h3>
              <Card hoverable>
                <p className="text-dark">
                  Hover over this card to see the elevated shadow effect. Great for clickable cards like property listings.
                </p>
              </Card>
            </div>

            <div>
              <h3 className="text-sm font-medium text-medium mb-sm">Card with No Padding</h3>
              <Card noPadding>
                <div className="h-32 bg-light rounded-t-2xl"></div>
                <div className="p-lg">
                  <p className="text-dark">
                    This card has no padding, useful for image headers.
                  </p>
                </div>
              </Card>
            </div>

            <div>
              <h3 className="text-sm font-medium text-medium mb-sm">Card Grid</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                <Card hoverable>
                  <h4 className="font-semibold text-dark mb-sm">Card 1</h4>
                  <p className="text-medium text-sm">First card in grid</p>
                </Card>
                <Card hoverable>
                  <h4 className="font-semibold text-dark mb-sm">Card 2</h4>
                  <p className="text-medium text-sm">Second card in grid</p>
                </Card>
                <Card hoverable>
                  <h4 className="font-semibold text-dark mb-sm">Card 3</h4>
                  <p className="text-medium text-sm">Third card in grid</p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[length:var(--font-size-section)] font-semibold text-dark mb-lg">
            LoadingSpinner Component Tests
          </h2>

          <div className="space-y-lg">
            <div>
              <h3 className="text-sm font-medium text-medium mb-sm">Sizes</h3>
              <div className="flex items-center gap-xl">
                <div className="text-center">
                  <LoadingSpinner size="sm" centered={false} />
                  <p className="text-xs text-medium mt-sm">Small</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="md" centered={false} />
                  <p className="text-xs text-medium mt-sm">Medium</p>
                </div>
                <div className="text-center">
                  <LoadingSpinner size="lg" centered={false} />
                  <p className="text-xs text-medium mt-sm">Large</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-medium mb-sm">Centered in Container</h3>
              <Card>
                <div className="h-32">
                  <LoadingSpinner size="lg" />
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-[length:var(--font-size-section)] font-semibold text-dark mb-lg">
            ErrorMessage Component Tests
          </h2>

          <div className="space-y-lg">
            <div>
              <h3 className="text-sm font-medium text-medium mb-sm">Block Variant (Default)</h3>
              <ErrorMessage message="Something went wrong. Please try again later." />
            </div>

            <div>
              <h3 className="text-sm font-medium text-medium mb-sm">Block Variant with Retry Button</h3>
              <ErrorMessage
                message="Failed to load properties. Please check your connection."
                onRetry={() => alert('Retry clicked!')}
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-medium mb-sm">Custom Retry Text</h3>
              <ErrorMessage
                message="Payment failed. Your card was declined."
                onRetry={() => alert('Retry payment clicked!')}
                retryText="Retry Payment"
              />
            </div>

            <div>
              <h3 className="text-sm font-medium text-medium mb-sm">Inline Variant</h3>
              <div className="flex items-center gap-md">
                <span className="text-dark">Status:</span>
                <ErrorMessage variant="inline" message="Connection failed" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-medium mb-sm">Inline in Form Context</h3>
              <Card>
                <div className="space-y-md">
                  <Input
                    label="Email"
                    type="email"
                    placeholder="email@example.com"
                  />
                  <div className="flex justify-end">
                    <ErrorMessage variant="inline" message="Invalid email format" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
