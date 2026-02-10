import React from "react";
import Lottie from "lottie-react";
import email from "../assets/animations/email.json";

const SelectChat = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4 text-[var(--text-muted)]">
      {/* Lottie Animation */}
      <div className="w-100 h-100">
        <Lottie animationData={email} loop={true} />
      </div>

      {/* Text */}
      <p className="text-2xl font-heading">
        Select a chat to start <span className="text-[var(--accent-primary)] ">messaging</span>{" "}
      </p>
    </div>
  );
};

export default SelectChat;
