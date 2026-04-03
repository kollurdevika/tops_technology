import { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import './Contact.css'

export default function Contact() {
  const [validated, setValidated] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity()) {
      setValidated(true)
      // In production: send to API
    } else {
      e.stopPropagation()
      setValidated(true)
    }
  }

  return (
    <section id="contact" className="contact py-5">
      <Container>
        <h2 className="section-title text-center">Get in Touch</h2>
        <p className="section-subtitle text-center">
          Have questions? Send us a message and we’ll get back to you shortly.
        </p>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="contact-card p-4 p-lg-5 shadow-sm rounded-4">
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Your Name"
                    required
                    size="lg"
                    className="rounded-3 border-0 bg-light"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Your Email"
                    required
                    size="lg"
                    className="rounded-3 border-0 bg-light"
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control
                    as="textarea"
                    rows={4}
                    placeholder="Your Message"
                    required
                    className="rounded-3 border-0 bg-light"
                  />
                </Form.Group>
                <Button type="submit" className="btn-trade w-100 btn-lg rounded-3">
                  Send Message
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
        <Row className="mt-5 g-4 text-center">
          <Col md={4}>
            <div className="contact-info p-3">
              <span className="contact-icon">📍</span>
              <h6 className="mt-2 mb-1">Address</h6>
              <p className="text-muted small mb-0">123 Wall Street, New York, NY</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="contact-info p-3">
              <span className="contact-icon">✉️</span>
              <h6 className="mt-2 mb-1">Email</h6>
              <p className="text-muted small mb-0">support@tradepro.com</p>
            </div>
          </Col>
          <Col md={4}>
            <div className="contact-info p-3">
              <span className="contact-icon">📞</span>
              <h6 className="mt-2 mb-1">Phone</h6>
              <p className="text-muted small mb-0">+1 (555) 123-4567</p>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
