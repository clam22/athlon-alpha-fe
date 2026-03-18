import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, useSidebar } from "./ui/sidebar";

export function AppSideBar() {
    const { } = useSidebar();
    return (
        <Sidebar variant="floating" collapsible="icon">
            <SidebarHeader>
                
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup />
                <SidebarGroup/>
            </SidebarContent>
            <SidebarFooter />
            
        </Sidebar>
    );
}
