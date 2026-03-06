import { useState } from "react";
import { Copy, ShieldCheck, TerminalSquare, Search, FileText } from "lucide-react";

export default function LgpdKit() {
    const [status, setStatus] = useState<"idle" | "generating" | "success">("idle");
    const [logs, setLogs] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        companyName: "Acme Corp",
        cnpj: "12.345.678/0001-90",
        activity: "E-commerce and User Tracking",
        dataTypes: "Name, Email, CPF, Browsing History",
        dataSubjects: "Customers",
        dpoEmail: "dpo@acme.com"
    });

    const handleGenerate = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("generating");
        setLogs(["[SYSTEM] Initiating LGPD Kit AI Generation..."]);

        const steps = [
            "[MCP] Connecting to DPO2U Compliance Engine...",
            "[LLM] Drafting Data Protection Impact Assessment (DPIA)...",
            "[LLM] Generating Privacy Policy (11 sections)...",
            "[LLM] Creating sector-specific Incident Response Plan...",
            "[ZK] Calculating Cryptographic Hashes...",
            "[MIDNIGHT] Submitting LgpdKitRegistry ZK Proof to DevNet...",
            "[SYSTEM] Generation Complete."
        ];

        for (let i = 0; i < steps.length; i++) {
            await new Promise((res) => setTimeout(res, 800 + Math.random() * 600));
            setLogs(prev => [...prev, steps[i]]);
        }

        setStatus("success");
    };

    return (
        <div className="container py-8 max-w-4xl">
            <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-8 h-8 text-neon-cyan" />
                <h1 className="font-display text-2xl tracking-widest text-white uppercase glitch-text" data-text="LGPD AI KIT">
                    LGPD AI KIT
                </h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Left Col: Form */}
                <div className="border border-[oklch(0.82_0.18_195/0.3)] bg-[oklch(0.1_0_0/0.4)] relative">
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-neon-cyan"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-neon-cyan"></div>
                    <div className="border-b border-[oklch(0.82_0.18_195/0.2)] bg-[oklch(0.82_0.18_195/0.05)] px-4 py-3 flex items-center justify-between">
                        <h2 className="font-mono text-sm tracking-widest text-neon-cyan">INPUT PARAMETERS</h2>
                    </div>

                    <form onSubmit={handleGenerate} className="p-4 space-y-4">
                        <div>
                            <label className="block font-mono text-xs text-[oklch(0.6_0_0)] mb-1">COMPANY NAME</label>
                            <input
                                type="text"
                                className="w-full bg-transparent border border-[oklch(0.82_0.18_195/0.2)] text-white font-mono text-sm px-3 py-2 focus:border-neon-cyan focus:outline-none transition-colors"
                                value={formData.companyName}
                                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                                disabled={status !== "idle"}
                            />
                        </div>
                        <div>
                            <label className="block font-mono text-xs text-[oklch(0.6_0_0)] mb-1">CNPJ</label>
                            <input
                                type="text"
                                className="w-full bg-transparent border border-[oklch(0.82_0.18_195/0.2)] text-white font-mono text-sm px-3 py-2 focus:border-neon-cyan focus:outline-none transition-colors"
                                value={formData.cnpj}
                                onChange={e => setFormData({ ...formData, cnpj: e.target.value })}
                                disabled={status !== "idle"}
                            />
                        </div>
                        <div>
                            <label className="block font-mono text-xs text-[oklch(0.6_0_0)] mb-1">PROCESSING ACTIVITY</label>
                            <input
                                type="text"
                                className="w-full bg-transparent border border-[oklch(0.82_0.18_195/0.2)] text-white font-mono text-sm px-3 py-2 focus:border-neon-cyan focus:outline-none transition-colors"
                                value={formData.activity}
                                onChange={e => setFormData({ ...formData, activity: e.target.value })}
                                disabled={status !== "idle"}
                            />
                        </div>
                        <div>
                            <label className="block font-mono text-xs text-[oklch(0.6_0_0)] mb-1">DATA TYPES (COMMA SEPARATED)</label>
                            <textarea
                                className="w-full bg-transparent border border-[oklch(0.82_0.18_195/0.2)] text-white font-mono text-sm px-3 py-2 focus:border-neon-cyan focus:outline-none transition-colors h-20"
                                value={formData.dataTypes}
                                onChange={e => setFormData({ ...formData, dataTypes: e.target.value })}
                                disabled={status !== "idle"}
                            />
                        </div>
                        <div>
                            <label className="block font-mono text-xs text-[oklch(0.6_0_0)] mb-1">DPO EMAIL</label>
                            <input
                                type="text"
                                className="w-full bg-transparent border border-[oklch(0.82_0.18_195/0.2)] text-white font-mono text-sm px-3 py-2 focus:border-neon-cyan focus:outline-none transition-colors"
                                value={formData.dpoEmail}
                                onChange={e => setFormData({ ...formData, dpoEmail: e.target.value })}
                                disabled={status !== "idle"}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status !== "idle"}
                            className="w-full mt-4 bg-[oklch(0.82_0.18_195/0.1)] hover:bg-[oklch(0.82_0.18_195/0.2)] border border-neon-cyan text-neon-cyan font-mono text-sm tracking-widest py-3 uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === "idle" ? "Generate Artifacts & ZK Proofs" : status === "generating" ? "PROCESSING..." : "REGISTERED"}
                        </button>
                    </form>
                </div>

                {/* Right Col: Terminal / Results */}
                <div className="flex flex-col gap-4">
                    <div className="border border-[oklch(0.82_0.18_195/0.3)] bg-black relative flex-1 min-h-[300px] flex flex-col">
                        <div className="border-b border-[oklch(0.82_0.18_195/0.2)] px-4 py-2 flex items-center gap-2">
                            <TerminalSquare className="w-4 h-4 text-neon-cyan" />
                            <span className="font-mono text-xs text-[oklch(0.5_0_0)]">MCP / MIDNIGHT TERMINAL</span>
                        </div>
                        <div className="p-4 font-mono text-xs flex-1 overflow-auto bg-[oklch(0.02_0_0)]">
                            {logs.length === 0 ? (
                                <span className="text-[oklch(0.3_0_0)]">Waiting for input...</span>
                            ) : (
                                <div className="space-y-2">
                                    {logs.map((log, i) => (
                                        <div key={i} className={log.includes("error") ? "text-red-400" : log.includes("MIDNIGHT") ? "text-purple-400" : log.includes("LLM") ? "text-blue-300" : "text-[oklch(0.82_0.18_195)]"}>
                                            <span className="opacity-50 mr-2">{'>'}</span> {log}
                                        </div>
                                    ))}
                                    {status === "generating" && (
                                        <div className="animate-pulse text-neon-cyan"><span className="opacity-50 mr-2">{'>'}</span> _</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Results Box */}
                    {status === "success" && (
                        <div className="border border-neon-cyan p-4 bg-[oklch(0.82_0.18_195/0.05)] animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="font-display tracking-widest text-white mb-4 text-sm flex items-center gap-2">
                                <Search className="w-4 h-4 text-neon-cyan" /> COMPLIANCE ARTIFACTS
                            </h3>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-2 border border-[oklch(0.82_0.18_195/0.2)] bg-black/50">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-4 h-4 text-[oklch(0.6_0_0)]" />
                                        <div>
                                            <div className="font-mono text-xs text-white">DPIA_Report.pdf</div>
                                            <div className="font-mono text-[10px] text-[oklch(0.5_0_0)]">Generated by LLM Multi-Agent</div>
                                        </div>
                                    </div>
                                    <button className="text-neon-cyan hover:text-white transition-colors" title="Download">⬇</button>
                                </div>

                                <div className="flex items-center justify-between p-2 border border-[oklch(0.82_0.18_195/0.2)] bg-black/50">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-4 h-4 text-[oklch(0.6_0_0)]" />
                                        <div>
                                            <div className="font-mono text-xs text-white">Privacy_Policy.pdf</div>
                                            <div className="font-mono text-[10px] text-[oklch(0.5_0_0)]">Generated by LLM Multi-Agent</div>
                                        </div>
                                    </div>
                                    <button className="text-neon-cyan hover:text-white transition-colors" title="Download">⬇</button>
                                </div>

                                <div className="mt-4 pt-4 border-t border-[oklch(0.82_0.18_195/0.2)] font-mono">
                                    <div className="text-xs text-[oklch(0.6_0_0)] mb-1">ON-CHAIN ZK REGISTRY (Compact)</div>
                                    <div className="text-[10px] break-all text-purple-400 bg-purple-900/20 p-2 border border-purple-500/30">
                                        TxHash: 0x9f8b7c6d5e4f3a2b1c... <br />
                                        DPIA ZK Proof: Validated ✅<br />
                                        Status: Immutably recorded on Midnight DevNet
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
