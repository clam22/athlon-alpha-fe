import type { User } from "@/models/user.model";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Bell, CreditCard, EllipsisVertical, LogOut, User2Icon } from "lucide-react";

interface NavUserProps {
  user: User;
}

export function NavUser({ user }: NavUserProps) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu >
      <SidebarMenuItem className="flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground "
            >
              <div className="flex items-center gap-3 basis-10/12 min-w-0">
                <Avatar className="h-8 w-8 shrink-0 rounded-lg grayscale">
                  <AvatarImage src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*H7S-XPdX7F4Y2G9jRRulEQ.jpeg" alt={user.name}/>
                  <AvatarFallback className="lg rounded-b-lg" />
                </Avatar>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="truncate heading6">
                    {user.name + " " + user.surname}
                  </span>
                  <span className="truncate small muted">
                    {user.email}
                  </span>
                </div>
              </div>
              <div className="flex justify-end basis-2/12">
                <EllipsisVertical className="size-4" />
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={6} className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg" side={isMobile ? "bottom" : "right"}>
            <DropdownMenuLabel className="p-0 font-normal py-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src="https://miro.medium.com/v2/resize:fit:720/format:webp/1*H7S-XPdX7F4Y2G9jRRulEQ.jpeg" alt={user.name}/>
                  <AvatarFallback className="lg rounded-b-lg">
                    CM
                  </AvatarFallback>
                </Avatar>
                 <div className="flex flex-col min-w-0 flex-1">
                  <span className="truncate heading6">
                    {user.name + " " + user.surname}
                  </span>
                  <span className="truncate muted">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <User2Icon/>
                    Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <CreditCard/>
                    Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Bell/>
                    Notifications
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator/>
            <DropdownMenuItem>
                <LogOut/>
                Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
