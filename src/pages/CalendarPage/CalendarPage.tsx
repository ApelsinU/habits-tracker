import { useState } from 'react'
import Calendar from '../../components/Calendar/Calendar'
import CalendarSwitcher from '../../components/CalendarSwitcher/CalendarSwitcher'
import CalendarAddModal from '../../modals/CalendarAddModal/CalendarAddModal'
import ConfirmModal from '../../modals/ConfirmModal/ConfirmModal'
import useAppStore from '../../store/useAppStore'
import './calendarPage.scss'

function CalendarPage() {
  const user = useAppStore((s) => s.user)
  const calendarsByUser = useAppStore((s) => s.calendarsByUser)
  const calendars = user ? (calendarsByUser[user] ?? []) : []
  const activeId = useAppStore((s) => s.activeId)
  const isModalOpen = useAppStore((s) => s.isModalOpen)
  const toggleDate = useAppStore((s) => s.toggleDate)
  const addCalendar = useAppStore((s) => s.addCalendar)
  const deleteCalendar = useAppStore((s) => s.deleteCalendar)
  const setActiveId = useAppStore((s) => s.setActiveId)
  const setIsModalOpen = useAppStore((s) => s.setIsModalOpen)

  const [deleteId, setDeleteId] = useState<string | null>(null)
  const deleteTarget = calendars.find((c) => c.id === deleteId)

  const activeCalendar = calendars.find((c) => c.id === activeId)

  return (
    <div className="calendar-page">
      <CalendarSwitcher
        calendars={calendars}
        activeId={activeId}
        onSelect={setActiveId}
        onAdd={() => setIsModalOpen(true)}
        onDelete={(id) => setDeleteId(id)}
      />

      {activeCalendar && (
        <Calendar
          activeDates={activeCalendar.activeDates}
          onDateToggle={toggleDate}
        />
      )}

      <CalendarAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addCalendar}
      />

      <ConfirmModal
        isOpen={deleteId !== null}
        title="Удалить календарь"
        message={`Вы уверены, что хотите удалить «${deleteTarget?.name ?? ''}»?`}
        onConfirm={() => {
          if (deleteId) deleteCalendar(deleteId)
          setDeleteId(null)
        }}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}

export default CalendarPage
