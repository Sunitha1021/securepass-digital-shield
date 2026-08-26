import { Github, Linkedin, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-glass-border py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-cyan to-violet text-primary-foreground">
              <Shield className="size-5" strokeWidth={2.4} />
            </span>
            <span className="font-display text-lg font-bold">
              Secure<span className="gradient-text">Pass</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Built with Python and React</p>
        </div>

        <nav className="flex flex-wrap items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-glass-border bg-glass px-4 py-2 text-sm transition-colors hover:border-cyan/50 hover:text-cyan"
          >
            <Github className="size-4" /> GitHub
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-glass-border bg-glass px-4 py-2 text-sm transition-colors hover:border-cyan/50 hover:text-cyan"
          >
            <Linkedin className="size-4" /> LinkedIn
          </a>
        </nav>
      </div>
      <p className="mx-auto mt-8 max-w-6xl px-4 text-xs text-muted-foreground sm:px-6">
        © {new Date().getFullYear()} SecurePass. All rights reserved.
      </p>
    </footer>
  );
}
