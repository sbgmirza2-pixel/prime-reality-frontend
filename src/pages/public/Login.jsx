import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import { useDispatch } from "react-redux";

import {
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";

import {
  loginUser,
  getCurrentUser,
} from "../../services/authService";

import {
  saveAuthTokens,
  saveUserRole,
} from "../../utils/helpers/authHelper";

import { validateEmail } from "../../utils/validators/authValidator";

import { loginSuccess } from "../../store/slices/authSlice";

// login page
// backend email/password verify karega
// password visibility professional icon se handle ho rahi hai

function Login() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (error) {
      setError("");
    }
  };

  const redirectByRole = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "seller") {
      navigate("/seller");
    } else {
      navigate("/buyer");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!formData.password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const tokenData = await loginUser({
        email: formData.email.trim(),
        password: formData.password,
      });

      const {
        access_token,
        refresh_token,
      } = tokenData;

      saveAuthTokens(access_token, refresh_token);

      // login response me role nahi aa raha
      // is liye current user API se role get kar rahe hain

      const user = await getCurrentUser();

      saveUserRole(user.role);

      dispatch(
        loginSuccess({
          accessToken: access_token,
          refreshToken: refresh_token,
          role: user.role,
          user,
        })
      );

      redirectByRole(user.role);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
          "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4 pt-32 pb-16">
        <div className="bg-white rounded-[28px] shadow-xl p-8 md:p-10 w-full max-w-md">
          <h1 className="font-heading text-4xl font-bold text-[#0A1A2F] text-center mb-8">
            Login
          </h1>

          {error && (
            <p className="bg-red-50 text-[#EF4444] text-sm text-center p-3 rounded-xl mb-5">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-full px-5 py-3 outline-none focus:border-[#C9A03D]"
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter Password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-full px-5 py-3 pr-12 outline-none focus:border-[#C9A03D]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[#0A1A2F]/65 hover:text-[#0A1A2F] transition-all"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <FaEyeSlash size={17} />
                ) : (
                  <FaEye size={17} />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0A1A2F] text-white rounded-full py-3 text-xs font-bold uppercase tracking-widest hover:bg-[#C9A03D] hover:text-[#0A1A2F] transition-all disabled:opacity-60"
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>

          <p className="text-center text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-[#C9A03D] font-bold"
            >
              Register
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Login;