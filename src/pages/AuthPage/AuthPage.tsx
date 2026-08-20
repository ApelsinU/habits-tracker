import { useState } from 'react'
import './AuthPage.scss'

interface AuthPageProps {
  onLogin: (login: string) => void
}

function AuthPage({ onLogin }: AuthPageProps) {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!login.trim() || !password.trim()) {
      setError('Заполните все поля')
      return
    }

    onLogin(login.trim())
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-card__title">Вход</h1>
        <form className="auth-card__form" onSubmit={handleSubmit}>
          <div className="auth-card__field">
            <label className="auth-card__label" htmlFor="login">Логин</label>
            <input
              id="login"
              type="text"
              className="auth-card__input"
              placeholder="Введите логин"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              autoFocus
            />
          </div>
          <div className="auth-card__field">
            <label className="auth-card__label" htmlFor="password">Пароль</label>
            <input
              id="password"
              type="password"
              className="auth-card__input"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="auth-card__error">{error}</div>}
          <button type="submit" className="auth-card__submit">Войти</button>
        </form>
      </div>
    </div>
  )
}

export default AuthPage
