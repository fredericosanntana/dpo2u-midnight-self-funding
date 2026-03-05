import { Link, useLocation } from "wouter";
import { Activity, Code2, Home } from "lucide-react";

const navItems = [
  { href: "/", label: "HOME", icon: Home },
  { href: "/contracts", label: "CONTRACTS", icon: Code2 },
  { href: "/dashboard", label: "DASHBOARD", icon: Activity },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* NavBar */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[oklch(0.82_0.18_195/0.2)] bg-[oklch(0.04_0_0/0.9)] backdrop-blur-md">
        <div className="container flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline">
            <div className="w-8 h-8 border border-[oklch(0.82_0.18_195/0.6)] flex items-center justify-center">
              <span className="font-display text-xs font-black text-neon-cyan">D2U</span>
            </div>
            <span
              className="glitch-text font-display text-sm font-black tracking-widest text-white hidden sm:inline"
              data-text="DPO2U"
            >
              DPO2U
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs tracking-widest uppercase no-underline transition-colors ${
                    isActive
                      ? "text-[oklch(0.82_0.18_195)] border-b-2 border-[oklch(0.82_0.18_195)]"
                      : "text-[oklch(0.5_0_0)] hover:text-[oklch(0.82_0.18_195/0.7)]"
                  }`}
                >
                  <item.icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Network Badge */}
          <div className="font-mono text-xs tracking-widest uppercase border border-[oklch(0.82_0.18_195/0.4)] text-[oklch(0.82_0.18_195)] px-2 py-0.5">
            DEVNET
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-14">{children}</main>

      {/* Footer */}
      <footer className="border-t border-[oklch(0.82_0.18_195/0.1)] py-6">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-mono text-xs text-[oklch(0.35_0_0)] tracking-wide">
            DPO2U SELF-FUNDING PROTOCOL // MIDNIGHT NETWORK
          </p>
          <div className="flex items-center gap-2">
            <span className="status-online" />
            <span className="font-mono text-xs text-[oklch(0.5_0_0)]">COMPACT v0.29.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
