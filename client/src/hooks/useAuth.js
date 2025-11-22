import { useAuth as useClerkAuth, useUser, useClerk } from '@clerk/clerk-react'

export function useAuth() {
  const { isLoaded, isSignedIn, userId, getToken } = useClerkAuth()
  const { user } = useUser()
  const { signOut, openSignIn, openSignUp } = useClerk()

  const role = user?.publicMetadata?.role || 'CUSTOMER'

  const hasRole = (requiredRole) => {
    return role === requiredRole
  }

  const hasAnyRole = (allowedRoles) => {
    return allowedRoles.includes(role)
  }

  const isHotelOwner = () => hasRole('HOTEL_OWNER')

  const isAdmin = () => hasRole('ADMIN')

  const isCustomer = () => hasRole('CUSTOMER')

  const getAuthToken = async () => {
    try {
      return await getToken()
    } catch (error) {
      console.error('Failed to get auth token:', error)
      return null
    }
  }

  const signIn = (options = {}) => {
    openSignIn(options)
  }

  const signUp = (options = {}) => {
    openSignUp(options)
  }

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch (error) {
      console.error('Failed to sign out:', error)
    }
  }

  return {
    isLoaded,
    isSignedIn,
    userId,
    user,
    role,
    userEmail: user?.primaryEmailAddress?.emailAddress || null,
    userName: user?.fullName || user?.firstName || null,
    userImage: user?.imageUrl || null,
    hasRole,
    hasAnyRole,
    isHotelOwner,
    isAdmin,
    isCustomer,
    signIn,
    signUp,
    signOut: handleSignOut,
    getAuthToken,
  }
}

export default useAuth
