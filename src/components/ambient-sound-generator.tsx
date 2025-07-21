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
    .min(3, { message: "Por favor, introduce al menos 3 caracteres." })
    .max(50, { message: "Por favor, no introduzcas más de 50 caracteres." }),
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
          title: "Falló la generación",
          description: result.error || "Ocurrió un error desconocido.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Falló la generación",
        description:
          error instanceof Error ? error.message : "Ocurrió un error desconocido.",
      });
    }

    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music4 />
          Generador de Sonido Ambiental con IA
        </CardTitle>
        <CardDescription>
          Crea un paisaje sonoro personalizado para concentrarte o relajarte. Prueba con "lluvia tranquila en una ventana" o "suaves olas del mar".
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
                  <FormLabel>Describe tu sonido</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="p. ej. Arroyo del bosque, pájaros cantando"
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
                  Generando...
                </>
              ) : (
                "Generar Paisaje Sonoro"
              )}
            </Button>
          </form>
        </Form>
        {audioSrc && (
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Tu Paisaje Sonoro</h3>
            <audio controls autoPlay src={audioSrc} className="w-full">
              Tu navegador no soporta el elemento de audio.
            </audio>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
