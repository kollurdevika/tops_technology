import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminHeader.css";
import { useNavigate } from "react-router-dom";


function AdminHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();   // 🔥 remove everything
    navigate("/adminlogin"); // ✅ go to admin login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <NavLink className="navbar-brand fw-bold text-warning" to="/admin/ahome">
        🍽️ Restro Admin
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#adminNavbar"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="adminNavbar">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/ahome">📊 Dashboard</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/menu">🍕 Manage Menu</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/orders">🧾 Orders</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/customers">👥 Customers</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/reservations">📅 Reservations</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/reports">📈 Reports</NavLink>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link" to="/admin/settings">⚙️ Settings</NavLink>
          </li>
          <button
            className="btn btn-danger btn-sm"
            onClick={handleLogout}
          >
            Logout
          </button>

        </ul>
      </div>
    </nav>
  );
}

export default AdminHeader;
