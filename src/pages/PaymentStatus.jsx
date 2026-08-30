import React from 'react'
import { Check, Clock, Circle, IndianRupee } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CROPS } from '../data/mockData'

const STEPS = ['Procurement completed', 'Bill generated', 'Payment initiated', 'Payment completed']

export default function PaymentStatusPage() {
  const { procurementDetails, paymentStage, procurementStage } = useApp()

  const details = procurementDetails || { cropName: 'Rice (Paddy)', quantity: 42, rate: CROPS.find((c) => c.id === 'rice').msp }
  const gross = Math.round(details.quantity * details.rate)
  const deductions = Math.round(gross * 0.02)
  const net = gross - deductions

  const stepIdx = procurementStage !== 'completed' ? -1 : paymentStage === 'completed' ? 3 : paymentStage === 'processing' ? 2 : 0

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-semibold mb-1 flex items-center gap-2"><IndianRupee size={22} className="text-field-500" /> Procurement Payment</h1>
      <p className="text-ink/60 dark:text-paper/60 mb-6">Dummy financial data for demonstration purposes only.</p>

      <div className="bg-white dark:bg-field-800 rounded-xl2 shadow-card p-6 space-y-4 mb-6">
        <Row label="Crop" value={details.cropName} />
        <Row label="Quantity" value={`${details.quantity} quintals`} />
        <Row label="MSP / Rate" value={`₹${details.rate.toLocaleString('en-IN')} per quintal`} />
        <hr className="border-field-100 dark:border-field-700" />
        <Row label="Gross amount" value={`₹${gross.toLocaleString('en-IN')}`} />
        <Row label="Deductions" value={`₹${deductions.toLocaleString('en-IN')}`} />
        <Row label="Net payable" value={<span className="text-lg font-bold text-field-500">₹{net.toLocaleString('en-IN')}</span>} bold />
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-ink/60 dark:text-paper/60">Payment status</span>
          <span className={`text-sm font-semibold px-3 py-1 rounded-full ${paymentStage === 'completed' ? 'bg-field-500 text-white' : 'bg-wheat-100 text-wheat-600'}`}>
            {paymentStage === 'completed' ? 'Paid' : paymentStage === 'processing' ? 'Processing' : 'Pending'}
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-field-800 rounded-xl2 shadow-card p-6">
        <p className="font-semibold mb-4">Payment Timeline</p>
        {STEPS.map((label, i) => {
          const done = i <= stepIdx
          const active = i === stepIdx + 1 && stepIdx < 3
          return (
            <div key={label} className="flex items-center gap-3 py-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${done ? 'bg-field-500 text-white' : 'bg-field-100 dark:bg-field-700 text-ink/40'}`}>
                {done ? <Check size={13} /> : active ? <Clock size={12} /> : <Circle size={8} />}
              </div>
              <span className={done ? '' : 'text-ink/40 dark:text-paper/40'}>{label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function Row({ label, value, bold }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-ink/60 dark:text-paper/60">{label}</span>
      <span className={bold ? '' : 'font-medium'}>{value}</span>
    </div>
  )
}
