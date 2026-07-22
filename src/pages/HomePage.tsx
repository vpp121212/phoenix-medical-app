import { useNavigate } from 'react-router-dom'
import { FiCalendar, FiUserCheck, FiFileText, FiMapPin } from 'react-icons/fi'
import Layout from '../components/Layout'
import DoctorCard from '../components/DoctorCard'
import { mockDoctors } from '../data/mockData'

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <Layout>
      <div className="page">
        <div className="hero">
          <h2>مرحباً بك في فينكس الطبي</h2>
          <p>احجز موعدك مع أفضل الأطباء بكل سهولة</p>
        </div>

        <div className="quick-actions">
          <button className="quick-action" onClick={() => navigate('/doctors')}>
            <FiUserCheck />
            <span>الأطباء</span>
          </button>
          <button className="quick-action" onClick={() => navigate('/appointments')}>
            <FiCalendar />
            <span>مواعيدي</span>
          </button>
          <button className="quick-action" onClick={() => navigate('/news')}>
            <FiFileText />
            <span>الأخبار</span>
          </button>
          <button className="quick-action">
            <FiMapPin />
            <span>الموقع</span>
          </button>
        </div>

        <div className="section-title">
          <span>أطباء مميزون</span>
          <button className="section-link" onClick={() => navigate('/doctors')}>
            عرض الكل
          </button>
        </div>
        <div className="doctors-scroll">
          {mockDoctors.slice(0, 5).map((doc) => (
            <DoctorCard
              key={doc.id}
              doctor={doc}
              horizontal
              onClick={() => navigate(`/doctor/${doc.id}`)}
            />
          ))}
        </div>
      </div>
    </Layout>
  )
}
