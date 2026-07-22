import { useParams, useNavigate } from 'react-router-dom'
import { FiStar, FiUser, FiArrowLeft } from 'react-icons/fi'
import { mockDoctors } from '../data/mockData'

const colors = ['#2E7D32', '#1565C0', '#E65100', '#6A1B9A', '#C62828', '#00695C']

export default function DoctorDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const doctor = mockDoctors.find((d) => d.id === id)

  if (!doctor) {
    return (
      <div className="page">
        <p>الطبيب غير موجود</p>
        <button className="btn btn-outline" onClick={() => navigate(-1)}>
          رجوع
        </button>
      </div>
    )
  }

  const colorIndex = parseInt(doctor.id?.slice(1) || '0') % colors.length
  const avatarBg = colors[colorIndex]

  return (
    <div>
      <div className="app-header">
        <button className="app-header-back" onClick={() => navigate(-1)}>
          <FiArrowLeft /> رجوع
        </button>
      </div>
      <div className="page">
        <div className="doc-detail-header">
          <div className="doctor-avatar" style={{ width: 96, height: 96, fontSize: 40, background: avatarBg }}>
            {doctor.imageUrl ? <img src={doctor.imageUrl} alt={doctor.name} /> : <FiUser />}
          </div>
          <div className="doctor-name" style={{ fontSize: 20 }}>{doctor.name}</div>
          <div className="doctor-spec" style={{ fontSize: 15 }}>{doctor.specialization}</div>
          <div className="doctor-rating" style={{ justifyContent: 'center', marginTop: 8 }}>
            <FiStar />
            <span>{doctor.rating}</span>
            <span>({doctor.reviewCount} تقييم)</span>
          </div>
          <div className="doc-fee-large" style={{ marginTop: 8 }}>
            {doctor.consultationFee} ر.س
          </div>
        </div>

        <div className="doc-detail-section">
          <h3>نبذة عن الطبيب</h3>
          <p>{doctor.bio}</p>
        </div>

        <div className="doc-detail-section">
          <h3>أيام العمل</h3>
          <div>
            {doctor.availableDays.map((day) => (
              <span key={day} className="day-badge">{day}</span>
            ))}
          </div>
        </div>

        <div className="doc-detail-section">
          <h3>مواعيد العمل</h3>
          <div className="time-slots">
            {doctor.availableTimes.map((t) => (
              <span key={t} className="time-slot">{t}</span>
            ))}
          </div>
        </div>

        <button
          className="btn btn-primary"
          style={{ marginTop: 16 }}
          onClick={() => navigate(`/book/${doctor.id}`)}
        >
          حجز موعد
        </button>
      </div>
    </div>
  )
}
