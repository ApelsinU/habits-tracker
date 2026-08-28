import { useState } from 'react'
import type { DayData } from '../../store/useAppStore'
import './DayDetailModal.scss'

interface DayDetailModalProps {
  isOpen: boolean
  date: string
  detail?: DayData
  isNew: boolean
  onSave: (detail: DayData) => void
  onRemove: () => void
  onClose: () => void
}

function minuteColor(p: number): string {
  const r = p < 50 ? 210 : Math.round(210 - (p - 50) * 3.2)
  const g = p < 50 ? Math.round(100 + p * 2.2) : 210
  return `rgb(${Math.min(255, r)},${Math.min(255, g)},90)`
}

function DayDetailModal({ isOpen, date, detail, isNew, onSave, onRemove, onClose }: DayDetailModalProps) {
  const [percentage, setPercentage] = useState(detail?.percentage ?? (isNew ? 100 : 0))
  const [description, setDescription] = useState(detail?.description ?? '')

  if (!isOpen) return null

  const handleSave = () => {
    onSave({ percentage, description: description.trim() })
    onClose()
  }

  const handleRemove = () => {
    onRemove()
    onClose()
  }

  const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const rangeColor = minuteColor(percentage)
  const rangeStyle = {
    background: `linear-gradient(to right, ${rangeColor} ${percentage}%, var(--glass-bg-soft) ${percentage}%)`,
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="day-modal" onClick={(e) => e.stopPropagation()}>
        <div className="day-modal__header">
          <h3 className="day-modal__title">{formattedDate}</h3>
          <button type="button" className="day-modal__close" onClick={onClose}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="day-modal__body">
          <label className="day-modal__label">
            Процент выполнения цели
            <div className="day-modal__percentage">
              <input
                type="range"
                className="day-modal__range"
                min={0}
                max={100}
                value={percentage}
                style={rangeStyle}
                onChange={(e) => setPercentage(Number(e.target.value))}
              />
              <span className="day-modal__value">{percentage}%</span>
            </div>
          </label>
          <label className="day-modal__label">
            Описание
            <textarea
              className="day-modal__textarea"
              placeholder="Как прошёл день?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </label>
        </div>
        <div className="day-modal__actions">
          {!isNew && (
            <button type="button" className="day-modal__btn day-modal__btn--danger" onClick={handleRemove}>
              Удалить день
            </button>
          )}
          <div className="day-modal__actions-right">
            <button type="button" className="day-modal__btn day-modal__btn--cancel" onClick={onClose}>
              Отмена
            </button>
            <button type="button" className="day-modal__btn day-modal__btn--submit" onClick={handleSave}>
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DayDetailModal
