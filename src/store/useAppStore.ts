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

export interface TodoItem {
  id: string
  text: string
  completed: boolean
}

export type PageId = 'calendar' | 'todo' | 'stats'

interface AppState {
  user: string | null
  setUser: (user: string | null) => void

  currentPage: PageId
  setCurrentPage: (page: PageId) => void

  calendarsByUser: Record<string, CalendarData[]>
  backgroundsByUser: Record<string, string>
  lastBackground: string
  setBackground: (id: string) => void
  simpleTheme: boolean
  setSimpleTheme: (value: boolean) => void
  simpleDark: boolean
  setSimpleDark: (value: boolean) => void
  skipWelcomeScreen: boolean
  setSkipWelcomeScreen: (value: boolean) => void
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

  todosByUser: Record<string, TodoItem[]>
  addTodo: (text: string) => void
  toggleTodo: (id: string) => void
  removeTodo: (id: string) => void
  clearCompletedTodos: () => void
  clearAllTodos: () => void
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

      currentPage: 'calendar',
      setCurrentPage: (currentPage) => set({ currentPage }),

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

      simpleTheme: false,
      setSimpleTheme: (simpleTheme) => set({ simpleTheme }),

      simpleDark: false,
      setSimpleDark: (simpleDark) => set({ simpleDark }),

      skipWelcomeScreen: false,
      setSkipWelcomeScreen: (skipWelcomeScreen) => set({ skipWelcomeScreen }),

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

      todosByUser: {},
      addTodo: (text) =>
        set((state) => {
          if (!state.user) return {}
          const item: TodoItem = { id: Date.now().toString(), text, completed: false }
          return {
            todosByUser: {
              ...state.todosByUser,
              [state.user]: [...(state.todosByUser[state.user] ?? []), item],
            },
          }
        }),
      toggleTodo: (id) =>
        set((state) => {
          if (!state.user) return {}
          return {
            todosByUser: {
              ...state.todosByUser,
              [state.user]: (state.todosByUser[state.user] ?? []).map((t) =>
                t.id === id ? { ...t, completed: !t.completed } : t
              ),
            },
          }
        }),
      removeTodo: (id) =>
        set((state) => {
          if (!state.user) return {}
          return {
            todosByUser: {
              ...state.todosByUser,
              [state.user]: (state.todosByUser[state.user] ?? []).filter((t) => t.id !== id),
            },
          }
        }),
      clearCompletedTodos: () =>
        set((state) => {
          if (!state.user) return {}
          return {
            todosByUser: {
              ...state.todosByUser,
              [state.user]: (state.todosByUser[state.user] ?? []).filter((t) => !t.completed),
            },
          }
        }),
      clearAllTodos: () =>
        set((state) => {
          if (!state.user) return {}
          return {
            todosByUser: {
              ...state.todosByUser,
              [state.user]: [],
            },
          }
        }),
    }),
    {
      name: 'habits-tracker',
      migrate: (persistedState: unknown, _version: number) => {
        const state = persistedState as Record<string, unknown>
        if (state && typeof state.skipLoadingScreen === 'boolean' && state.skipWelcomeScreen === undefined) {
          state.skipWelcomeScreen = state.skipLoadingScreen
        }
        delete state.skipLoadingScreen
        return state
      },
      version: 1,
    },
  ),
)

export default useAppStore
