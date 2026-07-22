import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiCalendar, FiUserCheck, FiBell } from 'react-icons/fi'
import { useApp } from '../context/AppContext'

const steps = [
  {
    icon: <FiCalendar />,
    title: 'حجز المواعيد بسهولة',
    desc: 'احجز موعدك مع أفضل الأطباء في دقائق، دون عناء الانتظار أو الاتصال.',
    cssClass: 'ob-step1',
  },
  {
    icon: <FiUserCheck />,
    title: 'أفضل الأطباء',
    desc: 'تصفح نخبة من أمهر الأطباء في جميع التخصصات، وشاهد تقييمات المرضى.',
    cssClass: 'ob-step2',
  },
  {
    icon: <FiBell />,
    title: 'تذكير بالمواعيد',
    desc: 'احصل على تذكير بموعدك قبل 24 ساعة، ولا تفوت أي موعد مرة أخرى.',
    cssClass: 'ob-step3',
  },
]

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate()
  const { dispatch } = useApp()
  const current = steps[step]

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1)
    } else {
      dispatch({ type: 'SKIP_ONBOARDING' })
      navigate('/login')
    }
  }

  const handleSkip = () => {
    dispatch({ type: 'SKIP_ONBOARDING' })
    navigate('/login')
  }

  return (
    <div className={`onboarding ${current.cssClass}`}>
      <div className="ob-skip">
        {step < steps.length - 1 && (
          <button onClick={handleSkip} style={{ color: 'var(--text-secondary)', fontSize: 14 }}>
            تخطي
          </button>
        )}
      </div>
      <div className="ob-content">
        <div className="ob-icon">{current.icon}</div>
        <h2 className="ob-title">{current.title}</h2>
        <p className="ob-desc">{current.desc}</p>
        <div className="ob-dots">
          {steps.map((_, i) => (
            <div key={i} className={`ob-dot ${i === step ? 'active' : ''}`} />
          ))}
        </div>
      </div>
      <div className="ob-footer">
        <button className="btn btn-primary" onClick={handleNext}>
          {step < steps.length - 1 ? 'التالي' : 'ابدأ الآن'}
        </button>
      </div>
    </div>
  )
}
