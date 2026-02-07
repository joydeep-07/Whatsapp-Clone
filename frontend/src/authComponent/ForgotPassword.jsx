import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { IoMailOutline, IoLockClosedOutline } from "react-icons/io5";

const ForgotPassword = ({ onBack }) => {
  const [stage, setStage] = useState("email"); // "email" | "otp" | "reset"
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const inputsRef = useRef([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset: resetForm,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      otp: ["", "", "", "", "", ""],
      newPassword: "",
      confirmPassword: "",
    },
  });

  const otpValue = watch("otp");
  const newPassword = watch("newPassword");

  // OTP auto-focus & paste handling
  useEffect(() => {
    if (stage !== "otp") return;

    const inputs = inputsRef.current;

    inputs.forEach((input, index) => {
      if (!input) return;

      input.oninput = (e) => {
        if (e.inputType === "insertText" && e.target.value && index < 5) {
          inputs[index + 1]?.focus();
        }
      };

      input.onkeydown = (e) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
          inputs[index - 1]?.focus();
        }
      };

      input.onpaste = (e) => {
        e.preventDefault();
        const data = e.clipboardData.getData("text").trim();
        if (/^\d{6}$/.test(data)) {
          const digits = data.split("");
          setValue("otp", digits);
          inputs[5]?.focus();
        }
      };
    });
  }, [stage, setValue]);

  const onSendOtp = (data) => {
    console.log("Sending OTP to:", data.email);
    // TODO: API call → send OTP
    setStage("otp");
    // Optional: resetForm({ email: data.email }); // keep email if you want
  };

  const onVerifyOtp = (data) => {
    const code = data.otp.join("");
    if (code.length !== 6) return;

    console.log("Verifying OTP:", code);
    // TODO: API call → verify OTP
    // On success:
    setStage("reset");
  };

  const onResetPassword = (data) => {
    console.log("Resetting password for email:", watch("email"));
    console.log("New password:", data.newPassword);

    // TODO: API call → reset password
    alert("Password reset successful! You can now log in.");
    onBack?.();
  };

  return (
    <div className="w-full flex items-start pt-20 justify-center">
      <form
        className="w-80 md:w-96 flex flex-col"
        onSubmit={
          stage === "email"
            ? handleSubmit(onSendOtp)
            : stage === "otp"
              ? handleSubmit(onVerifyOtp)
              : handleSubmit(onResetPassword)
        }
        noValidate
      >
        <h2 className="text-4xl font-heading font-medium text-[var(--text-main)]/95">
          {stage === "email"
            ? "Reset Password"
            : stage === "otp"
              ? "Verify OTP"
              : "Set New Password"}
        </h2>

        <p className="text-sm text-[var(--text-secondary)] mt-3">
          {stage === "email"
            ? "Enter your email to receive a one-time password"
            : stage === "otp"
              ? "Enter the 6-digit code sent to your email"
              : "Choose a strong new password"}
        </p>

        {/* ────────────────────────────────────────────── */}
        {/* EMAIL STAGE */}
        {/* ────────────────────────────────────────────── */}
        {stage === "email" && (
          <>
            <div className="flex items-center gap-2 h-12 pl-6 rounded-full mt-8 border border-[var(--border-light)] bg-transparent">
              <IoMailOutline className="text-[var(--text-muted)]" />
              <input
                type="email"
                placeholder="Email id"
                className="w-full h-full bg-transparent outline-none text-sm text-[var(--text-secondary)] placeholder-[var(--text-muted)]"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-[var(--error)] mt-1 pl-6">
                {errors.email.message}
              </p>
            )}

            <button
              type="submit"
              className="mt-8 h-11 rounded-full bg-[var(--blue-button)] text-white font-medium transition"
            >
              Send OTP
            </button>
          </>
        )}

        {/* ────────────────────────────────────────────── */}
        {/* OTP STAGE */}
        {/* ────────────────────────────────────────────── */}
        {stage === "otp" && (
          <>
            <div className="flex items-center justify-between gap-3 mt-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  type="text"
                  maxLength={1}
                  className="
                    w-12 h-12 text-center text-xl font-medium
                    border border-[var(--border-light)]
                    rounded-xl bg-transparent
                    focus:border-[var(--accent-primary)]
                    outline-none transition
                  "
                  {...register(`otp.${i}`, {
                    required: true,
                    pattern: {
                      value: /^\d$/,
                      message: "",
                    },
                    onChange: (e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      setValue(`otp.${i}`, val, { shouldValidate: true });
                      if (val && i < 5) {
                        inputsRef.current[i + 1]?.focus();
                      }
                    },
                  })}
                />
              ))}
            </div>

            {(errors.otp || otpValue.some((v) => !v)) && (
              <p className="text-xs text-[var(--error)] mt-2 text-center">
                Please enter a valid 6-digit code
              </p>
            )}

            <button
              type="submit"
              className="mt-8 h-11 rounded-full bg-[var(--blue-button)] text-white font-medium transition"
            >
              Verify OTP
            </button>

            <p className="text-sm text-center mt-5 text-[var(--text-muted)]">
              Didn't receive code?{" "}
              <button
                type="button"
                onClick={() => setStage("email")}
                className="text-[var(--accent-primary)] hover:underline"
              >
                Resend
              </button>
            </p>
          </>
        )}

        {/* ────────────────────────────────────────────── */}
        {/* RESET PASSWORD STAGE */}
        {/* ────────────────────────────────────────────── */}
        {stage === "reset" && (
          <>
            {/* New Password */}
            <div className="flex items-center gap-2 h-12 pl-6 pr-4 rounded-full mt-8 border border-[var(--border-light)]">
              <IoLockClosedOutline className="text-[var(--text-muted)]" />
              <input
                type={showNewPass ? "text" : "password"}
                placeholder="New Password"
                className="w-full h-full bg-transparent outline-none text-sm text-[var(--text-secondary)] placeholder-[var(--text-muted)]"
                {...register("newPassword", {
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => setShowNewPass(!showNewPass)}
                className="text-[var(--text-muted)] hover:text-[var(--accent-primary)]"
              >
                {showNewPass ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-[var(--error)] mt-1 pl-6">
                {errors.newPassword.message}
              </p>
            )}

            {/* Confirm Password */}
            <div className="flex items-center gap-2 h-12 pl-6 pr-4 rounded-full mt-5 border border-[var(--border-light)]">
              <IoLockClosedOutline className="text-[var(--text-muted)]" />
              <input
                type={showConfirmPass ? "text" : "password"}
                placeholder="Confirm New Password"
                className="w-full h-full bg-transparent outline-none text-sm text-[var(--text-secondary)] placeholder-[var(--text-muted)]"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === newPassword || "Passwords do not match",
                })}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="text-[var(--text-muted)] hover:text-[var(--accent-primary)]"
              >
                {showConfirmPass ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-[var(--error)] mt-1 pl-6">
                {errors.confirmPassword.message}
              </p>
            )}

            <button
              type="submit"
              className="mt-8 h-11 rounded-full bg-[var(--blue-button)] text-white font-medium transition"
            >
              Reset Password
            </button>
          </>
        )}

        {/* Back link */}
        <p className="text-sm text-center mt-4">
          Remember Your Password !{" "}
          <button onClick={onBack} className="text-[var(--accent-primary)]">
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
