import React from 'react'

const STYLES = {
  waiting: 'bg-wheat-100 text-wheat-600 dark:bg-wheat-600/20 dark:text-wheat-300',
  processing: 'bg-field-100 text-field-600 dark:bg-field-500/20 dark:text-field-200 pulse-live',
  completed: 'bg-field-500 text-white',
  low: 'bg-field-100 text-field-600',
  moderate: 'bg-wheat-100 text-wheat-600',
  high: 'bg-alert-100 text-alert-700',
  paid: 'bg-field-500 text-white',
  pending: 'bg-wheat-100 text-wheat-600',
  submitted: 'bg-field-100 text-field-600',
}

export default function StatusBadge({ status, children }) {
  const key = (status || '').toLowerCase()
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${STYLES[key] || 'bg-ink/10 text-ink'}`}>
      {children || status}
    </span>
  )
}
