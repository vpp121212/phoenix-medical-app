import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiFileText } from 'react-icons/fi'
import { mockNews } from '../data/mockData'

export default function NewsPage() {
  const navigate = useNavigate()

  return (
    <div>
      <div className="app-header">
        <button className="app-header-back" onClick={() => navigate(-1)}>
          <FiArrowLeft /> الأخبار
        </button>
      </div>
      <div className="page">
        {mockNews.map((item) => (
          <div key={item.id} className="news-card">
            <div className="news-image">
              <FiFileText />
            </div>
            <div className="news-body">
              <div className="news-title">{item.title}</div>
              <div className="news-text">{item.body}</div>
              <div className="news-date">
                {item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString('ar-SA')
                  : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
