export default function RagDiagram() {
  const docs = [
    { label: "PDF", lines: [100, 60, 100] },
    { label: "DOCX", lines: [100, 60] },
    { label: "TXT", lines: [60, 100] },
  ];

  return (
    <div className="relative w-full max-w-115 h-55 hidden md:block">
      {/* Documents */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-2.5">
        {docs.map((doc, i) => (
          <div
            key={doc.label}
            className="bg-[#1a1a2e] border border-[#2a2a40] rounded-lg px-3 py-2.5 w-22.5 opacity-0 animate-slide-in-left"
            style={{ animationDelay: `${0.6 + i * 0.15}s`, animationFillMode: "forwards" }}
          >
            <div className="text-[10px] text-[#8b8fa8] font-semibold tracking-wide mb-1.5">{doc.label}</div>
            <div className="flex flex-col gap-1">
              {doc.lines.map((w, j) => (
                <div key={j} className="h-0.75 rounded-full bg-white/10" style={{ width: `${w}%` }} />
              ))}
            </div>
          </div>
        ))}
        <div className="text-center text-[10px] text-[#8b8fa8] font-medium mt-1">Documents</div>
      </div>

      {/* SVG Connectors */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-0 animate-fade-in"
        style={{ animationDelay: "1.4s", animationFillMode: "forwards" }}
        viewBox="0 0 460 220"
      >
        <defs>
          <marker id="dot-purple" markerWidth="6" markerHeight="6" refX="3" refY="3">
            <circle cx="3" cy="3" r="2.5" fill="#7c6ff7" opacity=".7" />
          </marker>
          <marker id="dot-teal" markerWidth="6" markerHeight="6" refX="3" refY="3">
            <circle cx="3" cy="3" r="2.5" fill="#10b981" opacity=".7" />
          </marker>
        </defs>
        <line x1="95" y1="68" x2="195" y2="108" stroke="#7c6ff7" strokeWidth="1" strokeDasharray="4,3" opacity=".4" markerEnd="url(#dot-purple)" />
        <line x1="95" y1="110" x2="195" y2="110" stroke="#7c6ff7" strokeWidth="1" strokeDasharray="4,3" opacity=".4" markerEnd="url(#dot-purple)" />
        <line x1="95" y1="152" x2="195" y2="112" stroke="#7c6ff7" strokeWidth="1" strokeDasharray="4,3" opacity=".4" markerEnd="url(#dot-purple)" />
        <line x1="235" y1="110" x2="320" y2="110" stroke="#10b981" strokeWidth="1" strokeDasharray="4,3" opacity=".4" markerEnd="url(#dot-teal)" />
      </svg>

      {/* RAG / Vector DB Node */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-17 h-17 rounded-2xl border-2 border-[#7c6ff7] bg-[#7c6ff7]/15 flex items-center justify-center opacity-0 animate-pop-in"
        style={{ animationDelay: "1.1s", animationFillMode: "forwards" }}
      >
        <div className="w-9 h-9 bg-[#7c6ff7] rounded-lg flex items-center justify-center animate-spin-slow">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <circle cx="9" cy="9" r="5" stroke="white" strokeWidth="1.5" />
            <circle cx="9" cy="9" r="2" fill="white" opacity=".8" />
          </svg>
        </div>
        <div className="absolute -bottom-6 text-[10px] text-[#8b8fa8] font-medium whitespace-nowrap">Vector DB</div>
      </div>

      {/* Cited Answer */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-[#0d2a1e] border-[1.5px] border-[#10b981] rounded-xl p-3.5 w-30 opacity-0 animate-slide-in-right"
        style={{ animationDelay: "1.3s", animationFillMode: "forwards" }}
      >
        <div className="flex gap-1.5 mb-2">
          {[1, 0.5, 0.3].map((op, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#10b981]" style={{ opacity: op }} />
          ))}
        </div>
        <div className="flex flex-col gap-1 mb-2">
          {[100, 100, 55, 100].map((w, i) => (
            <div key={i} className="h-0.75 rounded-full bg-[#10b981]/40" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="flex gap-1">
          {[1, 2, 3].map((n) => (
            <div key={n} className="w-4.5 h-4.5 rounded bg-[#10b981]/20 border border-[#10b981]/40" />
          ))}
        </div>
        <div className="absolute -bottom-6 left-0 w-full text-center text-[10px] text-[#8b8fa8] font-medium">Cited Answer</div>
      </div>
    </div>
  );
}
