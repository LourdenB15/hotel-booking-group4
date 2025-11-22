import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/clerk-react'

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const buttonRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  useEffect(() => {
    function handleClickOutside(event) {
      if (buttonRef.current && buttonRef.current.contains(event.target)) {
        return
      }
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  return (
    <header className="bg-white shadow-sm h-[60px] md:h-[80px] relative">
      <div className="max-w-7xl mx-auto px-4 md:px-md h-full flex items-center">
        <button
          ref={buttonRef}
          className="md:hidden p-2 -ml-2 text-dark hover:text-primary transition-colors cursor-pointer"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <div className="flex-1 md:flex-none flex justify-center md:justify-start">
          <Link
            to="/"
            className="text-xl md:text-[length:var(--font-size-section)] font-bold text-primary"
          >
            SkyBridge Travels
          </Link>
        </div>

        <nav className="hidden md:flex flex-1 items-center justify-end gap-md">
          <Link
            to="/properties"
            className="text-medium hover:text-primary transition-colors"
          >
            Properties
          </Link>
          <SignedIn>
            <Link
              to="/my-bookings"
              className="text-medium hover:text-primary transition-colors"
            >
              My Bookings
            </Link>
            <Link
              to="/dashboard"
              className="text-medium hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
            <UserButton userProfileMode="modal" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" fallbackRedirectUrl="/">
              <button className="bg-primary hover:bg-primary-hover text-white px-md py-sm rounded-md font-semibold transition-colors cursor-pointer">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal" fallbackRedirectUrl="/">
              <button className="border border-primary text-primary hover:bg-primary hover:text-white px-md py-sm rounded-md font-semibold transition-colors cursor-pointer">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </nav>

        <div className="md:hidden">
          <SignedIn>
            <UserButton userProfileMode="modal" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal" fallbackRedirectUrl="/">
              <button className="bg-primary hover:bg-primary-hover text-white px-3 py-1.5 rounded-md text-sm font-semibold transition-colors cursor-pointer">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden absolute top-[60px] left-0 right-0 bg-white border-t border-light shadow-lg z-50"
        >
          <nav className="flex flex-col py-2">
            <Link
              to="/properties"
              className="px-4 py-3 text-medium hover:bg-lightest hover:text-primary transition-colors"
            >
              Properties
            </Link>
            <SignedIn>
              <Link
                to="/my-bookings"
                className="px-4 py-3 text-medium hover:bg-lightest hover:text-primary transition-colors"
              >
                My Bookings
              </Link>
              <Link
                to="/dashboard"
                className="px-4 py-3 text-medium hover:bg-lightest hover:text-primary transition-colors"
              >
                Dashboard
              </Link>
            </SignedIn>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
