import React, { useEffect, useState } from "react";
import axios from "axios";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // FETCH CUSTOMERS FROM FIREBASE
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const res = await axios.get(
        "https://restrodev-3a326-default-rtdb.firebaseio.com/customers.json"
      );

      const data = res.data;

      if (!data) {
        setCustomers([]);
        return;
      }

      const customersArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      setCustomers(customersArray);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ SEARCH + FILTER
  const filteredCustomers = customers.filter((c) => {
    const matchSearch =
      c.name?.toLowerCase().includes(search.toLowerCase()) ||
      c.email?.toLowerCase().includes(search.toLowerCase()) ||
      c.phone?.includes(search);

    const matchFilter = filter === "All" || c.status === filter;

    return matchSearch && matchFilter;
  });

  // ✅ BLOCK / UNBLOCK
  const toggleStatus = async (user) => {
    const updatedStatus = user.status === "Active" ? "Blocked" : "Active";

    await axios.patch(
      `https://restrodev-3a326-default-rtdb.firebaseio.com/customers/${user.id}.json`,
      {
        status: updatedStatus,
      }
    );

    fetchCustomers();
  };

  // ✅ DELETE
  const deleteCustomer = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await axios.delete(
        `https://restrodev-3a326-default-rtdb.firebaseio.com/customers/${id}.json`
      );

      fetchCustomers();
    }
  };

  return (
    <div className="container py-4">
      <h2 className="fw-bold text-center mb-4">👥 Customer Management</h2>

      {/* SEARCH + FILTER */}
      <div className="d-flex justify-content-between mb-3">
        <input
          className="form-control w-50"
          placeholder="Search by name, email or phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="form-select w-25"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Active">Active</option>
          <option value="Blocked">Blocked</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark text-center">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-danger">
                  No users found
                </td>
              </tr>
            ) : (
              filteredCustomers.map((c) => (
                <tr key={c.id} className="text-center align-middle">
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone || "-"}</td>
                  <td>
                    <span className="badge bg-info text-dark">
                      {c.role}
                    </span>
                  </td>
                  <td>{c.joined}</td>
                  <td>
                    <span
                      className={`badge ${
                        c.status === "Active"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>

                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => toggleStatus(c)}
                    >
                      {c.status === "Active" ? "Block" : "Unblock"}
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteCustomer(c.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Customers;