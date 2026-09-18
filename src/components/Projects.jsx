import warehouse from '../assets/project-warehouse.png'
import dashboard from '../assets/project-dashboard.png'
import creative from '../assets/project-creative.png'
import './Projects.css'

const PROJECTS = [
  {
    num: '01',
    kicker: 'Business Website',
    title: 'Classy Messi',
    url: 'https://classymessi.netlify.app/',
    external: true,
    description:
      'A modern website designed to give a manufacturing business a stronger online presence and make its products easier to discover.',
    tags: ['React', 'Tailwind', 'Responsive'],
    image: warehouse,
    alt: 'Classy Messi — warehouse product catalog interface',
    reverse: false,
  },
  {
    num: '02',
    kicker: 'Web Application',
    title: 'AI Learning Platform',
    url: 'https://ailearningplatform1.netlify.app/',
    external: true,
    description:
      'An interactive learning platform that uses AI to create personalized learning experiences.',
    tags: ['React', 'Node.js', 'Firebase'],
    image: dashboard,
    alt: 'AI Learning Platform — analytics dashboard on a tablet',
    reverse: true,
  },
  {
    num: '03',
    kicker: 'Experimental / Personal',
    title: 'Creative Web Experience',
    url: '#work',
    external: false,
    description:
      'A creative web experience focused on interaction, storytelling and modern frontend development.',
    tags: ['JavaScript', 'GSAP', 'Three.js'],
    image: creative,
    alt: 'Creative Web Experience — abstract orange 3D render',
    reverse: false,
  },
]

export default function Projects() {
  return (
    <section id="work" className="section projects">
      <div className="container">
        <span className="kicker reveal-up">
          <span className="tick">02</span>
          {'// SELECTED WORK'}
        </span>
        <h2 className="h2 reveal-up">
          Featured Projects
        </h2>
        <p className="section-sub reveal-up">
          A few projects I&apos;ve designed and built.
        </p>

        <div className="projects__list">
          {PROJECTS.map((p) => (
            <article
              key={p.num}
              className={`project project-card card reveal-up ${p.reverse ? 'project--reverse' : ''}`}
            >
              <a
                href={p.url}
                className="project__media-link"
                aria-label={`View ${p.title} case study`}
                data-cursor="media"
                {...(p.external ? { target: '_blank', rel: 'noreferrer' } : {})}
              >
                <span className="project__media">
                  <img src={p.image} alt={p.alt} loading="lazy" />
                  <span className="project__overlay">
                    <span className="project__overlay-label">
                      View Case Study
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                        <path
                          d="M1 6h10M7 2l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </span>
                </span>
              </a>

              <div className="project__body">
                <p className="project__kicker">
                  <span className="project__num">{p.num}</span>
                  <span className="project__dash">—</span>
                  {p.kicker}
                </p>
                <h3 className="project__title">{p.title}</h3>
                <p className="project__desc">{p.description}</p>
                <div className="tag-row">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={p.url}
                  className="project__link"
                  data-cursor="link"
                  {...(p.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                >
                  View Case Study
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path
                      d="M1 6h10M7 2l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
