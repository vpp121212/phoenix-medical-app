import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiHeart, FiArrowLeft } from 'react-icons/fi'
import { useApp } from '../context/AppContext'

export default function OtpPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [timer, setTimer] = useState(60)
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const navigate = useNavigate()
  const location = useLocation()
  const { dispatch } = useApp()
  const phone = (location.state as { phone?: string })?.phone || ''

  useEffect(() => {
    if (timer > 0) {
      const t = setInterval(() => setTimer((prev) => prev - 1), 1000)
      return () => clearInterval(t)
    }
  }, [timer])

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus()
    }
    if (newOtp.every((d) => d) && value) {
      dispatch({
        type: 'LOGIN',
        payload: { id: 'u1', name: 'مستخدم', phone, profilePic: '' },
      })
      navigate('/home')
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handleResend = () => {
    setTimer(60)
  }

  return (
    <div className="auth-page">
      <div style={{ marginBottom: 24 }}>
        <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 14, color: 'var(--text-secondary)' }}>
          <FiArrowLeft /> رجوع
        </button>
      </div>
      <div className="auth-logo" style={{ marginBottom: 32 }}>
        <div className="auth-logo-icon" style={{ width: 64, height: 64, fontSize: 32 }}><FiHeart /></div>
      </div>
      <h2 className="auth-title">رمز التحقق</h2>
      <p className="auth-subtitle">أدخل الرقم المكون من 6 أرقام المرسل إلى {phone}</p>
      <div className="otp-inputs">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputsRef.current[i] = el }}
            className="otp-input"
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            autoFocus={i === 0}
          />
        ))}
      </div>
      <button
        style={{
          textAlign: 'center',
          color: timer > 0 ? 'var(--text-secondary)' : 'var(--primary)',
          fontSize: 14,
          fontWeight: 600,
          cursor: timer > 0 ? 'default' : 'pointer',
        }}
        onClick={handleResend}
        disabled={timer > 0}
      >
        {timer > 0 ? `إعادة الإرسال بعد ${timer} ثانية` : 'إعادة إرسال الرمز'}
      </button>
    </div>
  )
}
