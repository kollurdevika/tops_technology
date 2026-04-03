import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const Reviews = () => {
    return (
        <section className="section-padding reviews-section" id="reviews">
            <Container>
                <div className="text-center mb-5">
                    <span className="text-yellow">Testimonials</span>
                    <h2 className="section-title">What Readers Say</h2>
                </div>
                <Row className="justify-content-center">
                    <Col md={10}>
                        <div className="testimonial-card text-center">
                            <i className="quote-icon"><FaQuoteLeft /></i>
                            <div className="mb-4 text-warning">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                            </div>
                            <p className="lead mb-4 fst-italic">
                                "This book completely changed how I approach fashion marketing. The strategies are practical and easy to implement. Highly recommended for anyone in the industry!"
                            </p>
                            <h5 className="font-weight-bold mb-1">Sarah Jenkins</h5>
                            <span className="text-muted small">Fashion Designer, NY</span>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Reviews;
