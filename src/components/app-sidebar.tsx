import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  Waves,
  LayoutDashboard,
  History,
  Settings,
  Music4,
  Timer,
} from "lucide-react";

export default function AppSidebar() {
  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 text-primary p-2 rounded-lg">
            <Waves className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-sidebar-foreground font-headline">
            Zenith Daily
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Dashboard" isActive>
              <LayoutDashboard />
              Dashboard
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="AI Soundscapes">
              <Music4 />
              AI Soundscapes
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="History">
              <History />
              History
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Timer">
              <Timer />
              Timer
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings />
              Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
