import { type ReactNode } from "react";
import { motion } from "framer-motion";

interface SplitAuthScreenProps {
  children: ReactNode;
  panel: ReactNode;
}

export function SplitAuthScreen({ children, panel }: SplitAuthScreenProps) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left: form — fades in from left */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full md:w-[45%] flex items-center justify-center bg-slate-50 px-6 py-10"
      >
        <div className="w-full max-w-sm">{children}</div>
      </motion.div>

      {/* Right: dark panel — fades in from right */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden md:flex md:w-[55%] relative overflow-hidden
                   bg-gradient-to-br from-indigo-950 via-purple-950 to-black
                   items-center px-12"
      >
        {panel}
      </motion.div>
    </div>
  );
}