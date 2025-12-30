"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, type ReactNode } from "react";

import { reownAppKit } from "@/context/appkit";

type Mode = "patient" | "physician";
type Theme = "light" | "dark";

function setModeCookie(mode: Mode) {
  // 1 year
  const maxAgeSeconds = 60 * 60 * 24 * 365;
  document.cookie = `medichat_mode=${mode}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
}

function clearModeCookie() {
  document.cookie = "medichat_mode=; Path=/; Max-Age=0; SameSite=Lax";
}

function setThemeCookie(theme: Theme) {
  // 1 year
  const maxAgeSeconds = 60 * 60 * 24 * 365;
  document.cookie = `medichat_theme=${theme}; Path=/; Max-Age=${maxAgeSeconds}; SameSite=Lax`;
}

function isDarkThemeActive() {
  return document.documentElement.classList.contains("dark");
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.style.colorScheme = theme;
  setThemeCookie(theme);
}

function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === "dark") {
    // Sun icon (switch to light)
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19v2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.22 4.22l1.42 1.42" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.36 18.36l1.42 1.42" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 12h2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.22 19.78l1.42-1.42" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.36 5.64l1.42-1.42" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    );
  }

  // Moon icon (switch to dark)
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
      />
    </svg>
  );
}

function NavLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      className={[
        "text-sm px-3 py-2 rounded",
        active
          ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
          : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-900",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export function AppShell({
  mode,
  children,
}: {
  mode: Mode;
  children: ReactNode;
}) {
  const router = useRouter();
  const [theme, setTheme] = useState<Theme>("light");

  const links = useMemo(() => {
    if (mode === "physician") {
      return [
        { href: "/physician/patients", label: "Patients" },
        { href: "/physician/invites", label: "Invites" },
      ];
    }
    return [
      { href: "/patient/dashboard", label: "Dashboard" },
      { href: "/patient/map", label: "Health Map" },
      { href: "/patient/data", label: "My Data" },
      { href: "/patient/documents", label: "Documents" },
      { href: "/patient/sharing", label: "Sharing" },
      { href: "/patient/chat", label: "Chat" },
    ];
  }, [mode]);

  useEffect(() => {
    setTheme(isDarkThemeActive() ? "dark" : "light");
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "same-origin",
      });
    } finally {
      clearModeCookie();
      await reownAppKit.disconnect("solana").catch(() => {});
      // Hard navigation to ensure the authed layout is fully torn down.
      window.location.assign("/auth");
    }
  };

  const handleModeChange = (nextMode: Mode) => {
    setModeCookie(nextMode);
    // Hard navigation so the server layout re-reads the cookie reliably.
    window.location.assign(
      nextMode === "physician" ? "/physician/patients" : "/patient/dashboard"
    );
  };

  const toggleTheme = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-50 transition-colors duration-200">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-colors duration-200">
        <div className="mx-auto w-full max-w-5xl px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-semibold">
              MediChat
            </Link>
            <div className="hidden sm:flex items-center gap-1">
              {links.map((l) => (
                <NavLink key={l.href} href={l.href} label={l.label} />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded border border-zinc-200 dark:border-zinc-800 overflow-hidden">
              <button
                type="button"
                onClick={() => handleModeChange("patient")}
                className={[
                  "px-3 py-1.5 text-xs",
                  mode === "patient"
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                    : "hover:bg-zinc-50 dark:hover:bg-zinc-900",
                ].join(" ")}
              >
                Patient
              </button>
              <button
                type="button"
                onClick={() => handleModeChange("physician")}
                className={[
                  "px-3 py-1.5 text-xs",
                  mode === "physician"
                    ? "bg-zinc-900 text-white dark:bg-white dark:text-black"
                    : "hover:bg-zinc-50 dark:hover:bg-zinc-900",
                ].join(" ")}
              >
                Physician
              </button>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="px-3 py-1.5 text-xs rounded border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            >
              <span className="sr-only">Toggle theme</span>
              <ThemeIcon theme={theme} />
            </button>

            <button
              type="button"
              className="px-3 py-1.5 text-xs rounded border border-red-500/30 text-red-700 dark:text-red-200 hover:bg-red-500/10"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl px-4 py-8">{children}</main>

      <footer className="mx-auto w-full max-w-5xl px-4 pb-10 text-xs text-zinc-500 dark:text-zinc-500">
        Not medical advice. If this is an emergency, call your local emergency services.
      </footer>
    </div>
  );
}


