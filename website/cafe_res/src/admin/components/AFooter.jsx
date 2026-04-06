import React from "react";

function AFooter() {
  return (
    <footer
      style={{
        background: "#1f1f1f",
        color: "#fff",
        padding: "20px 0",
        marginTop: "40px",
        borderTop: "1px solid #333",
      }}
    >
      <div
        style={{
          width: "90%",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          textAlign: "center",
        }}
      >
        {/* Left */}
        <div style={{ fontSize: "14px" }}>
          © {new Date().getFullYear()} <b>Restro Admin Panel</b>. All Rights Reserved.
        </div>

        {/* Middle Links */}
        <div style={{ display: "flex", gap: "20px", fontSize: "14px" }}>
          <a href="#" style={{ color: "#bbb", textDecoration: "none" }}>
            Terms & Conditions
          </a>
          <a href="#" style={{ color: "#bbb", textDecoration: "none" }}>
            Privacy Policy
          </a>
          <a href="#" style={{ color: "#bbb", textDecoration: "none" }}>
            Help
          </a>
        </div>

        {/* Right */}
        <div style={{ fontSize: "14px" }}>
          Designed & Developed by <b>Restro Team</b>
        </div>
      </div>
    </footer>
  );
}

export default AFooter;
