import { useState, useEffect } from 'react'
import { Carousel, Container } from 'react-bootstrap'
import './Hero.css'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=1920&q=80',
    title: 'Smart Trading for Serious Traders',
    subtitle: 'Real-time analytics, low fees, and expert insights. Trade stocks, crypto & forex with confidence.',
  },
  {
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=80',
    title: 'Crypto & Stocks in One Place',
    subtitle: 'Diversify your portfolio. Access global markets 24/7 with institutional-grade security.',
  },
  {
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=80',
    title: 'Data-Driven Decisions',
    subtitle: 'Advanced charts, AI-powered signals, and actionable research. Stay ahead of the market.',
  },
]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5500)
    return () => clearInterval(t)
  }, [])

  return (
    <section id="home" className="hero">
      <Carousel
        activeIndex={index}
        onSelect={setIndex}
        fade
        controls={true}
        indicators={true}
        className="hero-carousel"
      >
        {slides.map((slide, i) => (
          <Carousel.Item key={i}>
            <div
              className="hero-slide"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
            <Carousel.Caption>
              <Container>
                <h1 className="hero-title">{slide.title}</h1>
                <p className="hero-subtitle">{slide.subtitle}</p>
                <div className="hero-btns">
                  <a href="#services" className="btn btn-trade btn-lg me-2 mb-2">
                    Explore Services
                  </a>
                  <a href="#portfolio" className="btn btn-trade-outline btn-lg mb-2">
                    View Portfolio
                  </a>
                </div>
              </Container>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </section>
  )
}
