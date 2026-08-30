// Central mock dataset for the KisanQueue prototype.
// In production, these would be Supabase/Postgres tables — the shape mirrors
// the schema in the SIH26032 spec so a real DB can be swapped in later.

export const CROPS = [
  { id: 'wheat', name: 'Wheat', msp: 2425, unit: 'quintal' },
  { id: 'rice', name: 'Rice (Paddy)', msp: 2300, unit: 'quintal' },
  { id: 'maize', name: 'Maize', msp: 2225, unit: 'quintal' },
  { id: 'ragi', name: 'Ragi', msp: 4290, unit: 'quintal' },
  { id: 'cotton', name: 'Cotton', msp: 7521, unit: 'quintal' },
  { id: 'gram', name: 'Bengal Gram', msp: 5650, unit: 'quintal' },
]

export const STATES_DISTRICTS = {
  Karnataka: ['Mysuru', 'Mandya', 'Hassan', 'Chamarajanagar'],
  Maharashtra: ['Pune', 'Nashik', 'Kolhapur'],
  'Uttar Pradesh': ['Meerut', 'Bareilly', 'Agra'],
  Punjab: ['Ludhiana', 'Patiala'],
}

export const CENTRES = [
  { id: 'C001', name: 'Mysuru Central Procurement Centre', district: 'Mysuru', state: 'Karnataka', lat: 12.2958, lng: 76.6394, capacity: 220, counters: 3, crops: ['wheat', 'rice', 'ragi'], distanceKm: 4.2 },
  { id: 'C002', name: 'Nanjangud Rural Mandi', district: 'Mysuru', state: 'Karnataka', lat: 12.1204, lng: 76.6839, capacity: 140, counters: 2, crops: ['rice', 'maize', 'gram'], distanceKm: 18.6 },
  { id: 'C003', name: 'Hunsur APMC Yard', district: 'Mysuru', state: 'Karnataka', lat: 12.3078, lng: 76.2934, capacity: 160, counters: 2, crops: ['maize', 'cotton'], distanceKm: 27.3 },
  { id: 'C004', name: 'Mandya Sugar Belt Centre', district: 'Mandya', state: 'Karnataka', lat: 12.5242, lng: 76.8958, capacity: 180, counters: 3, crops: ['rice', 'ragi'], distanceKm: 42.1 },
  { id: 'C005', name: 'Hassan Grain Procurement Hub', district: 'Hassan', state: 'Karnataka', lat: 13.0072, lng: 76.0964, capacity: 150, counters: 2, crops: ['maize', 'gram', 'wheat'], distanceKm: 7.1 },
  { id: 'C006', name: 'Chamarajanagar Millet Centre', district: 'Chamarajanagar', state: 'Karnataka', lat: 11.9236, lng: 76.9456, capacity: 120, counters: 2, crops: ['ragi', 'maize'], distanceKm: 35.4 },
  { id: 'C007', name: 'K.R. Nagar Cooperative Mandi', district: 'Mysuru', state: 'Karnataka', lat: 12.4225, lng: 76.1497, capacity: 130, counters: 2, crops: ['rice', 'cotton'], distanceKm: 22.8 },
  { id: 'C008', name: 'Periyapatna Farmers Centre', district: 'Mysuru', state: 'Karnataka', lat: 12.3392, lng: 76.0994, capacity: 100, counters: 1, crops: ['maize', 'gram'], distanceKm: 31.9 },
  { id: 'C009', name: 'T. Narsipur Procurement Point', district: 'Mysuru', state: 'Karnataka', lat: 12.2170, lng: 76.8975, capacity: 110, counters: 2, crops: ['rice', 'wheat'], distanceKm: 24.5 },
  { id: 'C010', name: 'Pandavapura APMC', district: 'Mandya', state: 'Karnataka', lat: 12.4959, lng: 76.6819, capacity: 140, counters: 2, crops: ['rice', 'ragi', 'gram'], distanceKm: 29.2 },
]

const FIRST_NAMES = ['Ravi', 'Suresh', 'Anil', 'Manjunath', 'Prakash', 'Ganesh', 'Krishna', 'Basavaraj', 'Nagaraj', 'Siddappa', 'Puttaswamy', 'Chandru', 'Mahesh', 'Ramesh', 'Shivakumar', 'Lakshmi', 'Kaveri', 'Geetha', 'Savitri', 'Parvati']
const LAST_NAMES = ['Kumar', 'Gowda', 'Naik', 'Reddy', 'Patil', 'Shetty', 'Rao', 'Urs', 'Iyer', 'Devaraj']

