import portrait from '../assets/portrait.jpg'
import './About.css'

const TAGS = [
  'Based in India',
  'Web Development',
  'UI Implementation',
  'Freelance & Collaborations',
]

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <div className="about__content">
          <span className="kicker reveal-up">
            <span className="tick">03</span>
            {'// ABOUT ME'}
          </span>
          <h2 className="h2 reveal-up">More Than Just Code</h2>
          <p className="about__text reveal-up">
            I&apos;m a web developer who enjoys turning ideas and business requirements
            into clean, functional digital experiences. I focus on creating websites
            that are visually polished, responsive, fast and easy to use. I enjoy
            taking projects from an initial idea through design, development and
            deployment.
          </p>
          <div className="tag-row reveal-up">
            {TAGS.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="about__portrait reveal-up">
          <div className="about__portrait-ring" data-cursor="media">
            <img
              src={portrait}
              alt="Portrait of Jatin"
              width="300"
              height="300"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
