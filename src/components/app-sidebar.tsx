import type { User } from "@/models/user.model";
import { NavUser } from "./nav-user";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, useSidebar } from "./ui/sidebar";
import NavMain from "./nav-main";
import { sidebarData } from "@/config/navigation.config";

export function AppSideBar() {
    const { open} = useSidebar();
    const testUser: User = {
        cognitoId: "dgjiuwghiuwegbwGBIWGWG",
        name: "Connel",
        surname: "Manhica",
        email: "connel.l.manhica23@gmail.com"
    }
    return (
        <Sidebar variant="sidebar" collapsible="icon">
            <SidebarHeader className="heading1 text-center p-7">
                 <h1>{open ? "ἌΘΛΟΝ." : "Ἄ."}</h1>    
            </SidebarHeader>
            <SidebarContent className="p-7">
                <NavMain items={sidebarData.navMain}/>
            </SidebarContent>
            <SidebarFooter className="p-7">
                <NavUser user={testUser}/>
            </SidebarFooter> 
        </Sidebar>
    );
}
