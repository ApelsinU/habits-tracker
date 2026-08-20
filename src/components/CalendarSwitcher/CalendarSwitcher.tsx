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
  onDelete: (id: string) => void
}

function CalendarSwitcher({ calendars, activeId, onSelect, onAdd, onDelete }: CalendarSwitcherProps) {
  return (
    <div className="calendar-switcher">
      <div className="calendar-switcher__tabs">
        {calendars.map((cal) => (
          <div
            key={cal.id}
            className={`calendar-switcher__tab${cal.id === activeId ? ' calendar-switcher__tab--active' : ''}`}
          >
            <button
              type="button"
              className="calendar-switcher__tab-name"
              onClick={() => onSelect(cal.id)}
            >
              <span className="calendar-switcher__tab-title">{cal.name}</span>
              {cal.goal && <span className="calendar-switcher__tab-goal">{cal.goal}</span>}
            </button>
            <button
              type="button"
              className="calendar-switcher__tab-delete"
              onClick={() => onDelete(cal.id)}
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
      <button type="button" className="calendar-switcher__add" onClick={onAdd}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  )
}

export default CalendarSwitcher
