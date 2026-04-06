import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

function EditProfile() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setProfileImage] = useState("");

  // ================= FETCH USER =================
  useEffect(() => {
    axios
      .get(`http://localhost:3001/users/${userId}`)
      .then(res => {
        const user = res.data;
        setName(user.name || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");
        setProfileImage(user.profileImage || "");
      })
      .catch(() => toast.error("Failed to load profile"));
  }, [userId]);

  // ================= IMAGE UPLOAD =================
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select a valid image");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => setProfileImage(reader.result);
    reader.readAsDataURL(file);
  };

  // ================= UPDATE PROFILE =================
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name || !email || !phone) {
      toast.error("All fields are required");
      return;
    }

    if (phone.length !== 10) {
      toast.error("Phone number must be 10 digits");
      return;
    }

    try {
      await axios.patch(`http://localhost:3001/users/${userId}`, {
        name,
        email,
        phone,
        profileImage
      });

      localStorage.setItem("userName", name);
      localStorage.setItem("profileImage", profileImage);

      toast.success("Profile updated successfully");
      setTimeout(() => navigate("/"), 1500);
    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f4f7fa, #e9eff5)"
      }}
    >
      <ToastContainer position="top-right" />

      <div
        className="card shadow border-0"
        style={{ width: "430px", borderRadius: "14px" }}
      >
        {/* HEADER */}
        <div
          className="text-center py-4"
          style={{
            background: "#198754",
            color: "#fff",
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px"
          }}
        >
          <h4 className="mb-1">Edit Profile</h4>
          <small className="opacity-75">Manage your personal information</small>
        </div>

        <div className="p-4">
          {/* PROFILE IMAGE */}
          <div className="text-center mb-4">
            <label htmlFor="profileImage" style={{ cursor: "pointer" }}>
              <img
                src={
                  profileImage ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="Profile"
                className="rounded-circle"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  border: "4px solid #198754",
                  transition: "0.3s"
                }}
              />
            </label>

            <input
              type="file"
              id="profileImage"
              hidden
              accept="image/*"
              onChange={handleImageUpload}
            />

            <p className="text-muted mt-2" style={{ fontSize: "13px" }}>
              Click photo to change
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                className="form-control"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label fw-semibold">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                maxLength={10}
                value={phone}
                onChange={e =>
                  setPhone(e.target.value.replace(/\D/g, ""))
                }
              />
            </div>

            <button
              className="btn btn-success w-100 py-2 fw-semibold"
              style={{ transition: "0.3s" }}
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
