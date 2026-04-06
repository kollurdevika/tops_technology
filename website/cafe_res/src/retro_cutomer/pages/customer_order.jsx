import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  Navbar,
  Nav,
  NavDropdown,
  Container,
  Button,
  Card,
  Row,
  Col,
  ListGroup,
  Badge
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function CustomerOrder() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // ================= FETCH MENU =================
  useEffect(() => {
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
  }, []);

  // ================= ADD TO CART =================
  const addToCart = (item) => {
    const existing = cart.find(c => c.id === item.id);

    if (existing) {
      setCart(cart.map(c =>
        c.id === item.id ? { ...c, qty: c.qty + 1 } : c
      ));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };


  const handleBooking = () => {   // <-- Define the function
    navigate('/booking');          // Navigate to Booking page
  };

  // ================= CART CONTROLS =================
  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // ================= PLACE ORDER =================
 const placeOrder = async () => {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  try {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");

    for (let item of cart) {
      const order = {
        userId: userId,
        userName: userName,
        foodId: item.id,
        foodName: item.name,
        price: item.price,
        quantity: item.qty,
        total: item.price * item.qty,
        status: "Pending",
        orderedAt: new Date().toISOString()
      };

      // ✅ SAVE TO FIREBASE (NOT localhost)
      await fetch(
        "https://restrodev-3a326-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        }
      );
    }

    alert("✅ Order placed successfully");
    setCart([]);

  } catch (error) {
    console.error(error);
    alert("❌ Order failed");
  }
};
  // ================= TOTAL =================
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.qty, 0
  );

  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userName = localStorage.getItem("userName");


  useEffect(() => {
    if (!isLoggedIn) navigate("/login");
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // or remove specific keys
    navigate("/");
  };
  return (
    <>
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
      <div className="container-xxl py-5 bg-dark text-white text-center">
        <h1>Order Your Favourite Food 🍔🍕</h1>
      </div>

      {/* CONTENT */}
      <Container className="my-4">
        <Row>
          {/* MENU */}
          <Col md={8}>
            <Row>
              {menu.map(item => (
                <Col md={6} lg={4} key={item.id} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={item.image}
                      height="180"
                      style={{ objectFit: "cover" }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <Card.Title>{item.name}</Card.Title>
                      <Card.Text>₹{item.price}</Card.Text>
                      <Button
                        onClick={() => {
                          if (!isLoggedIn) {
                            alert("Please login to add items to cart");
                            navigate("/login");
                          } else {
                            addToCart(item);
                          }
                        }}
                      >
                        Add to Cart
                      </Button>

                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

          {/* CART */}
          <Col md={4}>
            <Card className="shadow">
              <Card.Header>
                🛒 Cart <Badge bg="success">{cart.length}</Badge>
              </Card.Header>
              <ListGroup variant="flush">
                {cart.map(item => (
                  <ListGroup.Item key={item.id}>
                    <strong>{item.name}</strong>
                    <br />
                    ₹{item.price} × {item.qty}
                    <div className="mt-2">
                      <Button size="sm" onClick={() => decreaseQty(item.id)}>-</Button>{" "}
                      <Button size="sm" onClick={() => increaseQty(item.id)}>+</Button>{" "}
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => removeItem(item.id)}
                      >
                        x
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Card.Footer>
                <h5>Total: ₹{totalAmount}</h5>
                <Button
                  className="w-100 mt-2"
                  onClick={() => {
                    if (!isLoggedIn) {
                      alert("Please login to place order");
                      navigate("/login");
                    } else {
                      placeOrder();
                    }
                  }}
                >
                  Place Order
                </Button>

              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default CustomerOrder;
