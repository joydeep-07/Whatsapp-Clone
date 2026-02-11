import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "../authComponent/Login";
import Register from "../authComponent/Register";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 400 : -400,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -400 : 400,
    opacity: 0,
  }),
};

export default function Auth() {
  const [activeForm, setActiveForm] = useState("login");
  const [direction, setDirection] = useState(1);

  const switchForm = (form) => {
    // direction logic (unchanged)
    if (activeForm === "login" && form === "register") setDirection(1);
    else if (activeForm === "login" && form === "forgot") setDirection(-1);
    else if (activeForm === "forgot" && form === "login") setDirection(1);
    else if (activeForm === "register" && form === "login") setDirection(-1);
    else setDirection(1);

    setActiveForm(form);
  };

  return (
    <div className=" pt-15 flex-col md:pt-0 pb-15 md:pb-0 md:min-h-screen flex items-center justify-center bg-[var(--bg-main)]">
      <div className="flex w-full max-w-6xl overflow-hidden px-4">
        {/* LEFT PANEL (completely unchanged) */}
        <div className="w-1/2 h-[70vh] hidden md:flex relative flex-col justify-start">
          {/* Decorative SVG */}
          <svg
            className="hidden md:block absolute -bottom-90 pointer-events-none opacity-10 text-[var(--text-main)]"
            viewBox="0 0 90 110"
          >
            <path
              d="M16.141 0C13.4854 0 10.9387 1.04871 9.06091 2.91543L2.93268 9.00761C1.05492 10.8743 0 13.4061 0 16.0461C0 21.5435 4.48289 26 10.0128 26C12.6684 26 15.2152 24.9512 17.0929 23.0845L21.3319 18.8705L33.6827 6.59239C34.5795 5.70086 35.7958 5.2 37.0641 5.2C39.1874 5.2 40.9876 6.57576 41.6117 8.47953L45.5096 4.60457C43.7314 1.83589 40.6134 0 37.0641 0C34.4085 0 31.8617 1.04871 29.984 2.91543L13.3943 19.4076C12.4974 20.2992 11.2811 20.8 10.0128 20.8C7.37176 20.8 5.23077 18.6716 5.23077 16.0461C5.23077 14.7852 5.73459 13.5761 6.63139 12.6845L12.7596 6.59239C13.6564 5.70086 14.8727 5.2 16.141 5.2C18.2645 5.2 20.0645 6.57582 20.6887 8.47965L24.5866 4.60466C22.8084 1.83595 19.6904 0 16.141 0Z"
              fill="currentColor"
            />
            <path
              d="M34.3188 19.4076C33.422 20.2992 32.2056 20.8 30.9373 20.8C28.8143 20.8 27.0143 19.4246 26.39 17.5211L22.4922 21.396C24.2705 24.1643 27.3883 26 30.9373 26C33.5929 26 36.1397 24.9512 38.0175 23.0845L54.6072 6.59239C55.504 5.70086 56.7203 5.2 57.9886 5.2C60.6297 5.2 62.7707 7.32839 62.7707 9.95393C62.7707 11.2148 62.2669 12.4239 61.37 13.3155L55.2419 19.4076C54.345 20.2992 53.1287 20.8 51.8604 20.8C49.7372 20.8 47.9371 19.4243 47.3129 17.5207L43.4151 21.3957C45.1933 24.1642 48.3112 26 51.8604 26C54.516 26 57.0628 24.9512 58.9405 23.0845L65.0687 16.9924C66.9465 15.1257 68.0014 12.5939 68.0014 9.95393C68.0014 4.45652 63.5186 0 57.9886 0C55.333 0 52.7863 1.04871 50.9085 2.91543L34.3188 19.4076Z"
              fill="currentColor"
            />
          </svg>

          {/* <h1 className="uppercase font-heading text-4xl text-[var(--text-main)] font-medium tracking-wide">
            Next Cloud
          </h1>
          <p className="text-sm pb-10 max-w-md text-[var(--text-secondary)]/80 leading-relaxed">
            All your work, one secure cloud. Seamlessly. Securely. Anywhere.
          </p> */}

          <div className="pb-15 max-w-md">
            <h2 className="text-4xl font-medium font-heading text-[var(--text-secondary)]/90 leading-tight">
              Chat
              <span className="text-[var(--accent-primary)]/90">
                Connect & Share
              </span>
              <br />
              Anytime, Anywhere
            </h2>
            <p className="text-sm pb-10 max-w-md text-[var(--text-secondary)]/80 leading-relaxed">
              A secure cloud workspace built for storing, sharing, and
              collaborating on files effortlessly with complete control and
              modern performance.
            </p>
            <p className="text-sm pb-10 max-w-md text-[var(--text-secondary)]/80 leading-relaxed">
              All your work, one secure cloud. Seamlessly. Securely. Anywhere.
            </p>
          </div>

          <div className="grid pb-20 grid-cols-2 gap-4 text-sm text-[var(--text-secondary)]">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]"></span>
              Folder Management
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]"></span>
              Secure File Uploads
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]"></span>
              Shareable Access Links
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]"></span>
              Time-based Permissions
            </div>
          </div>

          <p className="text-xs text-[var(--text-secondary)]/50 tracking-wide">
            Built for teams · Trusted by creators · Powered by modern cloud
          </p>
        </div>

        {/* RIGHT PANEL — only changed: removed absolute from motion.div */}
        <div className="relative w-full md:w-1/2 flex items-start justify-center overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {activeForm === "login" && (
              <motion.div
                key="login"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="w-full flex justify-center"
              >
                <Login
                  onRegister={() => switchForm("register")}
                  onForgot={() => switchForm("forgot")}
                />
              </motion.div>
            )}

            {activeForm === "register" && (
              <motion.div
                key="register"
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="w-full flex justify-center"
              >
                <Register onLogin={() => switchForm("login")} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <h1 className="max-w-xl text-center text-sm text-[var(--text-secondary)]/50 ">
        A secure cloud workspace built for storing, sharing, and collaborating
        on files effortlessly with complete control and modern performance.
      </h1>
    </div>
  );
}
