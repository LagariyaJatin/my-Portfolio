import workspace from '../assets/workspace.png'
import './Method.css'

const STEPS = [
  {
    num: '01',
    title: 'THE IDEA',
    text: 'I start by understanding your business, your goals, your audience, and what you want your website to achieve.',
  },
  {
    num: '02',
    title: 'THE APPROACH',
    text: 'I plan the structure, content, layout, and overall look of the website before moving into development.',
  },
  {
    num: '03',
    title: 'THE BUILD',
    text: 'I turn the plan into a responsive website with clean design, smooth interactions, and a great experience across devices.',
  },
  {
    num: '04',
    title: 'THE LAUNCH',
    text: 'After testing the website across different screen sizes, I deploy it and make sure everything is ready to go live.',
  },
]

export default function Method() {
  return (
    <section className="section section--alt method">
      <div className="container">
        <span className="kicker reveal-up">
          <span className="tick">03</span>
          {'// HOW I WORK'}
        </span>
        <h2 className="h2 reveal-up">From Idea to Live Website</h2>
        <p className="section-sub reveal-up">
          I take a project from the initial idea to a finished website, keeping the
          process simple, clear, and focused on your goals.
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
