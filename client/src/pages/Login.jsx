
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState(""); // Holds email or phone number
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Matches standard Nepal phone formats (+977...) or local 10-digit variants
    const isPhone = /^\+?977\d{10}$/.test(identifier.trim()) || /^\d{10}$/.test(identifier.trim());

    // Clean up input value and format payload conditionally
    const cleanedIdentifier = identifier.trim();
    const data = isPhone
      ? { phone: cleanedIdentifier.startsWith("+977") ? cleanedIdentifier : `+977${cleanedIdentifier}`, password }
      : { email: cleanedIdentifier, password };

    try {
      const response = await loginUser(data).unwrap();
      
      if (!response) {
        throw new Error("Invalid response from server");
      }

      // Destructure token and the remaining user object
      const { token, ...user } = response;

      // Update local Redux storage state (Passing token along is recommended if your slice needs it)
      dispatch(setUser({ user, token }));

      const userRole = user?.role || user?.user?.role;
      // Role-based routing system navigation redirect paths
  
      if (userRole === "admin") {
  navigate("/dashboard/admin");
} else if (userRole === "merchant") {
  navigate("/dashboard/merchant");
} else {
  navigate("/dashboard");
}
    } catch (err) {
      setError(err?.data?.message || err?.message || "Invalid credentials");
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-start bg-white px-4 pt-24 pb-12">
      <div className="w-full max-w-md">

        {/* TITLE */}
        <div className="mb-8 text-left">
          <h1 className="text-4xl font-medium tracking-tight text-zinc-900">
            Login
          </h1>
          <p className="text-zinc-500 mt-2 text-sm font-normal">
            Welcome back. Please enter your details.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 text-red-500 text-sm font-medium">
            {error}
          </div>
        )}

        {/* FORM */}
        <form className="space-y-6" onSubmit={handleLogin}>

          {/* SINGLE IDENTIFIER INPUT (EMAIL OR PHONE) */}
          <div>
            <label className="block text-sm text-zinc-600 mb-2 font-normal">
              Email or Phone Number
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="john@gmail.com or 98XXXXXXXX"
              className="w-full border border-zinc-200 rounded-xl px-4 py-3.5 text-zinc-800 placeholder-zinc-400 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all duration-200"
              required
            />
          </div>

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-zinc-600 mb-2 font-normal">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-zinc-200 rounded-xl px-4 py-3.5 pr-12 text-zinc-800 placeholder-zinc-400 outline-none focus:border-zinc-400 focus:ring-1 focus:ring-zinc-400 transition-all duration-200"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors duration-150"
              >
                {showPassword ? <EyeOff size={20} className="stroke-[1.75]" /> : <Eye size={20} className="stroke-[1.75]" />}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3.5 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm text-base"
            >
              {loginLoading ? "Logging in..." : "Sign in"}
            </button>
          </div>
        </form>

        {/* SIGNUP LINK */}
        <p className="text-sm text-zinc-500 text-center mt-10 font-normal">
          Don't have an account?{" "}
          <Link to="/signup" className="text-zinc-900 font-medium hover:underline ml-1">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;