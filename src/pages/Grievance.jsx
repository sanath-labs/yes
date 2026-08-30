import React, { useState } from 'react'
import { MessageSquareWarning, Paperclip, CheckCircle2 } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { GRIEVANCE_CATEGORIES, CENTRES } from '../data/mockData'

export default function Grievance() {
  const { farmer } = useApp()
  const [category, setCategory] = useState(GRIEVANCE_CATEGORIES[0])
  const [description, setDescription] = useState('')
  const [centreId, setCentreId] = useState(farmer.preferredCentreId)
  const [contact, setContact] = useState('phone')
  const [fileName, setFileName] = useState('')
  const [submitted, setSubmitted] = useState(null)

  const submit = (e) => {
    e.preventDefault()
    const id = `GRV-2026-${Math.floor(1000 + Math.random() * 8999)}`
    setSubmitted(id)
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center">
        <CheckCircle2 size={48} className="text-field-500 mx-auto mb-4" />
        <h1 className="font-display text-2xl font-semibold mb-2">Grievance Submitted</h1>
        <p className="text-ink/60 dark:text-paper/60 mb-6">We'll get back to you via your preferred contact method.</p>
        <div className="bg-white dark:bg-field-800 rounded-xl2 shadow-card p-6 space-y-2">
          <p className="text-sm text-ink/60 dark:text-paper/60">Grievance ID</p>
          <p className="font-mono text-xl font-bold text-field-500">{submitted}</p>
          <span className="inline-block mt-2 text-xs font-semibold bg-wheat-100 text-wheat-600 px-3 py-1 rounded-full">Submitted</span>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-semibold mb-1 flex items-center gap-2"><MessageSquareWarning size={22} className="text-field-500" /> Register a Grievance</h1>
      <p className="text-ink/60 dark:text-paper/60 mb-6">Tell us what went wrong — we'll route it to the right centre.</p>

      <form onSubmit={submit} className="bg-white dark:bg-field-800 rounded-xl2 shadow-card p-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium mb-1.5 block">Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="input">
            {GRIEVANCE_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium mb-1.5 block">Procurement Centre</span>
          <select value={centreId} onChange={(e) => setCentreId(e.target.value)} className="input">
            {CENTRES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <label className="block">
          <span className="text-sm font-medium mb-1.5 block">Description</span>
          <textarea required value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="input" placeholder="Describe the issue in detail..." />
        </label>
        <label className="block">
          <span className="text-sm font-medium mb-1.5 block">Photo (optional)</span>
          <label className="flex items-center gap-2 border-2 border-dashed border-field-200 dark:border-field-700 rounded-xl px-4 py-3 cursor-pointer text-sm text-ink/60 dark:text-paper/60">
            <Paperclip size={16} />
            {fileName || 'Attach a photo'}
            <input type="file" accept="image/*" className="hidden" onChange={(e) => setFileName(e.target.files[0]?.name || '')} />
          </label>
        </label>
        <label className="block">
          <span className="text-sm font-medium mb-1.5 block">Contact Preference</span>
          <div className="flex gap-3">
            {['phone', 'sms', 'in-app'].map((c) => (
              <button type="button" key={c} onClick={() => setContact(c)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize border-2 ${contact === c ? 'border-field-500 bg-field-50 dark:bg-field-700' : 'border-field-100 dark:border-field-700'}`}>
                {c}
              </button>
            ))}
          </div>
        </label>
        <button type="submit" className="w-full bg-field-500 hover:bg-field-600 text-white font-semibold py-3.5 rounded-xl shadow-card">Submit Grievance</button>
      </form>
      <style>{`.input { width:100%; border:2px solid rgb(226 232 216); border-radius:0.75rem; padding:0.65rem 1rem; background:transparent; } .input:focus { outline:none; border-color:#2F5233; } .dark .input { border-color:#254129; }`}</style>
    </div>
  )
}
