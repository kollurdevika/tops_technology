import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// ✅ Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// ✅ Monthly Revenue Data
const monthlyRevenueData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Monthly Revenue (₹)",
      data: [8000, 9000, 12000, 15000, 14000, 16000],
      backgroundColor: "rgba(54, 162, 235, 0.7)",
      borderRadius: 6,
    },
  ],
};

// ✅ Chart Options (makes it look professional)
const options = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "top",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

function Reports() {
  return (
    <div className="container my-4">
      <h2 className="fw-bold mb-4">📊 Reports & Analytics</h2>

      {/* STATS CARDS */}
      <div className="row g-4">
        <div className="col-md-4">
          <div className="card shadow-lg p-4 text-center">
            <h4>Total Revenue</h4>
            <h2 className="text-success fw-bold">₹ 2,45,600</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-lg p-4 text-center">
            <h4>Total Orders</h4>
            <h2 className="fw-bold">1,230</h2>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-lg p-4 text-center">
            <h4>Reservations</h4>
            <h2 className="fw-bold">420</h2>
          </div>
        </div>
      </div>

      {/* CHART */}
      <div className="card shadow-lg mt-4 p-4">
        <h4 className="fw-bold mb-3">📈 Monthly Sales Chart</h4>

        <Bar data={monthlyRevenueData} options={options} />
      </div>
    </div>
  );
}

export default Reports;