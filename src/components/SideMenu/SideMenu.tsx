import useAppStore, { type PageId } from '../../store/useAppStore'
import './SideMenu.scss'

interface Link {
  id: PageId
  label: string
  icon: React.ReactNode
}

const LINKS: Link[] = [
  {
    id: 'calendar',
    label: 'Календарь',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="2.5" y="4" width="13" height="11.5" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M2.5 7.5h13M6 2v3M12 2v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="6" y="10" width="2.5" height="2.5" rx="0.5" fill="currentColor" />
        <rect x="9.5" y="10" width="2.5" height="2.5" rx="0.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'todo',
    label: 'Todo List',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <rect x="3" y="2.5" width="12" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M6 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'stats',
    label: 'Статистика',
    icon: (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
        <path d="M4 14V9M9 14V5M14 14v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
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
              <span className="side-menu__icon">{link.icon}</span>
              {link.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default SideMenu
