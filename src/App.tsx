import AuthPage from './pages/AuthPage/AuthPage'
import CalendarPage from './pages/CalendarPage/CalendarPage'
import useLocalStorage from './hooks/useLocalStorage'
import './App.scss'

function App() {
  const [user, setUser] = useLocalStorage<string | null>('user', null)

  if (!user) {
    return <AuthPage onLogin={(login) => setUser(login)} />
  }

  return (
    <div className="app">
      <header className="app__header">
        <span className="app__user">{user}</span>
        <button type="button" className="app__logout" onClick={() => setUser(null)}>
          Выйти
        </button>
      </header>
      <CalendarPage />
    </div>
  )
}

export default App
