import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useLogoutUserMutation } from '../../redux/features/auth/authApi.js'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/features/auth/authSlice.js'

// Merchant-specific routing workspace
const merchantNavItems = [
    { path: '/dashboard/merchant', label: ' Dashboard' },
    { path: '/dashboard/merchant/add-new-product', label: 'Add Product' },
    { path: '/dashboard/merchant/manage-product', label: 'Manage Products' },
        { path: '/dashboard/merchant/users', label: 'Manage Users' },
    { path: 'merchant/manage-orders', label: 'Manage Orders' },
]

const MerchantDashboard = () => {
    const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logoutUser().unwrap();
            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <div className='space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between'>
            <div>
                <div className=''>
                    <Link to="/">Vastralaya<span>.</span></Link>
                    <p className='text-xs italic font-medium text-indigo-600'>Merchant Workspace</p>
                </div>
                <hr className='mt-5' />
                
                <ul className='space-y-5 pt-5'>
                    {
                        merchantNavItems.map((item) => (
                            <li key={item.path}>
                                <NavLink 
                                    className={({ isActive }) => 
                                        isActive 
                                            ? "text-indigo-600 font-bold border-l-2 border-indigo-600 pl-2 transition-all" 
                                            : "text-slate-700 hover:text-indigo-500 pl-2 transition-all"
                                    } 
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
                <hr className='mb-3' />
                <button 
                    onClick={handleLogout}
                    className='text-white bg-red-500 hover:bg-red-600 transition-colors font-medium px-5 py-1.5 rounded-sm w-full md:w-auto text-center'
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default MerchantDashboard;