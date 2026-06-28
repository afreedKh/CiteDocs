const steps = [
  {
    label: "Upload",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M11 3v10M7 9l4 4 4-4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 16h14" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Parse",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="4" y="3" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="1.7" />
        <path d="M8 8h6M8 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Chunk",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        <rect x="12" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        <rect x="3" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
        <rect x="12" y="12" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    label: "Embed",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <ellipse cx="11" cy="11" rx="8" ry="5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M3 11c0 2.76 3.58 5 8 5s8-2.24 8-5" stroke="currentColor" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    label: "Answer",
    active: true,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 6h14M4 10h10M4 14h7" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="17" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.7" />
        <path d="M19.5 16.5l1.5 1.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Pipeline() {
  return (
    <section className="py-20 px-6 md:px-12 text-center border-t border-white/5">
      <p className="text-[11px] tracking-[2px] uppercase text-[#8b8fa8] font-semibold mb-10">
        The RAG pipeline, built for clarity
      </p>

      <div className="flex items-center justify-center flex-wrap gap-0">
        {steps.map((step, i) => (
          <div key={step.label} className="flex items-center">
            {/* Step */}
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-13 h-13 rounded-[14px] flex items-center justify-center border transition-all duration-300 hover:-translate-y-1 ${
                  step.active
                    ? "border-[#10b981] bg-[#10b981]/10 text-[#10b981]"
                    : "border-[#2a2a40] bg-[#111117] text-[#8b8fa8] hover:border-[#7c6ff7] hover:bg-[#7c6ff7]/10"
                }`}
              >
                {step.icon}
              </div>
              <span className={`text-[13px] font-medium ${step.active ? "text-[#10b981]" : "text-[#8b8fa8]"}`}>
                {step.label}
              </span>
            </div>

            {/* Connector */}
            {i < steps.length - 1 && (
              <div className="flex items-center gap-1 px-2 mb-5">
                <div className="w-1 h-1 rounded-full bg-[#7c6ff7]/40" />
                <div className="w-6 h-px bg-[#7c6ff7]/25" />
                <div className="w-1 h-1 rounded-full bg-[#7c6ff7]/40" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
