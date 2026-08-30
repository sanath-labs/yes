import React from 'react'
import { Navigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function ProtectedRoute({ allow, children }) {
  const { role } = useApp()
  if (!role || !allow.includes(role)) {
    return <Navigate to="/" replace />
  }
  return children
}
