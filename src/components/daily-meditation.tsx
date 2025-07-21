import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Bell, Play, Forward, RotateCcw } from "lucide-react";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

export default function DailyMeditation() {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full md:h-64">
        <Image
          src="https://placehold.co/1200x400.png"
          alt="Exuberante bosque verde"
          layout="fill"
          objectFit="cover"
          data-ai-hint="zen forest"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-headline">
            Conecta con tu Respiración
          </h2>
          <p className="text-white/80">7 min</p>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Retroceder 10 segundos">
              <RotateCcw className="h-5 w-5" />
            </Button>
            <Button size="lg" className="rounded-full w-20 h-20">
              <Play className="h-8 w-8 fill-primary-foreground" />
              <span className="sr-only">Reproducir</span>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Avanzar 10 segundos">
              <Forward className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center space-x-2 p-4 rounded-lg bg-accent/50">
            <Bell className="h-5 w-5 text-accent-foreground" />
            <Label htmlFor="daily-reminder" className="text-accent-foreground">Recordatorio Diario</Label>
            <Switch id="daily-reminder" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
