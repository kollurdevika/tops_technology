import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ BLOCK LOGIN PAGE IF ALREADY LOGGED IN
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn")) {
      navigate("/");
    }
  }, [navigate]);

 const handleLogin = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    toast.error("Please fill all fields");
    return;
  }

  try {
    // 🔥 GET USERS
    const res = await axios.get(
      "https://restrodev-3a326-default-rtdb.firebaseio.com/customers.json"
    );

    const data = res.data;

    if (!data) {
      toast.error("No users found");
      return;
    }

    // 🔥 Convert to array
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

    // 🚫 BLOCK ADMIN
    if (user.role === "admin") {
      toast.error("Admin login not allowed here");
      return;
    }

    // ✅ SAVE LOGIN LOG (NOW CORRECT)
    await axios.post(
      "https://restrodev-3a326-default-rtdb.firebaseio.com/logincustomer.json",
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
      navigate("/");
    }, 1200);

  } catch (error) {
    console.error(error);
    toast.error("Server error. Try again!");
  }
};

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <ToastContainer position="top-right" />

      <div className="card shadow p-4" style={{ width: "380px" }}>
        <div className="text-center mb-3">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
            alt="Restaurant Logo"
            width="60"
          />
          <h4 className="mt-2 fw-bold">🍽 Restoran</h4>
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn btn-primary w-100">
            Login
          </button>
        </form>

        <div className="text-end mt-2">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>

        <p className="text-center mt-3">
          Don’t have an account?
          <Link to="/signup" className="ms-1 text-danger fw-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
