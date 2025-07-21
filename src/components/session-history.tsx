import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Heart, Play } from "lucide-react";
import Image from "next/image";

const history = [
  {
    title: "Morning Energy",
    duration: "10 min",
    image: "https://placehold.co/100x100.png",
    hint: "sunrise mountain",
  },
  {
    title: "Mindful Work",
    duration: "5 min",
    image: "https://placehold.co/100x100.png",
    hint: "calm office",
  },
  {
    title: "Sleep Soundly",
    duration: "15 min",
    image: "https://placehold.co/100x100.png",
    hint: "starry night",
  },
];

export default function SessionHistory() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Session History</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {history.map((item, index) => (
            <li
              key={index}
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
              <Button variant="ghost" size="icon" aria-label="Favorite">
                <Heart className="h-5 w-5 text-muted-foreground transition-colors hover:text-red-500 hover:fill-red-500" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Play">
                <Play className="h-5 w-5 text-muted-foreground" />
              </Button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
