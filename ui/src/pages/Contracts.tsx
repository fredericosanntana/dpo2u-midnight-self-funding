import ContractCard from "../components/ContractCard.tsx";
import data from "../data/deployed.json";

export default function Contracts() {
  return (
    <div className="min-h-screen hex-bg">
      <section className="pt-24 pb-16">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <p className="error-code mb-2">[CONTRACT_EXPLORER]</p>
            <h1 className="font-display text-3xl font-black uppercase tracking-widest text-neon-cyan mb-2">
              Deployed Contracts
            </h1>
            <p className="font-mono text-sm text-[oklch(0.5_0_0)] tracking-wide">
              {data.contracts.length} contracts deployed on {data.network} // {data.deployedAt}
            </p>
            <div className="loading-bar mt-4 w-24" />
          </div>

          {/* Contract List */}
          <div className="space-y-4">
            {data.contracts.map((contract) => (
              <ContractCard key={contract.name} contract={contract} />
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 tech-frame p-5 max-w-xl">
            <div className="absolute -top-3 left-4 bg-[oklch(0.04_0_0)] px-2">
              <span className="mono-label text-[oklch(0.82_0.18_195)]">SUMMARY</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <div>
                <p className="mono-label">Contracts</p>
                <p className="font-display text-xl font-black text-[oklch(0.82_0.18_195)]">
                  {data.contracts.length}
                </p>
              </div>
              <div>
                <p className="mono-label">Circuits</p>
                <p className="font-display text-xl font-black text-[oklch(0.68_0.28_330)]">
                  {data.totalCircuits}
                </p>
              </div>
              <div>
                <p className="mono-label">Compiler</p>
                <p className="font-display text-xl font-black text-[oklch(0.72_0.2_145)]">
                  v{data.compilerVersion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
