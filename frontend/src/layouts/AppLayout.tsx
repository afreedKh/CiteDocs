import { Outlet } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { PageContainer } from "../components/layout/PageContainer";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <PageContainer>
        <Outlet />
      </PageContainer>
    </div>
  );
}