import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import axios from "axios";

function Contact() {
  const navigate = useNavigate();
  const [restro, setRestro] = useState(null);

  const userName = localStorage.getItem("userName");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const adminId = localStorage.getItem("adminId");

  useEffect(() => {
    fetchRestroData();
  }, []);

  const fetchRestroData = async () => {
    try {
      const res = await axios.get(
        `https://restrodev-3a326-default-rtdb.firebaseio.com/adminSettings/${adminId}.json`
      );

      setRestro(res.data || {});
    } catch (error) {
      console.error(error);
    }
  };

  const handleBooking = () => navigate("/booking");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/contact");
  };

  if (!restro) return <p className="text-center mt-5">Loading...</p>;

  return (
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

      {/* HERO */}
      <div className="container-xxl py-5 bg-dark text-white text-center">
        <h1>Contact Us</h1>
      </div>

      {/* CONTACT */}
      <div className="container py-5">
        <div className="row g-4">

          {/* RESTRO DETAILS */}
          {/* RESTRO DETAILS */}
          <div className="col-md-4">
            <h5 className="text-primary">
              {restro.restaurantName || "Restro Web"}
            </h5>

            {/* 📍 ADDRESS → GOOGLE MAP */}
            <p>
              📍{" "}
              <a
                href={`https://www.google.com/maps?q=${encodeURIComponent(
                  restro.address || "south bopal M.P"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                {restro.address || "south bopal M.P"}
              </a>
            </p>

            {/* 📞 PHONE → CALL */}
            <p>
              📞{" "}
              <a
                href={`tel:${restro.phone || "9822546739"}`}
                className="text-decoration-none"
              >
                {restro.phone || "9822546739"}
              </a>
            </p>

            {/* 📧 EMAIL → EMAIL APP */}
            <p>
              📧{" "}
              <a
                href={`mailto:${restro.email || "restro0web@gmail.com"}`}
                className="text-decoration-none"
              >
                {restro.email || "restro0web@gmail.com"}
              </a>
            </p>

            {/* ⏰ TIMING */}
            <p>
              ⏰ {restro.openTime || "11.00"} – {restro.closeTime || "11.00"}
            </p>

            {/* 🔥 BOOKING CLICKABLE */}
            <span
              className="badge bg-success"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/booking")}
            >
              Booking Open
            </span>
          </div>

          {/* MAP */}
          <div className="col-md-4">
            <iframe
              className="w-100"
              style={{ height: 250 }}
              src="https://www.google.com/maps?q=India&output=embed"
              title="map"
            />
          </div>

          {/* FORM */}
          <div className="col-md-4">
            <input className="form-control mb-2" placeholder="Your Name" />
            <input className="form-control mb-2" placeholder="Your Email" />
            <textarea className="form-control mb-2" placeholder="Message" />
            <button className="btn btn-primary w-100">Send</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;