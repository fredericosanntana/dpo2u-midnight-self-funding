import { useState } from "react";
import { ChevronDown, ChevronUp, FileCode2, Cpu } from "lucide-react";

interface Circuit {
  name: string;
  pure: boolean;
  proof: boolean;
  args: string[];
  returns: string;
}

interface ContractData {
  name: string;
  address: string;
  txHash: string;
  blockHeight: number;
  fees: string;
  status: string;
  compilerVersion: string;
  source: string;
  circuits: Circuit[];
}

function truncateHash(hash: string): string {
  return hash.length > 20 ? `${hash.slice(0, 10)}...${hash.slice(-8)}` : hash;
}

function formatFees(fees: string): string {
  const n = BigInt(fees);
  return n.toLocaleString();
}

export default function ContractCard({ contract }: { contract: ContractData }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card-cyber scan-line">
      {/* Header */}
      <div
        className="p-5 cursor-pointer flex items-center justify-between"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-[oklch(0.82_0.18_195/0.4)] flex items-center justify-center">
            <FileCode2 className="w-5 h-5 text-[oklch(0.82_0.18_195)]" />
          </div>
          <div>
            <h3 className="font-display text-sm font-black tracking-widest text-white">
              {contract.name}
            </h3>
            <span className="hash-display">{truncateHash(contract.address)}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Status */}
          <div className="flex items-center gap-1.5">
            <span className="status-online" />
            <span className="font-mono text-xs tracking-widest text-[oklch(0.72_0.2_145)]">
              DEPLOYED
            </span>
          </div>
          {/* Circuits count */}
          <span className="font-mono text-xs text-[oklch(0.5_0_0)]">
            {contract.circuits.length} circuits
          </span>
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-[oklch(0.5_0_0)]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-[oklch(0.5_0_0)]" />
          )}
        </div>
      </div>

      {/* Meta bar */}
      <div className="px-5 pb-4 flex flex-wrap gap-x-6 gap-y-1">
        <div>
          <span className="mono-label">Block</span>
          <span className="font-mono text-xs text-[oklch(0.82_0.18_195)] ml-2">
            #{contract.blockHeight}
          </span>
        </div>
        <div>
          <span className="mono-label">Fees</span>
          <span className="font-mono text-xs text-[oklch(0.85_0.2_80)] ml-2">
            {formatFees(contract.fees)}
          </span>
        </div>
        <div>
          <span className="mono-label">Compiler</span>
          <span className="font-mono text-xs text-[oklch(0.5_0_0)] ml-2">
            v{contract.compilerVersion}
          </span>
        </div>
      </div>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-[oklch(0.82_0.18_195/0.1)]">
          {/* Circuits */}
          <div className="p-5">
            <p className="error-code mb-3">[CIRCUIT_REGISTRY]</p>
            <div className="space-y-3">
              {contract.circuits.map((circuit) => (
                <div
                  key={circuit.name}
                  className="border border-[oklch(0.82_0.18_195/0.15)] bg-[oklch(0.05_0.01_195)] p-3"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Cpu className="w-3.5 h-3.5 text-[oklch(0.68_0.28_330)]" />
                    <span className="font-mono text-sm text-[oklch(0.82_0.18_195)] font-bold">
                      {circuit.name}
                    </span>
                    {circuit.proof && (
                      <span className="font-mono text-xs text-[oklch(0.68_0.28_330)] border border-[oklch(0.68_0.28_330/0.3)] px-1.5 py-0.5">
                        ZK-PROOF
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-xs text-[oklch(0.45_0_0)] space-y-0.5">
                    {circuit.args.length > 0 ? (
                      circuit.args.map((arg, i) => (
                        <div key={i} className="pl-4">
                          <span className="text-[oklch(0.55_0_0)]">{arg}</span>
                        </div>
                      ))
                    ) : (
                      <div className="pl-4 text-[oklch(0.35_0_0)]">// no arguments</div>
                    )}
                    <div className="pl-4 mt-1">
                      <span className="text-[oklch(0.35_0_0)]">returns </span>
                      <span className="text-[oklch(0.72_0.2_145)]">{circuit.returns}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Source */}
          <div className="p-5 border-t border-[oklch(0.82_0.18_195/0.1)]">
            <p className="error-code mb-3">[COMPACT_SOURCE]</p>
            <pre className="bg-[oklch(0.03_0_0)] border border-[oklch(0.82_0.18_195/0.1)] p-4 overflow-x-auto text-xs text-[oklch(0.6_0_0)] leading-relaxed">
              {contract.source}
            </pre>
          </div>

          {/* TX Hash */}
          <div className="p-5 border-t border-[oklch(0.82_0.18_195/0.1)]">
            <span className="mono-label">Full Address</span>
            <p className="hash-display mt-1 text-xs break-all">{contract.address}</p>
          </div>
        </div>
      )}
    </div>
  );
}
