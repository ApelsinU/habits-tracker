import { useState } from 'react'
import './CalendarAddModal.scss'

interface CalendarAddModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (name: string, goal: string) => void
}

function CalendarAddModal({ isOpen, onClose, onAdd }: CalendarAddModalProps) {
  const [name, setName] = useState('')
  const [goal, setGoal] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = name.trim()
    if (trimmed) {
      onAdd(trimmed, goal.trim())
      setName('')
      setGoal('')
      onClose()
    }
  }

  const handleClose = () => {
    setName('')
    setGoal('')
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">Новый календарь</h3>
          <button type="button" className="modal__close" onClick={handleClose}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <form className="modal__body" onSubmit={handleSubmit}>
          <input
            type="text"
            className="modal__input"
            placeholder="Название календаря"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <div className="modal__divider">
            <span className="modal__divider-label">Необязательно</span>
          </div>
          <input
            type="text"
            className="modal__input"
            placeholder="Цель"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
          <div className="modal__actions">
            <button type="button" className="modal__btn modal__btn--cancel" onClick={handleClose}>
              Отмена
            </button>
            <button type="submit" className="modal__btn modal__btn--submit">
              Добавить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CalendarAddModal
