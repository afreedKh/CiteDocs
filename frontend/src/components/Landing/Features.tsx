const features = [
  {
    title: "Source Citations",
    description:
      "Every answer includes the exact document name, page number, and highlighted passage. Know precisely where each fact came from.",
    iconBg: "bg-[#7c6ff7]/15",
    iconColor: "#a89dff",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 3l1.5 4.5H17l-3.75 2.75 1.5 4.5L11 12l-3.75 2.75 1.5-4.5L5 7.5h4.5L11 3z"
          stroke="#a89dff"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    title: "Multi-Document Search",
    description:
      "Query across your entire knowledge base at once. CiteDocs retrieves the most relevant chunks from all uploaded files simultaneously.",
    iconBg: "bg-[#10b981]/15",
    iconColor: "#34d399",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="10" cy="10" r="6" stroke="#34d399" strokeWidth="1.7" />
        <path d="M14.5 14.5l3.5 3.5" stroke="#34d399" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Streaming Answers",
    description:
      "Responses stream in real-time as the model generates them. No waiting — start reading while the answer is still forming word by word.",
    iconBg: "bg-[#fbbf24]/15",
    iconColor: "#fbbf24",
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path
          d="M11 3v4M7.05 5.05l2.83 2.83M5 9h4M5.05 14.95l2.83-2.83M9 17v-4"
          stroke="#fbbf24"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="11" cy="11" r="3" stroke="#fbbf24" strokeWidth="1.6" />
        <path
          d="M14.95 5.05l-2.83 2.83M17 9h-4M14.95 14.95l-2.83-2.83"
          stroke="#fbbf24"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity=".5"
        />
      </svg>
    ),
  },
];

export default function Features() {
  return (
    <section className="py-20 px-6 md:px-12">
      {/* Header */}
      <div className="text-center mb-14 max-w-120 mx-auto">
        <p className="text-[11px] tracking-[2px] uppercase text-[#8b8fa8] font-semibold mb-4">Why CiteDocs</p>
        <h2 className="text-[clamp(28px,4vw,44px)] font-bold tracking-[-1px] mb-3">
          Everything you need to trust your answers
        </h2>
        <p className="text-base text-[#8b8fa8]">Built for teams who need accuracy, not just speed.</p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {features.map((f) => (
          <div
            key={f.title}
            className="bg-[#111117] border border-[#1e1e2e] rounded-2xl p-7 transition-all duration-300 hover:border-[#7c6ff7]/30 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(124,111,247,0.08)]"
          >
            <div className={`w-11 h-11 rounded-[10px] flex items-center justify-center mb-4 ${f.iconBg}`}>
              {f.icon}
            </div>
            <h3 className="text-base font-semibold mb-2.5">{f.title}</h3>
            <p className="text-sm text-[#8b8fa8] leading-relaxed">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
