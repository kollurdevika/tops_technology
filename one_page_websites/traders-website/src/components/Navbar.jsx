import { useState, useEffect } from 'react'
import { Navbar as BSNavbar, Nav, Container } from 'react-bootstrap'
import './Navbar.css'

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#services', label: 'Services' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <BSNavbar
      expand="lg"
      fixed="top"
      className={scrolled ? 'navbar-scrolled' : ''}
    >
      <Container>
        <BSNavbar.Brand href="#home" className="d-flex align-items-center gap-2">
          <span className="brand-icon">T</span>
          <span className="brand-text">TradePro</span>
        </BSNavbar.Brand>
        <BSNavbar.Toggle aria-controls="main-nav" />
        <BSNavbar.Collapse id="main-nav">
          <Nav className="ms-auto align-items-lg-center gap-2 gap-lg-4">
            {navLinks.map(({ href, label }) => (
              <Nav.Link key={href} href={href} className="nav-link-custom">
                {label}
              </Nav.Link>
            ))}
            <a href="#contact" className="btn btn-trade btn-sm mt-2 mt-lg-0">
              Get Started
            </a>
          </Nav>
        </BSNavbar.Collapse>
      </Container>
    </BSNavbar>
  )
}
