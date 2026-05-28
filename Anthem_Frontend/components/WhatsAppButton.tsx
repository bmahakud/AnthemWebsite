"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Routes where the WhatsApp button should NOT appear
const HIDDEN_ON = ["/login", "/admin1", "/admin2", "/employee"];

export default function WhatsAppButton() {
  const [pathname, setPathname] = useState<string | null>(null);

  useEffect(() => {
    // Read pathname only on the client after mount
    setPathname(window.location.pathname);

    // Update on client-side navigation
    const onPop = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPop);

    // Patch pushState / replaceState so SPA nav updates the button too
    const origPush = history.pushState.bind(history);
    const origReplace = history.replaceState.bind(history);

    history.pushState = (...args) => {
      origPush(...args);
      setPathname(window.location.pathname);
    };
    history.replaceState = (...args) => {
      origReplace(...args);
      setPathname(window.location.pathname);
    };

    return () => {
      window.removeEventListener("popstate", onPop);
      history.pushState = origPush;
      history.replaceState = origReplace;
    };
  }, []);

  // Not mounted yet — render nothing (avoids SSR hook context error)
  if (pathname === null) return null;

  // Hide on login and all admin panel routes
  const isHidden = HIDDEN_ON.some((route) => pathname.startsWith(route));
  if (isHidden) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.5, type: "spring", stiffness: 200 }}
      className="fixed bottom-6 right-5 sm:bottom-8 sm:right-6 z-[999]"
    >
      <Link
        href="https://wa.me/916742972299"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
      >
        <div className="relative group flex items-center gap-3">
          {/* Tooltip label — appears on hover, desktop only */}
          <span className="hidden sm:block bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 whitespace-nowrap pointer-events-none select-none">
            Chat with us
          </span>

          {/* Button */}
          <div className="relative">
            {/* Pulse rings */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
            <span
              className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-15"
              style={{ animationDelay: "0.45s" }}
            />

            {/* Main circle */}
            <div className="relative w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-full bg-[#25D366] flex items-center justify-center shadow-2xl hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer border-2 border-white/30">
              {/* Official WhatsApp SVG path */}
              <svg
                viewBox="0 0 32 32"
                className="w-7 h-7"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M16 3C8.82 3 3 8.82 3 16c0 2.3.6 4.48 1.65 6.37L3 29l6.84-1.62A13 13 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.9a10.86 10.86 0 0 1-5.53-1.5l-.4-.24-4.06.96.98-3.97-.26-.42A10.9 10.9 0 0 1 5.1 16 10.9 10.9 0 0 1 16 5.1 10.9 10.9 0 0 1 26.9 16 10.9 10.9 0 0 1 16 26.9zm5.97-8.14c-.33-.16-1.93-.95-2.22-1.06-.3-.1-.52-.16-.74.17-.22.33-.85 1.06-1.04 1.28-.19.22-.38.25-.7.08-.33-.17-1.38-.51-2.63-1.62-.97-.87-1.63-1.94-1.82-2.27-.19-.33-.02-.5.14-.67.15-.14.33-.38.5-.57.17-.19.22-.33.33-.55.11-.22.06-.41-.03-.57-.08-.17-.74-1.78-1.01-2.44-.27-.64-.54-.55-.74-.56h-.63c-.22 0-.57.08-.87.41-.3.33-1.13 1.1-1.13 2.68 0 1.58 1.16 3.1 1.32 3.32.17.22 2.28 3.48 5.53 4.88.77.33 1.37.53 1.84.68.77.24 1.48.21 2.03.13.62-.09 1.93-.79 2.2-1.55.27-.77.27-1.42.19-1.56-.08-.14-.3-.22-.63-.38z" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
