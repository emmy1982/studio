import AmbientSoundGenerator from "@/components/ambient-sound-generator";
import DailyMeditation from "@/components/daily-meditation";
import AppHeader from "@/components/header";
import SessionHistory from "@/components/session-history";

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
        <section id="session-history">
          <SessionHistory />
        </section>
      </main>
    </div>
  );
}
