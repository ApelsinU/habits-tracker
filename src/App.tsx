import { useState } from 'react'
import AuthPage from './pages/AuthPage/AuthPage'
import CalendarPage from './pages/CalendarPage/CalendarPage'
import Background from './components/Background/Background'
import SettingsModal from './modals/SettingsModal/SettingsModal'
import { getBackgroundTheme } from './assets/background/backgrounds'
import useAppStore from './store/useAppStore'
import './App.scss'

function App() {
  const user = useAppStore((s) => s.user)
  const setUser = useAppStore((s) => s.setUser)
  const backgroundsByUser = useAppStore((s) => s.backgroundsByUser)
  const lastBackground = useAppStore((s) => s.lastBackground)
  const backgroundId = user ? (backgroundsByUser[user] ?? lastBackground) : lastBackground
  const theme = getBackgroundTheme(backgroundId)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  const content = !user ? (
    <AuthPage onLogin={(login) => setUser(login)} />
  ) : (
    <>
      <div className="app">
        <header className="app__header">
          <span className="app__user">{user}</span>
          <button type="button" className="app__settings" onClick={() => setIsSettingsOpen(true)}>
            Настройки
          </button>
          <button type="button" className="app__logout" onClick={() => setUser(null)}>
            Выйти
          </button>
        </header>
        <CalendarPage />
      </div>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  )

  return (
    <div className={`app-root app-root--${theme}`}>
      <Background id={backgroundId} />
      {content}
    </div>
  )
}

export default App
