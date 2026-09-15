import workspace from '../assets/workspace.png'
import './Method.css'

const STEPS = [
  {
    num: '01',
    title: 'THE PROBLEM',
    text: 'Mapping the business challenges, technical constraints, and exact user pain points.',
  },
  {
    num: '02',
    title: 'THE APPROACH',
    text: 'Defining the interface architecture, testing performance scenarios, and aligning layout systems.',
  },
  {
    num: '03',
    title: 'THE SOLUTION',
    text: 'Writing clean, semantic, optimized frontend code with highly maintainable design patterns.',
  },
  {
    num: '04',
    title: 'THE RESULT',
    text: 'Rigorous Lighthouse performance audits, fluid cross-device responsiveness, and target conversion met.',
  },
]

export default function Method() {
  return (
    <section className="section section--alt method">
      <div className="container">
        <span className="kicker reveal-up">
          <span className="tick">02</span>
          {'// CASE STUDY METHOD'}
        </span>
        <h2 className="h2 reveal-up">More Than Just Writing Code</h2>
        <p className="section-sub reveal-up">
          I frame projects around business objectives, solid engineering blueprints, and
          end-user goals.
        </p>

        <div className="method__grid">
          <div className="method__steps">
            {STEPS.map((s, i) => (
              <article
                key={s.num}
                className="method__step card reveal-up"
              >
                <span className="method__num">{s.num}</span>
                <div>
                  <h3 className="method__title">{s.title}</h3>
                  <p className="method__text">{s.text}</p>
                </div>
              </article>
            ))}
          </div>

          <figure className="method__photo reveal-up">
            <img
              src={workspace}
              alt="Minimal workspace with a desktop monitor showing a website layout"
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
