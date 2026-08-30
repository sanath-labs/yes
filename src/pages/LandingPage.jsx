import React from 'react'
import { Link } from 'react-router-dom'
import { Wheat, MapPin, Ticket, Clock3, Bell, Landmark, TrendingDown, Eye, Radio, Building2, MessageCircle, BarChart3 } from 'lucide-react'
import { CENTRES, FARMERS } from '../data/mockData'

const STEPS = [
  { n: '01', title: 'Register', desc: 'Sign up with your phone number and basic farm details.', icon: Wheat },
  { n: '02', title: 'Select Centre', desc: 'Choose your nearest or least-crowded procurement centre.', icon: MapPin },
  { n: '03', title: 'Book Slot', desc: 'Pick a crop, quantity, date and time slot that suits you.', icon: Ticket },
  { n: '04', title: 'Receive Token', desc: 'Get a digital token instantly — no physical queue needed.', icon: Ticket },
  { n: '05', title: 'Track Queue', desc: 'Watch your live position and estimated waiting time.', icon: Clock3 },
  { n: '06', title: 'Complete Procurement', desc: 'Arrive near your turn, get your crop quality-checked and weighed.', icon: Landmark },
  { n: '07', title: 'Track Payment', desc: 'Follow your payment from processing to completion.', icon: Bell },
]

const BENEFITS = [
  { title: 'Reduced waiting time', desc: 'AI-based prediction tells farmers exactly when to arrive.', icon: TrendingDown },
  { title: 'Transparent queue', desc: 'Live position, no guesswork, no middlemen.', icon: Eye },
  { title: 'Real-time updates', desc: 'Queue, procurement and payment status update instantly.', icon: Radio },
  { title: 'Better centre management', desc: 'Operators see load and capacity at a glance.', icon: Building2 },
  { title: 'Faster farmer communication', desc: 'In-app and SMS-ready notifications at every stage.', icon: MessageCircle },
  { title: 'Data-driven government decisions', desc: 'State-wide analytics for congestion and resource planning.', icon: BarChart3 },
]

export default function LandingPage() {
  const totalFarmers = 12840 + FARMERS.length
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-field-500 text-white grain-bg">
        <div className="max-w-7xl mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <span className="inline-block bg-wheat-400 text-field-900 text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full mb-5">
              SIH 2026 · Problem Statement SIH26032
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] font-semibold">
              Smart Procurement.<br />Less Waiting.<br /><span className="text-wheat-300">Better for Farmers.</span>
            </h1>
            <p className="mt-6 text-field-100 text-lg max-w-xl">
              Digitising farmer procurement queues with real-time tracking, intelligent waiting-time prediction and transparent procurement status.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/farmer-login" className="bg-wheat-400 hover:bg-wheat-300 text-field-900 font-semibold px-6 py-3.5 rounded-xl shadow-card transition-colors">
                Book Procurement Slot
              </Link>
              <Link to="/farmer-login" className="bg-field-600 hover:bg-field-700 border border-field-400 font-semibold px-6 py-3.5 rounded-xl transition-colors">
                Track My Queue
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-3 text-sm text-field-200">
              <Link to="/farmer-login" className="underline underline-offset-2">Farmer Login</Link>
              <span className="text-field-500">•</span>
              <Link to="/operator-login" className="underline underline-offset-2">Operator Login</Link>
              <span className="text-field-500">•</span>
              <Link to="/admin-login" className="underline underline-offset-2">Government Admin Login</Link>
            </div>
          </div>

          {/* Signature element: split-flap token board */}
          <div className="bg-field-800/60 border border-field-400/40 rounded-xl2 p-5 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-widest text-field-200 mb-3">Mysuru Central Procurement Centre — Live</p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Now Serving', value: 'A-029' },
                { label: 'Your Token', value: 'A-047' },
                { label: 'Ahead', value: '18' },
              ].map((b) => (
                <div key={b.label} className="flap rounded-lg py-3 text-center">
                  <p className="text-[10px] text-wheat-200/70 uppercase tracking-wide mb-1">{b.label}</p>
                  <p className="text-xl font-bold tracking-wider flap-anim">{b.value}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm text-field-100 bg-field-700/50 rounded-lg px-4 py-2.5">
              <span>Estimated waiting</span>
              <span className="font-mono font-semibold text-wheat-200">~52 min</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white dark:bg-field-800 rounded-xl2 shadow-card grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-field-100 dark:divide-field-700">
          {[
            { label: 'Farmers Served', value: totalFarmers.toLocaleString('en-IN') },
            { label: 'Procurement Centres', value: CENTRES.length },
            { label: "Today's Appointments", value: '146' },
            { label: 'Average Waiting Time', value: '38 min' },
          ].map((s) => (
            <div key={s.label} className="p-6 text-center">
              <p className="font-display text-3xl font-semibold text-field-500">{s.value}</p>
              <p className="text-xs text-ink/60 dark:text-paper/60 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="font-display text-3xl font-semibold text-center mb-2">How It Works</h2>
        <p className="text-center text-ink/60 dark:text-paper/60 mb-12">Seven simple steps from registration to payment.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-white dark:bg-field-800 rounded-xl2 p-5 shadow-card border border-field-100 dark:border-field-700">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-wheat-500 font-semibold">{s.n}</span>
                <s.icon size={20} className="text-field-500" />
              </div>
              <p className="font-semibold mb-1">{s.title}</p>
              <p className="text-sm text-ink/60 dark:text-paper/60">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-field-50 dark:bg-field-900/40 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-3xl font-semibold text-center mb-12">Key Benefits</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS.map((b) => (
              <div key={b.title} className="bg-white dark:bg-field-800 rounded-xl2 p-6 shadow-card">
                <b.icon size={22} className="text-field-500 mb-3" />
                <p className="font-semibold mb-1">{b.title}</p>
                <p className="text-sm text-ink/60 dark:text-paper/60">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why KisanQueue */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="font-display text-3xl font-semibold text-center mb-12">Why KisanQueue?</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-field-500 text-white rounded-xl2 p-7">
            <p className="font-display text-xl font-semibold mb-2">Reduce Waiting</p>
            <p className="text-field-100 text-sm">AI-based waiting-time prediction reduces unnecessary time spent at procurement centres.</p>
          </div>
          <div className="bg-wheat-400 text-field-900 rounded-xl2 p-7">
            <p className="font-display text-xl font-semibold mb-2">Increase Transparency</p>
            <p className="text-field-800 text-sm">Farmers can track their token, procurement status and payment progress in real time.</p>
          </div>
          <div className="bg-clay-500 text-white rounded-xl2 p-7">
            <p className="font-display text-xl font-semibold mb-2">Improve Government Operations</p>
            <p className="text-clay-100 text-sm">Real-time analytics help administrators identify congestion and optimise centre capacity.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
