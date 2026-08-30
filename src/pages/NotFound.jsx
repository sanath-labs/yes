import React from 'react'
import { Link } from 'react-router-dom'
import { Wheat } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <Wheat size={40} className="text-field-500 mb-4" />
      <h1 className="font-display text-3xl font-semibold mb-2">Page not found</h1>
      <p className="text-ink/60 dark:text-paper/60 mb-6">The page you're looking for doesn't exist.</p>
      <Link to="/" className="bg-field-500 hover:bg-field-600 text-white font-semibold px-5 py-2.5 rounded-xl">Back to home</Link>
    </div>
  )
}
