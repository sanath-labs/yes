// AI Prediction Engine — isolated so a real ML model can replace this
// calculation later without touching any UI code.
//
// Core hackathon formula (per spec):
//   Estimated Waiting Time = (Farmers Ahead × Avg Processing Time) / Active Counters
//
// This is then adjusted using simple "historical" congestion factors to
// simulate what a trained model would contribute.

const HOURLY_CONGESTION_FACTOR = {
  9: 0.9, 10: 1.05, 11: 1.25, 12: 1.1, 13: 0.85, 14: 0.8, 15: 0.95, 16: 1.0, 17: 0.85,
}

export function predictWaitTime({ farmersAhead, avgProcessingTimeMin = 2.8, activeCounters = 2, hourOfDay = new Date().getHours() }) {
  const base = (farmersAhead * avgProcessingTimeMin) / Math.max(1, activeCounters)
  const congestion = HOURLY_CONGESTION_FACTOR[hourOfDay] ?? 1
  const adjusted = base * congestion
  const confidence = Math.max(72, Math.min(96, 97 - farmersAhead * 0.4))
  const congestionLabel = congestion >= 1.15 ? 'High' : congestion >= 0.95 ? 'Medium' : 'Low'
  return {
    minutes: Math.max(1, Math.round(adjusted)),
    confidence: Math.round(confidence),
    congestionLabel,
    factors: {
      farmersAhead,
      avgProcessingTimeMin,
      activeCounters,
    },
  }
}

export function predictCentreCongestion(centre, scheduledFarmers) {
  const capacityRatio = scheduledFarmers / centre.capacity
  const level = capacityRatio > 0.75 ? 'high' : capacityRatio > 0.5 ? 'moderate' : 'low'
  return {
    level,
    capacityRatio: Math.round(capacityRatio * 100),
    peakWindow: '11:00 AM – 1:00 PM',
    recommendation: level === 'high'
      ? `Redirect approximately ${Math.round(scheduledFarmers * 0.15)} farmers to a nearby lower-load centre.`
      : null,
  }
}

// Smart centre recommendation score — lower is better.
export function scoreCentre(centre, { queueLength, waitMinutes }) {
  const distanceScore = centre.distanceKm * 1.2
  const queueScore = queueLength * 1.5
  const waitScore = waitMinutes * 1.0
  const capacityHeadroom = (centre.capacity - queueLength) / centre.capacity
  const capacityScore = (1 - capacityHeadroom) * 20
  return distanceScore + queueScore + waitScore + capacityScore
}
