import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
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

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const data = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      phone,
      address: {
        city: city?.trim() || "Kathmandu",
      },
    };

    try {
      console.log("Sending signup data:", data);

      const res = await registerUser(data).unwrap();

      console.log("Signup success:", res);

      alert(res?.message || "Registration successful");

      navigate("/login");
    } catch (err) {
      console.log("FULL ERROR:", err);

      // Zod validation errors come as: { success:false, errors:[{field,message}] }
      const serverErrors = err?.data?.errors;
      const serverMessage = err?.data?.message || err?.data?.error;

      if (Array.isArray(serverErrors) && serverErrors.length > 0) {
        const readable = serverErrors
          .map((e) => e?.message)
          .filter(Boolean)
          .join(" ");
        setError(readable || serverMessage || "Signup failed. Please try again.");
        return;
      }

      setError(serverMessage || err?.message || "Signup failed. Please try again.");
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-semibold">Create account</h1>
        <p className="text-sm text-gray-500 mt-2">
          Enter your details to get started.
        </p>

        {error && (
          <div className="mb-4 text-red-500 text-sm font-medium">{error}</div>
        )}

        <form onSubmit={handleSignup} className="space-y-5 mt-6">
          {/* NAME */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            className="w-full border px-4 py-3 rounded-lg"
            required
          />

          {/* EMAIL (FIXED type) */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border px-4 py-3 rounded-lg"
            required
          />

          {/* PHONE */}
          <input
            type="tel"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="+977XXXXXXXXXX"
            className="w-full border px-4 py-3 rounded-lg"
            required
          />

          {/* CITY */}
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
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
                setError("");
              }}
              placeholder="Confirm Password"
              className="w-full border px-4 py-3 pr-12 rounded-lg"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>

            {confirmPassword && (
              <p
                className={`text-xs mt-1 ${
                  password === confirmPassword
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {password === confirmPassword
                  ? "Passwords match"
                  : "Passwords do not match"}
              </p>
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            {isLoading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
