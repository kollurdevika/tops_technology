import { Container, Row, Col, Card } from 'react-bootstrap'
import './Services.css'

const services = [
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    title: 'Profit & Loss Analysis',
    description: 'Real-time P&L tracking, tax reports, and performance analytics. Know exactly where you stand.',
  },
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
    title: 'Market Research',
    description: 'Daily insights, technical analysis, and expert commentary. Stay ahead of market moves.',
  },
  {
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&q=80',
    title: '24/7 Support',
    description: 'Dedicated support team via chat, email, and phone. We’re here when you need us.',
  },
]

export default function Services() {
  return (
    <section id="services" className="services py-5">
      <Container>
        <h2 className="section-title text-center">Our Services</h2>
        <p className="section-subtitle text-center">
          Tools and support built for active traders. Analyze, execute, and grow with confidence.
        </p>
        <Row className="g-4">
          {services.map((s, i) => (
            <Col key={i} md={6} lg={4}>
              <Card className="card-trade h-100 border-0 shadow-sm overflow-hidden">
                <div className="services-img-wrap">
                  <img src={s.image} alt={s.title} className="img-cover" />
                </div>
                <Card.Body className="p-4">
                  <Card.Title className="h5 mb-2">{s.title}</Card.Title>
                  <Card.Text className="text-muted mb-0">{s.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}
