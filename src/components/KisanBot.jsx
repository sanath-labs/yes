import React, { useState, useRef, useEffect } from 'react'
import { Bot, X, Send } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CENTRES } from '../data/mockData'

// AI service layer is isolated here so a real LLM/API can replace
// getAssistantReply() later without touching the chat UI.
function getAssistantReply(question, appState) {
  const q = question.toLowerCase()
  const { farmersAhead, prediction, queue, paymentStage, procurementStage, farmer } = appState
  const myToken = queue.find((t) => t.isYou)?.token || 'A-047'
  const centre = CENTRES.find((c) => c.id === farmer?.preferredCentreId)

  if (q.includes('queue') || q.includes('position') || q.includes('turn') || q.includes('when')) {
    return `Your token is ${myToken}. There are currently ${farmersAhead} farmers ahead of you. Your estimated waiting time is ${prediction.minutes} minutes.`
  }
  if (q.includes('centre') || q.includes('center') || q.includes('where')) {
    return `Your procurement centre is ${centre?.name || 'Mysuru Central Procurement Centre'}, ${centre?.district || 'Mysuru'} district. You can tap "Get Directions" on your dashboard to navigate there.`
  }
  if (q.includes('payment') || q.includes('paid') || q.includes('money')) {
    return paymentStage === 'completed'
      ? 'Your payment has been completed and credited to your registered bank account.'
      : paymentStage === 'processing'
      ? 'Your payment is currently processing. This usually completes within 2-3 working days.'
      : 'Payment will be initiated automatically once your procurement is completed and verified.'
  }
  if (q.includes('status') || q.includes('procurement')) {
    return `Your current procurement status is: ${procurementStage.replace('_', ' ')}.`
  }
  if (q.includes('document') || q.includes('id') || q.includes('bring')) {
    return 'Please carry your Farmer ID card, land record extract, and a valid mobile number for OTP verification. No Aadhaar upload is required in this prototype.'
  }
  if (q.includes('reschedule')) {
    return 'You can reschedule your slot from the Farmer Dashboard using the "Reschedule Slot" button, up to 2 hours before your slot time.'
  }
  return "I can help with your queue position, procurement centre, payment status, procurement status, required documents, or rescheduling. Try one of the quick buttons below, or ask me directly!"
}

const QUICK_BUTTONS = ['My Queue', 'My Payment', 'My Centre', 'Slot Details']

export default function KisanBot() {
  const app = useApp()
  const { role } = app
  const [openChat, setOpenChat] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Namaste! I am Kisan Sahayak, your procurement assistant. How can I help you today?' },
  ])
  const [input, setInput] = useState('')
  const endRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, openChat])

  if (role !== 'farmer') return null

  const send = (text) => {
    const question = text ?? input
    if (!question.trim()) return
    setMessages((m) => [...m, { from: 'user', text: question }])
    setInput('')
    setTimeout(() => {
      const reply = getAssistantReply(question, app)
      setMessages((m) => [...m, { from: 'bot', text: reply }])
    }, 450)
  }

  return (
    <>
      <button
        onClick={() => setOpenChat((o) => !o)}
        className="fixed bottom-5 right-5 z-50 bg-field-500 hover:bg-field-600 text-white rounded-full w-14 h-14 shadow-card flex items-center justify-center"
        aria-label="Open Kisan Sahayak assistant"
      >
        {openChat ? <X size={24} /> : <Bot size={26} />}
      </button>

      {openChat && (
        <div className="fixed bottom-24 right-5 z-50 w-[calc(100%-2.5rem)] max-w-sm h-[28rem] bg-white dark:bg-field-800 rounded-2xl shadow-card border border-field-100 dark:border-field-700 flex flex-col overflow-hidden">
          <div className="bg-field-500 text-white px-4 py-3 flex items-center gap-2">
            <Bot size={20} className="text-wheat-300" />
            <div>
              <p className="font-semibold text-sm leading-tight">Kisan Sahayak</p>
              <p className="text-[11px] text-field-100">Always here to help</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] text-sm px-3 py-2 rounded-2xl ${m.from === 'user' ? 'bg-field-500 text-white rounded-br-sm' : 'bg-paper dark:bg-field-700 text-ink dark:text-paper rounded-bl-sm'}`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="px-3 pb-2 flex flex-wrap gap-1.5">
            {QUICK_BUTTONS.map((b) => (
              <button
                key={b}
                onClick={() => send(b)}
                className="text-xs px-2.5 py-1 rounded-full bg-wheat-100 text-wheat-600 hover:bg-wheat-200 font-medium"
              >
                {b}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send() }}
            className="flex items-center gap-2 border-t border-field-100 dark:border-field-700 p-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 text-sm px-3 py-2 rounded-full bg-paper dark:bg-field-700 focus:outline-none"
            />
            <button type="submit" className="p-2 rounded-full bg-field-500 text-white" aria-label="Send message">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
