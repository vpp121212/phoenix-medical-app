import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiHeart, FiPhone } from 'react-icons/fi'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (phone.length >= 10) {
      navigate('/otp', { state: { phone } })
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-logo">
        <div className="auth-logo-icon"><FiHeart /></div>
        <h1>فينكس الطبي</h1>
        <p>مرحباً بك في تطبيق الحجز الصحي</p>
      </div>
      <h2 className="auth-title">تسجيل الدخول</h2>
      <p className="auth-subtitle">أدخل رقم جوالك لتلقي رمز التحقق</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>رقم الجوال</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <div
              style={{
                padding: '12px 8px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--divider)',
                background: 'var(--surface)',
                fontSize: 14,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <FiPhone size={16} />
              +966
            </div>
            <input
              className="form-input"
              type="tel"
              dir="ltr"
              placeholder="5XXXXXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
              maxLength={9}
              style={{ flex: 1 }}
            />
          </div>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          style={{ marginTop: 16 }}
          disabled={phone.length < 9}
        >
          إرسال رمز التحقق
        </button>
      </form>
    </div>
  )
}
