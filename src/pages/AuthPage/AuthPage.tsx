import { useState } from 'react'
import './AuthPage.scss'

interface AuthPageProps {
  onLogin: (login: string) => void
}

function AuthPage({ onLogin }: AuthPageProps) {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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
            <div className="auth-card__input-wrapper">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="auth-card__input auth-card__input--password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="auth-card__toggle-password"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {error && <div className="auth-card__error">{error}</div>}
          <button type="submit" className="auth-card__submit">Войти</button>
        </form>
      </div>
    </div>
  )
}

export default AuthPage
