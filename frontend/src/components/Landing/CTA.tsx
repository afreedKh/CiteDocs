export default function CTA() {
  return (
    <section className="px-6 md:px-12 pb-20">
      <div className="relative bg-[#111117] border border-[#1e1e2e] rounded-[20px] py-16 px-10 text-center max-w-5xl mx-auto overflow-hidden">
        {/* Subtle top glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,rgba(124,111,247,0.08),transparent_70%)]" />

        <h2 className="relative text-[clamp(22px,3.5vw,34px)] font-bold tracking-tight mb-3">
          Start chatting with your documents today
        </h2>
        <p className="relative text-[15px] text-[#8b8fa8] mb-7">
          Upload PDFs, DOCX files, or plain text. Get cited, verifiable answers in seconds.
        </p>
        <button className="relative bg-[#7c6ff7] hover:bg-[#6b5fe6] text-white px-8 py-3.5 rounded-[10px] text-[15px] font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(124,111,247,0.35)]">
          Try CiteDocs Free
        </button>
      </div>
    </section>
  );
}
