import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Moon, Sun, LogOut, Wheat, Globe } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { LANGUAGES, t } from '../i18n/translations'

const FARMER_NAV = [
  { to: '/farmer', label: 'nav_dashboard' },
  { to: '/farmer/queue', label: 'nav_queue' },
  { to: '/farmer/book', label: 'nav_book' },
  { to: '/farmer/centres', label: 'nav_centres' },
  { to: '/farmer/procurement', label: 'nav_procurement' },
  { to: '/farmer/payments', label: 'nav_payments' },
  { to: '/farmer/history', label: 'nav_history' },
  { to: '/farmer/notifications', label: 'nav_notifications' },
  { to: '/farmer/grievances', label: 'nav_grievances' },
  { to: '/farmer/profile', label: 'nav_profile' },
]

const OPERATOR_NAV = [
  { to: '/operator', label: 'Dashboard' },
  { to: '/operator/analytics', label: 'Centre Analytics' },
]

const ADMIN_NAV = [
  { to: '/admin', label: 'Dashboard' },
  { to: '/admin/reports', label: 'Reports' },
]

export default function Layout({ children }) {
  const { role, farmer, staff, logout, language, setLanguage, darkMode, setDarkMode, notifications } = useApp()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  const nav = role === 'farmer' ? FARMER_NAV : role === 'operator' ? OPERATOR_NAV : role === 'admin' ? ADMIN_NAV : []
  const unread = notifications.filter((n) => !n.read).length

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-paper dark:bg-paperDark text-ink dark:text-paper flex flex-col">
        <header className="sticky top-0 z-40 bg-field-500 text-white shadow-md">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
            <NavLink to={role ? `/${role}` : '/'} className="flex items-center gap-2 font-display font-semibold text-lg tracking-tight">
              <Wheat size={22} className="text-wheat-300" />
              KisanQueue
            </NavLink>

            <nav className="hidden lg:flex items-center gap-1">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/farmer' || item.to === '/operator' || item.to === '/admin'}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-lg text-sm font-medium transition-colors relative ${isActive ? 'bg-field-600 text-white' : 'text-field-100 hover:bg-field-600/60 hover:text-white'}`
                  }
                >
                  {item.label.startsWith('nav_') ? t(language, item.label) : item.label}
                  {item.to === '/farmer/notifications' && unread > 0 && (
                    <span className="absolute -top-1 -right-1 bg-wheat-400 text-field-900 text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{unread}</span>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {role === 'farmer' && (
                <div className="hidden md:flex items-center gap-1 bg-field-600/60 rounded-lg px-2 py-1">
                  <Globe size={14} />
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="bg-transparent text-xs font-medium focus:outline-none cursor-pointer"
                    aria-label="Select language"
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code} className="text-ink">{l.label}</option>
                    ))}
                  </select>
                </div>
              )}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-field-600/60"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              {role && (
                <>
                  <span className="hidden md:block text-sm text-field-100 pl-2 border-l border-field-400">
                    {farmer?.name || staff?.name}
                  </span>
                  <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-field-600/60" aria-label="Log out">
                    <LogOut size={18} />
                  </button>
                </>
              )}
              <button className="lg:hidden p-2 rounded-lg hover:bg-field-600/60" onClick={() => setOpen(!open)} aria-label="Open menu">
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {open && (
            <div className="lg:hidden bg-field-600 px-4 pb-4 flex flex-col gap-1">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/farmer' || item.to === '/operator' || item.to === '/admin'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) => `px-3 py-2.5 rounded-lg text-sm font-medium ${isActive ? 'bg-field-700 text-white' : 'text-field-100'}`}
                >
                  {item.label.startsWith('nav_') ? t(language, item.label) : item.label}
                </NavLink>
              ))}
            </div>
          )}
        </header>

        <main className="flex-1">{children}</main>

        <footer className="bg-field-800 text-field-100 mt-12">
          <div className="max-w-7xl mx-auto px-4 py-8 grid gap-6 md:grid-cols-3 text-sm">
            <div>
              <div className="flex items-center gap-2 font-display font-semibold text-white mb-2">
                <Wheat size={18} className="text-wheat-300" /> KisanQueue
              </div>
              <p className="text-field-200">Smart Farmer Procurement Queue & Status Management System.</p>
            </div>
            <div>
              <NavLink to="/architecture" className="hover:text-white underline underline-offset-2">Technical Architecture</NavLink>
            </div>
            <div className="text-field-300 text-xs leading-relaxed border-t md:border-t-0 md:border-l border-field-600 pt-4 md:pt-0 md:pl-6">
              {t(language, 'disclaimer')}
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
