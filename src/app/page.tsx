
"use client";

import DailyMeditation from "@/components/daily-meditation";
import AppHeader from "@/components/header";
import MeditationTimer from "@/components/meditation-timer";
import SessionHistory from "@/components/session-history";
import Settings from "@/components/settings";
import { useState, useEffect } from "react";
import type { Meditation } from "@/components/session-history";
import { useToast } from "@/hooks/use-toast";
import AmbientSoundGenerator from "@/components/ambient-sound-generator";

const initialMeditations: Meditation[] = [
  {
    id: "0",
    title: "Conecta con tu Respiración",
    duration: "7 min",
    image: "https://placehold.co/600x400.png",
    hint: "zen forest",
    audioSrc: "/audio/sample-meditation.mp3",
  },
  {
    id: "1",
    title: "Energía Matutina",
    duration: "10 min",
    image: "https://placehold.co/600x400.png",
    hint: "sunrise mountain",
    audioSrc: "/audio/sample-meditation.mp3",
  },
  {
    id: "2",
    title: "Trabajo Consciente",
    duration: "5 min",
    image: "https://placehold.co/600x400.png",
    hint: "calm office",
    audioSrc: "/audio/sample-meditation.mp3",
  },
  {
    id: "3",
    title: "Duerme Profundamente",
    duration: "15 min",
    image: "https://placehold.co/600x400.png",
    hint: "starry night",
    audioSrc: "/audio/sample-meditation.mp3",
  },
  {
    id: "4",
    title: "Visitando el modo ser",
    duration: "5 min",
    image: "https://placehold.co/600x400.png",
    hint: "night stars",
    description: "Esta meditación un poco más larga que la anterior, 5 minutos, te permite explorar el modo ser en oposición al modo hacer en el cual estamos habitualmente.",
    audioSrc: "/audio/Visitando_Modo_Ser.mp3",
  },
];


export default function Home() {
  const [meditations, setMeditations] = useState<Meditation[]>(initialMeditations);
  const [currentMeditation, setCurrentMeditation] = useState<Meditation | null>(null);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedMeditations = localStorage.getItem("meditations");
      if (storedMeditations) {
        const parsedMeditations = JSON.parse(storedMeditations);
        setMeditations(parsedMeditations);
        setCurrentMeditation(parsedMeditations[0]);
      } else {
        setMeditations(initialMeditations);
        setCurrentMeditation(initialMeditations[0]);
      }
    } catch (error) {
      console.error("Failed to parse meditations from localStorage", error);
      setMeditations(initialMeditations);
      setCurrentMeditation(initialMeditations[0]);
    }
  }, []);

  const handleSelectMeditation = (meditation: Meditation, play: boolean) => {
    setCurrentMeditation(meditation);
    if(play) {
      setPlayingId(meditation.id);
    } else {
      setPlayingId(null);
    }
  };

  if (!currentMeditation) {
    return <div>Cargando...</div>; 
  }

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
