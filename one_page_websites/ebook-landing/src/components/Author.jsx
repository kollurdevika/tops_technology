import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';

const Author = () => {
    return (
        <section className="section-padding bg-light-custom" id="author">
            <Container>
                <Row className="align-items-center">
                    <Col md={5} className="mb-5 mb-md-0">
                        <div className="position-relative">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Author"
                                className="img-fluid rounded-circle shadow-lg"
                                style={{ border: '10px solid #fff', maxWidth: '100%', objectFit: 'cover', aspectRatio: '1/1' }}
                            />
                            <div className="position-absolute top-0 start-0 bg-warning rounded-circle p-3 shadow" style={{ zIndex: 1 }}>
                                <span className="fw-bold text-dark h4 mb-0 d-block text-center" style={{ lineHeight: 1 }}>10+<br /><small className="fs-6 fw-normal">Years</small></span>
                            </div>
                        </div>
                    </Col>
                    <Col md={7} className="ps-md-5">
                        <span className="text-yellow">About The Author</span>
                        <h2 className="section-title mb-4">Jessica Smith</h2>
                        <h5 className="mb-4 text-muted">Fashion Director & Best Selling Author</h5>
                        <p className="lead mb-4 text-secondary">
                            "I believe that everyone has a unique style waiting to be discovered. My goal is to help you find yours and share it with the world."
                        </p>
                        <p className="text-muted mb-4">
                            Jessica has worked with top fashion brands in New York and Paris. With over a decade of experience, she shares her secrets to success in this comprehensive guide. Her work has been featured in Vogue, Elle, and Harper's Bazaar.
                        </p>
                        <div className="d-flex gap-3">
                            <a href="#" className="btn btn-outline-dark rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}><FaFacebookF /></a>
                            <a href="#" className="btn btn-outline-dark rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}><FaTwitter /></a>
                            <a href="#" className="btn btn-outline-dark rounded-circle p-0 d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}><FaLinkedinIn /></a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Author;
