import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { STATES_DISTRICTS, CROPS, CENTRES } from '../data/mockData'

const STEP_TITLES = ['Basic Details', 'Location', 'Farm Details', 'Preferred Centre']

export default function RegisterWizard() {
  const { pushToast } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [form, setForm] = useState({
    name: '', phone: '', language: 'en',
    state: 'Karnataka', district: 'Mysuru', village: '',
    farmerId: '', landArea: '', cropType: 'rice',
    centreId: 'C001',
  })

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }))

  const next = () => setStep((s) => Math.min(s + 1, 3))
  const back = () => setStep((s) => Math.max(s - 1, 0))

  const submit = (e) => {
    e.preventDefault()
    pushToast(`Registration successful! Your Farmer ID is KA-${form.district.slice(0,3).toUpperCase()}-${Math.floor(10000 + Math.random()*89999)}. Please login with your mobile number to continue.`, 'success')
    navigate('/farmer-login')
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-ink/60 mb-6 hover:text-field-500">
        <ArrowLeft size={16} /> Back to home
      </Link>
      <h1 className="font-display text-2xl font-semibold mb-2">Farmer Registration</h1>
      <p className="text-sm text-ink/60 dark:text-paper/60 mb-8">This prototype uses a dummy Farmer ID — no Aadhaar or real identity documents are required.</p>

      {/* Stepper */}
      <div className="flex items-center mb-10">
        {STEP_TITLES.map((title, i) => (
          <React.Fragment key={title}>
            <div className="flex flex-col items-center gap-1.5">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${i < step ? 'bg-field-500 text-white' : i === step ? 'bg-wheat-400 text-field-900' : 'bg-field-100 text-ink/40 dark:bg-field-700 dark:text-paper/40'}`}>
                {i < step ? <Check size={16} /> : i + 1}
              </div>
              <span className="text-[11px] text-center max-w-[4.5rem] text-ink/60 dark:text-paper/60">{title}</span>
            </div>
            {i < STEP_TITLES.length - 1 && <div className={`flex-1 h-0.5 mx-1 ${i < step ? 'bg-field-500' : 'bg-field-100 dark:bg-field-700'}`} />}
          </React.Fragment>
        ))}
      </div>

      <form onSubmit={step === 3 ? submit : (e) => { e.preventDefault(); next() }} className="bg-white dark:bg-field-800 rounded-xl2 shadow-card p-6 sm:p-8 space-y-5">
        {step === 0 && (
          <>
            <Field label="Full Name">
              <input required value={form.name} onChange={(e) => update('name', e.target.value)} className="input" placeholder="Ravi Kumar" />
            </Field>
            <Field label="Mobile Number">
              <input required maxLength={10} value={form.phone} onChange={(e) => update('phone', e.target.value.replace(/\D/g,''))} className="input" placeholder="9999999999" />
            </Field>
            <Field label="Language Preference">
              <select value={form.language} onChange={(e) => update('language', e.target.value)} className="input">
                <option value="en">English</option>
                <option value="kn">ಕನ್ನಡ (Kannada)</option>
                <option value="hi">हिंदी (Hindi)</option>
              </select>
            </Field>
          </>
        )}

        {step === 1 && (
          <>
            <Field label="State">
              <select value={form.state} onChange={(e) => update('state', e.target.value)} className="input">
                {Object.keys(STATES_DISTRICTS).map((s) => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="District">
              <select value={form.district} onChange={(e) => update('district', e.target.value)} className="input">
                {STATES_DISTRICTS[form.state].map((d) => <option key={d}>{d}</option>)}
              </select>
            </Field>
            <Field label="Village">
              <input required value={form.village} onChange={(e) => update('village', e.target.value)} className="input" placeholder="Hosahalli" />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <Field label="Farmer ID / Dummy Identification Number">
              <input required value={form.farmerId} onChange={(e) => update('farmerId', e.target.value)} className="input" placeholder="e.g. KA-MYS-10473" />
            </Field>
            <Field label="Land Area (acres)">
              <input required type="number" step="0.1" value={form.landArea} onChange={(e) => update('landArea', e.target.value)} className="input" placeholder="4.2" />
            </Field>
            <Field label="Primary Crop">
              <select value={form.cropType} onChange={(e) => update('cropType', e.target.value)} className="input">
                {CROPS.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </Field>
          </>
        )}

        {step === 3 && (
          <>
            <Field label="Preferred Procurement Centre">
              <select value={form.centreId} onChange={(e) => update('centreId', e.target.value)} className="input">
                {CENTRES.filter((c) => c.district === form.district).length
                  ? CENTRES.filter((c) => c.district === form.district).map((c) => <option key={c.id} value={c.id}>{c.name}</option>)
                  : CENTRES.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </Field>
            <div className="bg-field-50 dark:bg-field-900/40 rounded-xl p-4 text-sm space-y-1">
              <p className="font-semibold mb-1">Review your details</p>
              <p><strong>{form.name}</strong> · +91 {form.phone}</p>
              <p>{form.village}, {form.district}, {form.state}</p>
              <p>{form.landArea} acres · {CROPS.find(c=>c.id===form.cropType)?.name}</p>
            </div>
          </>
        )}

        <div className="flex justify-between pt-2">
          {step > 0 ? (
            <button type="button" onClick={back} className="px-5 py-2.5 rounded-xl font-medium text-ink/70 dark:text-paper/70 hover:bg-field-50 dark:hover:bg-field-700">Back</button>
          ) : <span />}
          <button type="submit" className="bg-field-500 hover:bg-field-600 text-white font-semibold px-6 py-2.5 rounded-xl shadow-card">
            {step === 3 ? 'Complete Registration' : 'Continue'}
          </button>
        </div>
      </form>

      <style>{`.input { width:100%; border:2px solid rgb(226 232 216); border-radius:0.75rem; padding:0.65rem 1rem; background:transparent; } .input:focus { outline:none; border-color:#2F5233; } .dark .input { border-color:#254129; }`}</style>
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
