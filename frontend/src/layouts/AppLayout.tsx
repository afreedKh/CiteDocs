import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/layout/Sidebar";
import { Topbar } from "../components/layout/Topbar";
import { Zap } from "lucide-react";
import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";

const pageMeta: Record<string, { title: string; icon: ReactNode }> = {
  "/dashboard": {
    title: "Dashboard",
    icon: <Zap size={16} className="text-yellow-500" />,
  },
  "/documents": { title: "Documents", icon: <></> },
  "/workspaces": { title: "Workspaces", icon: <></> },
};

export function AppLayout() {
  const { pathname } = useLocation();
  const meta = pageMeta[pathname] ?? { title: "CiteDocs", icon: <></> };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar title={meta.title} icon={meta.icon} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
