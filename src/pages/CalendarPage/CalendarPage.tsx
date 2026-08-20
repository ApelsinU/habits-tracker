import { useState } from 'react'
import Calendar from '../../components/Calendar/Calendar'
import CalendarSwitcher from '../../components/CalendarSwitcher/CalendarSwitcher'
import CalendarAddModal from '../../modals/CalendarAddModal/CalendarAddModal'
import EditCalendarModal from '../../modals/EditCalendarModal/EditCalendarModal'
import DayDetailModal from '../../modals/DayDetailModal/DayDetailModal'
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
  const setDayDetail = useAppStore((s) => s.setDayDetail)
  const removeDay = useAppStore((s) => s.removeDay)
  const addCalendar = useAppStore((s) => s.addCalendar)
  const editCalendar = useAppStore((s) => s.editCalendar)
  const deleteCalendar = useAppStore((s) => s.deleteCalendar)
  const setActiveId = useAppStore((s) => s.setActiveId)
  const setIsModalOpen = useAppStore((s) => s.setIsModalOpen)

  const [deleteId, setDeleteId] = useState<string | null>(null)
  const deleteTarget = calendars.find((c) => c.id === deleteId)

  const [editingDay, setEditingDay] = useState<string | null>(null)
  const [isDayModalOpen, setIsDayModalOpen] = useState(false)

  const [editingCalendarId, setEditingCalendarId] = useState<string | null>(null)
  const editingCalendar = calendars.find((c) => c.id === editingCalendarId)

  const activeCalendar = calendars.find((c) => c.id === activeId)

  const handleDayClick = (date: string) => {
    setEditingDay(date)
    setIsDayModalOpen(true)
  }

  const handleDaySave = (detail: { percentage: number; description: string }) => {
    if (editingDay) setDayDetail(editingDay, detail)
  }

  const handleDayRemove = () => {
    if (editingDay) removeDay(editingDay)
  }

  const dayDetail = editingDay && activeCalendar ? activeCalendar.activeDates[editingDay] : undefined
  const isDayNew = editingDay !== null && activeCalendar ? !(editingDay in activeCalendar.activeDates) : true

  return (
    <div className="calendar-page">
      <CalendarSwitcher
        calendars={calendars}
        activeId={activeId}
        onSelect={setActiveId}
        onAdd={() => setIsModalOpen(true)}
        onEdit={(id) => setEditingCalendarId(id)}
        onDelete={(id) => setDeleteId(id)}
      />

      {activeCalendar && (
        <Calendar
          activeDates={activeCalendar.activeDates}
          extended={activeCalendar.extended}
          onDateToggle={toggleDate}
          onDayClick={handleDayClick}
        />
      )}

      <CalendarAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={addCalendar}
      />

      <DayDetailModal
        key={editingDay ?? 'none'}
        isOpen={isDayModalOpen}
        date={editingDay ?? ''}
        detail={dayDetail}
        isNew={isDayNew}
        onSave={handleDaySave}
        onRemove={handleDayRemove}
        onClose={() => {
          setIsDayModalOpen(false)
          setEditingDay(null)
        }}
      />

      <EditCalendarModal
        key={editingCalendarId ?? 'none'}
        isOpen={editingCalendarId !== null}
        name={editingCalendar?.name ?? ''}
        goal={editingCalendar?.goal ?? ''}
        extended={editingCalendar?.extended ?? false}
        onSave={(name, goal, extended) => {
          if (editingCalendarId) editCalendar(editingCalendarId, name, goal, extended)
          setEditingCalendarId(null)
        }}
        onClose={() => setEditingCalendarId(null)}
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
