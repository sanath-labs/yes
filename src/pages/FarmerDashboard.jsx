import React from 'react'
import { Link } from 'react-router-dom'
import { Navigation, CalendarClock, Phone, Radio, Bot } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CENTRES } from '../data/mockData'
import { t } from '../i18n/translations'
import StatusBadge from '../components/StatusBadge'

export default function FarmerDashboard() {
  const { farmer, language, queue, farmersAhead, prediction, youIndex } = useApp()
  const centre = CENTRES.find((c) => c.id === farmer.preferredCentreId) || CENTRES[0]
  const myToken = queue.find((q) => q.isYou)
  const completedCount = queue.filter((q) => q.status === 'completed').length
  const progressPct = Math.min(100, Math.round((completedCount / queue.length) * 100))

  const now = new Date()
  const expectedTurn = new Date(now.getTime() + prediction.minutes * 60000)
  const expectedTurnStr = expectedTurn.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' })

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl sm:text-3xl font-semibold mb-1">
        {t(language, 'greeting')}, {farmer.name.split(' ')[0]} 👋
      </h1>
      <p className="text-ink/60 dark:text-paper/60 mb-8">{t(language, 'today_procurement')}</p>

      <div className="grid lg:grid-cols-[1.3fr_1fr] gap-6">
        {/* Main token card */}
        <div className="bg-field-500 text-white rounded-xl2 p-6 sm:p-8 shadow-card relative overflow-hidden">
          <div className="flex items-start justify-between mb-6">
            <div>
              <p className="text-field-100 text-sm">{t(language, 'token')}</p>
              <p className="font-mono text-4xl font-bold tracking-wider text-wheat-300">{myToken?.token || 'A-047'}</p>
            </div>
            <StatusBadge status={myToken?.status === 'processing' ? 'processing' : 'waiting'}>
              {myToken?.status === 'processing' ? 'Your Turn Now' : t(language, 'waiting')}
            </StatusBadge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6 text-sm">
            <Stat label={t(language, 'queue_position')} value={`#${youIndex + 1}`} />
            <Stat label={t(language, 'farmers_ahead')} value={farmersAhead} />
            <Stat label={t(language, 'est_wait')} value={`${prediction.minutes} min`} />
            <Stat label={t(language, 'expected_turn')} value={expectedTurnStr} />
            <Stat label={t(language, 'centre')} value={centre.name} span />
          </div>

          {/* Visual queue progress */}
          <div className="mb-2">
            <div className="flex justify-between text-xs text-field-100 mb-1.5">
              <span>COMPLETED</span>
              <span>YOU · {myToken?.token}</span>
            </div>
            <div className="w-full h-3 bg-field-700 rounded-full overflow-hidden">
              <div className="h-full bg-wheat-400 transition-all duration-700" style={{ width: `${progressPct}%` }} />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            <Link to="/farmer/queue" className="flex items-center gap-1.5 bg-wheat-400 text-field-900 font-semibold text-sm px-4 py-2.5 rounded-lg hover:bg-wheat-300">
              <Radio size={16} /> {t(language, 'view_live_queue')}
            </Link>
            <button onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${centre.lat},${centre.lng}`, '_blank')} className="flex items-center gap-1.5 bg-field-600 hover:bg-field-700 text-sm px-4 py-2.5 rounded-lg">
              <Navigation size={16} /> {t(language, 'get_directions')}
            </button>
            <Link to="/farmer/book" className="flex items-center gap-1.5 bg-field-600 hover:bg-field-700 text-sm px-4 py-2.5 rounded-lg">
              <CalendarClock size={16} /> {t(language, 'reschedule')}
            </Link>
            <button className="flex items-center gap-1.5 bg-field-600 hover:bg-field-700 text-sm px-4 py-2.5 rounded-lg">
              <Phone size={16} /> {t(language, 'contact_centre')}
            </button>
          </div>
        </div>

        {/* AI prediction card */}
        <div className="bg-white dark:bg-field-800 rounded-xl2 p-6 shadow-card border border-field-100 dark:border-field-700 h-fit">
          <div className="flex items-center gap-2 mb-3">
            <Bot size={20} className="text-field-500" />
            <p className="font-semibold">AI Queue Prediction</p>
          </div>
          <p className="text-sm text-ink/70 dark:text-paper/70 mb-4">
            🤖 Based on current processing speed, queue length and historical centre data, your estimated waiting time is <strong>{prediction.minutes} minutes</strong>.
          </p>
          <div className="space-y-2 text-sm mb-4">
            <Row label="Farmers ahead" value={farmersAhead} />
            <Row label="Avg. processing time" value={`${prediction.factors.avgProcessingTimeMin} min/farmer`} />
            <Row label="Active counters" value={prediction.factors.activeCounters} />
            <Row label="Current congestion" value={prediction.congestionLabel} />
          </div>
          <div className="bg-field-50 dark:bg-field-900/40 rounded-lg px-3 py-2 flex items-center justify-between text-sm">
            <span className="text-ink/60 dark:text-paper/60">Prediction confidence</span>
            <span className="font-semibold text-field-500">{prediction.confidence}%</span>
          </div>
          <p className="text-[11px] text-ink/40 dark:text-paper/40 mt-3">This is a simulated estimate for demonstration and may vary from actual waiting time.</p>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, span }) {
  return (
    <div className={span ? 'col-span-2 sm:col-span-3' : ''}>
      <p className="text-field-100 text-xs">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-ink/60 dark:text-paper/60">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
