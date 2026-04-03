import { Container, Row, Col, Card } from 'react-bootstrap'
import './Portfolio.css'

const items = [
  {
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80',
    icon: '📈',
    title: 'Stocks & ETFs',
    description: 'Trade top-performing stocks and ETFs with low commissions. Real-time data and advanced order types.',
  },
  {
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80',
    icon: '₿',
    title: 'Crypto Trading',
    description: 'Buy, sell, and hold 100+ cryptocurrencies. Secure custody and instant execution on major pairs.',
  },
  {
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&q=80',
    icon: '💱',
    title: 'Forex & Commodities',
    description: 'Access global FX and commodity markets. Competitive spreads and 24/5 trading.',
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="portfolio py-5">
      <Container>
        <h2 className="section-title text-center">Our Portfolio</h2>
        <p className="section-subtitle text-center">
          Diversify across stocks, crypto, and forex. We help traders maximize returns with proven strategies.
        </p>
        <Row className="g-4">
          {items.map((item, i) => (
            <Col key={i} md={6} lg={4}>
              <Card className="card-trade h-100 border-0 shadow-sm">
                <div className="portfolio-img-wrap">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="img-cover"
                  />
                  <span className="portfolio-icon">{item.icon}</span>
                </div>
                <Card.Body className="p-4">
                  <Card.Title className="h5 mb-2">{item.title}</Card.Title>
                  <Card.Text className="text-muted mb-0">{item.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}
