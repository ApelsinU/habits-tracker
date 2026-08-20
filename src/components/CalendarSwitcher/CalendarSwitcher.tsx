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
              className="calendar-switcher__tab-edit"
              onClick={() => onEdit(cal.id)}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
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
