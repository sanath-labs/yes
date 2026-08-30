import React, { useMemo } from 'react'
import { MapPin, Star } from 'lucide-react'
import { CENTRES } from '../data/mockData'
import { scoreCentre } from '../services/predictionEngine'

// Deterministic mock live-load numbers per centre for the demo.
function loadFor(centre, i) {
  const queueLength = [18, 6, 24, 11, 9, 15, 20, 4, 13, 17][i % 10]
  const waitMinutes = Math.round(queueLength * 2.8)
  return { queueLength, waitMinutes }
}

export default function CentreFinder() {
  const ranked = useMemo(() => {
    return CENTRES.map((c, i) => {
      const load = loadFor(c, i)
      const score = scoreCentre(c, load)
      const status = load.queueLength > 18 ? 'high' : load.queueLength > 8 ? 'moderate' : 'low'
      return { ...c, ...load, score, status }
    }).sort((a, b) => a.score - b.score)
  }, [])

  const best = ranked[0]

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-semibold mb-1">Find the Best Procurement Centre</h1>
      <p className="text-ink/60 dark:text-paper/60 mb-6">Ranked using distance, live queue length, estimated waiting time and centre capacity.</p>

      <div className="space-y-3">
        {ranked.map((c) => (
          <div key={c.id} className={`bg-white dark:bg-field-800 rounded-xl2 shadow-card border p-5 flex flex-col sm:flex-row sm:items-center gap-4 justify-between ${c.id === best.id ? 'border-wheat-400' : 'border-field-100 dark:border-field-700'}`}>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="font-semibold">{c.name}</p>
                {c.id === best.id && (
                  <span className="flex items-center gap-1 text-xs font-semibold text-wheat-600 bg-wheat-100 px-2 py-0.5 rounded-full">
                    <Star size={12} fill="currentColor" /> Recommended for you
                  </span>
                )}
              </div>
              <p className="text-sm text-ink/60 dark:text-paper/60 flex items-center gap-1"><MapPin size={13} /> {c.distanceKm} km · {c.district}</p>
            </div>
            <div className="flex gap-6 text-sm">
              <div>
                <p className="text-ink/50 dark:text-paper/50 text-xs">Queue</p>
                <p className="font-semibold">{c.queueLength} farmers</p>
              </div>
              <div>
                <p className="text-ink/50 dark:text-paper/50 text-xs">Wait</p>
                <p className="font-semibold">{c.waitMinutes} min</p>
              </div>
              <div>
                <p className="text-ink/50 dark:text-paper/50 text-xs">Status</p>
                <p className="font-semibold">
                  {c.status === 'low' && '🟢 Low Queue'}
                  {c.status === 'moderate' && '🟡 Normal'}
                  {c.status === 'high' && '🔴 Busy'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
