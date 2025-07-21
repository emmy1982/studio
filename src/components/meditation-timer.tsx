
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
import { Label } from "./ui/label";

const ambientSounds = [
    { id: 'none', name: 'Sin Sonido', src: '' },
    { id: 'calm-1', name: 'Meditación Guiada', src: '/audio/sample-meditation.mp3' },
    { id: 'calm-2', name: 'Modo Ser', src: '/audio/Visitando_Modo_Ser.mp3' },
];


export default function MeditationTimer() {
  const [duration, setDuration] = useState(300); // 5 minutes in seconds
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedSound, setSelectedSound] = useState(ambientSounds[0].src);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);


  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
    audioRef.current?.pause();
  }, []);

  const startTimer = useCallback(() => {
    if (timeLeft > 0) {
      setIsRunning(true);
      if (selectedSound && audioRef.current) {
        audioRef.current?.play().catch(e => console.error("Error al reproducir audio:", e));
      }
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            stopTimer();
            if(audioRef.current) {
                audioRef.current.currentTime = 0;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [stopTimer, selectedSound, timeLeft]);

  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);
  
  useEffect(() => {
    setTimeLeft(duration);
    stopTimer();
  }, [duration, stopTimer]);

  useEffect(() => {
    if (audioRef.current) {
      if (selectedSound) {
        audioRef.current.src = selectedSound;
        if (isRunning) {
          audioRef.current.play().catch(e => console.error("Error al reproducir nuevo sonido:", e));
        }
      } else {
        audioRef.current.pause();
        audioRef.current.removeAttribute('src');
      }
    }
  }, [selectedSound, isRunning]);


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
     if(audioRef.current) {
        audioRef.current.currentTime = 0;
    }
  };

  const handleDurationChange = (value: string) => {
    setDuration(parseInt(value, 10));
  };

  const handleSoundChange = (value: string) => {
    setSelectedSound(value);
  }
  
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <Card>
      {selectedSound && <audio ref={audioRef} loop />}
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
        <div className="grid w-full max-w-sm items-center gap-4">
             <div>
                <Label htmlFor="duration-select">Duración</Label>
                <Select onValueChange={handleDurationChange} defaultValue={String(duration)} disabled={isRunning}>
                  <SelectTrigger id="duration-select">
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
             <div>
                <Label htmlFor="sound-select">Sonido de Fondo</Label>
                 <Select onValueChange={handleSoundChange} defaultValue={selectedSound}>
                    <SelectTrigger id="sound-select">
                        <SelectValue placeholder="Selecciona un sonido" />
                    </SelectTrigger>
                    <SelectContent>
                        {ambientSounds.map(sound => (
                            <SelectItem key={sound.id} value={sound.src}>{sound.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
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
