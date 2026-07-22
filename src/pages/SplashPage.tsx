import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiHeart } from 'react-icons/fi'
import { useApp } from '../context/AppContext'

export default function SplashPage() {
  const navigate = useNavigate()
  const { state } = useApp()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (state.isAuthenticated) {
        navigate('/home')
      } else if (state.showOnboarding) {
        navigate('/onboarding')
      } else {
        navigate('/login')
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [navigate, state.isAuthenticated, state.showOnboarding])

  return (
    <div className="splash">
      <div className="splash-icon"><FiHeart /></div>
      <h1>فينكس الطبي</h1>
      <p>Phoenix Medical</p>
    </div>
  )
}
