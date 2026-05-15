import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-zinc-900">
            Create account
          </h1>

          <p className="text-sm text-zinc-500 mt-2">
            Enter your details to get started.
          </p>
        </div>

        <form className="space-y-5">
          
          <div>
            <label className="block text-sm text-zinc-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              placeholder="John Doe"
              className="w-full border border-zinc-300 rounded-lg px-4 py-3 outline-none focus:border-zinc-900 transition"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
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
                placeholder="Create a password"
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

          <button className="w-full bg-zinc-900 hover:bg-zinc-800 text-white py-3 rounded-lg transition">
            Create Account
          </button>
        </form>

        <p className="text-sm text-zinc-500 text-center mt-8">
          Already have an account?{" "}
          <span className="text-zinc-900 cursor-pointer">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}