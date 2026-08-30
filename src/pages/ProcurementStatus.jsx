import React from 'react'
import { Check, Clock, Circle } from 'lucide-react'
import { useApp } from '../context/AppContext'

const STAGES = [
  { key: 'slot_booked', label: 'Slot Booked' },
  { key: 'arrived', label: 'Farmer Arrived' },
  { key: 'called', label: 'Token Called' },
  { key: 'started', label: 'Procurement Started' },
  { key: 'quality', label: 'Quality Verification' },
  { key: 'quantity', label: 'Quantity Recorded' },
  { key: 'completed', label: 'Procurement Completed' },
]

export default function ProcurementStatus() {
  const { procurementStage, procurementDetails, paymentStage } = useApp()
  const currentIdx = STAGES.findIndex((s) => s.key === procurementStage)

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-semibold mb-1">Procurement Status</h1>
      <p className="text-ink/60 dark:text-paper/60 mb-8">Follow your crop from slot booking to completion.</p>

      <div className="bg-white dark:bg-field-800 rounded-xl2 shadow-card p-6 sm:p-8">
        {STAGES.map((s, i) => {
          const done = i <= currentIdx
          const active = i === currentIdx && procurementStage !== 'completed'
          return (
            <div key={s.key} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${done ? 'bg-field-500 text-white' : 'bg-field-100 dark:bg-field-700 text-ink/40 dark:text-paper/40'}`}>
                  {done ? <Check size={16} /> : active ? <Clock size={14} /> : <Circle size={10} />}
                </div>
                {i < STAGES.length - 1 && <div className={`w-0.5 flex-1 min-h-8 ${i < currentIdx ? 'bg-field-500' : 'bg-field-100 dark:bg-field-700'}`} />}
              </div>
              <div className="pb-8">
                <p className={`font-medium ${done ? '' : 'text-ink/40 dark:text-paper/40'}`}>{s.label}</p>
                {s.key === 'completed' && procurementStage === 'completed' && procurementDetails && (
                  <p className="text-sm text-ink/60 dark:text-paper/60 mt-1">
                    {procurementDetails.quantity} quintals of {procurementDetails.cropName} recorded, grade {procurementDetails.grade}.
                  </p>
                )}
              </div>
            </div>
          )
        })}
        <div className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${paymentStage === 'completed' ? 'bg-field-500 text-white' : paymentStage === 'processing' ? 'bg-wheat-400 text-field-900' : 'bg-field-100 dark:bg-field-700 text-ink/40'}`}>
              {paymentStage === 'completed' ? <Check size={16} /> : paymentStage === 'processing' ? <Clock size={14} /> : <Circle size={10} />}
            </div>
          </div>
          <p className={`font-medium ${paymentStage !== 'pending' ? '' : 'text-ink/40 dark:text-paper/40'}`}>
            {paymentStage === 'completed' ? 'Payment Completed' : paymentStage === 'processing' ? 'Payment Processing' : 'Payment Completed'}
          </p>
        </div>
      </div>
    </div>
  )
}
