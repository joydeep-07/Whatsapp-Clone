import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import {
  IoLockClosedOutline,
  IoMailOutline,
  IoPersonOutline,
} from "react-icons/io5";

const Register = ({ onLogin }) => {
  const [showPassword, setShowPassword] = useState(false);

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
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = (data) => {
    console.log("Registration Data 👉", data);
    reset();
  };

  return (
    <div className="w-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`
          w-80 md:w-96 flex flex-col
          bg-[var(--bg-main)]
          p-6 rounded-xl
          border border-[var(--border-light)]/50
          shadow-[var(--shadow-md)]
        `}
        noValidate
      >
        <h2 className="text-3xl font-medium text-[var(--text-main)] font-heading">
          Sign <span className="text-[var(--accent-primary)]">Up</span>
        </h2>

        <p className="text-sm text-[var(--text-secondary)] mt-2">
          Create your account
        </p>

        {/* First + Last Name */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 h-11 px-4 rounded-full border border-[var(--border-light)] focus-within:border-[var(--accent-primary)] transition-[var(--transition-fast)]">
              <IoPersonOutline className="text-[var(--text-muted)] text-lg" />
              <input
                type="text"
                placeholder="First name"
                className="w-full bg-transparent outline-none text-sm text-[var(--text-main)] placeholder-[var(--text-muted)]"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
            </div>
            {errors.firstName && (
              <p className="text-xs text-[var(--error)] mt-1 pl-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 h-11 px-4 rounded-full border border-[var(--border-light)] focus-within:border-[var(--accent-primary)] transition-[var(--transition-fast)]">
              <IoPersonOutline className="text-[var(--text-muted)] text-lg" />
              <input
                type="text"
                placeholder="Last name"
                className="w-full bg-transparent outline-none text-sm text-[var(--text-main)] placeholder-[var(--text-muted)]"
                {...register("lastName", {
                  required: "Last name is required",
                })}
              />
            </div>
            {errors.lastName && (
              <p className="text-xs text-[var(--error)] mt-1 pl-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 h-11 px-4 rounded-full mt-4 border border-[var(--border-light)] focus-within:border-[var(--accent-primary)] transition-[var(--transition-fast)]">
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
          <p className="text-xs text-[var(--error)] mt-1 pl-1">
            {errors.email.message}
          </p>
        )}

        {/* Password */}
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
          <p className="text-xs text-[var(--error)] mt-1 pl-1">
            {errors.password.message}
          </p>
        )}

        {/* Confirm Password */}
        <div className="flex items-center gap-2 h-11 px-4 rounded-full mt-4 border border-[var(--border-light)] focus-within:border-[var(--accent-primary)] transition-[var(--transition-fast)]">
          <IoLockClosedOutline className="text-[var(--text-muted)] text-lg" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            className="w-full bg-transparent outline-none text-sm text-[var(--text-main)] placeholder-[var(--text-muted)]"
            {...register("confirmPassword", {
              required: "Please confirm password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-xs text-[var(--error)] mt-1 pl-1">
            {errors.confirmPassword.message}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className={`
            mt-6 h-11 rounded-full
            bg-[var(--accent-primary)]
            text-white font-medium
            hover:bg-[var(--accent-hover)]
            transition-[var(--transition-base)]
            shadow-[var(--shadow-sm)]
          `}
        >
          Create account
        </button>

        {/* Login link */}
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
