import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CalendarData {
  id: string
  name: string
  goal: string
  activeDates: string[]
}

interface AppState {
  user: string | null
  setUser: (user: string | null) => void

  calendarsByUser: Record<string, CalendarData[]>
  activeId: string
  isModalOpen: boolean
  toggleDate: (date: string) => void
  addCalendar: (name: string, goal: string) => void
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
                const hasDate = cal.activeDates.includes(date)
                return {
                  ...cal,
                  activeDates: hasDate
                    ? cal.activeDates.filter((d) => d !== date)
                    : [...cal.activeDates, date],
                }
              }),
            },
          }
        }),

      addCalendar: (name, goal) =>
        set((state) => {
          if (!state.user) return {}
          const newCalendar: CalendarData = {
            id: Date.now().toString(),
            name,
            goal,
            activeDates: [],
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
