import React, { useState, useMemo } from 'react'
import { Download } from 'lucide-react'
import { useApp } from '../context/AppContext'
import StatusBadge from '../components/StatusBadge'

export default function ProcurementHistory() {
  const { history, pushToast } = useApp()
  const [cropFilter, setCropFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')

  const crops = useMemo(() => ['All', ...new Set(history.map((h) => h.crop))], [history])

  const filtered = history.filter((h) =>
    (cropFilter === 'All' || h.crop === cropFilter) &&
    (statusFilter === 'All' || h.procurementStatus === statusFilter)
  )

  const exportCsv = () => {
    const rows = [['Date', 'Centre', 'Crop', 'Quantity', 'Procurement Status', 'Payment Status', 'Amount'], ...filtered.map((h) => [h.date, h.centre, h.crop, h.quantity, h.procurementStatus, h.paymentStatus, h.amount])]
    const csv = rows.map((r) => r.map((c) => `"${c}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'kisanqueue-procurement-history.csv'
    a.click()
    URL.revokeObjectURL(url)
    pushToast('Report downloaded.', 'success')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Procurement History</h1>
          <p className="text-ink/60 dark:text-paper/60 text-sm">Your past procurement and payment records.</p>
        </div>
        <button onClick={exportCsv} className="flex items-center gap-2 bg-field-500 hover:bg-field-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl">
          <Download size={16} /> Export Report
        </button>
      </div>

      <div className="flex gap-3 mb-4">
        <select value={cropFilter} onChange={(e) => setCropFilter(e.target.value)} className="border-2 border-field-100 dark:border-field-700 rounded-lg px-3 py-2 text-sm bg-transparent">
          {crops.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border-2 border-field-100 dark:border-field-700 rounded-lg px-3 py-2 text-sm bg-transparent">
          <option>All</option>
          <option>Completed</option>
        </select>
      </div>

      <div className="hidden sm:block bg-white dark:bg-field-800 rounded-xl2 shadow-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-field-50 dark:bg-field-900/40 text-left text-ink/60 dark:text-paper/60">
            <tr>{['Date', 'Centre', 'Crop', 'Quantity', 'Procurement', 'Payment', 'Amount'].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map((h) => (
              <tr key={h.id} className="border-t border-field-50 dark:border-field-700">
                <td className="px-4 py-3">{h.date}</td>
                <td className="px-4 py-3">{h.centre}</td>
                <td className="px-4 py-3">{h.crop}</td>
                <td className="px-4 py-3">{h.quantity}</td>
                <td className="px-4 py-3"><StatusBadge status="completed">Completed</StatusBadge></td>
                <td className="px-4 py-3"><StatusBadge status="paid">Paid</StatusBadge></td>
                <td className="px-4 py-3 font-medium">₹{h.amount.toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sm:hidden space-y-3">
        {filtered.map((h) => (
          <div key={h.id} className="bg-white dark:bg-field-800 rounded-xl2 shadow-card p-4">
            <div className="flex justify-between mb-2"><span className="font-semibold">{h.crop}</span><span className="text-sm text-ink/60">{h.date}</span></div>
            <p className="text-sm text-ink/60 dark:text-paper/60 mb-2">{h.centre}</p>
            <div className="flex justify-between items-center">
              <div className="flex gap-2"><StatusBadge status="completed">Completed</StatusBadge><StatusBadge status="paid">Paid</StatusBadge></div>
              <span className="font-semibold">₹{h.amount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
