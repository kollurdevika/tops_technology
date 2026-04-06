import axios from "axios";
import React, { useEffect, useState } from "react";

function AdminSettings() {
  const [adminProfile, setAdminProfile] = useState(null);
  const [settings, setSettings] = useState(null);
    const [isEditing, setIsEditing] = useState(false);


  const adminId = localStorage.getItem("userId");

  useEffect(() => {
    fetchAdminProfile();
    fetchSettings();
  }, []);

  // ================= ADMIN PROFILE =================
  const fetchAdminProfile = async () => {
    try {
      const res = await axios.get(
        `https://restrodev-3a326-default-rtdb.firebaseio.com/admins/${adminId}.json`
      );

      if (res.data) {
        setAdminProfile(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ================= SETTINGS =================
  const fetchSettings = async () => {
    try {
      const res = await axios.get(
        `https://restrodev-3a326-default-rtdb.firebaseio.com/adminSettings/${adminId}.json`
      );

      if (res.data) {
        setSettings(res.data);
      } else {
        setSettings({
          restaurantName: "",
          address: "",
          openTime: "",
          closeTime: "",
          onlineBooking: true,
          bookingEnabled: true,
          maxBookingsPerDay: 20,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;


    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  // ================= SAVE =================
  const handleSave = async () => {
    try {
      await axios.put(
        `https://restrodev-3a326-default-rtdb.firebaseio.com/adminSettings/${adminId}.json`,
        settings
      );

      alert("✅ Settings saved successfully");
      setIsEditing(false); // 🔥 exit edit mode
    } catch (error) {
      console.error(error);
      alert("❌ Error saving settings");
    }
  };

  if (!adminProfile || !settings)
    return <p className="text-center mt-5">Loading...</p>;

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0">

        <div className="card-header bg-dark text-white text-center">
          <h3>⚙ Admin Settings</h3>
        </div>

        <div className="card-body">

          {/* ================= ADMIN PROFILE ================= */}
          <h5 className="mb-3 text-primary">👤 Admin Profile</h5>
          <div className="row mb-4">
            <div className="col-md-4">
              <label>Name</label>
              <input className="form-control" value={adminProfile.name} disabled />
            </div>

            <div className="col-md-4">
              <label>Email</label>
              <input className="form-control" value={adminProfile.email} disabled />
            </div>

            <div className="col-md-4">
              <label>Phone</label>
              <input className="form-control" value={adminProfile.phone} disabled />
            </div>
          </div>

          {/* ================= RESTAURANT SETTINGS ================= */}
          <h5 className="mb-3 text-primary">🏪 Restaurant Details</h5>
          <div className="row mb-4">
            <div className="col-md-6">
              <label>Restaurant Name</label>
              <input
                className="form-control"
                name="restaurantName"
                value={settings.restaurantName}
                onChange={handleChange}
                disabled={!isEditing}

              />
            </div>

            <div className="col-md-6">
              <label>Address</label>
              <input
                className="form-control"
                name="address"
                value={settings.address}
                onChange={handleChange}
                disabled={!isEditing}

              />
            </div>
          </div>

          {/* ================= TIMING ================= */}
          <h5 className="mb-3 text-primary">⏰ Timing</h5>
          <div className="row mb-4">
            <div className="col-md-6">
              <label>Opening Time</label>
              <input
                type="time"
                className="form-control"
                name="openTime"
                value={settings.openTime}
                onChange={handleChange}
                disabled={!isEditing}

              />
            </div>

            <div className="col-md-6">
              <label>Closing Time</label>
              <input
                type="time"
                className="form-control"
                name="closeTime"
                value={settings.closeTime}
                onChange={handleChange}
                disabled={!isEditing}

              />
            </div>
          </div>

          {/* ================= ONLINE BOOKING ================= */}
          <h5 className="mb-3 text-primary">📅 Booking Settings</h5>

          <div className="form-check mb-3">
            <input
              type="checkbox"
              className="form-check-input"
              name="bookingEnabled"
              checked={settings.bookingEnabled}
              onChange={handleChange}
              disabled={!isEditing}
            />
            <label className="form-check-label">
              Enable Booking
            </label>
          </div>
          <div className="mb-4">
            <label>Max Bookings Per Day</label>
            <input
              type="number"
              className="form-control"
              name="maxBookingsPerDay"
              value={settings.maxBookingsPerDay}
              onChange={handleChange}
              disabled={!isEditing}
            />

          {/* SAVE BUTTON */}
          <div className="text-center">

            {!isEditing ? (
              <button
                className="btn btn-primary px-5"
                onClick={() => setIsEditing(true)}
              >
                ✏️ Edit Settings
              </button>
            ) : (
              <>
                <button
                  className="btn btn-success px-4 me-2"
                  onClick={handleSave}
                >
                  💾 Save
                </button>

                <button
                  className="btn btn-secondary px-4"
                  onClick={() => {
                    setIsEditing(false);
                    fetchSettings(); // 🔥 reload old data
                  }}
                >
                  ❌ Cancel
                </button>
              </>
            )}

          </div>

        </div>
      </div>
    </div>
    </div>
  );
  
}

export default AdminSettings;