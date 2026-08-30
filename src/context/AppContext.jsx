import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import { DEMO_FARMER, STAFF_ACCOUNTS, CENTRES, buildInitialQueue, NOTIFICATIONS_SEED, HISTORY_SEED } from '../data/mockData'
import { templates } from '../services/notificationService'
import { predictWaitTime } from '../services/predictionEngine'

const AppContext = createContext(null)

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used inside AppProvider')
  return ctx
}

let toastId = 0

export function AppProvider({ children }) {
  // ---------- Auth ----------
  const [role, setRole] = useState(null) // 'farmer' | 'operator' | 'admin'
  const [farmer, setFarmer] = useState(null)
  const [staff, setStaff] = useState(null)

  // ---------- Language ----------
  const [language, setLanguage] = useState('en')
  const [darkMode, setDarkMode] = useState(false)

  // ---------- Toasts ----------
  const [toasts, setToasts] = useState([])
  const pushToast = useCallback((message, variant = 'success') => {
    toastId += 1
    const id = toastId
    setToasts((t) => [...t, { id, message, variant }])
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200)
  }, [])
  const dismissToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), [])

  // ---------- Notifications ----------
  const [notifications, setNotifications] = useState(NOTIFICATIONS_SEED)
  const pushNotification = useCallback((notif) => {
    setNotifications((n) => [notif, ...n])
    pushToast(notif.message, 'info')
  }, [pushToast])
  const markAllRead = useCallback(() => setNotifications((n) => n.map((x) => ({ ...x, read: true }))), [])

  // ---------- Live queue simulation ----------
  const [queue, setQueue] = useState(buildInitialQueue())
  const [isSimulating, setIsSimulating] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const [activeCounters] = useState(2)
  const simTimer = useRef(null)

  const youIndex = queue.findIndex((q) => q.isYou)
  const processingIndex = queue.findIndex((q) => q.status === 'processing')
  const farmersAhead = youIndex >= 0 ? queue.slice(0, youIndex).filter((q) => q.status !== 'completed').length : 0
  const prediction = predictWaitTime({ farmersAhead, activeCounters })

  const advanceQueueStep = useCallback(() => {
    setQueue((prev) => {
      const next = prev.map((q) => ({ ...q }))
      const curProcessingIdx = next.findIndex((q) => q.status === 'processing')
      if (curProcessingIdx >= 0) {
        next[curProcessingIdx].status = 'completed'
      }
      const nextWaitingIdx = next.findIndex((q) => q.status === 'waiting')
      if (nextWaitingIdx >= 0) {
        next[nextWaitingIdx].status = 'processing'
        if (next[nextWaitingIdx].isYou) {
          pushNotification(templates.yourTurn(next[nextWaitingIdx].token, 2))
        } else {
          const aheadOfYou = next.slice(0, next.findIndex((q) => q.isYou)).filter((q) => q.status === 'waiting').length
          if (aheadOfYou > 0 && aheadOfYou <= 5) {
            pushNotification(templates.queueApproaching(aheadOfYou))
          }
        }
      }
      return next
    })
    setLastUpdated(new Date())
  }, [pushNotification])

  const startSimulation = useCallback(() => {
    if (simTimer.current) return
    setIsSimulating(true)
    simTimer.current = setInterval(() => {
      setQueue((prev) => {
        const stillWaiting = prev.some((q) => q.status === 'waiting')
        const stillProcessing = prev.some((q) => q.status === 'processing')
        if (!stillWaiting && !stillProcessing) {
          clearInterval(simTimer.current)
          simTimer.current = null
          setIsSimulating(false)
          return prev
        }
        return prev
      })
      advanceQueueStep()
    }, 1800)
  }, [advanceQueueStep])

  const stopSimulation = useCallback(() => {
    if (simTimer.current) {
      clearInterval(simTimer.current)
      simTimer.current = null
    }
    setIsSimulating(false)
  }, [])

  useEffect(() => () => { if (simTimer.current) clearInterval(simTimer.current) }, [])

  // ---------- Procurement + payment journey (for the demo farmer) ----------
  const [procurementStage, setProcurementStage] = useState('slot_booked')
  // stages: slot_booked -> arrived -> called -> started -> quality -> quantity -> completed
  const [procurementDetails, setProcurementDetails] = useState(null)
  const [paymentStage, setPaymentStage] = useState('pending') // pending -> processing -> completed
  const [history, setHistory] = useState(HISTORY_SEED)

  const completeProcurement = useCallback((details) => {
    setProcurementStage('completed')
    setProcurementDetails(details)
    pushNotification(templates.procurementCompleted(`${details.quantity} quintals`, details.cropName))
    setPaymentStage('processing')
    const amount = Math.round(details.quantity * details.rate)
    setTimeout(() => {
      pushNotification(templates.paymentInitiated(amount))
    }, 1200)
    setTimeout(() => {
      setPaymentStage('completed')
      setHistory((h) => [{
        id: `H${h.length + 1}`,
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        centre: CENTRES.find((c) => c.id === (staff?.centreId || 'C001'))?.name || 'Mysuru Central Procurement Centre',
        crop: details.cropName,
        quantity: `${details.quantity} Q`,
        procurementStatus: 'Completed',
        paymentStatus: 'Paid',
        amount,
      }, ...h])
    }, 6000)
  }, [pushNotification, staff])

  // ---------- Auth actions ----------
  const loginFarmer = useCallback((phone, otp) => {
    if (phone.trim() === DEMO_FARMER.phone && otp.trim() === '123456') {
      setFarmer(DEMO_FARMER)
      setRole('farmer')
      return { ok: true }
    }
    return { ok: false, error: 'Invalid phone number or OTP. Use the demo credentials shown below.' }
  }, [])

  const loginStaff = useCallback((kind, username, password) => {
    const acct = STAFF_ACCOUNTS[kind]
    if (acct && username.trim() === acct.username && password === acct.password) {
      setStaff(acct)
      setRole(kind)
      return { ok: true }
    }
    return { ok: false, error: 'Invalid username or password.' }
  }, [])

  const logout = useCallback(() => {
    setRole(null)
    setFarmer(null)
    setStaff(null)
    stopSimulation()
  }, [stopSimulation])

  const value = {
    role, farmer, staff, loginFarmer, loginStaff, logout,
    language, setLanguage, darkMode, setDarkMode,
    toasts, pushToast, dismissToast,
    notifications, pushNotification, markAllRead,
    queue, isSimulating, startSimulation, stopSimulation, advanceQueueStep, lastUpdated,
    youIndex, processingIndex, farmersAhead, activeCounters, prediction,
    procurementStage, setProcurementStage, procurementDetails, completeProcurement,
    paymentStage, history,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
