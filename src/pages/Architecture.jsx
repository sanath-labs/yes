import React from 'react'

const LAYERS = [
  { title: 'Farmer Mobile / Web App', desc: 'React + Tailwind PWA — mobile-first interface for booking, queue tracking and payments.' },
  { title: 'Authentication', desc: 'Phone + OTP for farmers, username/password with role-based access for operators and admins.' },
  { title: 'API Layer', desc: 'REST endpoints for auth, farmers, centres, slots, queue, procurement and payments.' },
  { title: 'Supabase PostgreSQL', desc: 'Relational store for users, farmers, centres, slots, queue, procurements, payments, notifications and grievances.' },
  { title: 'Real-time Queue Engine', desc: 'Pushes live queue position and status changes to farmer and operator screens as tokens advance.' },
  { title: 'AI Prediction Engine', desc: 'Modular waiting-time and congestion prediction — currently a rule-based formula, designed to be swapped for a trained ML model.' },
  { title: 'Notification Service', desc: 'In-app and SMS-ready alerts for slot reminders, queue approach, procurement and payment updates.' },
  { title: 'Operator Dashboard', desc: 'Centre-level view for calling farmers, recording procurement and updating payment status.' },
  { title: 'Government Analytics', desc: 'State/district-level dashboards for congestion, volumes, waiting times and pending payments.' },
]

export default function Architecture() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="font-display text-2xl font-semibold mb-1">Technical Architecture</h1>
      <p className="text-ink/60 dark:text-paper/60 mb-8">How KisanQueue's layers connect, end to end.</p>

      <div className="relative pl-8">
        <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-field-200 dark:bg-field-700" />
        {LAYERS.map((l, i) => (
          <div key={l.title} className="relative pb-8 last:pb-0">
            <div className="absolute -left-8 top-0.5 w-8 h-8 rounded-full bg-field-500 text-white flex items-center justify-center text-xs font-bold">{i + 1}</div>
            <p className="font-semibold">{l.title}</p>
            <p className="text-sm text-ink/60 dark:text-paper/60 mt-0.5">{l.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
