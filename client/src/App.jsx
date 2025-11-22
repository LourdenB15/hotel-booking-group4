import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Layout
import Layout from './components/layout/Layout'

// Components
import ProtectedRoute from './components/common/ProtectedRoute'

// Page imports
import Home from './pages/Home'
import Properties from './pages/Properties'
import PropertyDetails from './pages/PropertyDetails'
import Booking from './pages/Booking'
import BookingConfirmation from './pages/BookingConfirmation'
import MyBookings from './pages/MyBookings'
import NotFound from './pages/NotFound'

// Dashboard pages (Hotel Owner)
import OwnerDashboard from './pages/Dashboard/OwnerDashboard'
import OwnerProperties from './pages/Dashboard/OwnerProperties'
import OwnerBookings from './pages/Dashboard/OwnerBookings'

// Admin pages
import AdminDashboard from './pages/Admin/AdminDashboard'
import PendingProperties from './pages/Admin/PendingProperties'
import AllBookings from './pages/Admin/AllBookings'
import UserManagement from './pages/Admin/UserManagement'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Public Routes */}
          <Route index element={<Home />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:id" element={<PropertyDetails />} />

          {/* Customer Routes (require authentication) */}
          <Route path="booking/new" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
          <Route path="booking/confirmation/:id" element={<ProtectedRoute><BookingConfirmation /></ProtectedRoute>} />
          <Route path="my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />

          {/* Hotel Owner Dashboard Routes (require HOTEL_OWNER or ADMIN role) */}
          <Route path="dashboard" element={<ProtectedRoute allowedRoles={['HOTEL_OWNER', 'ADMIN']}><OwnerDashboard /></ProtectedRoute>} />
          <Route path="dashboard/properties" element={<ProtectedRoute allowedRoles={['HOTEL_OWNER', 'ADMIN']}><OwnerProperties /></ProtectedRoute>} />
          <Route path="dashboard/bookings" element={<ProtectedRoute allowedRoles={['HOTEL_OWNER', 'ADMIN']}><OwnerBookings /></ProtectedRoute>} />

          {/* Admin Routes (require ADMIN role) */}
          <Route path="admin" element={<ProtectedRoute allowedRoles={['ADMIN']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="admin/properties/pending" element={<ProtectedRoute allowedRoles={['ADMIN']}><PendingProperties /></ProtectedRoute>} />
          <Route path="admin/bookings" element={<ProtectedRoute allowedRoles={['ADMIN']}><AllBookings /></ProtectedRoute>} />
          <Route path="admin/users" element={<ProtectedRoute allowedRoles={['ADMIN']}><UserManagement /></ProtectedRoute>} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
