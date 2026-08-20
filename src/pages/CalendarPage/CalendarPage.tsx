import { useState } from 'react'
import Calendar from '../../components/Calendar/Calendar'
import CalendarSwitcher from '../../components/CalendarSwitcher/CalendarSwitcher'
import CalendarAddModal from '../../components/CalendarAddModal/CalendarAddModal'
import './calendarPage.scss'

interface CalendarData {
  id: string
  name: string
  activeDates: string[]
}

const initialCalendars: CalendarData[] = [
  { id: '1', name: 'Тренировки', activeDates: [] },
]

function CalendarPage() {
  const [calendars, setCalendars] = useState<CalendarData[]>(initialCalendars)
  const [activeId, setActiveId] = useState('1')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const activeCalendar = calendars.find((c) => c.id === activeId)

  const handleDateToggle = (date: string) => {
    setCalendars((prev) =>
      prev.map((cal) => {
        if (cal.id !== activeId) return cal
        const hasDate = cal.activeDates.includes(date)
        return {
          ...cal,
          activeDates: hasDate
            ? cal.activeDates.filter((d) => d !== date)
            : [...cal.activeDates, date],
        }
      })
    )
  }

  const handleAddCalendar = (name: string) => {
    const newCalendar: CalendarData = {
      id: Date.now().toString(),
      name,
      activeDates: [],
    }
    setCalendars((prev) => [...prev, newCalendar])
    setActiveId(newCalendar.id)
  }

  return (
    <div className="calendar-page">
      <CalendarSwitcher
        calendars={calendars}
        activeId={activeId}
        onSelect={setActiveId}
        onAdd={() => setIsModalOpen(true)}
      />

      {activeCalendar && (
        <Calendar
          activeDates={activeCalendar.activeDates}
          onDateToggle={handleDateToggle}
        />
      )}

      <CalendarAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddCalendar}
      />
    </div>
  )
}

export default CalendarPage
