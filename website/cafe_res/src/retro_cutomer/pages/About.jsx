import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";

function About() {
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
                                            className=" d-flex align-items-center gap-2 ms-lg-3"
                                            onClick={() => navigate("/login")}
                                        >
                                            Login
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="outline-light"
                                            className="d-flex align-items-center gap-2 ms-lg-3"
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
                        <h1 className="display-3 text-white mb-3 animated slideInDown">About Us</h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb justify-content-center text-uppercase">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item"><a href="#">Pages</a></li>
                                <li className="breadcrumb-item text-white active" aria-current="page">About</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center text-uppercase">
                    <li className="breadcrumb-item">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="#">Pages</Link>
                    </li>
                    <li
                        className="breadcrumb-item text-white active"
                        aria-current="page"
                    >
                        About
                    </li>
                </ol>
            </nav>
            {/* Navbar & Hero End */}
            {/* About Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6">
                            <div className="row g-3">
                                <div className="col-6 text-start">
                                    <img className="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.1s" src="img/about-1.jpg" />
                                </div>
                                <div className="col-6 text-start">
                                    <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.3s" src="img/about-2.jpg" style={{ marginTop: '25%' }} />
                                </div>
                                <div className="col-6 text-end">
                                    <img className="img-fluid rounded w-75 wow zoomIn" data-wow-delay="0.5s" src="img/about-3.jpg" />
                                </div>
                                <div className="col-6 text-end">
                                    <img className="img-fluid rounded w-100 wow zoomIn" data-wow-delay="0.7s" src="img/about-4.jpg" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <h5 className="section-title ff-secondary text-start text-primary fw-normal">About Us</h5>
                            <h1 className="mb-4">Welcome to <i className="fa fa-utensils text-primary me-2" />Restoran</h1>
                            <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos erat ipsum et lorem et sit, sed stet lorem sit.</p>
                            <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet</p>
                            <div className="row g-4 mb-4">
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                                        <h1 className="flex-shrink-0 display-5 text-primary mb-0" data-toggle="counter-up">15</h1>
                                        <div className="ps-4">
                                            <p className="mb-0">Years of</p>
                                            <h6 className="text-uppercase mb-0">Experience</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="d-flex align-items-center border-start border-5 border-primary px-3">
                                        <h1 className="flex-shrink-0 display-5 text-primary mb-0" data-toggle="counter-up">50</h1>
                                        <div className="ps-4">
                                            <p className="mb-0">Popular</p>
                                            <h6 className="text-uppercase mb-0">Master Chefs</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <a className="btn btn-primary py-3 px-5 mt-2" href>Read More</a>
                        </div>
                    </div>
                </div>
            </div>
            {/* About End */}
            {/* Team Start */}
            <div className="container-xxl pt-5 pb-3">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h5 className="section-title ff-secondary text-center text-primary fw-normal">Team Members</h5>
                        <h1 className="mb-5">Our Master Chefs</h1>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="team-item text-center rounded overflow-hidden">
                                <div className="rounded-circle overflow-hidden m-4">
                                    <img className="img-fluid" src="img/team-1.jpg" alt />
                                </div>
                                <h5 className="mb-0">Full Name</h5>
                                <small>Designation</small>
                                <div className="d-flex justify-content-center mt-3">
                                    <a className="btn btn-square btn-primary mx-1" href><i className="fab fa-facebook-f" /></a>
                                    <a className="btn btn-square btn-primary mx-1" href><i className="fab fa-twitter" /></a>
                                    <a className="btn btn-square btn-primary mx-1" href><i className="fab fa-instagram" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="team-item text-center rounded overflow-hidden">
                                <div className="rounded-circle overflow-hidden m-4">
                                    <img className="img-fluid" src="img/team-2.jpg" alt />
                                </div>
                                <h5 className="mb-0">Full Name</h5>
                                <small>Designation</small>
                                <div className="d-flex justify-content-center mt-3">
                                    <a className="btn btn-square btn-primary mx-1" href><i className="fab fa-facebook-f" /></a>
                                    <a className="btn btn-square btn-primary mx-1" href><i className="fab fa-twitter" /></a>
                                    <a className="btn btn-square btn-primary mx-1" href><i className="fab fa-instagram" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="team-item text-center rounded overflow-hidden">
                                <div className="rounded-circle overflow-hidden m-4">
                                    <img className="img-fluid" src="img/team-3.jpg" alt />
                                </div>
                                <h5 className="mb-0">Full Name</h5>
                                <small>Designation</small>
                                <div className="d-flex justify-content-center mt-3">
                                    <a className="btn btn-square btn-primary mx-1" href><i className="fab fa-facebook-f" /></a>
                                    <a className="btn btn-square btn-primary mx-1" href><i className="fab fa-twitter" /></a>
                                    <a className="btn btn-square btn-primary mx-1" href><i className="fab fa-instagram" /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                            <div className="team-item text-center rounded overflow-hidden">
                                <div className="rounded-circle overflow-hidden m-4">
                                    <img className="img-fluid" src="img/team-4.jpg" alt />
                                </div>
                                <h5 className="mb-0">Full Name</h5>
                                <small>Designation</small>
                                <div className="d-flex justify-content-center mt-3">
                                    <a className="btn btn-square btn-primary mx-1" href><i className="fab fa-facebook-f" /></a>
                                    <a className="btn btn-square btn-primary mx-1" href><i className="fab fa-twitter" /></a>
                                    <a className="btn btn-square btn-primary mx-1" href><i className="fab fa-instagram" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Team End */}
        </div>


    )
}

export default About