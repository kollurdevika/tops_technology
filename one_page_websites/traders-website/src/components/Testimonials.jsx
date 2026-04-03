import { Container, Row, Col, Carousel } from 'react-bootstrap'
import './Testimonials.css'

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Day Trader',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    quote: 'TradePro changed how I trade. The analytics are unmatched, and support actually knows their stuff.',
  },
  {
    name: 'Marcus Johnson',
    role: 'Crypto Investor',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    quote: 'Low fees, fast execution, and a clean platform. Best trading experience I\'ve had in years.',
  },
  {
    name: 'Elena Rodriguez',
    role: 'Forex Trader',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    quote: 'Professional tools without the institutional complexity. Perfect for serious retail traders.',
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials py-5">
      <Container>
        <h2 className="section-title text-center">What Traders Say</h2>
        <p className="section-subtitle text-center">
          Join thousands of traders who trust TradePro for their portfolios.
        </p>
        <Row className="justify-content-center">
          <Col lg={8}>
            <Carousel fade indicators={false} className="testimonial-carousel">
              {testimonials.map((t, i) => (
                <Carousel.Item key={i}>
                  <div className="testimonial-card text-center p-4 p-lg-5">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="testimonial-avatar rounded-circle mb-3"
                    />
                    <blockquote className="testimonial-quote mb-3">"{t.quote}"</blockquote>
                    <h6 className="mb-0">{t.name}</h6>
                    <small className="text-muted">{t.role}</small>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
