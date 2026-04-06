import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";

function Pages() {
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
                <div>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
                        <Link to="/" className="navbar-brand p-0">
                            <h1 className="text-primary m-0">
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

          </Navbar.Brand>                            </h1>
                        </Link>

                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse"
                        >
                            <span className="fa fa-bars" />
                        </button>

                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <div className="navbar-nav ms-auto py-0 pe-4">
                                <NavLink to="/" className="nav-item nav-link">
                                    Home
                                </NavLink>
                                <NavLink to="/about" className="nav-item nav-link active">
                                    About
                                </NavLink>
                                <NavLink to="/service" className="nav-item nav-link">
                                    Service
                                </NavLink>
                                <NavLink to="/menu" className="nav-item nav-link">
                                    Menu
                                </NavLink>

                                <NavLink to="/customer_order" className="nav-item nav-link">
                                    Order
                                </NavLink>




                                <div className="nav-item dropdown">
                                    <a
                                        href="#"
                                        className="nav-link dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                    >
                                        Pages
                                    </a>
                                    <div className="dropdown-menu m-0">
                                        <Link to="/booking" className="dropdown-item">
                                            Booking
                                        </Link>
                                        <Link to="/team" className="dropdown-item">
                                            Our Team
                                        </Link>
                                        <Link to="/testing" className="dropdown-item">
                                            Testimonial
                                        </Link>
                                    </div>
                                </div>

                                <NavLink to="/contact" className="nav-item nav-link">
                                    Contact
                                </NavLink>
                            </div>

                            <div className="d-flex align-items-center gap-2 ms-lg-3">
                                {!isLoggedIn ? (
                                    <Button variant="outline-light" onClick={() => navigate("/login")}>
                                        Login
                                    </Button>
                                ) : (
                                    <Button variant="outline-light" onClick={handleLogout}>
                                        Logout
                                    </Button>
                                )}

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

                        </div>
                    </nav>
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

        </div>
    )
}

export default Pages