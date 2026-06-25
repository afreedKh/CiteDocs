import { Search, Bell, Moon } from "lucide-react";
import type { ReactNode } from "react";
import { useAuthStore } from "../../lib/store/authStore";

interface TopbarProps {
  title: string;
  icon?: ReactNode;
}

export function Topbar({ title, icon }: TopbarProps) {
  const { user } = useAuthStore();

  return (
    <header className="h-14 border-b border-slate-100 bg-white flex items-center 
                       justify-between px-6 shrink-0">
      {/* Left: page title */}
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
        {icon}
        {title}
      </div>

      {/* Center: search */}
      <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1.5 
                      w-[280px] text-sm text-slate-400">
        <Search size={14} />
        <span>Search...</span>
        <span className="ml-auto text-xs bg-white border border-slate-200 
                         rounded px-1.5 py-0.5 text-slate-400">⌘K</span>
      </div>

      {/* Right: icons + user */}
      <div className="flex items-center gap-3">
        <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center 
                           justify-center text-slate-500 transition-colors">
          <Moon size={16} />
        </button>
        <button className="w-8 h-8 rounded-lg hover:bg-slate-100 flex items-center 
                           justify-center text-slate-500 transition-colors relative">
          <Bell size={16} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-600 
                           rounded-full" />
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center 
                          justify-center text-white text-xs font-semibold">
            {user?.fullName?.charAt(0) ?? "U"}
          </div>
          <div>
            <p className="text-xs font-medium text-slate-900">
              {user?.fullName ?? "User"}
            </p>
            <p className="text-[10px] text-slate-400">Pro Plan</p>
          </div>
        </div>
      </div>
    </header>
  );
}