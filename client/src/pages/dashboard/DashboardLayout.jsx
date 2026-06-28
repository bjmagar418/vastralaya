import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'
import UserDashboard from '../dashboard/UserDashboard';
import AdminDashboard from './AdminDashboard';
import MerchantDashboard from './MerchantDashboard';

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
  
  if (!user) {
    return <Navigate to="/login" replace />
  }

  const renderDashboard = () => {
    // 1. Ensure user.role exists and convert it safely
    let userRoles = [];
    if (Array.isArray(user?.role)) {
      userRoles = user.role.map(r => String(r).toLowerCase());
    } else if (typeof user?.role === 'string') {
      userRoles = [user.role.toLowerCase()];
    }

    // 2. Check array inclusions for access control
    if (userRoles.includes('admin')) {
      return <AdminDashboard/>;
    }
    if (userRoles.includes('merchant')) {
      return <MerchantDashboard/>;
    }
    if (userRoles.includes('customer') || userRoles.includes('user')) {
      return <UserDashboard/>;
    }

    // Fallback if no matching role is detected
    console.log("No valid roles found in:", user?.role);
    return <Navigate to='/login' replace />
  }

  return (
    <div className='container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start '>
       <header className='lg:w-1/5 sm:w-2/5 w-full shadow-xl'>{renderDashboard()}</header> 
       <main className='p-8 bg-white w-full shadow-xl mt-5'>
          <Outlet/>
       </main>
    </div>
  )
}

export default DashboardLayout