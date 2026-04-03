import { Container, Row, Col } from 'react-bootstrap'
import './Footer.css'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="footer py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={4} className="mb-4 mb-md-0">
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="footer-brand-icon">T</span>
              <span className="footer-brand-text">TradePro</span>
            </div>
            <p className="text-muted small mb-0">
              Smart trading for serious traders. Trade stocks, crypto & forex with confidence.
            </p>
          </Col>
          <Col md={4} className="mb-4 mb-md-0 text-center">
            <nav className="footer-nav">
              {links.map(({ href, label }) => (
                <a key={href} href={href} className="footer-link">
                  {label}
                </a>
              ))}
            </nav>
          </Col>
          <Col md={4} className="text-md-end">
            <div className="footer-social mb-2">
              <a href="#" className="footer-social-link" aria-label="Twitter">𝕏</a>
              <a href="#" className="footer-social-link" aria-label="LinkedIn">in</a>
            </div>
            <p className="text-muted small mb-0">© {new Date().getFullYear()} TradePro. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
