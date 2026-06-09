import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
<<<<<<< HEAD
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
=======
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
  const [identifier, setIdentifier] = useState(""); // email or phone
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 const [message,setMessage] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();
 const [  loginUser,{isLoading:loginLoading}] = useLoginUserMutation();
 //console.log(loginUser);

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");


    // matches +9779812345678 format exactly
  const isPhone = /^\+?977\d{10}$/.test(identifier) || /^\d{10}$/.test(identifier);

  const data = isPhone
    ? { phone: identifier.startsWith("+977") ? identifier : `+977${identifier}`, password }
    : { email: identifier, password };

  try {
    const response = await loginUser(data).unwrap();
    const { token, ...user } = response;
    console.log("full response:", response);
    dispatch(setUser({ user }));
    navigate("/");
  } catch (error) {
    setError(error?.data?.message || "Invalid credentials");
  } finally {
    setLoading(false);
  }
};
=======

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://localhost:5005/api/auth/login",
        { email, password }
      );

      const user = res.data;

      // ✅ safety check
      if (!user || !user.token) {
        throw new Error("Invalid response from server");
      }

      // store auth data
      localStorage.setItem("token", user.token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("user", JSON.stringify(user));

      // 🚀 ROLE BASED REDIRECT
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }

    } catch (error) {
      setError(
        error.response?.data?.message ||
        error.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">

        {/* TITLE */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-zinc-900">
            Login
          </h1>
          <p className="text-zinc-500 mt-2 text-sm">
            Welcome back. Please enter your details.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-4 text-red-500 text-sm">
            {error}
          </div>
        )}

        {/* FORM */}
        <form className="space-y-5" onSubmit={handleLogin}>

<<<<<<< HEAD
       {/* USERNAME */}
<div>
  <label className="block text-sm text-zinc-700 mb-2">
    Username <span className="text-red-500">*</span>
  </label>
  <input
    type="text"
    value={identifier}
    onChange={(e) => setIdentifier(e.target.value)}
    placeholder="Email ID or Mobile Number"
    className="w-full border border-zinc-300 rounded-lg px-4 py-3 outline-none focus:border-zinc-900"
    required
  />
</div>
=======
          {/* EMAIL */}
          <div>
            <label className="block text-sm text-zinc-700 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@gmail.com"
              className="w-full border border-zinc-300 rounded-lg px-4 py-3 outline-none focus:border-zinc-900"
              required
            />
          </div>
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88

          {/* PASSWORD */}
          <div>
            <label className="block text-sm text-zinc-700 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full border border-zinc-300 rounded-lg px-4 py-3 pr-12 outline-none focus:border-zinc-900"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
<<<<<<< HEAD
            className="w-full cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-lg"
=======
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-lg"
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88
          >
            {loading ? "Logging in..." : "Sign in"}
          </button>
        </form>

        {/* SIGNUP */}
        <p className="text-sm text-zinc-500 text-center mt-8">
          Don't have an account?{" "}
          <Link to="/signup" className="text-zinc-900 hover:underline">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
}