import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoLockClosedOutline, IoMailOutline } from "react-icons/io5";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";
// import { useNavigate } from "react-router-dom";

const Login = ({ onRegister }) => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email: data.email,
        password: data.password,
      });

      // Dispatch to Redux
      dispatch(
        loginSuccess({
          user: res.data.user,
          token: res.data.token,
        }),
      );

      // Optional: Navigate to chat page
      // navigate("/chat");

      reset();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          w-80 md:w-96 flex flex-col
          bg-[var(--bg-main)] 
          p-6 rounded-xl 
          border border-[var(--border-light)]/50
        "
        noValidate
      >
        <h2 className="text-3xl font-medium text-[var(--text-main)] font-heading">
          Sign <span className="text-[var(--accent-primary)]">In</span>
        </h2>

        <p className="text-sm text-[var(--text-secondary)] mt-2">
          Welcome back! Please login
        </p>

        {/* Google Button */}
        <button
          type="button"
          className="
            w-full mt-6 h-11 rounded-full
            flex items-center justify-center gap-2
            bg-[var(--bg-main)]
            border border-[var(--border-light)]
            hover:bg-[var(--bg-tertiary)]
            transition-[var(--transition-fast)]
          "
        >
          <FcGoogle className="text-xl" />
          <span className="text-sm font-medium text-[var(--text-main)]">
            Continue with Google
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-[var(--border-light)]" />
          <p className="text-xs text-[var(--text-muted)]">
            or login with email
          </p>
          <div className="flex-1 h-px bg-[var(--border-light)]" />
        </div>

        {/* Email Field */}
        <div className="flex items-center gap-2 h-11 px-4 rounded-full border border-[var(--border-light)] focus-within:border-[var(--accent-primary)] transition-[var(--transition-fast)]">
          <IoMailOutline className="text-[var(--text-muted)] text-lg" />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-transparent outline-none text-sm text-[var(--text-main)] placeholder-[var(--text-muted)]"
            {...register("email", {
              required: "Email is required",
            })}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-[var(--error)] mt-1 pl-4">
            {errors.email.message}
          </p>
        )}

        {/* Password Field */}
        <div className="flex items-center gap-2 h-11 px-4 rounded-full mt-4 border border-[var(--border-light)] focus-within:border-[var(--accent-primary)] transition-[var(--transition-fast)]">
          <IoLockClosedOutline className="text-[var(--text-muted)] text-lg" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full bg-transparent outline-none text-sm text-[var(--text-main)] placeholder-[var(--text-muted)]"
            {...register("password", {
              required: "Password is required",
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-[var(--error)] mt-1 pl-4">
            {errors.password.message}
          </p>
        )}

        {/* Remember Me */}
        <div className="flex items-center justify-between mt-5 text-sm">
          <label className="flex items-center gap-2 cursor-pointer text-[var(--text-secondary)]">
            <input
              type="checkbox"
              className="accent-[var(--accent-primary)] h-4 w-4"
              {...register("rememberMe")}
            />
            Remember me
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="
            mt-6 h-11 rounded-full 
            bg-[var(--accent-primary)] 
            text-white font-medium 
            hover:bg-[var(--accent-hover)] 
            transition-[var(--transition-base)]
            shadow-[var(--shadow-sm)]
            disabled:opacity-70
          "
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>

        {/* Register link */}
        <p className="text-sm text-center mt-5 text-[var(--text-secondary)]">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={onRegister}
            className="text-[var(--accent-primary)] font-medium hover:underline"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
