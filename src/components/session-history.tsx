
"use client";

import { useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Heart, Play, Pause } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const history = [
  {
    id: "1",
    title: "Energía Matutina",
    duration: "10 min",
    image: "https://placehold.co/100x100.png",
    hint: "sunrise mountain",
    audioSrc: "/audio/sample-meditation.mp3",
  },
  {
    id: "2",
    title: "Trabajo Consciente",
    duration: "5 min",
    image: "https://placehold.co/100x100.png",
    hint: "calm office",
    audioSrc: "/audio/sample-meditation.mp3",
  },
  {
    id: "3",
    title: "Duerme Profundamente",
    duration: "15 min",
    image: "https://placehold.co/100x100.png",
    hint: "starry night",
    audioSrc: "/audio/sample-meditation.mp3",
  },
  {
    id: "4",
    title: "Visitando el modo ser",
    duration: "5 min",
    image: "https://placehold.co/100x100.png",
    hint: "night stars",
    description: "Esta meditación un poco más larga que la anterior, 5 minutos, te permite explorar el modo ser en oposición al modo hacer en el cual estamos habitualmente.",
    audioSrc: "/audio/Visitando_Modo_Ser.mp3",
  },
];

export default function SessionHistory() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = (id: string, src: string) => {
    if (audioRef.current && playingId === id) {
      audioRef.current.pause();
      setPlayingId(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const newAudio = new Audio(src);
      audioRef.current = newAudio;
      newAudio.play();
      setPlayingId(id);
      newAudio.onended = () => setPlayingId(null);
    }
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>Historial de Sesiones</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {history.map((item) => (
            <li
              key={item.id}
              className="flex items-center gap-4 p-2 -m-2 rounded-lg transition-colors hover:bg-accent/50"
            >
              <Image
                src={item.image}
                alt={item.title}
                width={64}
                height={64}
                className="rounded-lg"
                data-ai-hint={item.hint}
              />
              <div className="flex-1">
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-muted-foreground">
                  {item.duration}
                </p>
              </div>
              <Button variant="ghost" size="icon" aria-label="Favorito">
                <Heart className="h-5 w-5 text-muted-foreground transition-colors hover:text-red-500 hover:fill-red-500" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label={playingId === item.id ? "Pausar" : "Reproducir"}
                onClick={() => togglePlay(item.id, item.audioSrc)}
              >
                {playingId === item.id ? (
                  <Pause className="h-5 w-5 text-primary" />
                ) : (
                  <Play className="h-5 w-5 text-muted-foreground" />
                )}
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
