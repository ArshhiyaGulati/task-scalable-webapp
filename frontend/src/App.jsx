import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Context
import { AuthProvider } from "./context/AuthContext.jsx";

// Auth pages
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import PrivateRoute from "./components/auth/PrivateRoute.jsx";

// Dashboard pages
import Dashboard from "./components/dashboard/Dashboard.jsx";
import Profile from "./components/dashboard/Profile.jsx";

// Common components
import Navbar from "./components/common/Navbar.jsx";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
