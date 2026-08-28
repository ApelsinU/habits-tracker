import { backgroundOptions } from '../../assets/background/backgrounds'
import useAppStore from '../../store/useAppStore'
import './SettingsModal.scss'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
}

function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const user = useAppStore((s) => s.user)
  const backgroundsByUser = useAppStore((s) => s.backgroundsByUser)
  const setBackground = useAppStore((s) => s.setBackground)

  if (!isOpen) return null

  const currentId = user ? (backgroundsByUser[user] ?? 'background-1') : 'background-1'

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
        <div className="settings-modal__header">
          <h3 className="settings-modal__title">Настройки</h3>
          <button type="button" className="settings-modal__close" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="settings-modal__body">
          <span className="settings-modal__label">Фон</span>
          <div className="settings-modal__grid">
            {backgroundOptions.map((bg) => (
              <button
                key={bg.id}
                type="button"
                className={`settings-modal__option${bg.id === currentId ? ' settings-modal__option--active' : ''}`}
                onClick={() => setBackground(bg.id)}
              >
                <img className="settings-modal__preview" src={bg.src} alt={bg.id} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
