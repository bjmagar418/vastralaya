import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await axios.post("http://localhost:5005/api/auth/register", {
        name,
        email,
        password,
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-zinc-900">Create account</h1>
          <p className="text-sm text-zinc-500 mt-2">Enter your details to get started.</p>
        </div>

        {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

        <form onSubmit={handleSignup} className="space-y-5">
          {/* NAME */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full border px-4 py-3 rounded-lg"
            required
          />

          {/* EMAIL */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border px-4 py-3 rounded-lg"
            required
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border px-4 py-3 pr-12 rounded-lg"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setError(""); // clear error while retyping
              }}
              placeholder="Confirm Password"
              className={`w-full border px-4 py-3 pr-12 rounded-lg ${
                confirmPassword && password !== confirmPassword
                  ? "border-red-400 focus:outline-red-400"
                  : confirmPassword && password === confirmPassword
                  ? "border-green-400 focus:outline-green-400"
                  : ""
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {/* Inline match feedback */}
            {confirmPassword && (
              <p className={`text-xs mt-1 ${password === confirmPassword ? "text-green-500" : "text-red-500"}`}>
                {password === confirmPassword ? "Passwords match" : "Passwords do not match"}
              </p>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Already have account?{" "}
          <span onClick={() => navigate("/login")} className="cursor-pointer underline">
            Login
          </span>
        </p>
      </div>
    </div>
  );
}