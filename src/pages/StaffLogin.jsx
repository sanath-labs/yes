import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Landmark, User, Lock, ArrowLeft, ShieldCheck } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { STAFF_ACCOUNTS } from '../data/mockData'

export default function StaffLogin({ kind }) {
  const { loginStaff } = useApp()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const title = kind === 'operator' ? 'Procurement Centre Operator' : 'Government Admin'
  const acct = STAFF_ACCOUNTS[kind]

  const submit = (e) => {
    e.preventDefault()
    const res = loginStaff(kind, username, password)
    if (!res.ok) {
      setError(res.error)
      return
    }
    navigate(`/${kind}`)
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] grid lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-center bg-field-800 text-white p-16 grain-bg">
        <Landmark size={40} className="text-wheat-300 mb-6" />
        <h2 className="font-display text-3xl font-semibold leading-tight mb-4">
          {kind === 'operator' ? 'Run a calmer counter.' : 'See the whole state, live.'}
        </h2>
        <p className="text-field-200 max-w-sm">
          {kind === 'operator'
            ? 'Call farmers, log procurement and update payments — all from one screen.'
            : 'Monitor every centre, queue and payment across the state in real time.'}
        </p>
      </div>

      <div className="flex flex-col justify-center px-6 py-16 max-w-md mx-auto w-full">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-ink/60 dark:text-paper/60 mb-8 hover:text-field-500">
          <ArrowLeft size={16} /> Back to home
        </Link>
        <h1 className="font-display text-2xl font-semibold mb-1">{title} Login</h1>
        <p className="text-sm text-ink/60 dark:text-paper/60 mb-8">Login with your official username and password.</p>

        <form onSubmit={submit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium mb-1.5 block">Username</span>
            <div className="flex items-center gap-2 border-2 border-field-100 dark:border-field-700 rounded-xl px-4 py-3 focus-within:border-field-500">
              <User size={18} className="text-ink/40" />
              <input value={username} onChange={(e) => setUsername(e.target.value)} className="flex-1 bg-transparent focus:outline-none" placeholder={acct.username} required />
            </div>
          </label>
          <label className="block">
            <span className="text-sm font-medium mb-1.5 block">Password</span>
            <div className="flex items-center gap-2 border-2 border-field-100 dark:border-field-700 rounded-xl px-4 py-3 focus-within:border-field-500">
              <Lock size={18} className="text-ink/40" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="flex-1 bg-transparent focus:outline-none" placeholder="••••••••" required />
            </div>
          </label>
          {error && <p className="text-sm text-alert-500">{error}</p>}
          <button type="submit" className="w-full bg-field-500 hover:bg-field-600 text-white font-semibold py-3.5 rounded-xl shadow-card transition-colors">
            Login
          </button>
        </form>

        <div className="mt-8 bg-wheat-100 dark:bg-wheat-600/10 border border-wheat-300/60 rounded-xl p-4 text-sm flex items-start gap-2">
          <ShieldCheck size={18} className="text-wheat-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-wheat-600 mb-1">Demo Credentials (for judges)</p>
            <p className="text-ink/70 dark:text-paper/70">Username: <span className="font-mono">{acct.username}</span> · Password: <span className="font-mono">{acct.password}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
