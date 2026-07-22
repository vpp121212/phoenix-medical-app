import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { User, Appointment } from '../types'
import { mockAppointments } from '../data/mockData'

interface AppState {
  isAuthenticated: boolean
  user: User | null
  appointments: Appointment[]
  showOnboarding: boolean
}

type Action =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_USER'; payload: User }
  | { type: 'BOOK_APPOINTMENT'; payload: Appointment }
  | { type: 'CANCEL_APPOINTMENT'; payload: string }
  | { type: 'SKIP_ONBOARDING' }

const initialState: AppState = {
  isAuthenticated: false,
  user: null,
  appointments: mockAppointments,
  showOnboarding: true,
}

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true, user: action.payload, showOnboarding: false }
    case 'LOGOUT':
      return { ...state, isAuthenticated: false, user: null }
    case 'SET_USER':
      return { ...state, user: action.payload }
    case 'BOOK_APPOINTMENT':
      return { ...state, appointments: [action.payload, ...state.appointments] }
    case 'CANCEL_APPOINTMENT':
      return {
        ...state,
        appointments: state.appointments.map((a) =>
          a.id === action.payload ? { ...a, status: 'cancelled' as const } : a
        ),
      }
    case 'SKIP_ONBOARDING':
      return { ...state, showOnboarding: false }
    default:
      return state
  }
}

interface AppContextType {
  state: AppState
  dispatch: React.Dispatch<Action>
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
