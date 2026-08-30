import React, { useState } from 'react'
import { X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CROPS } from '../data/mockData'

export default function ProcurementEntry({ token, onClose }) {
  const { completeProcurement, pushToast } = useApp()
  const cropId = CROPS.find((c) => token.crop.includes(c.name.split(' ')[0]))?.id || 'rice'
  const [quantity, setQuantity] = useState(parseInt(token.quantity) || 42)
  const [vehicle, setVehicle] = useState('KA-09-4471')
  const [grade, setGrade] = useState('A')
  const [moisture, setMoisture] = useState('12%')
  const [remarks, setRemarks] = useState('')
  const [stage, setStage] = useState('start') // start | processing

  const crop = CROPS.find((c) => c.id === cropId)

  const startProcurement = () => setStage('processing')

  const complete = () => {
    completeProcurement({ quantity, cropName: crop.name, rate: crop.msp, grade, vehicle, moisture })
    pushToast(`Procurement completed for ${token.token} — ${quantity} quintals recorded.`, 'success')
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-field-800 rounded-xl2 shadow-card max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-ink/40 hover:text-ink dark:text-paper/40" aria-label="Close">
          <X size={20} />
        </button>
        <h2 className="font-display text-xl font-semibold mb-1">Procurement Processing</h2>
        <p className="text-sm text-ink/60 dark:text-paper/60 mb-5">{token.token} · {token.farmer}</p>

        <div className="space-y-4">
          <Field label="Crop"><input disabled value={crop.name} className="input opacity-70" /></Field>
          <Field label="Quantity (quintals)"><input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="input" /></Field>
          <Field label="Vehicle Number"><input value={vehicle} onChange={(e) => setVehicle(e.target.value)} className="input" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Quality Grade">
              <select value={grade} onChange={(e) => setGrade(e.target.value)} className="input">
                <option>A</option><option>B</option><option>C</option>
              </select>
            </Field>
            <Field label="Moisture"><input value={moisture} onChange={(e) => setMoisture(e.target.value)} className="input" /></Field>
          </div>
          <Field label="Remarks"><textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={2} className="input" placeholder="Optional" /></Field>
        </div>

        <div className="flex gap-3 mt-6">
          {stage === 'start' ? (
            <button onClick={startProcurement} className="flex-1 bg-field-500 hover:bg-field-600 text-white font-semibold py-3 rounded-xl">Start Procurement</button>
          ) : (
            <button onClick={complete} className="flex-1 bg-field-500 hover:bg-field-600 text-white font-semibold py-3 rounded-xl">Complete Procurement</button>
          )}
        </div>
      </div>
      <style>{`.input { width:100%; border:2px solid rgb(226 232 216); border-radius:0.75rem; padding:0.55rem 0.9rem; background:transparent; font-size:0.9rem; } .input:focus { outline:none; border-color:#2F5233; } .dark .input { border-color:#254129; }`}</style>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium mb-1.5 block">{label}</span>
      {children}
    </label>
  )
}
