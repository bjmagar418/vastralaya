import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useLogoutUserMutation  } from "../../redux/features/auth/authApi.js";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice.js";

const navItems = [
  { path: "/dashboard", label: "Dashboard" },
  { path: "/dashboard/orders", label: "Orders" },
  { path: "/dashboard/payments", label: "Payments" },
  { path: "/dashboard/profile", label: "Profile" },
  { path: "/dashboard/reviews", label: "Reviews" },
];
const UserDashboard = () => {
     const [logoutUser] = useLogoutUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

  // const handleLogout = async () => {
  //   try {
  //     await logoutUser().unwrap();
  //     alert("Logout successfully");
  //     dispatch(logout());
  //         navigate("/");
  //   } catch (error) {
  //     console.error("Faile to logout", error);
  //   }

  // };

  const handleLogout = async () => {
  try {
    // Try to tell the backend to clear the session/cookie
    await logoutUser().unwrap();
    alert("Logout successfully");
  } catch (error) {
    // If the server rejects it (like your 400 error), we log it,
    // but we don't block the user from logging out locally!
    console.error("Backend logout failed:", error);
  } finally {
    // This 'finally' block ALWAYS runs, ensuring the client-side 
    // state is cleared and the user is redirected.
    dispatch(logout());
    navigate("/");
  }
};
  return (
    <div className="space-y-5  bg-white p-8 md:h-screen flex flex-col justify-between">
      <div >
        <div className=" ">
          <Link to={'/'}>
            Vastralaya<span></span>
          </Link>
          <p className="text-xs italic font-medium text-indigo-600">User Workspace</p>
        </div>
        <hr className="mt-5" />
        <ul className="space-y-5 ">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-indigo-600 font-bold border-l-2 border-indigo-600 pl-2 transition-all" : "text-slate-700 hover:text-indigo-500 pl-2 transition-all"
                }
                end //help to stop default selected path
                to={item.path}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-3">
        <hr className="mb-3" />
        <button
          onClick={handleLogout}
          className="text-white bg-red-500 font-medium px-5 py-1 rounded-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;