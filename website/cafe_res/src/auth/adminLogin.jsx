import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ CHECK IF ADMIN ALREADY LOGGED IN
  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role === "admin") {
      navigate("/admin/ahome");
    }
  }, [navigate]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      // 🔥 GET USERS FROM FIREBASE
      const res = await axios.get(
        "https://restrodev-3a326-default-rtdb.firebaseio.com/admins.json"
      );

      const data = res.data;

      if (!data) {
        toast.error("No users found");
        return;
      }

      // 🔥 Convert object → array
      const usersArray = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));

      // 🔥 Find user
      const user = usersArray.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        toast.error("Invalid email or password");
        return;
      }

      if (user.role !== "admin") {
        toast.error("Only admin can login here");
        return;
      }

      // ✅ SAVE LOGIN LOG
      await axios.post(
        "https://restrodev-3a326-default-rtdb.firebaseio.com/loginadmin.json",
        {
          userId: user.id,
          email: user.email,
          loginTime: new Date().toISOString(),
        }
      );

      // ✅ SAVE SESSION
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("role", user.role);
      localStorage.setItem("userName", user.name);
      localStorage.setItem("userId", user.id);

      toast.success("Login successful!");

      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/admin/ahome");
      }, 1200);

    } catch (error) {
      console.error(error);
      toast.error("Server error. Try again!");
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", background: "#f4f6f8" }}
    >
      <ToastContainer position="top-right" />

      <div className="card shadow-lg p-4" style={{ width: "380px" }}>
        {/* HEADER */}
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png"
            width="55"
            alt="Admin"
          />
          <h4 className="fw-bold mt-2">Admin Panel</h4>
          <p className="text-muted">Login to manage restaurant</p>
        </div>

        {/* FORM */}
        <form onSubmit={handleAdminLogin}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* FORGOT PASSWORD */}
          <div className="text-end mt-2">
            <span
              style={{ cursor: "pointer", color: "#0d6efd" }}
              onClick={() => navigate("/admin/forgot-password")}
            >
              Forgot Password?
            </span>
          </div>

          {/* SIGNUP */}
          <p className="text-center mt-3">
            Don’t have an admin account?
            <span
              className="ms-1 fw-semibold"
              style={{ cursor: "pointer", color: "red" }}
              onClick={() => navigate("/admin/Signup")}
            >
              Sign Up
            </span>
          </p>

          <button className="btn btn-dark w-100">
            Admin Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;