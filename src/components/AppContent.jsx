import React from 'react';
import {  Routes, Route, useLocation } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Dashboard from './Dashboard';
import Login from './Login';
import Navbar from './Navbar';
import Register from './Register';
import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute component



export function AppContent() {
    const location = useLocation();
  
    return (
      <>
        {/* Conditionally render Navbar only if the current route is not "/dashboard" */}
        {location.pathname !== '/dashboard' && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
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
        </Routes>
      </>
    );
  }