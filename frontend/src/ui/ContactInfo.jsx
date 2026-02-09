import { motion, AnimatePresence } from "framer-motion";
import { User, X, Mail, Phone, Globe, Heart } from "lucide-react";

const ContactInfo = ({ isOpen, onClose, user }) => {
  if (!user) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.78, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 18, stiffness: 280 },
    },
    exit: {
      opacity: 0,
      scale: 0.78,
      y: 30,
      transition: { duration: 0.22, ease: "easeIn" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.07 + 0.15,
        duration: 0.4,
        ease: "easeOut",
      },
    }),
  };

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
            className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              fixed z-50 top-1/2 left-1/2
              -translate-x-1/2 -translate-y-1/2
              w-[92%] max-w-2xl
              bg-[var(--bg-main)]/70
              backdrop-blur-2xl
              border border-[var(--border-light)]/40
              rounded-lg shadow-2xl shadow-black/25
              overflow-hidden
            "
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-full
                         bg-black/20 hover:bg-black/40
                         text-white transition-colors backdrop-blur"
            >
              <X size={20} />
            </button>

            {/* Content */}
            <div className="px-6 py-6">
              <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                {/* LEFT: Profile */}
                <motion.div
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, type: "spring" }}
                  className="relative shrink-0"
                >
                  {user.profile ? (
                    <div className="relative">
                      <img
                        src={user.profile}
                        alt={user.name}
                        className="h-32 w-32 rounded-full object-cover
                                   border-4 border-white/30
                                   shadow-xl shadow-black/20"
                      />
                      {user.isOnline && (
                        <span
                          className="absolute bottom-2 right-2
                                         h-4 w-4 rounded-full
                                         bg-green-500 border-2 border-white
                                         shadow-md"
                        />
                      )}
                    </div>
                  ) : (
                    <div
                      className="h-32 w-32 rounded-full
                                    bg-gradient-to-br
                                    from-[var(--accent-primary)]/30
                                    to-[var(--accent-soft)]/30
                                    flex items-center justify-center
                                    border-4 border-white/20"
                    >
                      <User
                        size={52}
                        className="text-[var(--accent-primary)]"
                      />
                    </div>
                  )}
                </motion.div>

                {/* RIGHT: Info */}
                <div className="flex-1 w-full">
                  <motion.h2
                    variants={itemVariants}
                    custom={0}
                    className="text-2xl font-heading font-semibold
                               text-[var(--text-main)]"
                  >
                    {user.name}
                  </motion.h2>

                  <motion.p
                    variants={itemVariants}
                    custom={1}
                    className="text-sm text-[var(--text-muted)] mt-1 mb-5"
                  >
                    {user.isOnline ? (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        Online now
                      </span>
                    ) : (
                      "Last seen recently"
                    )}
                  </motion.p>

                  {/* Details */}
                  <div className="space-y-4 text-sm">
                    {[
                      {
                        icon: Phone,
                        label: "Phone",
                        value: user.phone || "+91 9XXXXXXXXX",
                      },
                      {
                        icon: Mail,
                        label: "Email",
                        value: user.email || "Not available",
                      },
                      {
                        icon: Globe,
                        label: "Location",
                        value: user.location || "Dhanbad, Jharkhand",
                      },
                      {
                        icon: Heart,
                        label: "About",
                        value:
                          user.about ||
                          "Available on WhatsApp • Friend / Colleague",
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={item.label}
                        variants={itemVariants}
                        custom={i + 2}
                        className="flex justify-between gap-4 group"
                      >
                        <div className="flex items-center gap-3 text-[var(--text-muted)]">
                          <item.icon size={18} />
                          <span>{item.value}</span>
                        </div>
                        {/* <span
                          className="font-medium text-[var(--text-secondary)]
                                         group-hover:text-[var(--accent-primary)]
                                         transition-colors"
                        >
                          {item.value}
                        </span> */}
                      </motion.div>
                    ))}
                  </div>

                  {/* Actions */}
                  <motion.div
                    variants={itemVariants}
                    custom={6}
                    className="mt-6 flex gap-4"
                  >
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-full
                                       bg-[var(--accent-primary)] text-white
                                       font-medium hover:bg-[var(--accent-hover)]
                                       transition-all shadow-md active:scale-95"
                    >
                      Message
                    </button>
                    <button
                      onClick={onClose}
                      className="px-6 py-2.5 rounded-full
                                       border border-[var(--border-light)]
                                       text-[var(--text-secondary)]
                                       hover:border-[var(--accent-primary)]
                                       hover:text-[var(--accent-primary)]
                                       transition-all"
                    >
                      Call
                    </button>
                  </motion.div>
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
