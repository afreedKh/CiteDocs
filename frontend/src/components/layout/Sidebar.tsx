import { useState, useRef, useEffect } from "react";
import { LogOut } from "lucide-react";
import { useLogout } from "../../lib/hooks/useAuth";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, Folders, FileText, Users,
  MessageSquare, BookOpen, Tag, BarChart2,
  Settings, Zap, Brain, ChevronDown,
} from "lucide-react";
import { useAuthStore } from "../../lib/store/authStore";

const navSections = [
  {
    label: "WORKSPACE",
    items: [
      { to: "/workspaces", icon: <Folders size={16} />, label: "Workspaces" },
      { to: "/documents", icon: <FileText size={16} />, label: "Documents" },
      { to: "/members", icon: <Users size={16} />, label: "Members" },
    ],
  },
  {
    label: "AI & KNOWLEDGE",
    items: [
      {
        to: "/chat", icon: <MessageSquare size={16} />, label: "AI Chat",
        badge: "New",
      },
      { to: "/pdf-viewer", icon: <BookOpen size={16} />, label: "PDF Viewer" },
      { to: "/tags", icon: <Tag size={16} />, label: "Tags" },
    ],
  },
  {
    label: "INSIGHTS",
    items: [
      { to: "/analytics", icon: <BarChart2 size={16} />, label: "Analytics" },
    ],
  },
];

export function Sidebar() {
  const { user } = useAuthStore();
  const { mutate: logout } = useLogout();     // ← add
  const [userMenuOpen, setUserMenuOpen] = useState(false);  // ← add
  const menuRef = useRef<HTMLDivElement>(null);   // ← add

  // Close dropdown when clicking outside  ← add this block
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <aside className="w-60 shrink-0 h-screen flex flex-col bg-white border-r 
                      border-slate-100 overflow-y-auto">

      {/* Logo + workspace */}
      <div className="px-4 py-4 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-indigo-600 
                          to-purple-600 flex items-center justify-center">
            <Brain size={16} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">CiteDocs</p>
            <p className="text-xs text-slate-400">Enterprise Workspace</p>
          </div>
        </div>
        <ChevronDown size={14} className="text-slate-400" />
      </div>

      {/* Nav sections */}
      <nav className="flex-1 px-3 py-4 space-y-5">
        {/* Dashboard — standalone */}
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors
             ${isActive
              ? "bg-indigo-50 text-indigo-600"
              : "text-slate-600 hover:bg-slate-50"}`
          }
        >
          <LayoutDashboard size={16} />
          Dashboard
        </NavLink>

        {navSections.map((section) => (
          <div key={section.label}>
            <p className="text-[10px] font-semibold text-slate-400 px-3 mb-1 
                          tracking-wider uppercase">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-lg text-sm 
                     transition-colors
                     ${isActive
                      ? "bg-indigo-50 text-indigo-600 font-medium"
                      : "text-slate-600 hover:bg-slate-50"}`
                  }
                >
                  <span className="flex items-center gap-2.5">
                    {item.icon}
                    {item.label}
                  </span>
                  {item.badge && (
                    <span className="text-[10px] bg-indigo-600 text-white 
                                     px-1.5 py-0.5 rounded-full font-medium">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom — Settings + AI Credits + User */}
      <div className="px-3 pb-4 space-y-2 border-t border-slate-100 pt-3">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors
             ${isActive
              ? "bg-indigo-50 text-indigo-600 font-medium"
              : "text-slate-600 hover:bg-slate-50"}`
          }
        >
          <Settings size={16} />
          Settings
        </NavLink>

        {/* AI Credits bar */}
        <div className="bg-indigo-50 rounded-xl px-3 py-2.5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1.5 text-xs font-medium text-indigo-700">
              <Zap size={12} />
              AI Credits
            </span>
            <span className="text-xs text-slate-500">7.4k / 10k</span>
          </div>
          <div className="h-1.5 bg-white rounded-full overflow-hidden">
            <div className="h-full w-[74%] bg-linear-to-r from-indigo-500 
                            to-purple-500 rounded-full" />
          </div>
          <button className="text-xs text-indigo-600 font-medium mt-1.5">
            Upgrade plan →
          </button>
        </div>

        {/* User */}
        {/* User — replace the existing user div with this */}
        <div className="relative">
          <button
            onClick={() => setUserMenuOpen((v) => !v)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg 
                      hover:bg-slate-100 transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center 
                            justify-center text-white text-xs font-semibold shrink-0">
              {user?.fullName?.charAt(0) ?? "U"}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-medium text-slate-900 truncate">
                {user?.fullName ?? "User"}
              </p>
              <p className="text-[10px] text-slate-400">Pro Plan</p>
            </div>
            <ChevronDown
              size={12}
              className={`text-slate-400 transition-transform 
                          ${userMenuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Dropdown */}
          {userMenuOpen && (
            <div
              ref={menuRef}
              className="absolute bottom-full left-0 w-full mb-1 bg-white border 
                        border-slate-200 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="px-3 py-2.5 border-b border-slate-100">
                <p className="text-xs font-medium text-slate-900">
                  {user?.fullName}
                </p>
                <p className="text-[10px] text-slate-400">{user?.email}</p>
              </div>
              <button
                onClick={() => logout()}
                className="w-full flex items-center gap-2 px-3 py-2.5 text-sm 
                          text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut size={14} />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}