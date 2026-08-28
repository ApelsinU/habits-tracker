import useAppStore, { type PageId } from '../../store/useAppStore'
import './SideMenu.scss'

const LINKS: { id: PageId; label: string }[] = [
  { id: 'calendar', label: 'Календарь' },
  { id: 'todo', label: 'Todo List' },
  { id: 'stats', label: 'Статистика' },
]

function SideMenu() {
  const currentPage = useAppStore((s) => s.currentPage)
  const setCurrentPage = useAppStore((s) => s.setCurrentPage)

  return (
    <nav className="side-menu">
      <ul className="side-menu__list">
        {LINKS.map((link) => (
          <li key={link.id} className="side-menu__item">
            <button
              type="button"
              className={`side-menu__link${link.id === currentPage ? ' side-menu__link--active' : ''}`}
              onClick={() => setCurrentPage(link.id)}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SideMenu
