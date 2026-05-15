import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-zinc-900">Login</h1>
          <p className="text-zinc-500 mt-2 text-sm">
            Welcome back. Please enter your details.
          </p>
        </div>

        <form className="space-y-5">
          
          <div>
            <label className="block text-sm text-zinc-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="johncena@gmail.com"
              className="w-full border border-zinc-300 rounded-lg px-4 py-3 outline-none focus:border-zinc-900 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-700 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full border border-zinc-300 rounded-lg px-4 py-3 pr-12 outline-none focus:border-zinc-900 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-zinc-600">
              <input type="checkbox" />
              Remember me
            </label>

            <a href="#" className="text-zinc-900">
              Forgot password?
            </a>
          </div>

          <button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-lg transition">
            Sign in
          </button>
        </form>

        <p className="text-sm text-zinc-500 text-center mt-8">
          Don't have an account?{" "}
          <Link to="/signup" className="text-zinc-900 cursor-pointer hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}