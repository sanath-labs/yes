import React from 'react'
import { FileText, Download } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CENTRES } from '../data/mockData'

const REPORTS = [
  { name: 'Weekly Procurement Summary', desc: 'State-wide quantity and value by crop.' },
  { name: 'Centre-wise Waiting Time Report', desc: 'Average and peak waiting times for all 10 centres.' },
  { name: 'Pending Payments Report', desc: 'Farmers with payments pending beyond 3 days.' },
  { name: 'Grievance Resolution Report', desc: 'Grievances filed, resolved and pending by category.' },
]

export default function AdminReports() {
  const { pushToast } = useApp()

  const download = (name) => {
    const csv = `Report,Centre,Value\n${CENTRES.map((c) => `"${name}","${c.name}","${Math.floor(500 + Math.random() * 4000)}"`).join('\n')}`
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${name.replace(/\s+/g, '-').toLowerCase()}.csv`
    a.click()
    URL.revokeObjectURL(url)
    pushToast(`${name} downloaded.`, 'success')
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-semibold mb-1">Generate Reports</h1>
      <p className="text-ink/60 dark:text-paper/60 mb-6">Download state-wide procurement reports.</p>

      <div className="space-y-3">
        {REPORTS.map((r) => (
          <div key={r.name} className="bg-white dark:bg-field-800 rounded-xl2 shadow-card p-5 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <FileText size={20} className="text-field-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{r.name}</p>
                <p className="text-sm text-ink/60 dark:text-paper/60">{r.desc}</p>
              </div>
            </div>
            <button onClick={() => download(r.name)} className="flex items-center gap-1.5 bg-field-500 hover:bg-field-600 text-white text-sm font-semibold px-3.5 py-2 rounded-lg whitespace-nowrap">
              <Download size={14} /> Export
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
