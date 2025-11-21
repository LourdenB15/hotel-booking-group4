import { Link } from 'react-router-dom'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-white py-2xl">
      <div className="max-w-7xl mx-auto px-md">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-lg">
          <div>
            <h3 className="text-[length:var(--font-size-card-title)] font-bold mb-md">
              SkyBridge Travels
            </h3>
            <p className="text-gray-300 text-[length:var(--font-size-small)]">
              Find your perfect stay with the best deals on hotels and accommodations worldwide.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-md">Quick Links</h4>
            <ul className="space-y-sm">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors text-[length:var(--font-size-small)]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-300 hover:text-white transition-colors text-[length:var(--font-size-small)]">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className="text-gray-300 hover:text-white transition-colors text-[length:var(--font-size-small)]">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-md">Support</h4>
            <ul className="space-y-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-[length:var(--font-size-small)]">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-[length:var(--font-size-small)]">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors text-[length:var(--font-size-small)]">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-md">Contact</h4>
            <ul className="space-y-sm text-gray-300 text-[length:var(--font-size-small)]">
              <li>Email: support@skybridge.com</li>
              <li>Phone: +63 123 456 7890</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-xl pt-lg text-center text-gray-400 text-[length:var(--font-size-caption)]">
          &copy; {currentYear} SkyBridge Travels. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
