import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiCheck } from 'react-icons/fi'
import { mockDoctors } from '../data/mockData'
import { useApp } from '../context/AppContext'

const days = ['2026-07-22', '2026-07-23', '2026-07-25', '2026-07-26', '2026-07-28', '2026-07-29', '2026-07-30']

const dayNames: Record<string, string> = {
  '2026-07-22': 'الأربعاء',
  '2026-07-23': 'الخميس',
  '2026-07-25': 'السبت',
  '2026-07-26': 'الأحد',
  '2026-07-28': 'الثلاثاء',
  '2026-07-29': 'الأربعاء',
  '2026-07-30': 'الخميس',
}

export default function BookAppointmentPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { dispatch } = useApp()
  const doctor = mockDoctors.find((d) => d.id === id)

  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [notes, setNotes] = useState('')
  const [success, setSuccess] = useState(false)

  if (!doctor) {
    return (
      <div className="page">
        <p>الطبيب غير موجود</p>
        <button className="btn btn-outline" onClick={() => navigate(-1)}>رجوع</button>
      </div>
    )
  }

  const handleBook = () => {
    const appointment = {
      id: `a${Date.now()}`,
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialization: doctor.specialization,
      date: selectedDate,
      time: selectedTime,
      status: 'pending' as const,
      notes,
    }
    dispatch({ type: 'BOOK_APPOINTMENT', payload: appointment })
    setSuccess(true)
    setTimeout(() => navigate('/appointments'), 1500)
  }

  if (success) {
    return (
      <div className="auth-page" style={{ alignItems: 'center', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#E8F5E9', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <FiCheck size={40} color="#2E7D32" />
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700 }}>تم حجز الموعد بنجاح</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: 8 }}>سيتم إشعارك بتأكيد الحجز</p>
      </div>
    )
  }

  return (
    <div>
      <div className="app-header">
        <button className="app-header-back" onClick={() => navigate(-1)}>
          <FiArrowLeft /> حجز موعد
        </button>
      </div>
      <div className="page">
        <div style={{ background: 'var(--card)', borderRadius: 'var(--radius)', padding: 16, marginBottom: 16, boxShadow: 'var(--shadow)', display: 'flex', gap: 12, alignItems: 'center' }}>
          <div className="doctor-avatar" style={{ width: 48, height: 48, fontSize: 20 }}>
            {doctor.name?.charAt(2) || 'ط'}
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>{doctor.name}</div>
            <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{doctor.specialization}</div>
          </div>
        </div>

        <div className="form-group">
          <label>اختر اليوم</label>
          <div className="chips">
            {days.map((d) => (
              <button
                key={d}
                className={`chip ${d === selectedDate ? 'active' : ''}`}
                onClick={() => { setSelectedDate(d); setSelectedTime('') }}
              >
                {dayNames[d]}<br /><small>{d.slice(8)}/{d.slice(5, 7)}</small>
              </button>
            ))}
          </div>
        </div>

        {selectedDate && (
          <div className="form-group">
            <label>اختر الوقت</label>
            <div className="time-slots">
              {doctor.availableTimes.map((t) => (
                <button
                  key={t}
                  className={`time-slot ${t === selectedTime ? 'selected' : ''}`}
                  onClick={() => setSelectedTime(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="form-group">
          <label>ملاحظات (اختياري)</label>
          <textarea
            className="form-input"
            placeholder="أي ملاحظات إضافية..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={handleBook}
          disabled={!selectedDate || !selectedTime}
          style={{ opacity: selectedDate && selectedTime ? 1 : 0.5 }}
        >
          تأكيد الحجز
        </button>
      </div>
    </div>
  )
}