function seededRandom(seed) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}
const rand = seededRandom(42)

export const FARMERS = Array.from({ length: 118 }).map((_, i) => {
  const fn = FIRST_NAMES[Math.floor(rand() * FIRST_NAMES.length)]
  const ln = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)]
  const centre = CENTRES[Math.floor(rand() * CENTRES.length)]
  const crop = centre.crops[Math.floor(rand() * centre.crops.length)]
  return {
    id: `F${1000 + i}`,
    name: `${fn} ${ln}`,
    phone: `9${Math.floor(100000000 + rand() * 899999999)}`,
    village: `${['Hosahalli', 'Chikkanahalli', 'Doddahalli', 'Belagondahalli', 'Yeliyur', 'Bilikere'][Math.floor(rand() * 6)]}`,
    district: centre.district,
    state: centre.state,
    landAcres: (1 + rand() * 8).toFixed(1),
    preferredCrop: crop,
    preferredCentreId: centre.id,
  }
})

// The demo farmer judges will log in as.
export const DEMO_FARMER = {
  id: 'F0001',
  name: 'Ravi Kumar',
  phone: '9999999999',
  village: 'Hosahalli',
  district: 'Mysuru',
  state: 'Karnataka',
  landAcres: '4.2',
  farmerCode: 'KA-MYS-10473',
  preferredCrop: 'rice',
  preferredCentreId: 'C001',
  language: 'en',
}

export const STAFF_ACCOUNTS = {
  operator: { username: 'operator', password: 'demo123', centreId: 'C001', name: 'Operator (Mysuru Central)' },
  admin: { username: 'admin', password: 'demo123', name: 'State Procurement Admin' },
}

// Initial "today" queue at the demo farmer's centre — 18 farmers ahead of Ravi (token A-047).
export function buildInitialQueue() {
  const tokens = []
  let t = 29
  for (let i = 0; i < 18; i++) {
    tokens.push({
      token: `A-${String(t).padStart(3, '0')}`,
      farmer: FARMERS[i % FARMERS.length].name,
      crop: CROPS[Math.floor(rand() * 3)].name,
      quantity: `${(20 + rand() * 30).toFixed(0)} Q`,
      status: i === 0 ? 'processing' : 'waiting',
    })
    t++
  }
  tokens.push({ token: 'A-047', farmer: 'Ravi Kumar (You)', crop: 'Rice (Paddy)', quantity: '42 Q', status: 'waiting', isYou: true })
  return tokens
}

export const NOTIFICATIONS_SEED = [
  { id: 'n1', title: 'Slot Confirmed', message: 'Your procurement slot is booked for 28 Aug, 11:00 AM – 12:00 PM at Mysuru Central Procurement Centre.', time: '2 days ago', read: true, type: 'slot' },
  { id: 'n2', title: 'Queue Update', message: 'Your token A-047 is approaching. 18 farmers are ahead of you.', time: '1 hour ago', read: true, type: 'queue' },
  { id: 'n3', title: 'Slot Reminder', message: 'Your procurement slot starts at 11:00 AM. Please carry your farmer ID.', time: '35 minutes ago', read: false, type: 'reminder' },
]

export const GRIEVANCE_CATEGORIES = ['Long waiting time', 'Queue issue', 'Payment issue', 'Quality dispute', 'Slot issue', 'Other']

export const HISTORY_SEED = [
  { id: 'H1', date: '12 Jul 2026', centre: 'Mysuru Central Procurement Centre', crop: 'Rice (Paddy)', quantity: '38 Q', procurementStatus: 'Completed', paymentStatus: 'Paid', amount: 87400 },
  { id: 'H2', date: '03 Apr 2026', centre: 'Mysuru Central Procurement Centre', crop: 'Wheat', quantity: '22 Q', procurementStatus: 'Completed', paymentStatus: 'Paid', amount: 53350 },
  { id: 'H3', date: '19 Dec 2025', centre: 'Hassan Grain Procurement Hub', crop: 'Maize', quantity: '30 Q', procurementStatus: 'Completed', paymentStatus: 'Paid', amount: 66750 },
  { id: 'H4', date: '08 Sep 2025', centre: 'Mysuru Central Procurement Centre', crop: 'Ragi', quantity: '15 Q', procurementStatus: 'Completed', paymentStatus: 'Paid', amount: 64350 },
]
