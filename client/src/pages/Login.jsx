import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const res = await axios.post("http://localhost:5005/api/auth/login", {
        email,
        password,
      });

      // ✅ FIXED: backend sends user directly (NOT res.data.user)
      const user = res.data;

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
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

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
              className="w-full border border-zinc-300 rounded-lg px-4 py-3 outline-none focus:border-zinc-900 transition"
              required
            />
          </div>

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
                className="w-full border border-zinc-300 rounded-lg px-4 py-3 pr-12 outline-none focus:border-zinc-900 transition"
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

          {/* OPTIONS */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-zinc-600">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#" className="text-zinc-900">
              Forgot password?
            </a>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-lg transition"
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