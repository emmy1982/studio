"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateAmbientSoundAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader, Music4 } from "lucide-react";

const formSchema = z.object({
  keywords: z
    .string()
    .min(3, { message: "Please enter at least 3 characters." })
    .max(50, { message: "Please enter no more than 50 characters." }),
});

export default function AmbientSoundGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      keywords: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setAudioSrc(null);

    try {
      const result = await generateAmbientSoundAction(values.keywords);
      if (result.success && result.data) {
        setAudioSrc(result.data);
      } else {
        toast({
          variant: "destructive",
          title: "Generation Failed",
          description: result.error || "An unknown error occurred.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
      });
    }

    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music4 />
          AI Ambient Sound Generator
        </CardTitle>
        <CardDescription>
          Create a personalized soundscape for focus or relaxation. Try "calm
          rain on a window" or "gentle ocean waves".
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Describe your sound</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Forest stream, birds chirping"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Soundscape"
              )}
            </Button>
          </form>
        </Form>
        {audioSrc && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Your Soundscape</h3>
            <audio controls autoPlay src={audioSrc} className="w-full">
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
