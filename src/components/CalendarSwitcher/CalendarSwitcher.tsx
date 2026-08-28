import { useEffect, useRef, useState } from 'react'
import './CalendarSwitcher.scss'

export interface CalendarItem {
  id: string
  name: string
  goal: string
}

interface CalendarSwitcherProps {
  calendars: CalendarItem[]
  activeId: string
  onSelect: (id: string) => void
  onAdd: () => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

function CalendarSwitcher({ calendars, activeId, onSelect, onAdd, onEdit, onDelete }: CalendarSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const active = calendars.find((c) => c.id === activeId)

  useEffect(() => {
    if (!isOpen) return
    const handleClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [isOpen])

  return (
    <div className="calendar-switcher" ref={rootRef}>
      <button
        type="button"
        className="calendar-switcher__select"
        onClick={() => setIsOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="calendar-switcher__select-label">
          <span className="calendar-switcher__select-title">{active?.name ?? 'Выберите календарь'}</span>
          {active?.goal && <span className="calendar-switcher__select-goal">{active.goal}</span>}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          className={`calendar-switcher__select-caret${isOpen ? ' calendar-switcher__select-caret--open' : ''}`}
        >
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {isOpen && (
        <ul className="calendar-switcher__menu" role="listbox">
          {calendars.map((cal) => {
            const isActive = cal.id === activeId
            return (
              <li
                key={cal.id}
                role="option"
                aria-selected={isActive}
                className={`calendar-switcher__menu-item${isActive ? ' calendar-switcher__menu-item--active' : ''}`}
              >
                <button
                  type="button"
                  className="calendar-switcher__menu-name"
                  onClick={() => {
                    onSelect(cal.id)
                    setIsOpen(false)
                  }}
                >
                  <span className="calendar-switcher__menu-title">{cal.name}</span>
                  {cal.goal && <span className="calendar-switcher__menu-goal">{cal.goal}</span>}
                </button>
                <button
                  type="button"
                  className="calendar-switcher__menu-edit"
                  onClick={() => onEdit(cal.id)}
                  aria-label="Редактировать"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="calendar-switcher__menu-delete"
                  onClick={() => onDelete(cal.id)}
                  aria-label="Удалить"
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </li>
            )
          })}
        </ul>
      )}

      <button type="button" className="calendar-switcher__add" onClick={onAdd} aria-label="Добавить календарь">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )
}

export default CalendarSwitcher
