
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function DailyReminder() {
  const [reminderTime, setReminderTime] = useState("08:00");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleSetReminder = () => {
    // Aquí iría la lógica para guardar el recordatorio.
    // Por ahora, solo mostramos una alerta.
    alert(`Recordatorio establecido para las ${reminderTime}`);
    setIsPopoverOpen(false);
  };

  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Establecer recordatorio diario">
          <Bell className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Recordatorio Diario</h4>
            <p className="text-sm text-muted-foreground">
              Selecciona una hora para recibir un recordatorio para meditar.
            </p>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="reminder-time">Hora del Recordatorio</Label>
            <Input
              id="reminder-time"
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="w-full"
            />
          </div>
          <Button onClick={handleSetReminder}>Establecer Recordatorio</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
