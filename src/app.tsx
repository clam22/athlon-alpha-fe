import { useEffect } from "react";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ModeToggle } from "@/components/mode-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import AppRouter from "@/router";
import { initApi } from "@/config/base-http-client.config";

export function App() {
  useEffect(() => {
    initApi();
  }, []);
  return (
    <ThemeProvider>
      <AppRouter />
      <Toaster richColors />
    </ThemeProvider>
  );
}
