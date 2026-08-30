import React, { useState } from 'react'
import { CalendarPlus, Ticket } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CROPS, CENTRES } from '../data/mockData'

const SLOTS = [
  { time: '09:00 - 10:00', status: 'Available' },
  { time: '10:00 - 11:00', status: 'Available' },
  { time: '11:00 - 12:00', status: 'Almost Full' },
  { time: '12:00 - 01:00', status: 'Full' },
  { time: '02:00 - 03:00', status: 'Available' },
  { time: '03:00 - 04:00', status: 'Almost Full' },
]

const STATUS_STYLE = {
  Available: 'border-field-300 text-field-600 hover:bg-field-50',
  'Almost Full': 'border-wheat-300 text-wheat-600 hover:bg-wheat-100',
  Full: 'border-ink/10 text-ink/30 cursor-not-allowed',
}

export default function SlotBooking() {
  const { farmer, pushToast } = useApp()
  const [crop, setCrop] = useState(farmer.preferredCrop)
  const [quantity, setQuantity] = useState('')
  const [centreId, setCentreId] = useState(farmer.preferredCentreId)
  const [date, setDate] = useState('2026-08-29')
  const [slot, setSlot] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  const centre = CENTRES.find((c) => c.id === centreId)

  const confirm = () => {
    if (!slot || !quantity) {
      pushToast('Please select a quantity and time slot.', 'info')
      return
    }
    setConfirmed(true)
    pushToast('Slot confirmed! Token A-047 generated.', 'success')
  }

  if (confirmed) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-field-100 dark:bg-field-700 flex items-center justify-center mx-auto mb-5">
          <Ticket size={28} className="text-field-500" />
        </div>
        <h1 className="font-display text-2xl font-semibold mb-1">Slot Confirmed</h1>
        <p className="text-ink/60 dark:text-paper/60 mb-6">Save your token — you'll need it at the centre.</p>
        <div className="bg-white dark:bg-field-800 rounded-xl2 shadow-card border border-field-100 dark:border-field-700 p-6 text-left space-y-3">
          <Row label="Token" value={<span className="font-mono text-lg text-field-500 font-bold">A-047</span>} />
          <Row label="Date" value="28 August 2026" />
          <Row label="Time" value={`${slot.time} ${slot.time.includes('01') || slot.time.includes('02') || slot.time.includes('03') || slot.time.includes('04') ? 'PM' : 'AM'}`} />
          <Row label="Centre" value={centre.name} />
          <Row label="Crop" value={CROPS.find((c) => c.id === crop)?.name} />
          <Row label="Quantity" value={`${quantity} quintals`} />
        </div>
        <div className="flex gap-3 mt-6 justify-center">
          <button onClick={() => pushToast('Added to your calendar.', 'success')} className="bg-field-500 hover:bg-field-600 text-white font-semibold px-5 py-3 rounded-xl">Add to Calendar</button>
          <a href="/farmer/queue" className="bg-field-50 dark:bg-field-700 font-semibold px-5 py-3 rounded-xl">View Queue</a>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-semibold mb-1 flex items-center gap-2"><CalendarPlus size={24} className="text-field-500" /> Book Procurement Slot</h1>
      <p className="text-ink/60 dark:text-paper/60 mb-6">Choose your crop, centre and a convenient time slot.</p>

      <div className="bg-white dark:bg-field-800 rounded-xl2 shadow-card p-6 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-sm font-medium mb-1.5 block">Crop</span>
            <select value={crop} onChange={(e) => setCrop(e.target.value)} className="input">
              {CROPS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium mb-1.5 block">Quantity (quintals)</span>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="input" placeholder="42" />
          </label>
          <label className="block">
            <span className="text-sm font-medium mb-1.5 block">Procurement Centre</span>
            <select value={centreId} onChange={(e) => setCentreId(e.target.value)} className="input">
              {CENTRES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium mb-1.5 block">Date</span>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" />
          </label>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Morning / Afternoon Slots</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {SLOTS.map((s) => (
              <button
                type="button"
                key={s.time}
                disabled={s.status === 'Full'}
                onClick={() => setSlot(s)}
                className={`flex items-center justify-between border-2 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${STATUS_STYLE[s.status]} ${slot?.time === s.time ? 'ring-2 ring-field-500' : ''}`}
              >
                <span>{s.time}</span>
                <span className="text-xs">{s.status}</span>
              </button>
            ))}
          </div>
        </div>

        <button onClick={confirm} className="w-full bg-field-500 hover:bg-field-600 text-white font-semibold py-3.5 rounded-xl shadow-card">
          Confirm Booking
        </button>
      </div>
      <style>{`.input { width:100%; border:2px solid rgb(226 232 216); border-radius:0.75rem; padding:0.65rem 1rem; background:transparent; } .input:focus { outline:none; border-color:#2F5233; } .dark .input { border-color:#254129; }`}</style>
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-ink/60 dark:text-paper/60">{label}</span>
      <span className="font-medium">{value}</span>
    </div>
  )
}
