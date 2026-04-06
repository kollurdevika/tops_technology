import { Routes, Route } from "react-router-dom";

// Customer Pages
import Home from "./retro_cutomer/pages/Home";
import About from "./retro_cutomer/pages/About";
import Service from "./retro_cutomer/pages/Service";
import Menu from "./retro_cutomer/pages/Menu";
import Pages from "./retro_cutomer/pages/Pages";
import Contact from "./retro_cutomer/pages/Contact";
import Booking from "./retro_cutomer/pages/Booking";
import Team from "./retro_cutomer/pages/Team";
import Testing from "./retro_cutomer/pages/Testing";
import CustomerOrder from "./retro_cutomer/pages/customer_order";
import EditProfile from "./retro_cutomer/pages/ProfileEdit";

// Common
import Footer from "./retro_cutomer/components/Footer";

// Auth
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import AdminLogin from "./auth/adminLogin";

// Admin
import AdminHeader from "./admin/components/AdminHeader";
import AHome from "./admin/components/pages/AHome";
import ManageMenu from "./admin/components/pages/ManageMenu";
import Orders from "./admin/components/pages/Orders";
import Reservations from "./admin/components/pages/Reservations";
import Reports from "./admin/components/pages/Reports";
import Customers from "./admin/components/pages/Customers";
import Settings from "./admin/components/pages/Settings";
import AFooter from "./admin/components/AFooter";

// Protection
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminSignup from "./auth/AdminSignup";
import AdminProtectedRoute from "./auth/AdminProtectedRoute";
import Header from "./retro_cutomer/components/Header";

function App() {
  return (
    <Routes>

      {/* ================= PUBLIC / GUEST ROUTES ================= */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<><About /><Footer /></>} />
      <Route path="/service" element={<><Service /><Footer /></>} />
      <Route path="/menu" element={<><Menu /><Footer /></>} />
      <Route path="/pages" element={<><Pages /><Footer /></>} />
      <Route path="/contact" element={<><Contact /><Footer /></>} />
      <Route path="/team" element={<><Team /><Footer /></>} />
      <Route path="/testing" element={<><Testing /><Footer /></>} />

      {/* ================= AUTH ================= */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />



      {/* ================= PROTECTED USER ROUTES ================= */}
      <Route
        path="/customer_order"
        element={
          <ProtectedRoute>
            <CustomerOrder />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <EditProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking"
        element={
          <ProtectedRoute>
            <Booking />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin/ahome" element={<AdminProtectedRoute><AdminHeader /><AHome /><AFooter /></AdminProtectedRoute>} />
        <Route path="/admin/menu" element={<AdminProtectedRoute><AdminHeader /><ManageMenu /><AFooter /></AdminProtectedRoute>} />
        <Route path="/admin/orders" element={<AdminProtectedRoute><AdminHeader /><Orders /><AFooter /></AdminProtectedRoute>} />
        <Route path="/admin/customers" element={<AdminProtectedRoute><AdminHeader /><Customers /><AFooter /></AdminProtectedRoute>} />
        <Route path="/admin/reservations" element={<AdminProtectedRoute><AdminHeader /><Reservations /><AFooter /></AdminProtectedRoute>} />
        <Route path="/admin/reports" element={<AdminProtectedRoute><AdminHeader /><Reports /><AFooter /></AdminProtectedRoute>} />
        <Route path="/admin/settings" element={<AdminProtectedRoute><AdminHeader /><Settings /><AFooter /></AdminProtectedRoute>} />
    </Routes>
  );
}

export default App;
