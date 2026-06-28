const footerLinks = ["Privacy", "Terms", "Status", "Changelog", "GitHub"];

export default function Footer() {
  return (
    <footer className="border-t border-white/6 px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Logo */}
      <div className="flex items-center gap-2 font-semibold text-sm text-white">
        <div className="w-6 h-6 rounded-md flex items-center justify-center bg-linear-to-br from-[#7c6ff7] to-[#a89dff]">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="5" height="5" rx="1" fill="white" opacity=".9" />
            <rect x="8" y="1" width="5" height="2.5" rx=".8" fill="white" opacity=".6" />
            <rect x="8" y="5" width="5" height="2.5" rx=".8" fill="white" opacity=".6" />
            <rect x="1" y="8" width="12" height="1.5" rx=".75" fill="white" opacity=".4" />
            <rect x="1" y="11" width="8" height="1.5" rx=".75" fill="white" opacity=".4" />
          </svg>
        </div>
        CiteDocs
        <span className="text-[#8b8fa8] font-normal ml-1">© 2025</span>
      </div>

      {/* Links */}
      <div className="flex items-center gap-6 flex-wrap justify-center">
        {footerLinks.map((link) => (
          <a key={link} href="#" className="text-[13px] text-[#8b8fa8] hover:text-white transition-colors duration-200">
            {link}
          </a>
        ))}
      </div>
    </footer>
  );
}
