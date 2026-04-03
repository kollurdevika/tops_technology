import { Container, Row, Col } from 'react-bootstrap'
import './StatsStrip.css'

const stats = [
  { value: '50K+', label: 'Active Traders' },
  { value: '24/7', label: 'Support' },
  { value: '0.1%', label: 'Low Fees' },
]

export default function StatsStrip() {
  return (
    <section className="stats-strip py-4">
      <Container>
        <Row className="g-4 justify-content-center text-center">
          {stats.map((s, i) => (
            <Col key={i} xs={6} md={4}>
              <span className="stats-value mono">{s.value}</span>
              <span className="stats-label d-block">{s.label}</span>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}
