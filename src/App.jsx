import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { AppProvider } from './context/AppContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import ToastStack from './components/ToastStack'
import KisanBot from './components/KisanBot'

import LandingPage from './pages/LandingPage'
import FarmerLogin from './pages/FarmerLogin'
import StaffLogin from './pages/StaffLogin'
import RegisterWizard from './pages/RegisterWizard'
import Architecture from './pages/Architecture'
import NotFound from './pages/NotFound'

import FarmerDashboard from './pages/FarmerDashboard'
import LiveQueue from './pages/LiveQueue'
import SlotBooking from './pages/SlotBooking'
import CentreFinder from './pages/CentreFinder'
import ProcurementStatus from './pages/ProcurementStatus'
import PaymentStatus from './pages/PaymentStatus'
import ProcurementHistory from './pages/ProcurementHistory'
import Notifications from './pages/Notifications'
import Grievance from './pages/Grievance'
import Profile from './pages/Profile'

import OperatorDashboard from './pages/OperatorDashboard'
import OperatorAnalytics from './pages/OperatorAnalytics'

import AdminDashboard from './pages/AdminDashboard'
import AdminReports from './pages/AdminReports'

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Layout>
          <ToastStack />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/farmer-login" element={<FarmerLogin />} />
            <Route path="/operator-login" element={<StaffLogin kind="operator" />} />
            <Route path="/admin-login" element={<StaffLogin kind="admin" />} />
            <Route path="/register" element={<RegisterWizard />} />
            <Route path="/architecture" element={<Architecture />} />

            <Route path="/farmer" element={<ProtectedRoute allow={['farmer']}><FarmerDashboard /></ProtectedRoute>} />
            <Route path="/farmer/queue" element={<ProtectedRoute allow={['farmer']}><LiveQueue /></ProtectedRoute>} />
            <Route path="/farmer/book" element={<ProtectedRoute allow={['farmer']}><SlotBooking /></ProtectedRoute>} />
            <Route path="/farmer/centres" element={<ProtectedRoute allow={['farmer']}><CentreFinder /></ProtectedRoute>} />
            <Route path="/farmer/procurement" element={<ProtectedRoute allow={['farmer']}><ProcurementStatus /></ProtectedRoute>} />
            <Route path="/farmer/payments" element={<ProtectedRoute allow={['farmer']}><PaymentStatus /></ProtectedRoute>} />
            <Route path="/farmer/history" element={<ProtectedRoute allow={['farmer']}><ProcurementHistory /></ProtectedRoute>} />
            <Route path="/farmer/notifications" element={<ProtectedRoute allow={['farmer']}><Notifications /></ProtectedRoute>} />
            <Route path="/farmer/grievances" element={<ProtectedRoute allow={['farmer']}><Grievance /></ProtectedRoute>} />
            <Route path="/farmer/profile" element={<ProtectedRoute allow={['farmer']}><Profile /></ProtectedRoute>} />

            <Route path="/operator" element={<ProtectedRoute allow={['operator']}><OperatorDashboard /></ProtectedRoute>} />
            <Route path="/operator/analytics" element={<ProtectedRoute allow={['operator']}><OperatorAnalytics /></ProtectedRoute>} />

            <Route path="/admin" element={<ProtectedRoute allow={['admin']}><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/reports" element={<ProtectedRoute allow={['admin']}><AdminReports /></ProtectedRoute>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <KisanBot />
        </Layout>
      </HashRouter>
    </AppProvider>
  )
}
