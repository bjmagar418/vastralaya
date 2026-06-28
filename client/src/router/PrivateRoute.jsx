import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, role }) => {
    const { user } = useSelector((state) => state.auth);
    const location = useLocation();

    // 1. Authentication Check
    if (!user) {
        alert("You must be logged in!");
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // FIX: Handle arrays/strings safely and convert to lower-case
    const rawRole = user?.role || user?.user?.role;
    const currentUserRole = Array.isArray(rawRole) 
        ? rawRole[0]?.toLowerCase() 
        : rawRole?.toLowerCase();
    
    // Clean up trailing slashes for absolute matching safety
    const cleanPath = location.pathname.replace(/\/$/, "");

    // 2. Base Dashboard Redirection Logic
    if (cleanPath === "/dashboard") {
        if (currentUserRole === "admin") {
            return <Navigate to="/dashboard/admin" replace />;
        }
        if (currentUserRole === "merchant") {
            return <Navigate to="/dashboard/merchant" replace />;
        }
        
        // Regular customers land directly on the parent layout view
        return children; 
    }

    // 3. Authorization Role Check
    if (role && currentUserRole !== role.toLowerCase()) {
        alert(`You are not authorized! Required role: ${role}. Your role: ${currentUserRole}`);
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;