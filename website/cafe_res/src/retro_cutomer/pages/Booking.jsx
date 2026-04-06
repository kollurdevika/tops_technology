import React, { useState } from "react";
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Booking() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");

  const [showModal, setShowModal] = useState(false);
  const [isVideo, setIsVideo] = useState(true);

  // ✅ FORM STATE (FIXED)
  const [formData, setFormData] = useState({
    name: userName || "",
    email: userEmail || "",
    datetime: "",
    people: "",
    message: ""
  });

  // ✅ HANDLE CHANGE (MISSING FIXED)
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  // ✅ SUBMIT TO FIREBASE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    try {
      const newReservation = {
        ...formData,
        action: "Pending", // important for admin
        createdAt: new Date().toISOString()
      };

      await axios.post(
        "https://restrodev-3a326-default-rtdb.firebaseio.com/reservations.json",
        newReservation
      );

      alert("✅ Reservation booked successfully!");

      setFormData({
        name: userName || "",
        email: userEmail || "",
        datetime: "",
        people: "",
        message: ""
      });

    } catch (error) {
      console.error(error);
      alert("❌ Error booking reservation");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleBooking = () => navigate("/booking");

  return (
    <div>
      {/* NAVBAR */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-3">
            <h1 className="text-primary m-0">
              <i className="fa fa-utensils me-3"></i>Restoran
            </h1>

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
                }}
              >
                {userName?.charAt(0).toUpperCase()}
              </Link>
            )}
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <LinkContainer to="/menu"><Nav.Link>Menu</Nav.Link></LinkContainer>
              <LinkContainer to="/customer_order"><Nav.Link>Order</Nav.Link></LinkContainer>
              <LinkContainer to="/contact"><Nav.Link>Contact</Nav.Link></LinkContainer>
            </Nav>

            <div className="d-flex gap-2 ms-lg-3">
              {!isLoggedIn ? (
                <Button onClick={() => navigate("/login")}>Login</Button>
              ) : (
                <Button onClick={handleLogout}>Logout</Button>
              )}

              <Button onClick={handleBooking}>Book A Table</Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* HERO */}
      <div className="container-xxl py-5 bg-dark text-white text-center">
        <h1>Booking</h1>
      </div>

      {/* FORM */}
      <div className="container py-5">
        <div className="row g-4">

          <div className="col-md-6">
            <img
              src="https://images.pexels.com/photos/27177965/pexels-photo-27177965.jpeg"
              className="w-100"
              alt="booking"
            />
          </div>

          <div className="col-md-6 bg-dark text-white p-4 rounded">
            <h3>Book A Table</h3>

            <form onSubmit={handleSubmit}>
              <input
                className="form-control mb-3"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />

              <input
                className="form-control mb-3"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />

              <input
                className="form-control mb-3"
                id="datetime"
                value={formData.datetime}
                onChange={handleChange}
                placeholder="Date & Time"
                required
              />

              <input
                className="form-control mb-3"
                id="people"
                value={formData.people}
                onChange={handleChange}
                placeholder="People"
              />

              <textarea
                className="form-control mb-3"
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
              />

              <button className="btn btn-primary w-100">
                Book Now
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Booking;