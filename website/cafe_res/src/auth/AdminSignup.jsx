import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminSignup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  // ✅ FIX: ADD THIS FUNCTION
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      toast.error("All fields are required");
      return;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const newAdmin = {
        ...formData,
        role: "admin",
        status: "Active",
        joined: new Date().toISOString().split("T")[0],
      };

      // ✅ SAVE IN admins NODE
      await axios.post(
        "https://restrodev-3a326-default-rtdb.firebaseio.com/admins.json",
        newAdmin
      );

      toast.success("Admin account created!");

      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
      });

      setTimeout(() => {
        navigate("/adminlogin");
      }, 1200);

    } catch (error) {
      console.error(error);
      toast.error("Signup failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #141e30, #243b55)"
      }}
    >
      <ToastContainer position="top-right" />

      <div className="card shadow-lg p-4" style={{ width: "400px", borderRadius: "15px" }}>
        
        {/* LOGO */}
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
            alt="Admin Logo"
            width="70"
          />
          <h4 className="fw-bold mt-2 text-dark">🍽 Restro Admin</h4>
          <p className="text-muted">Create Admin Account</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSignup}>
          <input
            type="text"
            className="form-control mb-3"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            className="form-control mb-3"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            className="form-control mb-3"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="password"
            className="form-control mb-3"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <button className="btn btn-dark w-100 fw-bold">
            Create Admin Account
          </button>
        </form>

        {/* LOGIN LINK */}
        <p className="text-center mt-3">
          Already have an account?
          <span
            className="ms-1 fw-semibold text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/adminlogin")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default AdminSignup;