import AmbientSoundGenerator from "@/components/ambient-sound-generator";
import DailyMeditation from "@/components/daily-meditation";
import AppHeader from "@/components/header";
import MeditationTimer from "@/components/meditation-timer";
import SessionHistory from "@/components/session-history";
import Settings from "@/components/settings";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
        <section id="daily-meditation">
          <DailyMeditation />
        </section>
        <section id="ambient-sound-generator">
          <AmbientSoundGenerator />
        </section>
        <section id="timer">
          <MeditationTimer />
        </section>
        <section id="session-history">
          <SessionHistory />
        </section>
        <section id="settings">
          <Settings />
        </section>
      </main>
    </div>
  );
}
