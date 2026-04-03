import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaPaperPlane } from 'react-icons/fa';

const Hero = () => {
    return (
        <section className="hero-section" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col md={6} className="position-relative mb-5 mb-md-0 animate__animated animate__fadeInLeft">
                        <div className="book-cover-container position-relative d-inline-block">
                            <img
                                src="https://crafto.themezaa.com/ebook/wp-content/uploads/sites/13/2024/10/demo-ebook-left-01.png.webp"
                                alt="Book Cover"
                                className="img-fluid" // Added img-fluid for responsiveness
                            />
                            <div className="price-tag-overlay">
                                Only <br /> <strong>$19</strong>
                            </div>
                        </div>
                    </Col>

                    <Col md={6} className="hero-content animate__animated animate__fadeInRight">
                        <h1 className="hero-title">SELL YOUR BOOK <br /> <span className="text-warning">FAST & EASY</span></h1>
                        <p className="lead mb-4 text-white-50">
                            Read by over <strong>60,000+</strong> fashion designers. The ultimate guide to selling your ebook effectively.
                        </p>

                        <div className="bg-dark bg-opacity-25 p-4 rounded-3 border border-secondary border-opacity-25 backdrop-blur">
                            <Form className="d-flex flex-column gap-3">
                                <Form.Group>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="hero-input"
                                    />
                                </Form.Group>
                                <Button className="hero-btn">
                                    Get Started Now! <FaPaperPlane className="ms-2" />
                                </Button>
                            </Form>
                            <p className="small text-white-50 mt-3 mb-0 text-center">
                                * We promise not to spam your inbox.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Inline styles for the specific price tag missing in global css */}
            <style>{`
        .price-tag-overlay {
          position: absolute;
          top: 30px;
          right: -20px;
          background: #ffc107;
          color: #3a3431;
          padding: 15px 20px;
          border-radius: 50%;
          font-weight: bold;
          text-align: center;
          line-height: 1.2;
          box-shadow: 0 10px 20px rgba(0,0,0,0.3);
          transform: rotate(15deg);
          border: 3px solid #fff;
          z-index: 10;
        }
        .backdrop-blur {
          backdrop-filter: blur(10px);
        }
      `}</style>
        </section>
    );
};

export default Hero;
