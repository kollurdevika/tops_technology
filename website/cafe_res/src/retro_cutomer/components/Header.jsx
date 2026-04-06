import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userName = localStorage.getItem("userName");

  const handleBooking = () => {
    navigate("/booking");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
      {/* NAVBAR */}
      <Navbar bg="dark" variant="dark" expand="lg" className="px-3 px-lg-4 py-2">
        <Container fluid>

          {/* BRAND */}
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-3">
            <h1 className="text-primary m-0">
              <i className="fa fa-utensils me-3"></i>Restoran
            </h1>
          </Navbar.Brand>

          {/* PROFILE ICON (SEPARATE – NO NESTED LINK) */}
          {isLoggedIn && (
            <div
              onClick={() => navigate("/edit-profile")}
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
                cursor: "pointer",
                marginLeft: "10px"
              }}
            >
              {userName?.charAt(0).toUpperCase()}
            </div>
          )}

          <Navbar.Toggle aria-controls="navbar-collapse" />
          <Navbar.Collapse id="navbar-collapse">
            <Nav className="ms-auto align-items-lg-center">
              <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
              <LinkContainer to="/about"><Nav.Link>About</Nav.Link></LinkContainer>
              <LinkContainer to="/service"><Nav.Link>Service</Nav.Link></LinkContainer>
              <LinkContainer to="/menu"><Nav.Link>Menu</Nav.Link></LinkContainer>
              <LinkContainer to="/customer_order"><Nav.Link>Order</Nav.Link></LinkContainer>

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
            </Nav>

            {/* LOGIN / LOGOUT */}
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

            <Button
              variant="primary"
              className="py-2 px-4 ms-lg-3"
              onClick={handleBooking}
            >
              Book A Table
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* HERO SECTION */}
      <div className="hero-header py-5 mb-5" style={{width: "100%"}}>
        <div className="w-100 py-5">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 text-center text-lg-start">
              <h1 className="display-3 text-white animated slideInLeft">
                Enjoy Our <br /> Delicious Meal
              </h1>

              <p className="text-white  animated slideInLeft mb-4 pb-2">
                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
              </p>

              <Button
                onClick={() => {
                  if (!isLoggedIn) {
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

            <div className="col-lg-6 text-center text-lg-end overflow-hidden">
              <img className="img-fluid rotate-image" src="/img/hero.png" alt="hero" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
