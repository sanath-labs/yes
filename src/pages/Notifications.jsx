import React, { useEffect } from 'react'
import { Bell, Ticket, ClipboardCheck, IndianRupee, CalendarClock } from 'lucide-react'
import { useApp } from '../context/AppContext'

const ICONS = { queue: Ticket, procurement: ClipboardCheck, payment: IndianRupee, reminder: CalendarClock, slot: CalendarClock, info: Bell }

export default function Notifications() {
  const { notifications, markAllRead } = useApp()

  useEffect(() => { markAllRead() }, [markAllRead])

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="font-display text-2xl font-semibold mb-1 flex items-center gap-2"><Bell size={22} className="text-field-500" /> Notifications</h1>
      <p className="text-ink/60 dark:text-paper/60 mb-6">Queue updates, reminders and payment alerts.</p>

      <div className="space-y-3">
        {notifications.map((n) => {
          const Icon = ICONS[n.type] || Bell
          return (
            <div key={n.id} className="bg-white dark:bg-field-800 rounded-xl2 shadow-card p-4 flex gap-3">
              <div className="w-10 h-10 rounded-full bg-field-100 dark:bg-field-700 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-field-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-semibold">{n.title}</p>
                  <span className="text-xs text-ink/40 dark:text-paper/40 whitespace-nowrap ml-2">{n.time}</span>
                </div>
                <p className="text-sm text-ink/70 dark:text-paper/70 mt-0.5">{n.message}</p>
              </div>
            </div>
          )
        })}
        {notifications.length === 0 && <p className="text-center text-ink/50 py-12">No notifications yet.</p>}
      </div>
    </div>
  )
}
