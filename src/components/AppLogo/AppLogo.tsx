import './AppLogo.scss'

function AppLogo() {
  return (
    <div className="app-logo">
      <svg
        className="app-logo__mark"
        width="72"
        height="72"
        viewBox="0 0 72 72"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle className="app-logo__ring" cx="36" cy="36" r="31" stroke="currentColor" strokeWidth="3" />
        <path className="app-logo__check" d="M22 37l10 10 18-20" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <circle className="app-logo__dot" cx="52" cy="20" r="5" fill="currentColor" />
      </svg>
      <span className="app-logo__text">Habits Tracker</span>
    </div>
  )
}

export default AppLogo
