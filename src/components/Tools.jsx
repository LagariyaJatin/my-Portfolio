import './Tools.css'

const COLUMNS = [
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M5.5 4.5L2 8l3.5 3.5M10.5 4.5L14 8l-3.5 3.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    title: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS'],
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="2.5" y="2.5" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M6 6.5v3M10 6.5v3"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: 'Backend',
    items: ['Node.js', 'Express', 'Firebase', 'REST APIs'],
  },
  {
    icon: (
      <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="5.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="8" cy="8" r="1.8" fill="currentColor" />
      </svg>
    ),
    title: 'Tools & Deploy',
    items: ['Git & GitHub', 'Figma', 'VS Code', 'Vercel', 'Netlify'],
  },
]

function Check() {
  return (
    <svg
      className="tools__check"
      width="13"
      height="13"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M2.5 7.5l3 3 6-7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Tools() {
  return (
    <section id="skills" className="section tools">
      <div className="container">
        <span className="kicker reveal-up">
          <span className="tick">04</span>
          {'// STACK'}
        </span>
        <h2 className="h2 reveal-up">Tools I Work With</h2>

        <div className="tools__grid">
          {COLUMNS.map((col, ci) => (
            <div
              key={col.title}
              className="tools__col card reveal-up"
            >
              <div className="tools__col-head">
                <span className="tools__col-icon">{col.icon}</span>
                <h3 className="tools__col-title">{col.title}</h3>
              </div>
              <ul className="tools__list">
                {col.items.map((item, ii) => (
                  <li
                    key={item}
                    className="tools__item"
                    style={{ transitionDelay: `${ii * 40}ms` }}
                  >
                    <span>{item}</span>
                    <Check />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
