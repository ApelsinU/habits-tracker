import { useState } from 'react'
import type { DayData } from '../../store/useAppStore'
import './Calendar.scss'

const WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

function formatDate(year: number, month: number, day: number) {
  const m = String(month + 1).padStart(2, '0')
  const d = String(day).padStart(2, '0')
  return `${year}-${m}-${d}`
}

function percentColor(p: number) {
  const r = p < 50 ? 210 : Math.round(210 - (p - 50) * 3.2)
  const g = p < 50 ? Math.round(100 + p * 2.2) : 210
  return `rgb(${r},${g},90)`
}

interface CalendarProps {
  activeDates: Record<string, DayData>
  extended: boolean
  onDateToggle: (date: string) => void
  onDayClick: (date: string) => void
}

function Calendar({ activeDates, extended, onDateToggle, onDayClick }: CalendarProps) {
  const now = new Date()
  const [month, setMonth] = useState(now.getMonth())
  const [year, setYear] = useState(now.getFullYear())

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const cells: (number | null)[] = [
    ...Array.from({ length: firstDay }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const prev = () => {
    if (month === 0) {
      setMonth(11)
      setYear((y) => y - 1)
    } else {
      setMonth((m) => m - 1)
    }
  }

  const next = () => {
    if (month === 11) {
      setMonth(0)
      setYear((y) => y + 1)
    } else {
      setMonth((m) => m + 1)
    }
  }

  const handleDayClick = (dateStr: string) => {
    if (extended) {
      onDayClick(dateStr)
    } else {
      onDateToggle(dateStr)
    }
  }

  return (
    <div className="calendar">
      <div className="calendar__header">
        <button type="button" className="calendar__nav" onClick={prev}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8 1L3 6L8 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span className="calendar__title">{MONTHS[month]} {year}</span>
        <button type="button" className="calendar__nav" onClick={next}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M4 1L9 6L4 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="calendar__weekdays">
        {WEEK_DAYS.map((d) => (
          <div key={d} className="calendar__weekday">{d}</div>
        ))}
      </div>

      <div className="calendar__grid">
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} className="calendar__cell calendar__cell--empty" />
          }
          const dateStr = formatDate(year, month, day)
          const detail = activeDates[dateStr]
          const isActive = detail !== undefined
          const simple = !extended
          const isComplete = isActive && (simple || detail.percentage === 100)
          const progress = isActive ? (simple ? 100 : detail.percentage) : 0
          const barColor = isActive ? (simple ? 'rgb(80,200,90)' : percentColor(detail.percentage)) : undefined
          return (
            <button
              key={dateStr}
              type="button"
              className={`calendar__cell calendar__cell--day${isActive ? ' calendar__cell--active' : ''}${isComplete ? ' calendar__cell--complete' : ''}${simple && isActive ? ' calendar__cell--simple-complete' : ''}`}
              onClick={() => handleDayClick(dateStr)}
            >
              <span className="calendar__cell-day">{day}</span>
              {isActive && detail.description && (
                <span className="calendar__cell-desc">{detail.description}</span>
              )}
              {isActive && (
                <span
                  className="calendar__cell-bar"
                  style={{ width: `${progress}%`, background: barColor }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar
