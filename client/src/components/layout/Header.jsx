import { Link } from 'react-router-dom'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react'

function Header() {
  return (
    <header className="bg-white shadow-sm h-[60px] md:h-[80px]">
      <div className="max-w-7xl mx-auto px-md h-full flex justify-between items-center">
        <Link to="/" className="text-[length:var(--font-size-section)] font-bold text-primary">
          SkyBridge Travels
        </Link>

        <nav className="flex items-center gap-md">
          <Link to="/properties" className="hidden md:block text-medium hover:text-primary transition-colors">
            Properties
          </Link>
          <SignedIn>
            <Link to="/my-bookings" className="hidden md:block text-medium hover:text-primary transition-colors">
              My Bookings
            </Link>
            <Link to="/dashboard" className="hidden md:block text-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-primary hover:bg-primary-hover text-white px-md py-sm rounded-md font-semibold transition-colors cursor-pointer">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </nav>
      </div>
    </header>
  )
}

export default Header
