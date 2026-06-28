import RagDiagram from "./RagDiagram";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center px-6 md:px-12 pt-16 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_50%,rgba(124,111,247,0.08)_0%,transparent_70%)]" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Left content */}
      <div className="max-w-140 relative z-10 shrink-0">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/4 border border-white/10 rounded-full px-3.5 py-1.5 text-[13px] text-[#8b8fa8] mb-7">
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse-dot" />
          Now in beta · Trusted by 2,400+ teams
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(38px,5vw,62px)] font-bold leading-[1.1] tracking-[-1.5px] mb-5 opacity-0 animate-fade-up [animation-delay:0.1s] [animation-fill-mode:forwards]">
          Chat with your documents.{" "}
          <span className="bg-linear-to-br from-[#a89dff] to-[#34d399] bg-clip-text text-transparent">
            Get answers you can trust.
          </span>
        </h1>

        {/* Description */}
        <p className="text-[17px] text-[#8b8fa8] leading-[1.65] mb-9 opacity-0 animate-fade-up [animation-delay:0.25s] [animation-fill-mode:forwards]">
          CiteDocs delivers AI-powered answers backed by exact citations — document name, page number, and highlighted passage. No hallucinations. No guesswork. Just knowledge you can verify.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center gap-3 mb-4 opacity-0 animate-fade-up [animation-delay:0.4s] [animation-fill-mode:forwards]">
          <button className="flex items-center gap-2 bg-[#7c6ff7] hover:bg-[#6b5fe6] text-white px-6 py-3.5 rounded-[10px] text-[15px] font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(124,111,247,0.3)]">
            Try CiteDocs Free
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button className="border border-white/15 hover:border-white/35 hover:bg-white/4 text-white px-6 py-3.5 rounded-[10px] text-[15px] font-medium transition-all duration-200">
            Watch Demo
          </button>
        </div>

        {/* Fine print */}
        <p className="text-xs text-[#8b8fa8]/60 opacity-0 animate-fade-up [animation-delay:0.55s] [animation-fill-mode:forwards]">
          No credit card required · 14-day free trial · Cancel anytime
        </p>
      </div>

      {/* Right visual */}
      <div className="flex-1 flex items-center justify-center relative z-10 pl-12">
        <RagDiagram />
      </div>
    </section>
  );
}
