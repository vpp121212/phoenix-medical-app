import { useState } from 'react'
import { FiCalendar, FiClock, FiUser, FiX } from 'react-icons/fi'
import Layout from '../components/Layout'
import { useApp } from '../context/AppContext'
import { statusLabels } from '../data/mockData'

export default function MyAppointmentsPage() {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming')
  const { state, dispatch } = useApp()

  const upcoming = state.appointments.filter(
    (a) => a.status === 'pending' || a.status === 'confirmed'
  )
  const past = state.appointments.filter(
    (a) => a.status === 'completed' || a.status === 'cancelled'
  )
  const list = tab === 'upcoming' ? upcoming : past

  return (
    <Layout>
      <div className="page">
        <div className="tabs">
          <button
            className={`tab ${tab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setTab('upcoming')}
          >
            القادمة
          </button>
          <button
            className={`tab ${tab === 'past' ? 'active' : ''}`}
            onClick={() => setTab('past')}
          >
            السابقة
          </button>
        </div>

        {list.length === 0 ? (
          <div className="empty-state">
            <FiCalendar />
            <p>{tab === 'upcoming' ? 'لا توجد مواعيد قادمة' : 'لا توجد مواعيد سابقة'}</p>
          </div>
        ) : (
          list.map((appt) => (
            <div key={appt.id} className="appointment-card">
              <div className="appointment-card-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    className="doctor-avatar"
                    style={{ width: 44, height: 44, fontSize: 18 }}
                  >
                    <FiUser />
                  </div>
                  <div>
                    <div className="appt-doctor-name">{appt.doctorName}</div>
                    <div className="appt-spec">{appt.doctorSpecialization}</div>
                  </div>
                </div>
                <span className={`status-badge status-${appt.status}`}>
                  {statusLabels[appt.status]}
                </span>
              </div>
              <div className="appt-detail">
                <FiCalendar />
                <span>
                  {appt.date
                    ? new Date(appt.date).toLocaleDateString('ar-SA', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : ''}
                </span>
              </div>
              <div className="appt-detail">
                <FiClock />
                <span>{appt.time}</span>
              </div>
              {appt.notes && (
                <div
                  style={{
                    marginTop: 8,
                    padding: 8,
                    background: 'var(--surface)',
                    borderRadius: 8,
                    fontSize: 13,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {appt.notes}
                </div>
              )}
              {tab === 'upcoming' && appt.id && (
                <button
                  className="btn btn-danger btn-sm"
                  style={{ marginTop: 10 }}
                  onClick={() => {
                    if (confirm('هل أنت متأكد من إلغاء الموعد؟')) {
                      dispatch({ type: 'CANCEL_APPOINTMENT', payload: appt.id! })
                    }
                  }}
                >
                  <FiX /> إلغاء الموعد
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </Layout>
  )
}
