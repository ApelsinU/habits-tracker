import { useState } from 'react'
import AuthPage from './pages/AuthPage/AuthPage'
import CalendarPage from './pages/CalendarPage/CalendarPage'
import Background from './components/Background/Background'
import SettingsModal from './modals/SettingsModal/SettingsModal'
import useAppStore from './store/useAppStore'
import './App.scss'

function App() {
  const user = useAppStore((s) => s.user)
  const setUser = useAppStore((s) => s.setUser)
  const backgroundsByUser = useAppStore((s) => s.backgroundsByUser)
  const lastBackground = useAppStore((s) => s.lastBackground)
  const backgroundId = user ? (backgroundsByUser[user] ?? lastBackground) : lastBackground
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  if (!user) {
    return (
      <>
        <Background id={backgroundId} />
        <AuthPage onLogin={(login) => setUser(login)} />
      </>
    )
  }

  return (
    <>
      <Background id={backgroundId} />
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
}

export default App
