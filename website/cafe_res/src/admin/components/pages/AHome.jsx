import React from "react";
import AdminHeader from "../AdminHeader";
import AFooter from "../AFooter";

import { Bar, Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function AHome() {
  const stats = {
    orders: 245,
    revenue: 54000,
    profit: 18000,
    customers: 120,
    loss: 3000,
  };

  const monthlyRevenue = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Revenue (₹)",
        data: [8000, 9000, 12000, 15000, 14000, 16000],
        backgroundColor: "rgba(54, 162, 235, 0.7)",
      },
    ],
  };

  const orderTypes = {
    labels: ["Dine-in", "Delivery", "Takeaway"],
    datasets: [
      {
        data: [45, 35, 20],
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
        ],
      },
    ],
  };

  const salesGrowth = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Daily Sales (₹)",
        data: [1200, 2000, 1500, 1800, 2300, 2500, 2200],
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.3,
      },
    ],
  };

  return (
    
    <>

      <div className="container mt-4">

        <h2 className="fw-bold mb-4 text-center">Admin Dashboard</h2>

        {/* Stats Cards */}
        <div className="row g-4">
          <div className="col-lg-3 col-md-6">
            <div className="p-3 bg-primary text-white rounded shadow">
              <h4>Total Orders</h4>
              <h2>{stats.orders}</h2>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="p-3 bg-success text-white rounded shadow">
              <h4>Total Revenue</h4>
              <h2>₹{stats.revenue}</h2>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="p-3 bg-warning text-dark rounded shadow">
              <h4>Total Profit</h4>
              <h2>₹{stats.profit}</h2>
            </div>
          </div>

          <div className="col-lg-3 col-md-6">
            <div className="p-3 bg-danger text-white rounded shadow">
              <h4>Total Loss</h4>
              <h2>₹{stats.loss}</h2>
            </div>
          </div>
        </div>

        {/* Graph Section */}
        <div className="row mt-5 g-4">
          <div className="col-lg-6">
            <div className="p-3 shadow rounded bg-white">
              <h5 className="text-center">Monthly Revenue</h5>
              <Bar data={monthlyRevenue} />
            </div>
          </div>

          <div className="col-lg-6">
            <div className="p-3 shadow rounded bg-white">
              <h5 className="text-center">Order Types</h5>
              <Pie data={orderTypes} />
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col-lg-12">
            <div className="p-3 shadow rounded bg-white">
              <h5 className="text-center">Weekly Sales Growth</h5>
              <Line data={salesGrowth} />
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default AHome;
