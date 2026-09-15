import './Cursor.css'

/**
 * Renders the cursor markup from cursor-animation-code-and-prompt.md.
 * The vanilla behavior (initCursor) is booted from App's effect so it binds
 * after all sections are mounted; this component is markup-only.
 */
export default function Cursor() {
  return (
    <div className="cursor" aria-hidden="true">
      <svg className="cursor-progress" viewBox="0 0 44 44">
        <circle className="cursor-progress-bg" cx="22" cy="22" r="20" />
        <circle className="cursor-progress-bar" cx="22" cy="22" r="20" />
      </svg>
      <div className="cursor-inner">
        <span className="cursor-dot" />
        <svg className="cursor-arrow" viewBox="0 0 24 24" width="14" height="14">
          <path
            d="M7 17L17 7M17 7H9M17 7V15"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  )
}
