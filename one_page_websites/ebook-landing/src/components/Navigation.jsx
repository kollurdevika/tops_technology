import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';

const Navigation = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Navbar
            expand="lg"
            fixed="top"
            variant="dark"
            className={`navbar-custom ${scrolled ? 'scrolled shadow-sm' : ''}`}
            style={{
                backgroundColor: scrolled ? '#3a3431' : 'transparent',
                padding: scrolled ? '10px 0' : '20px 0',
                transition: 'all 0.3s ease'
            }}
        >
            <Container>
                <Navbar.Brand href="#">
                    <img
                        src="https://crafto.themezaa.com/ebook/wp-content/uploads/sites/13/2025/05/demo-ebook-logo-whit.svg"
                        alt="EBOOK Logo"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        {['HOME', 'ABOUT', 'CHAPTER', 'AUTHOR', 'REVIEWS', 'SUBSCRIBE', 'PRICING', 'CONTACT'].map((item) => (
                            <Nav.Link key={item} href={`#${item.toLowerCase()}`}>{item}</Nav.Link>
                        ))}
                    </Nav>
                    <Button
                        variant="outline-light"
                        className="d-flex align-items-center gap-2"
                        href="#pricing"
                        as="a"
                    >
                        PURCHASE NOW <FaShoppingCart />
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;
