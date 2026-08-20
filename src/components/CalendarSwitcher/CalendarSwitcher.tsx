import './CalendarSwitcher.scss'

export interface CalendarItem {
  id: string
  name: string
}

interface CalendarSwitcherProps {
  calendars: CalendarItem[]
  activeId: string
  onSelect: (id: string) => void
  onAdd: () => void
}

function CalendarSwitcher({ calendars, activeId, onSelect, onAdd }: CalendarSwitcherProps) {
  return (
    <div className="calendar-switcher">
      <div className="calendar-switcher__tabs">
        {calendars.map((cal) => (
          <button
            key={cal.id}
            type="button"
            className={`calendar-switcher__tab${cal.id === activeId ? ' calendar-switcher__tab--active' : ''}`}
            onClick={() => onSelect(cal.id)}
          >
            {cal.name}
          </button>
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
