import portrait from '../assets/linkedin-pfp.png'
import './About.css'

const TAGS = [
  'Web Development',
  'UI Implementation',
  'Freelance Projects',
]

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="container about__grid">
        <div className="about__content">
          <span className="kicker reveal-up">
            <span className="tick">01</span>
            {'// ABOUT ME'}
          </span>
          <h2 className="h2 reveal-up">I Turn Business Ideas Into Websites</h2>
          <p className="about__text reveal-up">
            I&apos;m a web developer and CSE student based in Gujarat, India. I create
            modern, responsive websites for businesses, startups, and individuals
            looking to build a professional online presence.
          </p>
          <p className="about__text reveal-up">
            From the first idea to the final deployment, I handle the process of
            designing, developing, and launching the website. My focus is on clean
            design, smooth user experience, mobile responsiveness, and websites that
            help businesses present themselves better online.
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
