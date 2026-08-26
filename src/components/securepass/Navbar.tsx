import { useState } from "react";
import { Github, Menu, Moon, Shield, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#generator", label: "Generator" },
  { href: "#checker", label: "Password Checker" },
  { href: "#features", label: "Features" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav className="glass-card mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#home" className="group flex items-center gap-2.5">
          <span className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-cyan to-violet text-primary-foreground">
            <Shield className="size-5" strokeWidth={2.4} />
            <span className="absolute inset-0 animate-pulse-ring rounded-xl border border-cyan/60" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Secure<span className="gradient-text">Pass</span>
          </span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <Button asChild variant="cyber" className="hidden sm:inline-flex">
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="size-4" />
              GitHub
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>
      </nav>

      <div
        className={cn(
          "glass-card mx-auto mt-2 max-w-6xl overflow-hidden transition-all duration-300 lg:hidden",
          open ? "max-h-96 opacity-100" : "pointer-events-none max-h-0 border-0 opacity-0",
        )}
      >
        <div className="flex flex-col p-2">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg px-4 py-3 text-sm text-muted-foreground hover:text-foreground"
          >
            <Github className="size-4" /> GitHub
          </a>
        </div>
      </div>
    </header>
  );
}
