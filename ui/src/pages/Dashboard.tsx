import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import StatsGrid from "../components/StatsGrid.tsx";
import data from "../data/deployed.json";

const chartData = data.contracts.map((c) => ({
  name: c.name.replace(/([A-Z])/g, " $1").trim(),
  fees: Number(BigInt(c.fees) / 1_000_000n),
  circuits: c.circuits.length,
}));

const COLORS = [
  "oklch(0.82 0.18 195)", // cyan
  "oklch(0.68 0.28 330)", // magenta
  "oklch(0.72 0.2 145)",  // green
];

export default function Dashboard() {
  return (
    <div className="min-h-screen hex-bg">
      <section className="pt-24 pb-16">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <p className="error-code mb-2">[NETWORK_DASHBOARD]</p>
            <h1 className="font-display text-3xl font-black uppercase tracking-widest text-neon-cyan mb-2">
              Dashboard
            </h1>
            <p className="font-mono text-sm text-[oklch(0.5_0_0)] tracking-wide">
              Deployment analytics // {data.network} // {data.deployedAt}
            </p>
            <div className="loading-bar mt-4 w-24" />
          </div>

          {/* Stats Grid */}
          <StatsGrid
            totalContracts={data.contracts.length}
            totalCircuits={data.totalCircuits}
            totalFees={data.totalFees}
            network={data.network}
          />

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            {/* Fees Chart */}
            <div className="card-cyber p-5">
              <p className="error-code mb-1">[FEE_DISTRIBUTION]</p>
              <h3 className="font-display text-sm font-black tracking-widest text-white mb-4">
                Deployment Fees
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "oklch(0.5 0 0)", fontFamily: "Share Tech Mono", fontSize: 10 }}
                      axisLine={{ stroke: "oklch(0.2 0.05 195)" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "oklch(0.5 0 0)", fontFamily: "Share Tech Mono", fontSize: 10 }}
                      axisLine={{ stroke: "oklch(0.2 0.05 195)" }}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "oklch(0.07 0.01 195)",
                        border: "1px solid oklch(0.82 0.18 195 / 0.3)",
                        borderRadius: 0,
                        fontFamily: "Share Tech Mono",
                        fontSize: 12,
                        color: "oklch(0.82 0.18 195)",
                      }}
                      formatter={(value: number) => [`${value.toLocaleString()}M`, "Fees"]}
                    />
                    <Bar dataKey="fees" radius={[2, 2, 0, 0]}>
                      {chartData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} fillOpacity={0.7} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Circuits Chart */}
            <div className="card-cyber p-5">
              <p className="error-code mb-1">[CIRCUIT_ANALYSIS]</p>
              <h3 className="font-display text-sm font-black tracking-widest text-white mb-4">
                Circuits per Contract
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis
                      dataKey="name"
                      tick={{ fill: "oklch(0.5 0 0)", fontFamily: "Share Tech Mono", fontSize: 10 }}
                      axisLine={{ stroke: "oklch(0.2 0.05 195)" }}
                      tickLine={false}
                    />
                    <YAxis
                      tick={{ fill: "oklch(0.5 0 0)", fontFamily: "Share Tech Mono", fontSize: 10 }}
                      axisLine={{ stroke: "oklch(0.2 0.05 195)" }}
                      tickLine={false}
                      allowDecimals={false}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "oklch(0.07 0.01 195)",
                        border: "1px solid oklch(0.82 0.18 195 / 0.3)",
                        borderRadius: 0,
                        fontFamily: "Share Tech Mono",
                        fontSize: 12,
                        color: "oklch(0.68 0.28 330)",
                      }}
                      formatter={(value: number) => [value, "Circuits"]}
                    />
                    <Bar dataKey="circuits" radius={[2, 2, 0, 0]}>
                      {chartData.map((_, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} fillOpacity={0.5} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Deploy Table */}
          <div className="card-cyber mt-8">
            <div className="p-5 border-b border-[oklch(0.82_0.18_195/0.1)]">
              <p className="error-code mb-1">[DEPLOY_REGISTRY]</p>
              <h3 className="font-display text-sm font-black tracking-widest text-white">
                Deployment Log
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[oklch(0.82_0.18_195/0.1)]">
                    {["Contract", "Address", "Block", "Circuits", "Fees", "Status"].map((h) => (
                      <th key={h} className="mono-label text-left px-5 py-3">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.contracts.map((c) => (
                    <tr
                      key={c.name}
                      className="border-b border-[oklch(0.82_0.18_195/0.05)] hover:bg-[oklch(0.82_0.18_195/0.03)] transition-colors"
                    >
                      <td className="px-5 py-3 font-mono text-xs text-white">{c.name}</td>
                      <td className="px-5 py-3 hash-display">
                        {c.address.slice(0, 10)}...{c.address.slice(-8)}
                      </td>
                      <td className="px-5 py-3 font-mono text-xs text-[oklch(0.82_0.18_195)]">
                        #{c.blockHeight}
                      </td>
                      <td className="px-5 py-3 font-mono text-xs text-[oklch(0.68_0.28_330)]">
                        {c.circuits.length}
                      </td>
                      <td className="px-5 py-3 font-mono text-xs text-[oklch(0.85_0.2_80)]">
                        {Number(BigInt(c.fees) / 1_000_000n).toLocaleString()}M
                      </td>
                      <td className="px-5 py-3">
                        <span className="flex items-center gap-1.5">
                          <span className="status-online" />
                          <span className="font-mono text-xs tracking-widest text-[oklch(0.72_0.2_145)]">
                            {c.status.toUpperCase()}
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
