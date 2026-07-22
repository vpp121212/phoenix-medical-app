import { useNavigate } from 'react-router-dom'
import {
  FiUser, FiFileText, FiDollarSign, FiBell, FiShield,
  FiChevronLeft, FiPhone, FiMail, FiLogOut, FiHeart,
} from 'react-icons/fi'
import Layout from '../components/Layout'
import { useApp } from '../context/AppContext'

const menuItems = [
  { icon: <FiUser />, label: 'البيانات الشخصية' },
  { icon: <FiFileText />, label: 'التقارير الطبية' },
  { icon: <FiDollarSign />, label: 'الفواتير' },
  { icon: <FiBell />, label: 'الإشعارات' },
]

const infoItems = [
  { icon: <FiShield />, label: 'سياسة الخصوصية' },
  { icon: <FiFileText />, label: 'الشروط والأحكام' },
  { icon: <FiPhone />, label: 'اتصل بنا' },
  { icon: <FiMail />, label: 'الدعم الفني' },
]

export default function ProfilePage() {
  const navigate = useNavigate()
  const { state, dispatch } = useApp()

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' })
    navigate('/login')
  }

  return (
    <Layout>
      <div className="page">
        <div className="profile-header">
          <div className="profile-avatar">
            {state.user?.name?.charAt(0) || <FiUser />}
          </div>
          <div className="profile-name">{state.user?.name || 'مستخدم'}</div>
          <div className="profile-phone">{state.user?.phone || '05XXXXXXXX'}</div>
        </div>

        <div className="section-title">الخدمات</div>
        <div className="profile-menu" style={{ marginBottom: 16 }}>
          {menuItems.map((item, i) => (
            <div key={i} className="profile-menu-item">
              <div className="profile-menu-left">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <FiChevronLeft color="var(--text-secondary)" />
            </div>
          ))}
        </div>

        <div className="section-title">معلومات</div>
        <div className="profile-menu" style={{ marginBottom: 24 }}>
          {infoItems.map((item, i) => (
            <div key={i} className="profile-menu-item">
              <div className="profile-menu-left">
                {item.icon}
                <span>{item.label}</span>
              </div>
              <FiChevronLeft color="var(--text-secondary)" />
            </div>
          ))}
        </div>

        <button className="btn btn-danger" onClick={handleLogout}>
          <FiLogOut /> تسجيل الخروج
        </button>

        <div style={{ textAlign: 'center', marginTop: 24, color: 'var(--text-secondary)', fontSize: 12 }}>
          <FiHeart style={{ verticalAlign: 'middle', marginLeft: 4 }} />
          فينكس الطبي v1.0.0
        </div>
      </div>
    </Layout>
  )
}
