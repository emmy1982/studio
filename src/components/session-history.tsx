
"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Heart, Play, Pause } from "lucide-react";
import Image from "next/image";

export interface Meditation {
  id: string;
  title: string;
  duration: string;
  image: string;
  hint: string;
  audioSrc: string;
  description?: string;
}

interface SessionHistoryProps {
  history: Meditation[];
  playingId: string | null;
  onSelectMeditation: (meditation: Meditation, play: boolean) => void;
}

export default function SessionHistory({ history, playingId, onSelectMeditation }: SessionHistoryProps) {

  const handlePlayClick = (meditation: Meditation) => {
    const isCurrentlyPlaying = playingId === meditation.id;
    onSelectMeditation(meditation, !isCurrentlyPlaying);
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
                unoptimized
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
                onClick={() => handlePlayClick(item)}
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
