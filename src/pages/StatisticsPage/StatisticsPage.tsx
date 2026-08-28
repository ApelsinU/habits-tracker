import useAppStore from '../../store/useAppStore'
import './statisticsPage.scss'

function percentColor(p: number): string {
  const r = p < 50 ? 210 : Math.round(210 - (p - 50) * 3.2)
  const g = p < 50 ? Math.round(100 + p * 2.2) : 210
  return `rgb(${Math.min(255, r)},${Math.min(255, g)},90)`
}

function StatisticsPage() {
  const user = useAppStore((s) => s.user)
  const calendarsByUser = useAppStore((s) => s.calendarsByUser)
  const todosByUser = useAppStore((s) => s.todosByUser)

  const calendars = user ? (calendarsByUser[user] ?? []) : []
  const todos = user ? (todosByUser[user] ?? []) : []

  const doneTodos = todos.filter((t) => t.completed).length

  const calendarTotals = calendars.map((cal) => {
    const entries = Object.values(cal.activeDates)
    const total = entries.length
    const avg =
      total > 0
        ? Math.round(entries.reduce((sum, d) => sum + d.percentage, 0) / total)
        : 0
    return { ...cal, total, avg }
  })

  const allTrackedDays = calendarTotals.reduce((sum, c) => sum + c.total, 0)
  const overallAvg =
    allTrackedDays > 0
      ? Math.round(
          calendarTotals.reduce((sum, c) => sum + c.total * c.avg, 0) / allTrackedDays,
        )
      : 0
  const todoPct = todos.length > 0 ? Math.round((doneTodos / todos.length) * 100) : 0

  return (
    <div className="stats-page">
      <div className="stats-page__card">
        <h3 className="stats-page__title">Статистика</h3>

        <div className="stats-page__grid">
          <div className="stats-page__box">
            <span className="stats-page__box-value">{calendars.length}</span>
            <span className="stats-page__box-label">Календари</span>
          </div>
          <div className="stats-page__box">
            <span className="stats-page__box-value">{allTrackedDays}</span>
            <span className="stats-page__box-label">Отмечено дней</span>
          </div>
          <div className="stats-page__box">
            <span className="stats-page__box-value" style={{ color: percentColor(overallAvg) }}>
              {overallAvg}%
            </span>
            <span className="stats-page__box-label">Среднее выполнение</span>
          </div>
          <div className="stats-page__box">
            <span className="stats-page__box-value" style={{ color: percentColor(todoPct) }}>
              {todoPct}%
            </span>
            <span className="stats-page__box-label">Todo выполнено</span>
          </div>
        </div>

        {calendars.length > 0 && (
          <div className="stats-page__section">
            <h4 className="stats-page__subtitle">Календари</h4>
            <ul className="stats-page__list">
              {calendarTotals.map((cal) => (
                <li key={cal.id} className="stats-page__item">
                  <div className="stats-page__item-head">
                    <span className="stats-page__item-name">{cal.name}</span>
                    <span className="stats-page__item-avg" style={{ color: percentColor(cal.avg) }}>
                      {cal.avg}%
                    </span>
                  </div>
                  <div className="stats-page__bar">
                    <div
                      className="stats-page__bar-fill"
                      style={{ width: `${cal.avg}%`, background: percentColor(cal.avg) }}
                    />
                  </div>
                  <span className="stats-page__item-meta">Дней: {cal.total}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default StatisticsPage
