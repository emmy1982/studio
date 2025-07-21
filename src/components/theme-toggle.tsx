"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export default function ThemeToggle() {
  const [theme, setTheme] = React.useState("light");
  
  const isDark = theme === "dark";

  React.useEffect(() => {
    const isDarkInStorage = document.documentElement.classList.contains("dark");
    setTheme(isDarkInStorage ? "dark" : "light");
  }, []);
  
  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Switch
      checked={isDark}
      onCheckedChange={toggleTheme}
      aria-label="Cambiar tema"
    />
  );
}
