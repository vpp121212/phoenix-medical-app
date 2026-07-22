export interface User {
  id?: string
  name?: string
  phone?: string
  email?: string
  profilePic?: string
}

export interface Doctor {
  id?: string
  name?: string
  specialization?: string
  bio?: string
  rating: number
  reviewCount: number
  imageUrl?: string
  availableDays: string[]
  availableTimes: string[]
  consultationFee: number
  isAvailable: boolean
}

export interface Appointment {
  id?: string
  userId?: string
  doctorId?: string
  doctorName?: string
  doctorSpecialization?: string
  doctorImage?: string
  date?: string
  time?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  notes?: string
}

export interface NewsItem {
  id?: string
  title?: string
  body?: string
  imageUrl?: string
  createdAt?: string
}

export type AppTab = 'home' | 'doctors' | 'appointments' | 'profile'
