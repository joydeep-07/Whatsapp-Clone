import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoLockClosedOutline, IoMailOutline } from "react-icons/io5";

const Login = ({ onRegister }) => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data) => {
    console.log("Login Data 👉", data);
    reset();
  };

  return (
    <div className="w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-80 md:w-96 flex flex-col bg-[var(--wa-bg-secondary)] p-6 rounded-xl border border-[var(--wa-border)]"
        noValidate
      >
        <h2 className="text-3xl font-medium text-[var(--wa-text-main)]">
          Sign <span className="text-[var(--wa-accent)]">In</span>
        </h2>

        <p className="text-sm text-[var(--wa-text-secondary)] mt-2">
          Welcome back! Please login
        </p>

        {/* Google Button (UI only) */}
        <button
          type="button"
          className="
            w-full mt-6 h-11 rounded-full
            flex items-center justify-center
            bg-[var(--wa-bg-secondary)]
            border border-[var(--wa-border)]
          "
        >
          <FcGoogle className="text-xl mr-2" />
          <span className="text-sm text-[var(--wa-text-main)]">
            Continue with Google
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-[var(--wa-border)]" />
          <p className="text-xs text-[var(--wa-text-secondary)]">
            or login with email
          </p>
          <div className="flex-1 h-px bg-[var(--wa-border)]" />
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 h-11 px-4 rounded-full border border-[var(--wa-border)]">
          <IoMailOutline className="text-[var(--wa-text-secondary)]" />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-transparent outline-none text-sm text-[var(--wa-text-main)]"
            {...register("email", {
              required: "Email is required",
            })}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-red-500 mt-1 pl-4">
            {errors.email.message}
          </p>
        )}

        {/* Password */}
        <div className="flex items-center gap-2 h-11 px-4 rounded-full mt-4 border border-[var(--wa-border)]">
          <IoLockClosedOutline className="text-[var(--wa-text-secondary)]" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full bg-transparent outline-none text-sm text-[var(--wa-text-main)]"
            {...register("password", {
              required: "Password is required",
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-[var(--wa-text-secondary)]"
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-red-500 mt-1 pl-4">
            {errors.password.message}
          </p>
        )}

        {/* Remember Me */}
        <div className="flex items-center mt-4 text-sm text-[var(--wa-text-secondary)]">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="accent-[var(--wa-accent)]"
              {...register("rememberMe")}
            />
            Remember me
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 h-11 rounded-full bg-[var(--wa-accent)] text-white font-medium hover:opacity-90"
        >
          Login
        </button>

        {/* Register */}
        <p className="text-sm text-center mt-4 text-[var(--wa-text-secondary)]">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={onRegister}
            className="text-[var(--wa-accent)] font-medium"
          >
            Sign up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
