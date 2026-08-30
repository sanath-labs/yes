import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { useApp } from '../context/AppContext'
import { CENTRES } from '../data/mockData'

const WEEK = [
  { day: 'Mon', farmers: 132 }, { day: 'Tue', farmers: 145 }, { day: 'Wed', farmers: 158 },
  { day: 'Thu', farmers: 140 }, { day: 'Fri', farmers: 162 }, { day: 'Sat', farmers: 180 }, { day: 'Sun', farmers: 96 },
]

export default function OperatorAnalytics() {
  const { staff } = useApp()
  const centre = CENTRES.find((c) => c.id === staff.centreId)

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-semibold mb-1">Centre Analytics</h1>
      <p className="text-ink/60 dark:text-paper/60 mb-6">{centre?.name}</p>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        <Stat label="Weekly Average" value="145 farmers/day" />
        <Stat label="Avg. Processing Time" value="2.8 min/farmer" />
        <Stat label="Capacity" value={`${centre?.capacity} farmers/day`} />
      </div>

      <div className="bg-white dark:bg-field-800 rounded-xl2 shadow-card p-5">
        <p className="font-semibold text-sm mb-2">Farmers Served — Last 7 Days</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={WEEK}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EAF1E7" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="farmers" fill="#2F5233" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="bg-white dark:bg-field-800 rounded-xl2 shadow-card p-4">
      <p className="text-xs text-ink/50 dark:text-paper/50 mb-1">{label}</p>
      <p className="font-display text-lg font-semibold">{value}</p>
    </div>
  )
}
