
"use client";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Play, Forward, RotateCcw, Pause } from "lucide-react";
import { useRef, useEffect } from "react";
import type { Meditation } from "./session-history";

interface DailyMeditationProps {
  meditation: Meditation;
  isPlaying: boolean;
  onPlayToggle: (playing: boolean) => void;
}

export default function DailyMeditation({ meditation, isPlaying, onPlayToggle }: DailyMeditationProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Efecto para controlar la reproducción/pausa
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      // play() devuelve una promesa que puede ser rechazada si es interrumpida.
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // La interrupción automática es normal, no es necesario registrarla.
          if (error.name !== 'AbortError') {
            console.error("Error al reproducir el audio:", error);
          }
        });
      }
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  // Efecto para cambiar la fuente del audio cuando cambia la meditación
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Solo cambiamos la fuente si es diferente
    const currentSrcUrl = new URL(audio.src);
    if (currentSrcUrl.pathname !== meditation.audioSrc) {
        audio.src = meditation.audioSrc;
        // Si estaba sonando, cargamos y reproducimos la nueva pista.
        if (isPlaying) {
            audio.load();
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    if (error.name !== 'AbortError') {
                      console.error("Error al reproducir nueva pista:", error);
                    }
                });
            }
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
       <audio 
        ref={audioRef} 
        src={meditation.audioSrc} 
        onEnded={() => onPlayToggle(false)} 
        onLoadedData={() => {
          if (isPlaying && audioRef.current?.paused) {
            audioRef.current.play().catch(e => console.error("Error de reproducción post-carga:", e));
          }
        }}
       />
      <div className="relative h-48 w-full md:h-64">
        <Image
          src={meditation.image}
          alt={meditation.title}
          layout="fill"
          objectFit="cover"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z/C/GgAJ0gL+C31jZAAAAABJRU5ErkJggg=="
          data-ai-hint={meditation.hint}
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
        <div className="flex items-center justify-center gap-4">
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
        </div>
      </CardContent>
    </Card>
  );
}
