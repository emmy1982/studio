
"use client";

import AmbientSoundGenerator from "@/components/ambient-sound-generator";
import DailyMeditation from "@/components/daily-meditation";
import AppHeader from "@/components/header";
import MeditationTimer from "@/components/meditation-timer";
import SessionHistory from "@/components/session-history";
import Settings from "@/components/settings";
import { useState } from "react";
import type { Meditation } from "@/components/session-history";
import { generateImageAction } from "./actions";
import { useToast } from "@/hooks/use-toast";

const initialMeditations: Meditation[] = [
  {
    id: "0",
    title: "Conecta con tu Respiración",
    duration: "7 min",
    image: "https://placehold.co/1200x400.png",
    hint: "zen forest",
    audioSrc: "/audio/sample-meditation.mp3",
  },
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


export default function Home() {
  const [meditations, setMeditations] = useState<Meditation[]>(initialMeditations);
  const [currentMeditation, setCurrentMeditation] = useState<Meditation>(initialMeditations[0]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSelectMeditation = (meditation: Meditation, play: boolean) => {
    setCurrentMeditation(meditation);
    if(play) {
      setPlayingId(meditation.id);
    } else {
      setPlayingId(null);
    }
  };

  const handleGenerateImage = async (meditationId: string, prompt: string) => {
    const result = await generateImageAction(prompt);

    if (result.success && result.data) {
      const newImageUrl = result.data;
      
      setMeditations(prevMeditations =>
        prevMeditations.map(m =>
          m.id === meditationId ? { ...m, image: newImageUrl } : m
        )
      );
      
      if (currentMeditation.id === meditationId) {
        setCurrentMeditation(prev => ({ ...prev, image: newImageUrl }));
      }

    } else {
      toast({
        variant: "destructive",
        title: "Falló la generación de imagen",
        description: result.error || "Ocurrió un error desconocido.",
      });
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <section id="daily-meditation">
          <DailyMeditation 
            meditation={currentMeditation}
            isPlaying={playingId === currentMeditation.id}
            onPlayToggle={(playing) => setPlayingId(playing ? currentMeditation.id : null)}
          />
        </section>
        <section id="session-history">
          <SessionHistory 
            history={meditations.filter(m => m.id !== '0')}
            onSelectMeditation={handleSelectMeditation}
            playingId={playingId}
            onGenerateImage={handleGenerateImage}
          />
        </section>
        <section id="timer">
          <MeditationTimer />
        </section>
        <section id="ambient-sound-generator">
          <AmbientSoundGenerator />
        </section>
        <section id="settings">
          <Settings />
        </section>
      </main>
    </div>
  );
}
