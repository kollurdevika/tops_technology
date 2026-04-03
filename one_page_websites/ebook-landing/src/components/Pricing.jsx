import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaCheck } from 'react-icons/fa';

const Pricing = () => {
    return (
        <section className="section-padding bg-light-custom" id="pricing">
            <Container>
                <div className="text-center mb-5">
                    <span className="text-yellow">Pricing Plans</span>
                    <h2 className="section-title">Choose Your Option</h2>
                </div>
                <Row className="justify-content-center">
                    {/* Standard Plan */}
                    <Col md={4} className="mb-4">
                        <div className="pricing-card text-center h-100 d-flex flex-column">
                            <h5 className="fw-bold text-muted mb-4">STANDARD</h5>
                            <div className="price">
                                <sup className="h4 text-muted">$</sup>19
                            </div>
                            <ul className="list-unstyled text-start mx-auto mb-5 flex-grow-1">
                                <li className="mb-3"><FaCheck className="text-warning me-2" />Digital Ebook (PDF)</li>
                                <li className="mb-3"><FaCheck className="text-warning me-2" />Mobile Friendly</li>
                                <li className="mb-3"><FaCheck className="text-warning me-2" />Lifetime Updates</li>
                                <li className="mb-3 text-muted"><FaCheck className="text-muted me-2" />Video Tutorials</li>
                                <li className="mb-3 text-muted"><FaCheck className="text-muted me-2" />Community Access</li>
                            </ul>
                            <a href="#" className="btn-price">Get It Now</a>
                        </div>
                    </Col>

                    {/* Premium Plan */}
                    <Col md={4} className="mb-4">
                        <div className="pricing-card featured text-center h-100 d-flex flex-column position-relative">
                            <div className="position-absolute top-0 start-50 translate-middle badge bg-warning text-dark px-3 py-2 rounded-pill shadow-sm" style={{ marginTop: '-12px' }}>POPULAR</div>
                            <h5 className="fw-bold mb-4 text-warning">PREMIUM</h5>
                            <div className="price text-white">
                                <sup className="h4 text-white-50">$</sup>39
                            </div>
                            <ul className="list-unstyled text-start mx-auto mb-5 flex-grow-1">
                                <li className="mb-3"><FaCheck className="text-warning me-2" />Digital Ebook (PDF)</li>
                                <li className="mb-3"><FaCheck className="text-warning me-2" />Mobile Friendly</li>
                                <li className="mb-3"><FaCheck className="text-warning me-2" />Lifetime Updates</li>
                                <li className="mb-3"><FaCheck className="text-warning me-2" />Video Tutorials</li>
                                <li className="mb-3"><FaCheck className="text-warning me-2" />Community Access</li>
                            </ul>
                            <a href="#" className="btn-price">Get It Now</a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Pricing;
