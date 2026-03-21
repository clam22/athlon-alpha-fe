import { AppSideBar } from "@/components/app-sidebar";
import SiteHeader from "@/components/site-header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

export function DashboardLayout() {
  return (
    <SidebarProvider >
      <AppSideBar />
      <main className="flex-col w-full h-full p-7">
       <SiteHeader pageName="Users"/>
        <div className="flex flex-col flex-1">
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
}
