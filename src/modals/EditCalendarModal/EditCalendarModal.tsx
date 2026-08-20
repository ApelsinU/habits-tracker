import { useState } from 'react'
import '../CalendarAddModal/CalendarAddModal.scss'

interface EditCalendarModalProps {
  isOpen: boolean
  name: string
  goal: string
  extended: boolean
  onSave: (name: string, goal: string, extended: boolean) => void
  onClose: () => void
}

function EditCalendarModal({ isOpen, name, goal, extended, onSave, onClose }: EditCalendarModalProps) {
  const [editName, setEditName] = useState(name)
  const [editGoal, setEditGoal] = useState(goal)
  const [editExtended, setEditExtended] = useState(extended)

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = editName.trim()
    if (trimmed) {
      onSave(trimmed, editGoal.trim(), editExtended)
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">Редактировать календарь</h3>
          <button type="button" className="modal__close" onClick={onClose}>
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
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            autoFocus
          />
          <div className="modal__divider">
            <span className="modal__divider-label">Необязательно</span>
          </div>
          <input
            type="text"
            className="modal__input"
            placeholder="Цель"
            value={editGoal}
            onChange={(e) => setEditGoal(e.target.value)}
          />
          <label className="modal__checkbox">
            <input
              type="checkbox"
              className="modal__checkbox-input"
              checked={editExtended}
              onChange={(e) => setEditExtended(e.target.checked)}
            />
            <span className="modal__checkbox-mark" />
            <span className="modal__checkbox-text">Расширенный режим</span>
          </label>
          <div className="modal__actions">
            <button type="button" className="modal__btn modal__btn--cancel" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="modal__btn modal__btn--submit">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditCalendarModal
