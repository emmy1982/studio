import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Waves,
  LayoutDashboard,
  History,
  Settings,
  Music4,
  Timer,
} from "lucide-react";

const menuItems = [
  {
    href: "#daily-meditation",
    icon: LayoutDashboard,
    label: "Meditación",
    tooltip: "Meditación",
  },
  {
    href: "#session-history",
    icon: History,
    label: "Historial",
    tooltip: "Historial",
  },
  {
    href: "#timer",
    icon: Timer,
    label: "Temporizador",
    tooltip: "Temporizador",
  },
  {
    href: "#ambient-sound-generator",
    icon: Music4,
    label: "Paisajes Sonoros IA",
    tooltip: "Paisajes Sonoros IA",
  },
  {
    href: "#settings",
    icon: Settings,
    label: "Ajustes",
    tooltip: "Ajustes",
  },
];

export default function AppSidebar() {
  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/20 text-primary p-2 rounded-lg">
            <Waves className="h-6 w-6" />
          </div>
          <h1 className="text-xl font-bold text-sidebar-foreground font-headline">
            Zenith Diario
          </h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <a href={item.href}>
                <SidebarMenuButton tooltip={item.tooltip}>
                  <item.icon />
                  {item.label}
                </SidebarMenuButton>
              </a>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  );
}
