import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
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
            // 🔥 GET USERS FROM FIREBASE
            const res = await axios.get(
                "https://restrodev-3a326-default-rtdb.firebaseio.com/customers.json"
            );

            const data = res.data;

            // 🔥 CHECK EMAIL EXISTS
            if (data) {
                const usersArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));

                const emailExists = usersArray.find(
                    user => user.email === formData.email
                );

                if (emailExists) {
                    toast.error("Email already exists");
                    return;
                }
            }

            // 🔥 CREATE USER
            const newUser = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
                role: "customer",   // ✅ FIXED
                status: "Active",
                joined: new Date().toISOString().split("T")[0],
            };

            // 🔥 SAVE TO FIREBASE
            const response = await axios.post(
                "https://restrodev-3a326-default-rtdb.firebaseio.com/customers.json",
                newUser
            );

            console.log("Saved:", response.data);

            toast.success("Account created successfully!");

            setFormData({
                name: "",
                email: "",
                password: "",
                phone: "",
                role: "customer",
            });

            // ✅ ROLE BASED REDIRECT
            setTimeout(() => {
                    navigate("/login");
            }, 1500);

        } catch (error) {
            console.error(error);
            toast.error("Signup failed");
        }
    };
    return (
        <div
            className="container d-flex justify-content-center align-items-center"
            style={{ minHeight: "100vh" }}
        >
            <ToastContainer position="top-right" />

            <div className="card shadow p-4" style={{ width: "380px" }}>
                {/* LOGO */}
                <div className="text-center mb-4">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
                        alt="Restaurant Logo"
                        width="70"
                    />
                    <h4 className="mt-2 fw-bold">🍽 Foodie Hub</h4>
                    <p className="text-muted">Create your delicious journey</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleSignup}>
                    <input
                        className="form-control mb-3"
                        name="name"
                        placeholder="Full Name"
                        onChange={handleChange}
                    />



                    <input
                        type="email"
                        className="form-control mb-3"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />

                    <input
                        className="form-control mb-3"
                        name="phone"
                        placeholder="Phone Number"
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        className="form-control mb-3"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                    />

                    <button className="btn btn-danger w-100 fw-bold">
                        Create Account
                    </button>
                </form>

                {/* LOGIN LINK */}
                <p className="text-center mt-3">
                    Already have an account?
                    <span
                        className="text-danger ms-1 fw-semibold"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/login")}
                    >
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Signup;
