import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Wheat, Phone, ShieldCheck, ArrowLeft } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { DEMO_FARMER } from '../data/mockData'

export default function FarmerLogin() {
  const { loginFarmer } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState('phone') // phone | otp
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const [sending, setSending] = useState(false)

  const requestOtp = (e) => {
    e.preventDefault()
    setError('')
    if (!/^[6-9]\d{9}$/.test(phone.trim())) {
      setError('Enter a valid 10-digit mobile number.')
      return
    }
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setStep('otp')
    }, 600)
  }

  const verifyOtp = (e) => {
    e.preventDefault()
    const res = loginFarmer(phone, otp)
    if (!res.ok) {
      setError(res.error)
      return
    }
    navigate('/farmer')
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center bg-field-500 text-white p-16 grain-bg">
        <Wheat size={40} className="text-wheat-300 mb-6" />
        <h2 className="font-display text-3xl font-semibold leading-tight mb-4">
          Know when to arrive.<br />Not how long to wait.
        </h2>
        <p className="text-field-100 max-w-sm">
          Book your procurement slot, get a digital token, and track your live queue position from anywhere.
        </p>
      </div>

      <div className="flex flex-col justify-center px-6 py-16 max-w-md mx-auto w-full">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-ink/60 dark:text-paper/60 mb-8 hover:text-field-500">
          <ArrowLeft size={16} /> Back to home
        </Link>
        <h1 className="font-display text-2xl font-semibold mb-1">Farmer Login</h1>
        <p className="text-sm text-ink/60 dark:text-paper/60 mb-8">Login with your registered mobile number.</p>

        {step === 'phone' && (
          <form onSubmit={requestOtp} className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">Mobile Number</span>
              <div className="flex items-center gap-2 border-2 border-field-100 dark:border-field-700 rounded-xl px-4 py-3 focus-within:border-field-500">
                <Phone size={18} className="text-ink/40" />
                <span className="text-ink/50 dark:text-paper/50">+91</span>
                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="9999999999"
                  className="flex-1 bg-transparent focus:outline-none text-lg tracking-wide"
                  required
                />
              </div>
            </label>
            {error && <p className="text-sm text-alert-500">{error}</p>}
            <button type="submit" disabled={sending} className="w-full bg-field-500 hover:bg-field-600 disabled:opacity-60 text-white font-semibold py-3.5 rounded-xl shadow-card transition-colors">
              {sending ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        )}

        {step === 'otp' && (
          <form onSubmit={verifyOtp} className="space-y-4">
            <p className="text-sm text-ink/60 dark:text-paper/60">OTP sent to +91 {phone}. <button type="button" onClick={() => setStep('phone')} className="text-field-500 underline">Change number</button></p>
            <label className="block">
              <span className="text-sm font-medium mb-1.5 block">Enter OTP</span>
              <div className="flex items-center gap-2 border-2 border-field-100 dark:border-field-700 rounded-xl px-4 py-3 focus-within:border-field-500">
                <ShieldCheck size={18} className="text-ink/40" />
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="123456"
                  className="flex-1 bg-transparent focus:outline-none text-lg tracking-[0.3em]"
                  required
                />
              </div>
            </label>
            {error && <p className="text-sm text-alert-500">{error}</p>}
            <button type="submit" className="w-full bg-field-500 hover:bg-field-600 text-white font-semibold py-3.5 rounded-xl shadow-card transition-colors">
              Verify &amp; Login
            </button>
          </form>
        )}

        <div className="mt-8 bg-wheat-100 dark:bg-wheat-600/10 border border-wheat-300/60 rounded-xl p-4 text-sm">
          <p className="font-semibold text-wheat-600 mb-1">Demo Credentials (for judges)</p>
          <p className="text-ink/70 dark:text-paper/70">Phone: <span className="font-mono">{DEMO_FARMER.phone}</span> · OTP: <span className="font-mono">123456</span></p>
        </div>

        <p className="mt-6 text-center text-sm text-ink/60 dark:text-paper/60">
          New farmer? <Link to="/register" className="text-field-500 font-medium underline">Register here</Link>
        </p>
      </div>
    </div>
  )
}
