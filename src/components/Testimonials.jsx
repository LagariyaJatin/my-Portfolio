import './Testimonials.css'

const TESTIMONIALS = [
  {
    quote:
      '"Jatin delivered exactly what we needed. Communication was professional and code quality was outstanding."',
    name: 'Sarah Jenkins',
    role: 'Product Lead, Apex Manufacturing',
  },
  {
    quote:
      '"Working with Jatin was seamless. He translated our design files into a flawless, fast React layout."',
    name: 'David Kim',
    role: 'Co-Founder, EduQuest AI',
  },
  {
    quote:
      '"Great communication and clean code. Every checkpoint was hit on schedule. Highly recommended developer."',
    name: 'Elena Rostova',
    role: 'Creative Director, Studio Merit',
  },
]

function QuoteIcon() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
      <path
        d="M0 16V9.6C0 4.3 3 1 8.4 0l1 2.2C6.2 3.3 4.7 5 4.5 7.4H9V16H0Zm13 0V9.6C13 4.3 16 1 21.4 0l.6 2.2c-3.2 1.1-4.7 2.8-4.9 5.2H22V16h-9Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default function Testimonials() {
  return (
    <section className="section section--alt testimonials">
      <div className="container">
        <span className="kicker reveal-up">
          <span className="tick">06</span>
          {'// FEEDBACK'}
        </span>
        <h2 className="h2 reveal-up">What People Say</h2>

        <div className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              className="testimonial card reveal-up"
            >
              <span className="testimonial__icon">
                <QuoteIcon />
              </span>
              <blockquote className="testimonial__quote">{t.quote}</blockquote>
              <figcaption className="testimonial__meta">
                <span className="testimonial__name">{t.name}</span>
                <span className="testimonial__role">{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
