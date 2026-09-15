import './Process.css'

const STEPS = [
  {
    num: '01',
    title: 'Discover',
    text: 'Understand the business, audience and core technical requirements.',
  },
  {
    num: '02',
    title: 'Plan',
    text: 'Define structure, content and functionality.',
  },
  {
    num: '03',
    title: 'Design',
    text: 'Create visual direction and responsive layouts.',
  },
  {
    num: '04',
    title: 'Build',
    text: 'Develop, test and optimize.',
  },
  {
    num: '05',
    title: 'Launch',
    text: 'Deploy, measure and improve.',
  },
]

export default function Process() {
  return (
    <section id="process" className="section process">
      <div className="container">
        <span className="kicker reveal-up">
          <span className="tick">05</span>
          {'// WORKFLOW'}
        </span>
        <h2 className="h2 reveal-up">How I Work</h2>

        <div className="process__timeline">
          <span className="process__line reveal-up" aria-hidden="true">
            <span className="process__line-fill" />
          </span>

          <ol className="process__steps">
            {STEPS.map((s) => (
              <li key={s.num} className="process__step reveal-up">
                <span className="process__num">{s.num}</span>
                <h3 className="process__title">{s.title}</h3>
                <p className="process__text">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
