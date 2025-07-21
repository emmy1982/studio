
"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Bell, Play, Forward, RotateCcw, Pause } from "lucide-react";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { useRef, useState, useEffect } from "react";
import type { Meditation } from "./session-history";

interface DailyMeditationProps {
  meditation: Meditation;
  isPlaying: boolean;
  onPlayToggle: (playing: boolean) => void;
}

export default function DailyMeditation({ meditation, isPlaying, onPlayToggle }: DailyMeditationProps) {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (audioRef.current) {
        audioRef.current.src = meditation.audioSrc;
        if (isPlaying) {
            audioRef.current.play().catch(e => console.error("Error playing new audio src:", e));
        }
    }
  }, [meditation, isPlaying]);


  const togglePlayPause = () => {
    onPlayToggle(!isPlaying);
  };

  const seek = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
    }
  };


  return (
    <Card className="overflow-hidden">
       <audio ref={audioRef} src={meditation.audioSrc} onEnded={() => onPlayToggle(false)} />
      <div className="relative h-48 w-full md:h-64">
        <Image
          src={meditation.image}
          alt={meditation.title}
          layout="fill"
          objectFit="cover"
          data-ai-hint={meditation.hint}
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h2 className="text-2xl md:text-3xl font-bold text-white font-headline">
            {meditation.title}
          </h2>
          <p className="text-white/80">{meditation.duration}</p>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Retroceder 10 segundos" onClick={() => seek(-10)}>
              <RotateCcw className="h-5 w-5" />
            </Button>
            <Button size="lg" className="rounded-full w-20 h-20" onClick={togglePlayPause}>
              {isPlaying ? (
                <Pause className="h-8 w-8 fill-primary-foreground" />
              ) : (
                <Play className="h-8 w-8 fill-primary-foreground" />
              )}
              <span className="sr-only">{isPlaying ? "Pausar" : "Reproducir"}</span>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Avanzar 10 segundos" onClick={() => seek(10)}>
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
