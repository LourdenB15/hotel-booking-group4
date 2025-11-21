import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Layout
import Layout from './components/layout/Layout'

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

          {/* Customer Routes */}
          <Route path="booking/new" element={<Booking />} />
          <Route path="booking/confirmation/:id" element={<BookingConfirmation />} />
          <Route path="my-bookings" element={<MyBookings />} />

          {/* Hotel Owner Dashboard Routes */}
          <Route path="dashboard" element={<OwnerDashboard />} />
          <Route path="dashboard/properties" element={<OwnerProperties />} />
          <Route path="dashboard/bookings" element={<OwnerBookings />} />

          {/* Admin Routes */}
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/properties/pending" element={<PendingProperties />} />
          <Route path="admin/bookings" element={<AllBookings />} />
          <Route path="admin/users" element={<UserManagement />} />

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
