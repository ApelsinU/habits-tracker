import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { defaultBackgroundId } from '../assets/background/backgrounds'

export interface DayData {
  percentage: number
  description: string
}

export interface CalendarData {
  id: string
  name: string
  goal: string
  extended: boolean
  activeDates: Record<string, DayData>
}

interface AppState {
  user: string | null
  setUser: (user: string | null) => void

  calendarsByUser: Record<string, CalendarData[]>
  backgroundsByUser: Record<string, string>
  lastBackground: string
  setBackground: (id: string) => void
  activeId: string
  isModalOpen: boolean
  toggleDate: (date: string) => void
  setDayDetail: (date: string, detail: DayData) => void
  removeDay: (date: string) => void
  addCalendar: (name: string, goal: string, extended: boolean) => void
  editCalendar: (id: string, name: string, goal: string, extended: boolean) => void
  deleteCalendar: (id: string) => void
  setActiveId: (id: string) => void
  setIsModalOpen: (open: boolean) => void
}

const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) =>
        set((state) => {
          const userCals = user ? (state.calendarsByUser[user] ?? []) : []
          return {
            user,
            activeId: userCals.length > 0 ? userCals[0].id : '',
          }
        }),

      calendarsByUser: {},
      backgroundsByUser: {},
      lastBackground: defaultBackgroundId,

      setBackground: (id) =>
        set((state) => {
          const updates: Partial<AppState> = { lastBackground: id }
          if (state.user) {
            updates.backgroundsByUser = {
              ...state.backgroundsByUser,
              [state.user]: id,
            }
          }
          return updates
        }),

      activeId: '',
      isModalOpen: false,

      toggleDate: (date) =>
        set((state) => {
          if (!state.user) return {}
          const userCals = state.calendarsByUser[state.user] ?? []
          return {
            calendarsByUser: {
              ...state.calendarsByUser,
              [state.user]: userCals.map((cal) => {
                if (cal.id !== state.activeId) return cal
                const { [date]: _, ...rest } = cal.activeDates
                const isActive = date in cal.activeDates
                return {
                  ...cal,
                  activeDates: isActive ? rest : { ...cal.activeDates, [date]: { percentage: 0, description: '' } },
                }
              }),
            },
          }
        }),

      setDayDetail: (date, detail) =>
        set((state) => {
          if (!state.user) return {}
          const userCals = state.calendarsByUser[state.user] ?? []
          return {
            calendarsByUser: {
              ...state.calendarsByUser,
              [state.user]: userCals.map((cal) => {
                if (cal.id !== state.activeId) return cal
                return {
                  ...cal,
                  activeDates: { ...cal.activeDates, [date]: detail },
                }
              }),
            },
          }
        }),

      removeDay: (date) =>
        set((state) => {
          if (!state.user) return {}
          const userCals = state.calendarsByUser[state.user] ?? []
          return {
            calendarsByUser: {
              ...state.calendarsByUser,
              [state.user]: userCals.map((cal) => {
                if (cal.id !== state.activeId) return cal
                const { [date]: _, ...rest } = cal.activeDates
                return { ...cal, activeDates: rest }
              }),
            },
          }
        }),

      addCalendar: (name, goal, extended) =>
        set((state) => {
          if (!state.user) return {}
          const newCalendar: CalendarData = {
            id: Date.now().toString(),
            name,
            goal,
            extended,
            activeDates: {},
          }
          const userCals = state.calendarsByUser[state.user] ?? []
          return {
            calendarsByUser: {
              ...state.calendarsByUser,
              [state.user]: [...userCals, newCalendar],
            },
            activeId: newCalendar.id,
          }
        }),

      editCalendar: (id, name, goal, extended) =>
        set((state) => {
          if (!state.user) return {}
          const userCals = state.calendarsByUser[state.user] ?? []
          return {
            calendarsByUser: {
              ...state.calendarsByUser,
              [state.user]: userCals.map((cal) =>
                cal.id === id ? { ...cal, name, goal, extended } : cal
              ),
            },
          }
        }),

      deleteCalendar: (id) =>
        set((state) => {
          if (!state.user) return {}
          const userCals = state.calendarsByUser[state.user] ?? []
          const remaining = userCals.filter((cal) => cal.id !== id)
          const updates: Partial<AppState> = {
            calendarsByUser: {
              ...state.calendarsByUser,
              [state.user]: remaining,
            },
          }
          if (state.activeId === id) {
            updates.activeId = remaining.length > 0 ? remaining[0].id : ''
          }
          return updates
        }),

      setActiveId: (activeId) => set({ activeId }),
      setIsModalOpen: (isModalOpen) => set({ isModalOpen }),
    }),
    { name: 'habits-tracker' },
  ),
)

export default useAppStore
