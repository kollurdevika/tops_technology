import React from 'react'
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";


function Testing() {
  const navigate = useNavigate();

  const handleBooking = () => {
    navigate('/booking');  // Navigate to Booking page
  };

  const options = {
    loop: true,
    margin: 10,
    nav: true,
    autoplay: true,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 }
    }
  };

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userName = localStorage.getItem("userName");


  const handleLogout = () => {
    localStorage.clear(); // or remove specific keys
    navigate("/");
  };


  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand
              as={Link}
              to="/"
              className="d-flex align-items-center gap-3"
            >
              <h1 className="text-primary m-0">
                <i className="fa fa-utensils me-3"></i>Restoran
              </h1>

              {/* 👤 PROFILE ICON (ONLY WHEN LOGGED IN) */}
              {isLoggedIn && (
                <Link
                  to="/edit-profile"
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "50%",
                    backgroundColor: "#198754",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    textDecoration: "none",
                  }}
                >
                  {userName?.charAt(0).toUpperCase()}
                </Link>
              )}

            </Navbar.Brand>        
            
              </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="navbar-collapse">
            <Nav className="ms-auto align-items-lg-center">
              <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
              <LinkContainer to="/about"><Nav.Link>About</Nav.Link></LinkContainer>
              <LinkContainer to="/service"><Nav.Link>Service</Nav.Link></LinkContainer>
              <LinkContainer to="/menu"><Nav.Link>Menu</Nav.Link></LinkContainer>
              <LinkContainer to="/customer_order"><Nav.Link>Order</Nav.Link></LinkContainer>

              <NavDropdown title="Pages" id="basic-nav-dropdown">
                <LinkContainer to="/booking"><NavDropdown.Item>Booking</NavDropdown.Item></LinkContainer>
                <LinkContainer to="/team"><NavDropdown.Item>Our Team</NavDropdown.Item></LinkContainer>
                <LinkContainer to="/testimonial"><NavDropdown.Item>Testimonial</NavDropdown.Item></LinkContainer>
              </NavDropdown>
              <LinkContainer to="/contact"><Nav.Link>Contact</Nav.Link></LinkContainer>
              <div className="d-flex align-items-center gap-2 ms-lg-3">

                {!isLoggedIn ? (
                  <Button
                    variant="outline-light"
                    className="ms-lg-3"
                    onClick={() => navigate("/login")}
                  >
                    Login
                  </Button>
                ) : (
                  <Button
                    variant="outline-light"
                    className="ms-lg-3"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                )}
              </div>
            </Nav>
            <div className="d-flex align-items-center gap-2 ms-lg-3">

              <Button
                onClick={() => {
                  if (!localStorage.getItem("isLoggedIn")) {
                    alert("Please login to book a table");
                    navigate("/login");
                  } else {
                    handleBooking();
                  }
                }}
              >
                Book A Table
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero */}
      <div className="container-xxl py-5 bg-dark hero-header mb-5">
        <div className="container text-center my-5 pt-5 pb-4">
          <h1 className="display-3 text-white mb-3 animated slideInDown">Testimonial</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center text-uppercase">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item"><a href="#">Pages</a></li>
              <li className="breadcrumb-item text-white active" aria-current="page">Testimonial</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Testimonial Carousel */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">Testimonial</h5>
            <h1 className="mb-5">Our Clients Say!!!</h1>
          </div>

          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            loop={true}
            autoplay={{ delay: 2000 }}
            breakpoints={{
              0: { slidesPerView: 1 },
              600: { slidesPerView: 2 },
              1000: { slidesPerView: 3 },
            }}
          >
            {[1, 2, 3, 4].map((num) => (
              <SwiperSlide key={num}>
                <div className="testimonial-item bg-transparent border rounded p-4">
                  <i className="fa fa-quote-left fa-2x text-primary mb-3" />
                  <p>
                    Dolor et eos labore, stet justo sed est sed. Diam sed sed dolor stet amet.
                  </p>
                  <div className="d-flex align-items-center">
                    <img
                      src={`img/testimonial-${num}.jpg`}
                      className="img-fluid rounded-circle"
                      style={{ width: 50, height: 50 }}
                    />
                    <div className="ps-3">
                      <h5 className="mb-1">Client Name</h5>
                      <small>Profession</small>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

        </div>
      </div>
    </div>
  );
}

export default Testing;
