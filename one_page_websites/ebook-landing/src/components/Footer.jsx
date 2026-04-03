import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer" id="contact">
            <Container>
                <Row>
                    <Col md={4} className="mb-4 mb-md-0">
                        <img
                            src="https://crafto.themezaa.com/ebook/wp-content/uploads/sites/13/2025/05/demo-ebook-logo-whit.svg"
                            alt="Logo"
                            style={{ height: '30px' }}
                            className="mb-4"
                        />
                        <p className="small">
                            The ultimate guide for fashion designers looking to expand their reach and sell more effectively. Be part of the revolution.
                        </p>
                        <div className="mt-4">
                            <a href="#" className="social-icon"><FaFacebookF /></a>
                            <a href="#" className="social-icon"><FaTwitter /></a>
                            <a href="#" className="social-icon"><FaInstagram /></a>
                            <a href="#" className="social-icon"><FaLinkedinIn /></a>
                        </div>
                    </Col>
                    <Col md={2} className="mb-4 mb-md-0">
                        <h5>Explore</h5>
                        <ul className="list-unstyled">
                            <li><a href="#about">About</a></li>
                            <li><a href="#author">Author</a></li>
                            <li><a href="#chapter">Chapter</a></li>
                            <li><a href="#reviews">Reviews</a></li>
                        </ul>
                    </Col>
                    <Col md={3} className="mb-4 mb-md-0">
                        <h5>Resources</h5>
                        <ul className="list-unstyled">
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Help Center</a></li>
                        </ul>
                    </Col>
                    <Col md={3}>
                        <h5>Contact</h5>
                        <ul className="list-unstyled small">
                            <li>123 Fashion Street, New York, NY 10001</li>
                            <li>support@ebooklanding.com</li>
                            <li>+1 (555) 123-4567</li>
                        </ul>
                    </Col>
                </Row>
                <Row className="mt-5 pt-4 border-top border-secondary border-opacity-25">
                    <Col className="text-center small">
                        &copy; {new Date().getFullYear()} Ebook Landing. All rights reserved.
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
