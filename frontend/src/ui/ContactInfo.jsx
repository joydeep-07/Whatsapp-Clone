// ContactInfo.jsx
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { User, X, Mail, Phone, Globe, Heart } from "lucide-react";

const ContactInfo = ({ isOpen, onClose, user }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    if (panelRef.current) {
      gsap.to(panelRef.current, {
        x: isOpen ? "0%" : "100%",
        duration: 0.5,
        ease: "power3.inOut",
      });
    }
  }, [isOpen]);

  if (!user) return null;

  return (
    <div
      ref={panelRef}
      className="
        fixed top-0 right-0
        w-[22%]
        h-full
        bg-[var(--bg-main)]
        border border-[var(--border-light)]/50
        z-20
        overflow-y-auto
        translate-x-full
      "
    >
      {/* HEADER */}
      <div className="flex items-center justify-between h-18 px-5 py-4">
        <h2 className="font-medium font-heading text-xl">
          Contact <span className="text-[var(--accent-primary)]">Info</span>
        </h2>
        <X className="cursor-pointer" onClick={onClose} />
      </div>

      {/* PROFILE */}
      <div className="flex flex-col items-center py-6">
        {user.profile ? (
          <img
            src={user.profile}
            alt={user.name}
            className="h-32 w-32 rounded-full object-cover"
          />
        ) : (
          <div className="h-32 w-32 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
            <User size={48} />
          </div>
        )}
        <h3 className="mt-4 text-lg font-semibold">{user.name}</h3>
        <p className="text-sm text-[var(--text-muted)]">
          {user.isOnline ? "Online" : "Last seen recently"}
        </p>
      </div>

      {/* DETAILS */}
      <div className="px-6 space-y-4 text-sm">
        <Info icon={Phone} value={user.phone || "+91 9XXXXXXXXX"} />
        <Info icon={Mail} value={user.email || "Not available"} />
        <Info icon={Globe} value={user.location || "India"} />
        <Info icon={Heart} value={user.about || "Available on WhatsApp"} />
      </div>
    </div>
  );
};

const Info = ({ icon: Icon, value }) => (
  <div className="flex items-center gap-3 text-[var(--text-secondary)]">
    <Icon size={18} />
    <span>{value}</span>
  </div>
);

export default ContactInfo;
