import { FiStar, FiUser } from 'react-icons/fi'
import type { Doctor } from '../types'

interface Props {
  doctor: Doctor
  onClick?: () => void
  horizontal?: boolean
}

const colors = ['#2E7D32', '#1565C0', '#E65100', '#6A1B9A', '#C62828', '#00695C']

export default function DoctorCard({ doctor, onClick, horizontal }: Props) {
  const colorIndex = parseInt(doctor.id?.slice(1) || '0') % colors.length
  const avatarBg = colors[colorIndex]

  const content = (
    <>
      <div className="doctor-avatar" style={{ background: avatarBg }}>
        {doctor.imageUrl ? <img src={doctor.imageUrl} alt={doctor.name} /> : <FiUser />}
      </div>
      <div className="doctor-info">
        <div className="doctor-name">{doctor.name}</div>
        <div className="doctor-spec">{doctor.specialization}</div>
        <div className="doctor-rating">
          <FiStar />
          <span>{doctor.rating}</span>
          <span>({doctor.reviewCount} تقييم)</span>
        </div>
        <div className="doctor-fee">{doctor.consultationFee} ر.س</div>
      </div>
    </>
  )

  if (horizontal) {
    return (
      <div className="doctor-card-h" onClick={onClick}>
        <div className="doctor-avatar" style={{ background: avatarBg }}>
          {doctor.imageUrl ? <img src={doctor.imageUrl} alt={doctor.name} /> : <FiUser />}
        </div>
        <div className="doctor-name">{doctor.name}</div>
        <div className="doctor-spec">{doctor.specialization}</div>
        <div className="doctor-rating" style={{ justifyContent: 'center' }}>
          <FiStar />
          <span>{doctor.rating}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="doctor-card" onClick={onClick}>
      {content}
    </div>
  )
}
