import type { LucideIcon } from "lucide-react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { Link } from "react-router-dom";

interface NavItem {
  title: string;
  url: string;
  icon?: LucideIcon;
}

interface NavMainProps {
  items: NavItem[];
}

export default function NavMain({ items }: NavMainProps) {
  const { open } = useSidebar();
  return (
    <SidebarGroup>
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                size="lg"
                className={`flex gap-4 ${open ? "justify-start" : " justify-center"}`}
                tooltip={item.title}
              >
                {item.icon && <item.icon size="icon-lg" strokeWidth={0.8}/>}
                {open && (
                  <Link to={item.url} className="heading4">
                    {item.title}
                  </Link>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </SidebarGroup>
  );
}
