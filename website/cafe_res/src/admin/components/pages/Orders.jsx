import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Badge, Button, Modal, Form } from "react-bootstrap";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [cancelMessage, setCancelMessage] = useState("");

  // ================= FETCH ORDERS =================
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://restrodev-3a326-default-rtdb.firebaseio.com/orders.json"
      );

      const data = res.data;

      if (!data) {
        setOrders([]);
        return;
      }

      // 🔥 Convert object → array
      const ordersArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      setOrders(ordersArray);
    } catch (error) {
      console.error(error);
    }
  };

  // ================= UPDATE STATUS =================
  const updateStatus = async (id, status) => {
    await axios.patch(
      `https://restrodev-3a326-default-rtdb.firebaseio.com/orders/${id}.json`,
      { status }
    );

    fetchOrders();
  };

  // ================= DELETE ORDER =================
  const deleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      await axios.delete(
        `https://restrodev-3a326-default-rtdb.firebaseio.com/orders/${id}.json`
      );

      fetchOrders();
    }
  };

  // ================= OPEN CANCEL MODAL =================
  const openCancelModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  // ================= CONFIRM CANCEL =================
  const confirmCancel = async () => {
    await axios.patch(
      `https://restrodev-3a326-default-rtdb.firebaseio.com/orders/${selectedOrder.id}.json`,
      {
        status: "Cancelled",
        message: cancelMessage,
      }
    );

    setShowModal(false);
    setCancelMessage("");
    fetchOrders();
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">📦 Customer Orders</h2>

      <Table bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Food</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Status</th>
            <th>Ordered At</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 && (
            <tr>
              <td colSpan="7" className="text-center">
                No orders yet
              </td>
            </tr>
          )}

          {orders.map((order, index) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.foodName}</td>
              <td>₹{order.price}</td>
              <td>{order.quantity}</td>
              <td>
                <Badge
                  bg={
                    order.status === "Pending"
                      ? "warning"
                      : order.status === "Confirmed"
                      ? "success"
                      : "danger"
                  }
                >
                  {order.status}
                </Badge>
              </td>
              <td>{order.orderedAt}</td>

              <td>
                <Button
                  size="sm"
                  variant="success"
                  className="me-2"
                  onClick={() => updateStatus(order.id, "Confirmed")}
                >
                  Confirm
                </Button>

                <Button
                  size="sm"
                  variant="warning"
                  className="me-2"
                  onClick={() => openCancelModal(order)}
                >
                  Cancel
                </Button>

                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => deleteOrder(order.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* CANCEL MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Order</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group>
            <Form.Label>Cancellation Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={cancelMessage}
              onChange={(e) => setCancelMessage(e.target.value)}
              placeholder="Enter reason for cancellation"
            />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={confirmCancel}>
            Confirm Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default AdminOrders;