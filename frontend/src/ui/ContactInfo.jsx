import { motion, AnimatePresence } from "framer-motion";
import { User, X } from "lucide-react";

const ContactInfo = ({ isOpen, onClose, user }) => {
  if (!user) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            // transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="
              fixed z-50 top-2/5 left-1/2
              -translate-x-1/2 -translate-y-1/2
              w-[90%] max-w-2xl
              bg-[var(--bg-main)]
              border border-[var(--border-light)]
              rounded-2xl shadow-2xl
              p-6
            "
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Contact info</h2>
              <X
                className="cursor-pointer text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
                onClick={onClose}
              />
            </div>

            {/* Body */}
            <div className="flex flex-col items-center gap-4">
              {user.profile ? (
                <img
                  src={user.profile}
                  alt={user.name}
                  className="h-24 w-24 rounded-full object-cover border border-[var(--border-light)]"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center">
                  <User size={48} />
                </div>
              )}

              <h3 className="text-base font-medium">{user.name}</h3>

              <p className="text-sm text-[var(--text-muted)]">
                {user.isOnline ? "Online now" : "Offline"}
              </p>

              <div className="w-full mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">Phone</span>
                  <span>+91 9XXXXXXXXX</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[var(--text-muted)]">About</span>
                  <span className="text-right max-w-[60%]">
                    Available on WhatsApp
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ContactInfo;
