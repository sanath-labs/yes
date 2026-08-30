import React, { useState } from 'react'
import { PhoneCall, PlayCircle, CheckCircle2, UserX } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CENTRES } from '../data/mockData'
import StatusBadge from '../components/StatusBadge'
import ProcurementEntry from './ProcurementEntry'

export default function OperatorDashboard() {
  const { staff, queue, advanceQueueStep, pushToast } = useApp()
  const centre = CENTRES.find((c) => c.id === staff.centreId)
  const [activeToken, setActiveToken] = useState(null)

  const waiting = queue.filter((q) => q.status === 'waiting').length
  const processing = queue.filter((q) => q.status === 'processing').length
  const completed = queue.filter((q) => q.status === 'completed').length
  const total = queue.length

  const callNext = () => {
    advanceQueueStep()
    pushToast('Next farmer called to the counter.', 'success')
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-semibold mb-1">Procurement Centre Operations</h1>
      <p className="text-ink/60 dark:text-paper/60 mb-6">{centre?.name}</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
        <KPI label="Today's Appointments" value={total + 128} />
        <KPI label="Waiting" value={waiting} accent="wheat" />
        <KPI label="Processing" value={processing} accent="field" />
        <KPI label="Completed" value={completed + 119} accent="field" />
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Live Queue</h2>
        <button onClick={callNext} className="flex items-center gap-2 bg-field-500 hover:bg-field-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-card">
          <PhoneCall size={16} /> Call Next Farmer
        </button>
      </div>

      <div className="bg-white dark:bg-field-800 rounded-xl2 shadow-card overflow-hidden overflow-x-auto">
        <table className="w-full text-sm min-w-[640px]">
          <thead className="bg-field-50 dark:bg-field-900/40 text-left text-ink/60 dark:text-paper/60">
            <tr>{['Token', 'Farmer', 'Crop', 'Quantity', 'Status', 'Action'].map((h) => <th key={h} className="px-4 py-3 font-medium">{h}</th>)}</tr>
          </thead>
          <tbody>
            {queue.map((q) => (
              <tr key={q.token} className="border-t border-field-50 dark:border-field-700">
                <td className="px-4 py-3 font-mono font-semibold">{q.token}</td>
                <td className="px-4 py-3">{q.farmer}</td>
                <td className="px-4 py-3">{q.crop}</td>
                <td className="px-4 py-3">{q.quantity}</td>
                <td className="px-4 py-3"><StatusBadge status={q.status}>{q.status === 'processing' ? 'Processing' : q.status === 'completed' ? 'Completed' : 'Waiting'}</StatusBadge></td>
                <td className="px-4 py-3">
                  {q.status === 'processing' && (
                    <button onClick={() => setActiveToken(q)} className="flex items-center gap-1 text-field-600 font-medium hover:underline">
                      <PlayCircle size={15} /> Process
                    </button>
                  )}
                  {q.status === 'waiting' && (
                    <span className="text-ink/40 dark:text-paper/40 text-xs flex items-center gap-1"><UserX size={13} /> No-show</span>
                  )}
                  {q.status === 'completed' && (
                    <span className="text-field-500 flex items-center gap-1 text-xs font-medium"><CheckCircle2 size={13} /> Done</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {activeToken && <ProcurementEntry token={activeToken} onClose={() => setActiveToken(null)} />}
    </div>
  )
}

function KPI({ label, value, accent }) {
  return (
    <div className="bg-white dark:bg-field-800 rounded-xl2 shadow-card p-4">
      <p className="text-xs text-ink/50 dark:text-paper/50 mb-1">{label}</p>
      <p className={`font-display text-2xl font-semibold ${accent === 'wheat' ? 'text-wheat-500' : accent === 'field' ? 'text-field-500' : ''}`}>{value}</p>
    </div>
  )
}
