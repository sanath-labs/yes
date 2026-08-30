import React, { useState, useMemo } from 'react'
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { AlertTriangle, TrendingUp, Users, Wheat, IndianRupee, Building2 } from 'lucide-react'
import { CENTRES, STATES_DISTRICTS } from '../data/mockData'
import { predictCentreCongestion } from '../services/predictionEngine'

const TREND = [
  { day: 'Mon', quintals: 4200 }, { day: 'Tue', quintals: 4800 }, { day: 'Wed', quintals: 5100 },
  { day: 'Thu', quintals: 4600 }, { day: 'Fri', quintals: 5400 }, { day: 'Sat', quintals: 6200 }, { day: 'Sun', quintals: 3900 },
]

const QUEUE_DIST = [
  { name: 'Low', value: 4, color: '#517F45' },
  { name: 'Moderate', value: 4, color: '#D9A441' },
  { name: 'High', value: 2, color: '#B23A34' },
]

const WAIT_TREND = [
  { week: 'W1', min: 48 }, { week: 'W2', min: 44 }, { week: 'W3', min: 41 }, { week: 'W4', min: 38 },
]

const PENDING_PAYMENTS = [
  { name: '0-2 days', value: 62 }, { name: '3-5 days', value: 27 }, { name: '5+ days', value: 11 },
]

export default function AdminDashboard() {
  const [district, setDistrict] = useState('All')
  const scheduledByCentre = useMemo(() => ({
    C001: 190, C002: 60, C003: 110, C004: 70, C005: 55, C006: 45, C007: 95, C008: 20, C009: 80, C010: 65,
  }), [])

  const filteredCentres = district === 'All' ? CENTRES : CENTRES.filter((c) => c.district === district)
  const busiest = CENTRES.reduce((a, b) => (scheduledByCentre[a.id] / a.capacity > scheduledByCentre[b.id] / b.capacity ? a : b))
  const congestion = predictCentreCongestion(busiest, scheduledByCentre[busiest.id])

  const utilization = CENTRES.map((c) => ({ name: c.name.split(' ')[0], pct: Math.round((scheduledByCentre[c.id] / c.capacity) * 100) })).sort((a, b) => b.pct - a.pct)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-semibold">National Procurement Operations Dashboard</h1>
          <p className="text-ink/60 dark:text-paper/60 text-sm">Karnataka State — live view</p>
        </div>
        <select value={district} onChange={(e) => setDistrict(e.target.value)} className="border-2 border-field-100 dark:border-field-700 rounded-lg px-3 py-2 text-sm bg-transparent">
          <option>All</option>
          {STATES_DISTRICTS.Karnataka.map((d) => <option key={d}>{d}</option>)}
        </select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-8">
        <KPI icon={Users} label="Total Farmers" value="12,958" />
        <KPI icon={Wheat} label="Today's Procurement" value="146" />
        <KPI icon={TrendingUp} label="Total Quantity" value="34,210 Q" />
        <KPI icon={Building2} label="Active Centres" value={filteredCentres.length} />
        <KPI icon={IndianRupee} label="Pending Payments" value="27" accent="wheat" />
        <KPI icon={TrendingUp} label="Avg. Waiting Time" value="38 min" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Procurement Trend (Quintals / day)">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAF1E7" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="quintals" stroke="#2F5233" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Centre Utilization (%)">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={utilization} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAF1E7" />
              <XAxis type="number" tick={{ fontSize: 12 }} />
              <YAxis dataKey="name" type="category" width={90} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="pct" fill="#D9A441" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Queue Distribution (Centres by load)">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={QUEUE_DIST} dataKey="value" nameKey="name" innerRadius={55} outerRadius={80} paddingAngle={3}>
                {QUEUE_DIST.map((d) => <Cell key={d.name} fill={d.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Average Waiting Time Trend (min)">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={WAIT_TREND}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EAF1E7" />
              <XAxis dataKey="week" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="min" stroke="#8C5A3C" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Congestion prediction */}
      <div className="bg-alert-100 dark:bg-alert-700/10 border border-alert-500/30 rounded-xl2 p-6 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="text-alert-500 shrink-0 mt-0.5" size={22} />
          <div>
            <p className="font-semibold text-alert-700 dark:text-alert-500 mb-1">Centre Congestion Prediction</p>
            <p className="text-sm text-ink/80 dark:text-paper/80 mb-2">
              ⚠️ {busiest.name} may reach high congestion between {congestion.peakWindow}.
            </p>
            <ul className="text-sm text-ink/60 dark:text-paper/60 list-disc list-inside space-y-0.5 mb-2">
              <li>{scheduledByCentre[busiest.id]} scheduled farmers ({congestion.capacityRatio}% of capacity)</li>
              <li>Historical peak period</li>
              <li>{busiest.counters} active counters</li>
              <li>Expected processing load above average</li>
            </ul>
            {congestion.recommendation && (
              <p className="text-sm font-medium text-field-600">Recommendation: {congestion.recommendation}</p>
            )}
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white dark:bg-field-800 rounded-xl2 shadow-card p-6 mb-8">
        <p className="font-semibold mb-4">Smart Alerts</p>
        <div className="space-y-3">
          <Alert color="alert" text={`${busiest.name} has exceeded ${congestion.capacityRatio}% capacity.`} tag="High Queue" />
          <Alert color="wheat" text="27 procurement payments are pending beyond expected processing time." tag="Payment Delay" />
          <Alert color="wheat" text="Chamarajanagar Millet Centre processing speed is 24% slower than its daily average." tag="Processing Delay" />
        </div>
      </div>

      {/* Live centre map mockup */}
      <div className="bg-white dark:bg-field-800 rounded-xl2 shadow-card p-6">
        <p className="font-semibold mb-4">Live Centre Map</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {CENTRES.map((c) => {
            const ratio = scheduledByCentre[c.id] / c.capacity
            const dot = ratio > 0.75 ? '🔴' : ratio > 0.5 ? '🟡' : '🟢'
            return (
              <div key={c.id} className="border border-field-100 dark:border-field-700 rounded-xl p-3 text-sm">
                <p className="font-medium mb-1">{dot} {c.name}</p>
                <p className="text-xs text-ink/50 dark:text-paper/50">Queue: {scheduledByCentre[c.id]} · Cap: {c.capacity}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function KPI({ icon: Icon, label, value, accent }) {
  return (
    <div className="bg-white dark:bg-field-800 rounded-xl2 shadow-card p-4">
      <Icon size={16} className={accent === 'wheat' ? 'text-wheat-500 mb-2' : 'text-field-500 mb-2'} />
      <p className="text-xs text-ink/50 dark:text-paper/50">{label}</p>
      <p className="font-display text-xl font-semibold">{value}</p>
    </div>
  )
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white dark:bg-field-800 rounded-xl2 shadow-card p-5">
      <p className="font-semibold text-sm mb-2">{title}</p>
      {children}
    </div>
  )
}

function Alert({ color, text, tag }) {
  const styles = color === 'alert' ? 'bg-alert-100 text-alert-700' : 'bg-wheat-100 text-wheat-600'
  return (
    <div className="flex items-center gap-3">
      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${styles}`}>{tag}</span>
      <p className="text-sm text-ink/70 dark:text-paper/70">{text}</p>
    </div>
  )
}
