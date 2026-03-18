import { AppSideBar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  return (
    <SidebarProvider >
      <AppSideBar />
      <main className="flex p-6 gap-4 w-full min-h-screen">
        <SidebarTrigger />
        <div className="flex flex-col flex-1">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
