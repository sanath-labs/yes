import React from 'react'
import { UserCircle2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CROPS, CENTRES } from '../data/mockData'

export default function Profile() {
  const { farmer } = useApp()
  const centre = CENTRES.find((c) => c.id === farmer.preferredCentreId)
  const crop = CROPS.find((c) => c.id === farmer.preferredCrop)

  return (
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-semibold mb-6 flex items-center gap-2"><UserCircle2 size={24} className="text-field-500" /> My Profile</h1>
      <div className="bg-white dark:bg-field-800 rounded-xl2 shadow-card p-6 space-y-4">
        <Row label="Full Name" value={farmer.name} />
        <Row label="Mobile Number" value={`+91 ${farmer.phone}`} />
        <Row label="Farmer Code" value={farmer.farmerCode} />
        <Row label="Village" value={farmer.village} />
        <Row label="District" value={farmer.district} />
        <Row label="State" value={farmer.state} />
        <Row label="Land Area" value={`${farmer.landAcres} acres`} />
        <Row label="Primary Crop" value={crop?.name} />
        <Row label="Preferred Centre" value={centre?.name} />
      </div>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between border-b border-field-50 dark:border-field-700 pb-3 last:border-0 last:pb-0 text-sm">
      <span className="text-ink/60 dark:text-paper/60">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  )
}
