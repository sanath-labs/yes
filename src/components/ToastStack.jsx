import React from 'react'
import { CheckCircle2, Info, X } from 'lucide-react'
import { useApp } from '../context/AppContext'

export default function ToastStack() {
  const { toasts, dismissToast } = useApp()
  if (!toasts.length) return null
  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="flex items-start gap-3 bg-white dark:bg-field-800 border border-field-100 dark:border-field-700 shadow-card rounded-xl px-4 py-3 animate-[flapshift_0.3s_ease-out]"
          role="status"
        >
          {t.variant === 'info' ? (
            <Info size={20} className="text-wheat-500 shrink-0 mt-0.5" />
          ) : (
            <CheckCircle2 size={20} className="text-field-500 shrink-0 mt-0.5" />
          )}
          <p className="text-sm text-ink dark:text-paper flex-1">{t.message}</p>
          <button onClick={() => dismissToast(t.id)} aria-label="Dismiss notification" className="text-ink/40 hover:text-ink dark:text-paper/40 dark:hover:text-paper">
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  )
}
