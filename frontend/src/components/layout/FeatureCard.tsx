import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { IconBadge } from "../common/IconBadge";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number; // for staggered entrance
}

export function FeatureCard({ icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      // entrance animation
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      // hover + tap effects
      whileHover={{
        scale: 1.03,
        backgroundColor: "rgba(255,255,255,0.1)",
        boxShadow: "0 0 24px rgba(139, 92, 246, 0.35)",
      }}
      whileTap={{ scale: 0.97 }}
      className="flex gap-4 bg-white/5 border border-white/10 rounded-xl p-4 
                 backdrop-blur-sm cursor-pointer transition-colors"
    >
      <motion.div
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.4 }}
      >
        <IconBadge icon={icon} size="md" />
      </motion.div>
      <div>
        <h3 className="text-white font-semibold text-sm">{title}</h3>
        <p className="text-slate-400 text-sm mt-0.5">{description}</p>
      </div>
    </motion.div>
  );
}