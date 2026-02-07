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
    console.log("Form Data 👉", data);
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
          Sign <span className="text-[var(--wa-accent)]">Up</span>
        </h2>

        <p className="text-sm text-[var(--wa-text-secondary)] mt-2">
          Create your account
        </p>

        {/* First + Last Name */}
        <div className="flex gap-2 mt-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 h-11 px-4 rounded-full border border-[var(--wa-border)]">
              <IoPersonOutline className="text-[var(--wa-text-secondary)]" />
              <input
                type="text"
                placeholder="First name"
                className="w-full bg-transparent outline-none text-sm text-[var(--wa-text-main)]"
                {...register("firstName", { required: "Required" })}
              />
            </div>
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 h-11 px-4 rounded-full border border-[var(--wa-border)]">
              <IoPersonOutline className="text-[var(--wa-text-secondary)]" />
              <input
                type="text"
                placeholder="Last name"
                className="w-full bg-transparent outline-none text-sm text-[var(--wa-text-main)]"
                {...register("lastName", { required: "Required" })}
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 h-11 px-4 rounded-full mt-4 border border-[var(--wa-border)]">
          <IoMailOutline className="text-[var(--wa-text-secondary)]" />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-transparent outline-none text-sm text-[var(--wa-text-main)]"
            {...register("email", { required: "Email required" })}
          />
        </div>

        {/* Password */}
        <div className="flex items-center gap-2 h-11 px-4 rounded-full mt-4 border border-[var(--wa-border)]">
          <IoLockClosedOutline className="text-[var(--wa-text-secondary)]" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full bg-transparent outline-none text-sm text-[var(--wa-text-main)]"
            {...register("password", { required: "Password required" })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-[var(--wa-text-secondary)]"
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="flex items-center gap-2 h-11 px-4 rounded-full mt-4 border border-[var(--wa-border)]">
          <IoLockClosedOutline className="text-[var(--wa-text-secondary)]" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm password"
            className="w-full bg-transparent outline-none text-sm text-[var(--wa-text-main)]"
            {...register("confirmPassword", {
              validate: (v) => v === password || "Passwords do not match",
            })}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="mt-6 h-11 rounded-full bg-[var(--wa-accent)] text-white font-medium hover:opacity-90"
        >
          Create account
        </button>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onLogin}
            className="text-[var(--wa-accent)] font-medium"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
