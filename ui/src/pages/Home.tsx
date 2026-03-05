import { Link } from "wouter";
import { Shield, Zap, Code2, Activity, ChevronRight, Lock } from "lucide-react";
import data from "../data/deployed.json";

const features = [
  {
    icon: Lock,
    title: "ZERO-KNOWLEDGE PROOFS",
    desc: "Generate and verify ZK proofs on-chain using Compact circuits. Prove compliance without exposing sensitive data.",
    code: "ERR_0x001",
    color: "text-[oklch(0.82_0.18_195)]",
  },
  {
    icon: Code2,
    title: "COMPACT SMART CONTRACTS",
    desc: "Deploy DPO2U Privacy Protocol contracts on Midnight for autonomous self-funding with $NIGHT tokens.",
    code: "ERR_0x002",
    color: "text-[oklch(0.68_0.28_330)]",
  },
  {
    icon: Shield,
    title: "LGPD/GDPR COMPLIANCE",
    desc: "On-chain compliance verification for Brazilian LGPD and European GDPR regulations with cryptographic proof.",
    code: "ERR_0x003",
    color: "text-[oklch(0.72_0.2_145)]",
  },
  {
    icon: Zap,
    title: "SELF-FUNDING PROTOCOL",
    desc: "Autonomous fee distribution: 40/60 split between compliance experts and auditors, enforced by ZK constraints.",
    code: "ERR_0x004",
    color: "text-[oklch(0.85_0.2_80)]",
  },
];

const specs = [
  { label: "Compact Runtime", value: "0.14.0+" },
  { label: "Compact Compiler", value: "0.29.0" },
  { label: "Language Version", value: "0.21.0" },
  { label: "Midnight.js", value: "v3.1.0+" },
  { label: "Compact JS", value: "v2.4.0" },
  { label: "Wallet SDK", value: "1.0.0+" },
  { label: "Contracts", value: data.contracts.length.toString() },
  { label: "Network", value: "DEVNET" },
];

