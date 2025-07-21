"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Settings as SettingsIcon } from "lucide-react";
import ThemeToggle from "./theme-toggle";


export default function Settings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SettingsIcon />
          Ajustes
        </CardTitle>
        <CardDescription>
          Personaliza tu experiencia en la aplicación.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="theme-mode" className="font-medium">
            Modo Oscuro
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Claro</span>
            <ThemeToggle />
            <span className="text-sm text-muted-foreground">Oscuro</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="notifications-switch" className="font-medium">
            Notificaciones Push
          </Label>
          <Switch id="notifications-switch" disabled />
        </div>
         <div className="flex items-center justify-between">
          <Label htmlFor="sound-effects-switch" className="font-medium">
            Efectos de Sonido
          </Label>
          <Switch id="sound-effects-switch" disabled />
        </div>
      </CardContent>
    </Card>
  )
}
