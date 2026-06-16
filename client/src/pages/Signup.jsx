import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  // Fixed missing state variable causing an undefined crash
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("+977");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (!value.startsWith("+977")) return;
    if (value.length > 14) return;
    setPhone(value);
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const data = {
      name,
      email,
      password,
      phone,
      address: {
        city,
      },
    };

    try {
      setError("");
      // Using RTK Query mutation cleanly without overlapping catch logic blocks
      await registerUser(data).unwrap();
      alert("Registration successful");
      navigate("/login");
    } catch (err) {
      setError(err?.data?.message || err?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-zinc-900">Create account</h1>
          <p className="text-sm text-zinc-500 mt-2">Enter your details to get started.</p>
        </div>

        {error && (
          <div className="mb-4 text-red-500 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          {/* NAME */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full border px-4 py-3 rounded-lg focus:outline-zinc-400"
            required
          />

          {/* EMAIL */}
          <input
            type="type"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border px-4 py-3 rounded-lg focus:outline-zinc-400"
            required
          />

          {/* PHONE */}
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="+977XXXXXXXXXX"
            className="w-full border px-4 py-3 rounded-lg focus:outline-zinc-400"
            required
          />

          {/* CITY */}
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className="w-full border px-4 py-3 rounded-lg focus:outline-zinc-400"
            required
          />

          {/* PASSWORD */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border px-4 py-3 pr-12 rounded-lg focus:outline-zinc-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
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
                setError("");
              }}
              placeholder="Confirm Password"
              className={`w-full border px-4 py-3 pr-12 rounded-lg ${
                confirmPassword && password !== confirmPassword
                  ? "border-red-400 focus:outline-red-400"
                  : confirmPassword && password === confirmPassword
                  ? "border-green-400 focus:outline-green-400"
                  : "focus:outline-zinc-400"
              }`}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {confirmPassword && (
              <p className={`text-xs mt-1 ${password === confirmPassword ? "text-green-500" : "text-red-500"}`}>
                {password === confirmPassword ? "Passwords match" : "Passwords do not match"}
              </p>
            )}
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer bg-black text-white py-3 rounded-lg disabled:opacity-60 transition duration-200 hover:bg-zinc-800"
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-zinc-600">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")} className="cursor-pointer underline text-black font-medium">
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;