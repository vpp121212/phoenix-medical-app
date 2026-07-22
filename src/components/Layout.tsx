import { type ReactNode } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiHome, FiUserCheck, FiCalendar, FiUser } from 'react-icons/fi'
import type { AppTab } from '../types'

const tabs: { key: AppTab; label: string; icon: ReactNode; path: string }[] = [
  { key: 'home', label: 'الرئيسية', icon: <FiHome />, path: '/home' },
  { key: 'doctors', label: 'الأطباء', icon: <FiUserCheck />, path: '/doctors' },
  { key: 'appointments', label: 'مواعيدي', icon: <FiCalendar />, path: '/appointments' },
  { key: 'profile', label: 'حسابي', icon: <FiUser />, path: '/profile' },
]

export default function Layout({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname

  return (
    <div className="app-layout">
      {children}
      <nav className="tab-bar">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tab-item ${currentPath === tab.path ? 'active' : ''}`}
            onClick={() => navigate(tab.path)}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}
