import './Footer.css'

const LINKS = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <a href="#top" className="footer__name">
            Jatin — Web Developer
          </a>
          <nav className="footer__links" aria-label="Footer">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Jatin. All rights reserved.</span>
          <span className="footer__note">DESIGNED ON A 12-COL BLUEPRINT</span>
        </div>
      </div>
    </footer>
  )
}
