import { useAuth, useUser, RedirectToSignIn } from '@clerk/clerk-react'
import { Navigate, useLocation } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner'

function ProtectedRoute({ children, allowedRoles, redirectTo = '/' }) {
  const { isLoaded, isSignedIn } = useAuth()
  const { user } = useUser()
  const location = useLocation()

  if (!isLoaded) {
    return (
      <div className="min-h-[50vh]">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!isSignedIn) {
    return <RedirectToSignIn afterSignInUrl={location.pathname} />
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = user?.publicMetadata?.role || 'CUSTOMER'

    if (!allowedRoles.includes(userRole)) {
      return <Navigate to={redirectTo} replace state={{ unauthorized: true }} />
    }
  }

  return children
}

export default ProtectedRoute
