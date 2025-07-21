"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, TimerIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function MeditationTimer() {
  const [duration, setDuration] = useState(300); // 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  }, []);

  const startTimer = useCallback(() => {
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          stopTimer();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [stopTimer]);

  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);
  
  useEffect(() => {
    setTimeLeft(duration);
    stopTimer();
  }, [duration, stopTimer]);

  const toggleTimer = () => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  const resetTimer = () => {
    stopTimer();
    setTimeLeft(duration);
  };

  const handleDurationChange = (value: string) => {
    setDuration(parseInt(value, 10));
  };
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TimerIcon />
          Temporizador de Meditación
        </CardTitle>
        <CardDescription>
          Usa este temporizador para tus sesiones de meditación no guiada.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center space-y-6">
        <div className="text-6xl font-mono font-bold tracking-widest">
          {formatTime(timeLeft)}
        </div>
        <div className="flex w-full max-w-sm items-center space-x-4">
            <Select onValueChange={handleDurationChange} defaultValue={String(duration)} disabled={isRunning}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona duración" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="60">1 Minuto</SelectItem>
                <SelectItem value="300">5 Minutos</SelectItem>
                <SelectItem value="600">10 Minutos</SelectItem>
                <SelectItem value="900">15 Minutos</SelectItem>
                <SelectItem value="1800">30 Minutos</SelectItem>
              </SelectContent>
            </Select>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={resetTimer} aria-label="Reiniciar temporizador">
            <RotateCcw className="h-6 w-6" />
          </Button>
          <Button size="lg" className="rounded-full w-20 h-20" onClick={toggleTimer}>
            {isRunning ? (
              <Pause className="h-8 w-8 fill-primary-foreground" />
            ) : (
              <Play className="h-8 w-8 fill-primary-foreground" />
            )}
            <span className="sr-only">{isRunning ? "Pausar" : "Iniciar"}</span>
          </Button>
           <div className="w-10 h-10"></div>
        </div>
      </CardContent>
    </Card>
  );
}
