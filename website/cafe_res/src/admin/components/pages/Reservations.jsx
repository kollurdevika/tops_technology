import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminReservations() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  // 🔥 FETCH FROM FIREBASE
  const fetchReservations = async () => {
    try {
      const res = await axios.get(
        "https://restrodev-3a326-default-rtdb.firebaseio.com/reservations.json"
      );

      const data = res.data;

      if (!data) {
        setReservations([]);
        return;
      }

      // 🔥 Convert object → array
      const formatted = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      setReservations(formatted);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 CONFIRM
  const handleConfirm = async (id) => {
    await axios.patch(
      `https://restrodev-3a326-default-rtdb.firebaseio.com/reservations/${id}.json`,
      { action: "Confirmed" }
    );

    fetchReservations();
  };

  // 🔥 CANCEL
  const handleCancel = async (id) => {
    await axios.patch(
      `https://restrodev-3a326-default-rtdb.firebaseio.com/reservations/${id}.json`,
      { action: "Cancelled" }
    );

    fetchReservations();
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-dark text-white text-center">
          <h3 className="mb-0">📋 Reservation Requests</h3>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle mb-0">
              <thead className="table-dark text-center">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Date & Time</th>
                  <th>People</th>
                  <th>Request</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody className="text-center">
                {reservations.length === 0 ? (
                  <tr>
                    <td colSpan="6">No reservations found</td>
                  </tr>
                ) : (
                  reservations.map((res) => (
                    <tr key={res.id}>
                      <td className="fw-semibold">{res.name}</td>
                      <td>{res.email}</td>
                      <td>{res.datetime}</td>
                      <td>{res.people || "-"}</td>
                      <td>{res.message || "-"}</td>

                      <td>
                        {!res.action ? (
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() => handleConfirm(res.id)}
                            >
                              ✔ Confirm
                            </button>

                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleCancel(res.id)}
                            >
                              ✖ Cancel
                            </button>
                          </div>
                        ) : (
                          <span
                            className={`fw-semibold ${
                              res.action === "Confirmed"
                                ? "text-success"
                                : "text-danger"
                            }`}
                          >
                            {res.action}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReservations;