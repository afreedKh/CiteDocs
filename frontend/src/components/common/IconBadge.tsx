import { type ReactNode } from "react";

interface IconBadgeProps {
  icon: ReactNode;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

export function IconBadge({ icon, size = "md" }: IconBadgeProps) {
  return (
    <div
      className={`${sizeClasses[size]} rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 
                  flex items-center justify-center text-white shrink-0`}
    >
      {icon}
    </div>
  );
}