import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import {
  IoLockClosedOutline,
  IoMailOutline,
  IoPersonOutline,
} from "react-icons/io5";

import { BASE_URL, ENDPOINTS } from "../api/endPoint";

const Register = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      setServerError("");
      setSuccessMsg("");

      const res = await fetch(`${BASE_URL}${ENDPOINTS.REGISTER}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.firstName,
          email: data.email,
          password: data.password,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Registration failed");
      }

      // ✅ Success
      setSuccessMsg("Account created successfully 🎉");
      reset();

      setTimeout(() => {
        onLogin();
      }, 1500);
    } catch (error) {
      setServerError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-80 md:w-96 flex flex-col bg-[var(--bg-main)] p-6 rounded-xl border border-[var(--border-light)]/50"
        noValidate
      >
        <h2 className="text-3xl font-medium text-[var(--text-main)] font-heading">
          Sign <span className="text-[var(--accent-primary)]">Up</span>
        </h2>

        <p className="text-sm text-[var(--text-secondary)] mt-2">
          Create your account
        </p>

        {/* Name */}
        <div className="flex flex-col gap-3 mt-6">
          <div className="flex items-center gap-2 h-11 px-4 rounded-full border border-[var(--border-light)] focus-within:border-[var(--accent-primary)] transition">
            <IoPersonOutline className="text-[var(--text-muted)] text-lg" />
            <input
              type="text"
              placeholder="Full name"
              className="w-full bg-transparent outline-none text-sm text-[var(--text-main)]"
              {...register("firstName", {
                required: "Full name is required",
              })}
            />
          </div>
          {errors.firstName && (
            <p className="text-xs text-[var(--error)]">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 h-11 px-4 rounded-full mt-4 border border-[var(--border-light)] focus-within:border-[var(--accent-primary)] transition">
          <IoMailOutline className="text-[var(--text-muted)] text-lg" />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-transparent outline-none text-sm text-[var(--text-main)]"
            {...register("email", {
              required: "Email is required",
            })}
          />
        </div>
        {errors.email && (
          <p className="text-xs text-[var(--error)] mt-1">
            {errors.email.message}
          </p>
        )}

        {/* Password */}
        <div className="flex items-center gap-2 h-11 px-4 rounded-full mt-4 border border-[var(--border-light)] focus-within:border-[var(--accent-primary)] transition">
          <IoLockClosedOutline className="text-[var(--text-muted)] text-lg" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full bg-transparent outline-none text-sm text-[var(--text-main)]"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters required",
              },
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-[var(--text-muted)]"
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs text-[var(--error)] mt-1">
            {errors.password.message}
          </p>
        )}

        {/* Confirm Password */}
        <div className="flex items-center gap-2 h-11 px-4 rounded-full mt-4 border border-[var(--border-light)] focus-within:border-[var(--accent-primary)] transition">
          <IoLockClosedOutline className="text-[var(--text-muted)] text-lg" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            className="w-full bg-transparent outline-none text-sm text-[var(--text-main)]"
            {...register("confirmPassword", {
              required: "Please confirm password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-[var(--error)] mt-1">
            {errors.confirmPassword.message}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-6 h-11 rounded-full bg-[var(--accent-primary)] text-white font-medium transition ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Creating..." : "Create account"}
        </button>

        {/* Server Messages */}
        {serverError && (
          <p className="text-sm text-[var(--error)] mt-3 text-center">
            {serverError}
          </p>
        )}

        {successMsg && (
          <p className="text-sm text-green-500 mt-3 text-center">
            {successMsg}
          </p>
        )}

        {/* Login */}
        <p className="text-sm text-center mt-5 text-[var(--text-secondary)]">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onLogin}
            className="text-[var(--accent-primary)] font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
