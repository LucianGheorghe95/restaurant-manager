import React from "react";
import { Route, Routes, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Restaurants from "./pages/Restaurants.jsx";
import RestaurantDetails from "./pages/RestaurantDetails.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <div>
      <div style={{ borderBottom: "1px solid #22304d", background: "#0d1424" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Link to="/" style={{ fontWeight: 900 }}>Restaurant Manager</Link>
          <div style={{ opacity: 0.8, fontSize: 12 }}>Administrare</div>
        </div>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/restaurants" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/restaurants" element={
          <ProtectedRoute>
            <Restaurants />
          </ProtectedRoute>
        } />

        <Route path="/restaurants/:id" element={
          <ProtectedRoute>
            <RestaurantDetails />
          </ProtectedRoute>
        } />

        <Route path="*" element={<div className="container">Pagina inexistenta</div>} />
      </Routes>
    </div>
  );
}
