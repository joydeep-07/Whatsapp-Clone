import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  IoPersonOutline,
  IoMailOutline,
  IoCalendarOutline,
  IoDocumentTextOutline,
} from "react-icons/io5";

const AddContact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    console.log("New contact:", data);
    // fake delay to show loading state
    await new Promise((r) => setTimeout(r, 800));
    reset();
    alert("Contact saved! (demo)");
  };

  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-[var(--bg-main)] px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`
          w-4xl flex flex-col
          bg-[var(--bg-main)]
          p-6 rounded-xl
          border border-[var(--border-light)]/50
         
        `}
        noValidate
      >
        <h2 className="text-3xl font-medium text-[var(--text-main)] font-heading">
          Add <span className="text-[var(--accent-primary)]">Contact</span>
        </h2>

        <p className="text-sm text-[var(--text-secondary)] mt-2">
          Save a new contact to your list
        </p>

        {/* Full Name */}
        <div className="mt-6">
          <div className="flex items-center gap-2 h-11 px-4 rounded-full border border-[var(--border-light)] focus-within:border-[var(--accent-primary)] transition-[var(--transition-fast)]">
            <IoPersonOutline className="text-[var(--text-muted)] text-lg shrink-0" />
            <input
              type="text"
              placeholder="Full name *"
              className="w-full bg-transparent outline-none text-sm text-[var(--text-main)] placeholder-[var(--text-muted)]"
              {...register("fullname", {
                required: "Full name is required",
                minLength: { value: 2, message: "Name is too short" },
              })}
            />
          </div>
          {errors.fullname && (
            <p className="text-xs text-[var(--error)] mt-1 pl-1">
              {errors.fullname.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mt-4">
          <div className="flex items-center gap-2 h-11 px-4 rounded-full border border-[var(--border-light)] focus-within:border-[var(--accent-primary)] transition-[var(--transition-fast)]">
            <IoMailOutline className="text-[var(--text-muted)] text-lg shrink-0" />
            <input
              type="email"
              placeholder="Email *"
              className="w-full bg-transparent outline-none text-sm text-[var(--text-main)] placeholder-[var(--text-muted)]"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-[var(--error)] mt-1 pl-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Nickname */}
        <div className="mt-4">
          <div className="flex items-center gap-2 h-11 px-4 rounded-full border border-[var(--border-light)] focus-within:border-[var(--accent-primary)] transition-[var(--transition-fast)]">
            <IoPersonOutline className="text-[var(--text-muted)] text-lg shrink-0" />
            <input
              type="text"
              placeholder="Nickname (optional)"
              className="w-full bg-transparent outline-none text-sm text-[var(--text-main)] placeholder-[var(--text-muted)]"
              {...register("nickname")}
            />
          </div>
        </div>

        {/* Date of Birth */}
        <div className="mt-4">
          <div className="flex items-center gap-2 h-11 px-4 rounded-full border border-[var(--border-light)] focus-within:border-[var(--accent-primary)] transition-[var(--transition-fast)]">
            <IoCalendarOutline className="text-[var(--text-muted)] text-lg shrink-0" />
            <input
              type="date"
              className="w-full bg-transparent outline-none text-sm text-[var(--text-main)] placeholder-[var(--text-muted)]"
              {...register("dob")}
            />
          </div>
        </div>

        {/* More Info / Notes */}
        <div className="mt-4">
          <div className="flex items-start gap-2 min-h-[11] px-4 py-3 rounded-xl border border-[var(--border-light)] focus-within:border-[var(--accent-primary)] transition-[var(--transition-fast)]">
            <IoDocumentTextOutline className="text-[var(--text-muted)] text-lg shrink-0 mt-0.5" />
            <textarea
              rows={3}
              placeholder="Notes, tags, how you know them... (optional)"
              className="w-full bg-transparent outline-none text-sm text-[var(--text-main)] placeholder-[var(--text-muted)] resize-none"
              {...register("moreInfo")}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`
            mt-6 h-11 rounded-full
            bg-[var(--accent-primary)]
            text-white font-medium
            hover:bg-[var(--accent-hover)]
            transition-[var(--transition-base)]
            shadow-[var(--shadow-sm)]
            disabled:opacity-60 disabled:cursor-not-allowed
            flex items-center justify-center
          `}
        >
          {isSubmitting ? "Saving..." : "Save Contact"}
        </button>
      </form>
    </div>
  );
};

export default AddContact;
