import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import Layout from '../components/Layout'
import DoctorCard from '../components/DoctorCard'
import { mockDoctors, specializations } from '../data/mockData'

export default function DoctorsPage() {
  const [query, setQuery] = useState('')
  const [spec, setSpec] = useState('الكل')
  const navigate = useNavigate()

  const filtered = mockDoctors.filter((doc) => {
    const matchSearch =
      !query ||
      doc.name?.includes(query) ||
      doc.specialization?.includes(query)
    const matchSpec = spec === 'الكل' || doc.specialization === spec
    return matchSearch && matchSpec
  })

  return (
    <Layout>
      <div className="page">
        <div className="search-bar">
          <FiSearch />
          <input
            placeholder="ابحث عن طبيب..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="chips">
          {specializations.map((s) => (
            <button
              key={s}
              className={`chip ${s === spec ? 'active' : ''}`}
              onClick={() => setSpec(s)}
            >
              {s}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>لا توجد نتائج للبحث</p>
          </div>
        ) : (
          filtered.map((doc) => (
            <DoctorCard
              key={doc.id}
              doctor={doc}
              onClick={() => navigate(`/doctor/${doc.id}`)}
            />
          ))
        )}
      </div>
    </Layout>
  )
}
