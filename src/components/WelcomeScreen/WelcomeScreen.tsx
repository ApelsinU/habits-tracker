import Background from '../Background/Background'
import AppLogo from '../AppLogo/AppLogo'
import './WelcomeScreen.scss'

interface WelcomeScreenProps {
  backgroundId?: string
  user: string | null
  onStart: () => void
}

function WelcomeScreen({ backgroundId, user, onStart }: WelcomeScreenProps) {
  return (
    <div className="welcome-screen" onClick={onStart}>
      <Background id={backgroundId} />
      <div className="welcome-screen__content">
        <AppLogo />
        <div className="welcome-screen__start">
          {user ? `Привет, ${user}!` : 'Добро пожаловать!'}
        </div>
        <div className="welcome-screen__hint">(Нажмите, чтобы начать)</div>
      </div>
    </div>
  )
}

export default WelcomeScreen
