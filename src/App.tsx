import { Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from './context/AppContext'
import SplashPage from './pages/SplashPage'
import OnboardingPage from './pages/OnboardingPage'
import LoginPage from './pages/LoginPage'
import OtpPage from './pages/OtpPage'
import HomePage from './pages/HomePage'
import DoctorsPage from './pages/DoctorsPage'
import DoctorDetailPage from './pages/DoctorDetailPage'
import BookAppointmentPage from './pages/BookAppointmentPage'
import MyAppointmentsPage from './pages/MyAppointmentsPage'
import ProfilePage from './pages/ProfilePage'
import NewsPage from './pages/NewsPage'

export default function App() {
  const { state } = useApp()

  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/otp" element={<OtpPage />} />
      <Route
        path="/home"
        element={state.isAuthenticated ? <HomePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/doctors"
        element={state.isAuthenticated ? <DoctorsPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/doctor/:id"
        element={state.isAuthenticated ? <DoctorDetailPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/book/:id"
        element={state.isAuthenticated ? <BookAppointmentPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/appointments"
        element={state.isAuthenticated ? <MyAppointmentsPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={state.isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/news"
        element={state.isAuthenticated ? <NewsPage /> : <Navigate to="/login" />}
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}