export default function Home() {
  return (
    <div className="min-h-screen hex-bg">
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Background grid lines */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.82 0.18 195) 1px, transparent 1px), linear-gradient(90deg, oklch(0.82 0.18 195) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container relative z-10">
          <div className="max-w-4xl">
            <p className="error-code mb-6">
              [SYSTEM_BOOT] :: DPO2U_SELF_FUNDING_v1.0.0 :: MIDNIGHT_DEVNET
            </p>

            <div className="mb-6">
              <h1 className="font-display text-5xl md:text-7xl font-black uppercase leading-none mb-2">
                <span
                  className="glitch-text glitch-animate text-white block mb-2 text-3xl md:text-5xl"
                  data-text="DPO2U"
                >
                  DPO2U
                </span>
                <span className="block text-2xl md:text-4xl gradient-text-cyber mt-2">
                  SELF-FUNDING PROTOCOL
                </span>
              </h1>
            </div>

            <p className="font-mono text-sm md:text-base text-[oklch(0.55_0_0)] max-w-2xl mb-8 leading-relaxed tracking-wide">
              Autonomous on-chain DPO combining{" "}
              <span className="text-neon-cyan">LGPD/GDPR compliance</span> with{" "}
              <span className="text-neon-magenta">zero-knowledge proofs</span> and{" "}
              <span className="text-white">self-funding fee distribution</span> on the Midnight Network.
            </p>

            {/* Architecture diagram */}
            <div className="tech-frame p-4 mb-8 max-w-lg bg-[oklch(0.05_0.01_195)]">
              <p className="error-code mb-3">[ARCHITECTURE]</p>
              <pre className="font-mono text-xs text-[oklch(0.55_0_0)] leading-loose">
{`  PaymentGateway
       |
       v
  FeeDistributor ── 40% Expert
       |              60% Auditor
       v
  ComplianceRegistry ── ZK Attestations`}
              </pre>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link href="/contracts" className="no-underline">
                <button className="btn-cyber flex items-center gap-2">
                  <Code2 className="w-3 h-3" />
                  EXPLORE CONTRACTS
                </button>
              </Link>
              <Link href="/dashboard" className="no-underline">
                <button className="btn-cyber btn-cyber-magenta flex items-center gap-2">
                  <Activity className="w-3 h-3" />
                  VIEW DASHBOARD
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative right panel */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden xl:block w-80 opacity-30">
          <div className="border-l border-[oklch(0.82_0.18_195/0.3)] pl-8 space-y-3">
            {["ZERO_KNOWLEDGE", "COMPLIANCE_PROOF", "SELF_FUNDING", "ON_CHAIN_DPO", "MIDNIGHT_NETWORK"].map(
              (item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[oklch(0.82_0.18_195/0.5)]">
                    {String(i).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs text-[oklch(0.4_0_0)] tracking-widest">{item}</span>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-[oklch(0.82_0.18_195/0.15)] bg-[oklch(0.06_0.01_195/0.5)]">
        <div className="container py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "CONTRACTS", value: data.contracts.length },
              { label: "ZK CIRCUITS", value: data.totalCircuits },
              { label: "COMPILER", value: `v${data.compilerVersion}` },
              { label: "STATUS", value: "DEPLOYED" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-2xl font-black text-neon-cyan">{stat.value}</p>
                <p className="mono-label mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container">
          <div className="divider-cyber mb-12">CORE FEATURES</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feat) => (
              <div key={feat.title} className="tech-frame card-cyber p-6 scan-line">
                <div className="absolute -top-3 left-4 bg-[oklch(0.04_0_0)] px-2">
                  <span className="mono-label text-[oklch(0.82_0.18_195)]">{feat.title}</span>
                </div>
                <div className="absolute -bottom-2.5 right-4 bg-[oklch(0.04_0_0)] px-2">
                  <span className="error-code">{feat.code}</span>
                </div>
                <div className="flex items-start gap-4 mt-4">
                  <div className={`p-2 border border-current ${feat.color} opacity-60`}>
                    <feat.icon className="w-5 h-5" />
                  </div>
                  <p className="font-mono text-sm text-[oklch(0.55_0_0)] leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Specs */}
      <section className="py-16 border-t border-[oklch(0.82_0.18_195/0.1)]">
        <div className="container">
          <div className="divider-cyber mb-10">DEPENDENCY MATRIX</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {specs.map((spec) => (
              <div key={spec.label} className="card-cyber p-4 border border-[oklch(0.82_0.18_195/0.15)]">
                <p className="mono-label mb-1">{spec.label}</p>
                <p className="font-mono text-sm text-neon-cyan font-bold">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Attribution */}
      <section className="py-12 border-t border-[oklch(0.82_0.18_195/0.1)]">
        <div className="container">
          <div className="tech-frame max-w-2xl mx-auto text-center p-8 border-[oklch(0.82_0.18_195/0.4)] shadow-[0_0_12px_oklch(0.82_0.18_195/0.15)]">
            <p className="error-code mb-3">[ATTRIBUTION_BLOCK]</p>
            <p className="font-mono text-sm text-[oklch(0.82_0.18_195)] tracking-wide">
              Built on the Midnight Network. Compact smart contracts with ZK proofs.
            </p>
            <div className="flex justify-center gap-3 mt-4">
              <span className="badge-night">midnightntwrk</span>
              <span className="badge-night">compact v0.29.0</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom nav links */}
      <section className="py-10 border-t border-[oklch(0.82_0.18_195/0.1)]">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { href: "/", label: "HOME", desc: "Protocol overview" },
              { href: "/contracts", label: "CONTRACTS", desc: "Explore deployed contracts" },
              { href: "/dashboard", label: "DASHBOARD", desc: "Stats & analytics" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="card-cyber p-4 flex items-center justify-between no-underline"
              >
                <div>
                  <p className="font-mono text-xs text-neon-cyan tracking-widest uppercase">
                    {item.label}
                  </p>
                  <p className="font-mono text-xs text-[oklch(0.4_0_0)] mt-1">{item.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[oklch(0.82_0.18_195/0.4)]" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
