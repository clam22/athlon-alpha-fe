import { ModeToggle } from "./components/mode-toggle";
import { ThemeProvider } from "./components/theme-provider";
import { Button } from "./components/ui/button";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  return <ThemeProvider>
    <Toaster/>
    <ModeToggle></ModeToggle>
    <Button>I am Button</Button>
    Hello World
  </ThemeProvider>;
}
