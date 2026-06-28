import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLoginUserMutation, useLogoutUserMutation } from '../../redux/features/auth/authApi.js'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/features/auth/authSlice.js'
const navItems = [
    { path: '/dashboard/admin', label: 'Dashboard' },
    { path: '/dashboard/admin/add-product', label: 'Add Product'  },
    { path: '/dashboard/admin/manage-product', label: 'Manage Products' },
    { path: '/dashboard/admin/users', label: 'Manage Users'  },
    { path: '/dashboard/admin/manage-orders', label: 'Manage Orders'  },
]
const AdminDashboard = () => {
        const [logoutUser] = useLogoutUserMutation();
        const dispatch = useDispatch();
        const navigate = useNavigate()
    
        
    
        const handleLogout = async () => {
            try {
                await logoutUser().unwrap();
                dispatch(logout())
                navigate('/')
            } catch (error) {
                console.error("Failed to log out", error)
            }
            
        }
  return (
         <div className='space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between'>
                <div>
                    <div className='nav__logo'>
                        <Link to="/">Vastralaya<span>.</span></Link>
                        <p className='text-xs italic font-medium text-indigo-600'>Admin Workspace</p>
                    </div>
                    <hr className='mt-5' />
                    <ul className='space-y-5 pt-5'>
                        {
                            navItems.map((item) =>(
                                <li key={item.path}>
                                    <NavLink 
                                    className={
                                        ({isActive}) => isActive ? "text-indigo-600 font-bold border-l-2 border-indigo-600 pl-2 transition-all" : 'text-slate-700 hover:text-indigo-500 pl-2 transition-all'} 
                                    end
                                    to={item.path}
                                    >
                                        {item.label}
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                </div>
    
                <div className='mb-3'>
                    <hr  className='mb-3'/>
                    <button 
                    onClick={handleLogout}
                    className='text-white bg-red-500 font-medium px-5 py-1 rounded-sm'>Logout</button>
                </div>
            </div>
  )
}

export default AdminDashboard