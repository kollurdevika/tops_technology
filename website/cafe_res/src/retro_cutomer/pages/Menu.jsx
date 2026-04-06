import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button
} from "react-bootstrap";

function Menu() {
  const navigate = useNavigate();

  const [menu, setMenu] = useState([]);
  const [categories, setCategories] = useState([]);

  const handleBooking = () => navigate("/booking");

  // ================= FETCH DATA =================
  useEffect(() => {
    // MENU
    fetch("https://restrodev-3a326-default-rtdb.firebaseio.com/menuItems.json")
      .then(res => res.json())
      .then(data => {
        if (data) {
          const formatted = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setMenu(formatted);
        } else {
          setMenu([]);
        }
      });

    // CATEGORIES
    fetch("https://restrodev-3a326-default-rtdb.firebaseio.com/categories.json")
      .then(res => res.json())
      .then(data => {
        if (data) {
          const formatted = Object.keys(data).map(key => ({
            id: key,
            ...data[key]
          }));
          setCategories(formatted);
        }
      });

  }, []);

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userName = localStorage.getItem("userName");


  const handleLogout = () => {
    localStorage.clear(); // or remove specific keys
    navigate("/");
  };

  return (
    <div>
      {/* NAVBAR */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>

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
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
              <LinkContainer to="/about"><Nav.Link>About</Nav.Link></LinkContainer>
              <LinkContainer to="/service"><Nav.Link>Service</Nav.Link></LinkContainer>
              <LinkContainer to="/menu"><Nav.Link>Menu</Nav.Link></LinkContainer>
              <LinkContainer to="/customer_order"><Nav.Link>Order</Nav.Link></LinkContainer>

              <NavDropdown title="Pages" id="basic-nav-dropdown">
                <LinkContainer to="/booking"><NavDropdown.Item>Booking</NavDropdown.Item></LinkContainer>
                <LinkContainer to="/team"><NavDropdown.Item>Our Team</NavDropdown.Item></LinkContainer>
                <LinkContainer to="/testing"><NavDropdown.Item>Testimonial</NavDropdown.Item></LinkContainer>
              </NavDropdown>

              <LinkContainer to="/contact">
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>


            </Nav>


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



          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* HERO */}
      <div className="container-xxl py-5 bg-dark text-white text-center mb-5">
        <h1 className="display-4">Food Menu</h1>
        <p className="lead">Delicious & Fresh</p>
      </div>

      {/* MENU SECTION */}
      <div className="container-xxl py-5">
        <Container>

          {categories.map(category => (
            <div key={category.id} className="mb-5">

              {/* CATEGORY TITLE */}
              <h2 className="text-center mb-4">
                🍽️ {category.catName}
              </h2>

              <div className="row g-4">
                {menu
                  .filter(item => item.categoryId === category.id)
                  .map(item => (
                    <div className="col-lg-6" key={item.id}>
                      <div className="d-flex align-items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded"
                          style={{ width: "90px", height: "90px", objectFit: "cover" }}
                        />

                        <div className="w-100 d-flex flex-column text-start ps-4">
                          <h5 className="d-flex justify-content-between border-bottom pb-2">
                            <span>{item.name}</span>
                            <span className="text-primary">₹{item.price}</span>
                          </h5>
                          <small className="fst-italic">
                            {item.description}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}

                {menu.filter(item => item.categoryId === category.id).length === 0 && (
                  <p className="text-center text-muted">
                    No items available
                  </p>
                )}
              </div>
            </div>
          ))}

        </Container>
      </div>
    </div>
  );
}

export default Menu;
