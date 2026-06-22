import { motion } from "framer-motion";

interface Avatar {
  initials: string;
  color: string;
}

const defaultAvatars: Avatar[] = [
  { initials: "AJ", color: "bg-indigo-500" },
  { initials: "MH", color: "bg-purple-500" },
  { initials: "SR", color: "bg-teal-500" },
  { initials: "LP", color: "bg-green-500" },
  { initials: "TC", color: "bg-orange-500" },
];

export function AvatarStack({ avatars = defaultAvatars }: { avatars?: Avatar[] }) {
  return (
    <div className="flex -space-x-3">
      {avatars.map((a, i) => (
        <motion.div
          key={i}
          // staggered entrance
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          // hover: float up individually
          whileHover={{ y: -6, scale: 1.15, zIndex: 10 }}
          className={`w-9 h-9 rounded-full ${a.color} flex items-center justify-center 
                      text-white text-xs font-semibold ring-2 ring-purple-950 cursor-pointer`}
        >
          {a.initials}
        </motion.div>
      ))}
    </div>
  );
}