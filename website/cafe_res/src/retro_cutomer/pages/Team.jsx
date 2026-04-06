import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";

function Team() {
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
                {/* Navbar & Hero Start */}


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
                        <h1 className="display-3 text-white mb-3 animated slideInDown">Our Team</h1>
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb justify-content-center text-uppercase">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item"><a href="#">Pages</a></li>
                                <li className="breadcrumb-item text-white active" aria-current="page">Team</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
            {/* Navbar & Hero End */}
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
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
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
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
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
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
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
                        <div className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
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
                    </div>
                </div>
            </div>
            {/* Team End */}
        </div>

    )
}

export default Team