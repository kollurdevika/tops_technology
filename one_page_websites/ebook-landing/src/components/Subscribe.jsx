import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';

const Subscribe = () => {
    return (
        <section className="section-padding" id="subscribe" style={{ background: '#3a3431' }}>
            <Container>
                <div className="bg-warning rounded-4 p-5 position-relative overflow-hidden">
                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                        backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")',
                        opacity: 0.1,
                        pointerEvents: 'none'
                    }}></div>

                    <Row className="align-items-center position-relative z-index-1">
                        <Col lg={6} className="mb-4 mb-lg-0">
                            <h3 className="fw-bold mb-2 text-dark">Subscribe To Our Newsletter</h3>
                            <p className="mb-0 text-dark-50">Get the latest news and updates directly to your inbox.</p>
                        </Col>
                        <Col lg={6}>
                            <Form className="d-flex gap-2 bg-white p-2 rounded-pill shadow-sm">
                                <Form.Control
                                    type="email"
                                    placeholder="Your email address"
                                    className="border-0 shadow-none bg-transparent ps-3"
                                />
                                <Button variant="dark" className="rounded-pill px-4 py-2 d-flex align-items-center">
                                    Subscribe <FaPaperPlane className="ms-2 small" />
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </div>
            </Container>
        </section>
    );
};

export default Subscribe;
