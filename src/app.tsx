import { LanguageSwitcher } from "./components/language-switcher";
import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/sonner";
import AppRouter from "./router";

export function App() {
  return (
    <ThemeProvider>
      <div className="absolute left-20 top-15 right-20 flex items-center justify-between z-10">
        <h1 className="heading1">ἌΘΛΟΝ</h1>
        <div className="flex gap-4">
          <ModeToggle />
          <LanguageSwitcher />
        </div>
      </div>
      <AppRouter />
      <Toaster richColors />
    </ThemeProvider>
  );
}
