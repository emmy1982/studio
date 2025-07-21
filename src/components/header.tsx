import { SidebarTrigger } from "@/components/ui/sidebar";
import DailyReminder from "./daily-reminder";

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex items-center h-16 px-4 bg-background/80 backdrop-blur-sm border-b md:px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="md:hidden" />
        <h1 className="text-lg font-semibold md:text-xl font-headline">Zenith Diario</h1>
      </div>
      <div className="ml-auto">
        <DailyReminder />
      </div>
    </header>
  );
}
