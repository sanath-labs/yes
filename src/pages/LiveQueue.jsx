import React from 'react'
import { Play, Square, RefreshCcw, Info } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CENTRES } from '../data/mockData'
import StatusBadge from '../components/StatusBadge'

export default function LiveQueue() {
  const { farmer, queue, isSimulating, startSimulation, stopSimulation, lastUpdated, farmersAhead, prediction, processingIndex } = useApp()
  const centre = CENTRES.find((c) => c.id === farmer.preferredCentreId) || CENTRES[0]
  const myToken = queue.find((q) => q.isYou)
  const currentToken = queue[processingIndex]?.token || '—'

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl font-semibold">Live Procurement Queue</h1>
          <p className="text-ink/60 dark:text-paper/60 text-sm">{centre.name}</p>
        </div>
        <button
          onClick={() => (isSimulating ? stopSimulation() : startSimulation())}
          className={`flex items-center gap-2 font-semibold text-sm px-5 py-3 rounded-xl shadow-card transition-colors ${isSimulating ? 'bg-alert-500 hover:bg-alert-700 text-white' : 'bg-field-500 hover:bg-field-600 text-white'}`}
        >
          {isSimulating ? <Square size={16} /> : <Play size={16} />}
          {isSimulating ? 'Stop Live Queue Simulation' : '▶ Start Live Queue Simulation'}
        </button>
      </div>

      <div className="grid sm:grid-cols-4 gap-4 mb-6">
        <MiniStat label="Current Token" value={currentToken} highlight />
        <MiniStat label="Your Token" value={myToken?.token || '—'} />
        <MiniStat label="Farmers Ahead" value={farmersAhead} />
        <MiniStat label="Estimated Waiting" value={`${prediction.minutes} min`} />
      </div>

      <div className="flex items-center gap-1.5 text-xs text-ink/50 dark:text-paper/50 mb-3">
        <RefreshCcw size={12} className={isSimulating ? 'animate-spin' : ''} />
        Last updated: {lastUpdated.toLocaleTimeString('en-IN')}
      </div>

      <div className="bg-white dark:bg-field-800 rounded-xl2 shadow-card border border-field-100 dark:border-field-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-field-50 dark:bg-field-900/40 text-left text-ink/60 dark:text-paper/60">
            <tr>
              <th className="px-4 py-3 font-medium">Token</th>
              <th className="px-4 py-3 font-medium hidden sm:table-cell">Farmer</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Est. Time</th>
            </tr>
          </thead>
          <tbody>
            {queue.map((q, i) => (
              <tr key={q.token} className={`border-t border-field-50 dark:border-field-700 ${q.isYou ? 'bg-wheat-100/60 dark:bg-wheat-600/10' : ''}`}>
                <td className="px-4 py-3 font-mono font-semibold">{q.token} {q.isYou && <span className="text-wheat-600">· YOU</span>}</td>
                <td className="px-4 py-3 hidden sm:table-cell text-ink/70 dark:text-paper/70">{q.farmer}</td>
                <td className="px-4 py-3"><StatusBadge status={q.status}>{q.status === 'processing' ? 'Processing' : q.status === 'completed' ? 'Completed' : 'Waiting'}</StatusBadge></td>
                <td className="px-4 py-3 text-right text-ink/70 dark:text-paper/70">
                  {q.status === 'completed' ? '—' : q.status === 'processing' ? 'Now' : q.isYou ? `${prediction.minutes} min` : `${Math.max(1, (i - processingIndex)) * 3} min`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-start gap-2 text-xs text-ink/50 dark:text-paper/50">
        <Info size={14} className="shrink-0 mt-0.5" />
        <p>In this hackathon prototype, "Start Live Queue Simulation" advances the queue automatically to demonstrate real-time updates. In production this reflects live operator actions via Socket.IO / Supabase Realtime.</p>
      </div>
    </div>
  )
}

function MiniStat({ label, value, highlight }) {
  return (
    <div className={`rounded-xl p-4 shadow-card ${highlight ? 'bg-field-500 text-white' : 'bg-white dark:bg-field-800 border border-field-100 dark:border-field-700'}`}>
      <p className={`text-xs mb-1 ${highlight ? 'text-field-100' : 'text-ink/50 dark:text-paper/50'}`}>{label}</p>
      <p className="font-mono font-bold text-xl">{value}</p>
    </div>
  )
}
