const stats = [
  { value: "2.4M+", label: "Documents indexed" },
  { value: "99.2%", label: "Citation accuracy" },
  { value: "<1.2s", label: "Median response time" },
];

export default function Stats() {
  return (
    <div className="px-6 md:px-12 pb-20 max-w-5xl mx-auto w-full">
      <div className="grid grid-cols-1 sm:grid-cols-3 border border-[#1e1e2e] rounded-2xl overflow-hidden bg-[#111117]">
        {stats.map((stat, i) => (
          <div
            key={stat.label}
            className={`py-9 px-8 text-center ${
              i < stats.length - 1 ? "sm:border-r border-b sm:border-b-0 border-[#1e1e2e]" : ""
            }`}
          >
            <div className="text-[clamp(28px,4vw,40px)] font-bold tracking-tight mb-1.5">{stat.value}</div>
            <div className="text-sm text-[#8b8fa8]">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
