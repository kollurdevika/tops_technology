import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";

function Service() {
    const navigate = useNavigate();
    const handleBooking = () => {   // <-- Define the function
        navigate('/booking');          // Navigate to Booking page
    };

    const isLoggedIn = localStorage.getItem("isLoggedIn");
      const userName = localStorage.getItem("userName");


    const handleLogout = () => {
        localStorage.clear(); // or remove specific keys
        navigate("/");
    };

    return (
        <div>
            {/* Navbar & Hero Start */}

            <div>
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

                                <LinkContainer to="/">
                                    <Nav.Link>Home</Nav.Link>
                                </LinkContainer>

                                <LinkContainer to="/about">
                                    <Nav.Link>About</Nav.Link>
                                </LinkContainer>

                                <LinkContainer to="/service">
                                    <Nav.Link>Service</Nav.Link>
                                </LinkContainer>

                                <LinkContainer to="/menu">
                                    <Nav.Link>Menu</Nav.Link>
                                </LinkContainer>

                                <LinkContainer to="/customer_order">
                                    <Nav.Link>Order</Nav.Link>
                                </LinkContainer>


                                {/* DROPDOWN FIXED */}
                                <NavDropdown title="Pages" id="basic-nav-dropdown">
                                    <LinkContainer to="/booking">
                                        <NavDropdown.Item>Booking</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/team">
                                        <NavDropdown.Item>Our Team</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to="/testing">
                                        <NavDropdown.Item>Testimonial</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>

                                <LinkContainer to="/contact">
                                    <Nav.Link>Contact</Nav.Link>
                                </LinkContainer>


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

                <div className="container-xxl py-5 bg-dark hero-header mb-5">
                    <div className="container text-center my-5 pt-5 pb-4">
                        <h1 className="display-3 text-white mb-3 animated slideInDown">Services</h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb justify-content-center text-uppercase">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item"><a href="#">Pages</a></li>
                                <li className="breadcrumb-item text-white active" aria-current="page">Service</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            {/* Navbar & Hero End */}
            {/* Service Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h5 className="section-title ff-secondary text-center text-primary fw-normal">Our Services</h5>
                        <h1 className="mb-5">Explore Our Services</h1>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-user-tie text-primary mb-4" />
                                    <h5>Master Chefs</h5>
                                    <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-utensils text-primary mb-4" />
                                    <h5>Quality Food</h5>
                                    <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-cart-plus text-primary mb-4" />
                                    <h5>Online Order</h5>
                                    <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-headset text-primary mb-4" />
                                    <h5>24/7 Service</h5>
                                    <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-user-tie text-primary mb-4" />
                                    <h5>Master Chefs</h5>
                                    <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-utensils text-primary mb-4" />
                                    <h5>Quality Food</h5>
                                    <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-cart-plus text-primary mb-4" />
                                    <h5>Online Order</h5>
                                    <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                            <div className="service-item rounded pt-3">
                                <div className="p-4">
                                    <i className="fa fa-3x fa-headset text-primary mb-4" />
                                    <h5>24/7 Service</h5>
                                    <p>Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Service End */}
        </div>
    )
}

export default Service