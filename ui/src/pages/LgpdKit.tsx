import { useState } from "react";
import { ShieldCheck, TerminalSquare, Search, FileText } from "lucide-react";

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
        <div className="container py-8 max-w-5xl">
            <div className="flex items-center gap-4 mb-8 border-b-2 border-[#27272a] pb-4">
                <div className="bg-[#18181b] p-3 rounded-lg border border-neon-cyan/50">
                    <ShieldCheck className="w-8 h-8 text-neon-cyan" />
                </div>
                <div>
                    <h1 className="font-display text-3xl font-bold tracking-widest text-[#f4f4f5] uppercase">
                        LGPD AI KIT
                    </h1>
                    <p className="font-mono text-[13px] text-[#a1a1aa] mt-0.5 tracking-wide">Autonomous Legal Governance & ZK Proof Engine</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Col: Form */}
                <div className="bg-[#09090b] relative rounded-lg border border-[#27272a] shadow-xl overflow-hidden">
                    <div className="h-1 w-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent opacity-80"></div>

                    <div className="bg-[#18181b] px-6 py-4 flex items-center justify-between border-b border-[#27272a]">
                        <h2 className="font-mono text-[13px] font-bold tracking-widest text-[#d8b4fe]">INPUT PARAMETERS</h2>
                    </div>

                    <form onSubmit={handleGenerate} className="p-6 space-y-5">
                        <div className="space-y-1.5">
                            <label className="block font-sans text-[12px] font-bold text-[#d4d4d8] tracking-widest uppercase">Company Name</label>
                            <input
                                type="text"
                                className="w-full bg-[#18181b] border border-[#3f3f46] text-[#f4f4f5] font-sans text-[15px] px-4 py-3 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all rounded-md shadow-sm outline-none placeholder-[#71717a]"
                                value={formData.companyName}
                                onChange={e => setFormData({ ...formData, companyName: e.target.value })}
                                disabled={status !== "idle"}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block font-sans text-[12px] font-bold text-[#d4d4d8] tracking-widest uppercase">CNPJ</label>
                            <input
                                type="text"
                                className="w-full bg-[#18181b] border border-[#3f3f46] text-[#f4f4f5] font-sans text-[15px] px-4 py-3 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all rounded-md shadow-sm outline-none placeholder-[#71717a]"
                                value={formData.cnpj}
                                onChange={e => setFormData({ ...formData, cnpj: e.target.value })}
                                disabled={status !== "idle"}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block font-sans text-[12px] font-bold text-[#d4d4d8] tracking-widest uppercase">Processing Activity</label>
                            <input
                                type="text"
                                className="w-full bg-[#18181b] border border-[#3f3f46] text-[#f4f4f5] font-sans text-[15px] px-4 py-3 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all rounded-md shadow-sm outline-none placeholder-[#71717a]"
                                value={formData.activity}
                                onChange={e => setFormData({ ...formData, activity: e.target.value })}
                                disabled={status !== "idle"}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block font-sans text-[12px] font-bold text-[#d4d4d8] tracking-widest uppercase">Data Types (Comma Separated)</label>
                            <textarea
                                className="w-full bg-[#18181b] border border-[#3f3f46] text-[#f4f4f5] font-sans text-[15px] px-4 py-3 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all rounded-md shadow-sm outline-none placeholder-[#71717a] min-h-[100px] resize-y"
                                value={formData.dataTypes}
                                onChange={e => setFormData({ ...formData, dataTypes: e.target.value })}
                                disabled={status !== "idle"}
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="block font-sans text-[12px] font-bold text-[#d4d4d8] tracking-widest uppercase">DPO Email</label>
                            <input
                                type="text"
                                className="w-full bg-[#18181b] border border-[#3f3f46] text-[#f4f4f5] font-sans text-[15px] px-4 py-3 focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all rounded-md shadow-sm outline-none placeholder-[#71717a]"
                                value={formData.dpoEmail}
                                onChange={e => setFormData({ ...formData, dpoEmail: e.target.value })}
                                disabled={status !== "idle"}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={status !== "idle"}
                            className="w-full mt-6 bg-[#082f49] hover:bg-[#0ea5e9] border border-[#38bdf8] text-white font-display text-sm font-bold tracking-[0.1em] py-4 uppercase transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-md shadow-lg"
                        >
                            {status === "idle" ? "Generate Artifacts & ZK Proofs" : status === "generating" ? "PROCESS INITIATED..." : "COMPLIANCE REGISTERED"}
                        </button>
                    </form>
                </div>

                {/* Right Col: Terminal / Results */}
                <div className="flex flex-col gap-6">
                    <div className="border border-[#27272a] rounded-lg bg-[#09090b] relative flex-1 min-h-[350px] flex flex-col shadow-xl overflow-hidden">
                        <div className="bg-[#18181b] px-4 py-3 flex items-center gap-3 border-b border-[#27272a]">
                            <TerminalSquare className="w-5 h-5 text-neon-cyan" />
                            <span className="font-mono text-[13px] text-[#f4f4f5] font-bold tracking-widest">MCP / MIDNIGHT TERMINAL</span>
                        </div>
                        <div className="p-6 font-mono text-[14px] leading-8 flex-1 overflow-auto bg-[#000000]">
                            {logs.length === 0 ? (
                                <div className="text-[#a1a1aa] flex items-center gap-2">
                                    <span className="animate-pulse font-bold text-neon-cyan">_</span> System standing by...
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {logs.map((log, i) => (
                                        <div key={i} className={
                                            log.includes("error") ? "text-[#f87171] font-bold" :
                                                log.includes("MIDNIGHT") ? "text-[#d8b4fe] font-bold" :
                                                    log.includes("LLM") ? "text-[#7dd3fc]" : "text-[#e4e4e7]"
                                        }>
                                            <span className="opacity-50 mr-3 text-neon-cyan">{'>'}</span> {log}
                                        </div>
                                    ))}
                                    {status === "generating" && (
                                        <div className="animate-pulse text-neon-cyan font-bold mt-2"><span className="opacity-50 mr-3">{'>'}</span> _</div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Results Box */}
                    {status === "success" && (
                        <div className="border border-neon-cyan rounded-lg p-6 bg-[#09090b] shadow-[0_0_20px_oklch(0.82_0.18_195/0.2)] animate-in fade-in slide-in-from-bottom-4 duration-500 relative overflow-hidden">
                            <h3 className="font-display tracking-widest text-[#f4f4f5] mb-6 text-[15px] flex items-center gap-3 font-bold relative z-10">
                                <Search className="w-5 h-5 text-neon-cyan" /> COMPLIANCE ARTIFACTS
                            </h3>

                            <div className="space-y-4 relative z-10">
                                <div className="flex items-center justify-between p-4 border border-[#3f3f46] bg-[#18181b] hover:bg-[#27272a] transition-all cursor-pointer rounded-md">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 bg-[#09090b] border border-[#3f3f46] rounded-md">
                                            <FileText className="w-5 h-5 text-neon-cyan" />
                                        </div>
                                        <div>
                                            <div className="font-sans text-[15px] font-bold text-[#f4f4f5] mb-0.5">DPIA_Report.pdf</div>
                                            <div className="font-mono text-[11px] uppercase tracking-wide text-[#a1a1aa]">Generated by LLM Multi-Agent</div>
                                        </div>
                                    </div>
                                    <button className="text-[#a1a1aa] hover:text-neon-cyan transition-colors p-2 bg-[#09090b] rounded-md border border-[#3f3f46]" title="Download">
                                        ⬇
                                    </button>
                                </div>

                                <div className="flex items-center justify-between p-4 border border-[#3f3f46] bg-[#18181b] hover:bg-[#27272a] transition-all cursor-pointer rounded-md">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 bg-[#09090b] border border-[#3f3f46] rounded-md">
                                            <FileText className="w-5 h-5 text-neon-cyan" />
                                        </div>
                                        <div>
                                            <div className="font-sans text-[15px] font-bold text-[#f4f4f5] mb-0.5">Privacy_Policy.pdf</div>
                                            <div className="font-mono text-[11px] uppercase tracking-wide text-[#a1a1aa]">Generated by LLM Multi-Agent</div>
                                        </div>
                                    </div>
                                    <button className="text-[#a1a1aa] hover:text-neon-cyan transition-colors p-2 bg-[#09090b] rounded-md border border-[#3f3f46]" title="Download">
                                        ⬇
                                    </button>
                                </div>

                                <div className="mt-6 pt-6 border-t border-[#3f3f46] font-mono">
                                    <div className="text-[14px] font-bold text-[#d8b4fe] mb-3 flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#4ade80] animate-pulse"></span>
                                        ON-CHAIN ZK REGISTRY
                                    </div>
                                    <div className="text-[13px] leading-relaxed break-all text-[#e9d5ff] bg-[#3b0764]/40 p-4 border border-[#9333ea]/50 rounded-md shadow-inner">
                                        <div className="mb-2"><strong>TxHash:</strong> <span className="text-[#c084fc]">0x9f8b7c6d5e4f3a...</span></div>
                                        <div className="mb-2"><strong>Proof:</strong> Zero-Knowledge Validated ✅</div>
                                        <div className="mb-2"><strong>Status:</strong> Recorded on DevNet</div>
                                        <div><strong>Signer:</strong> did:midnight:agent:01</div>
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
