import { FileCode2, Cpu, Coins, Blocks } from "lucide-react";

interface StatsGridProps {
  totalContracts: number;
  totalCircuits: number;
  totalFees: string;
  network: string;
}

function formatFees(fees: string): string {
  const n = BigInt(fees);
  // Show in billions for readability
  const billions = Number(n / 1_000_000n);
  return `${billions.toLocaleString()}M`;
}

const iconClass = "w-5 h-5";

export default function StatsGrid({ totalContracts, totalCircuits, totalFees, network }: StatsGridProps) {
  const stats = [
    {
      label: "CONTRACTS",
      value: totalContracts.toString(),
      icon: <FileCode2 className={`${iconClass} text-[oklch(0.82_0.18_195)]`} />,
      color: "text-[oklch(0.82_0.18_195)]",
    },
    {
      label: "CIRCUITS",
      value: totalCircuits.toString(),
      icon: <Cpu className={`${iconClass} text-[oklch(0.68_0.28_330)]`} />,
      color: "text-[oklch(0.68_0.28_330)]",
    },
    {
      label: "TOTAL FEES",
      value: formatFees(totalFees),
      icon: <Coins className={`${iconClass} text-[oklch(0.85_0.2_80)]`} />,
      color: "text-[oklch(0.85_0.2_80)]",
    },
    {
      label: "NETWORK",
      value: network.toUpperCase(),
      icon: <Blocks className={`${iconClass} text-[oklch(0.72_0.2_145)]`} />,
      color: "text-[oklch(0.72_0.2_145)]",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="card-cyber p-4 text-center">
          <div className="flex justify-center mb-2">{stat.icon}</div>
          <p className={`font-display text-2xl font-black ${stat.color}`}>{stat.value}</p>
          <p className="mono-label mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
