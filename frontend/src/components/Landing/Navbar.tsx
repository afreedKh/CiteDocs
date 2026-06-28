import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-16 bg-[#0a0a0b]/85 backdrop-blur-xl border-b border-white/6">
      {/* Logo */}
      <a
        href="#"
        className="flex items-center gap-2.5 font-semibold text-base text-white no-underline"
      >
        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-linear-to-br from-[#7c6ff7] to-[#a89dff]">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect
              x="2"
              y="2"
              width="6"
              height="6"
              rx="1.5"
              fill="white"
              opacity=".9"
            />
            <rect
              x="10"
              y="2"
              width="6"
              height="3"
              rx="1"
              fill="white"
              opacity=".6"
            />
            <rect
              x="10"
              y="7"
              width="6"
              height="3"
              rx="1"
              fill="white"
              opacity=".6"
            />
            <rect
              x="2"
              y="10"
              width="14"
              height="2"
              rx="1"
              fill="white"
              opacity=".4"
            />
            <rect
              x="2"
              y="14"
              width="10"
              height="2"
              rx="1"
              fill="white"
              opacity=".4"
            />
          </svg>
        </div>
        CiteDocs
      </a>

      {/* Desktop Nav Links */}
      <div className="hidden md:flex items-center gap-8">
        {["Features", "Pricing", "Docs", "Changelog"].map((link) => (
          <a
            key={link}
            href="#"
            className="text-[#8b8fa8] hover:text-white text-sm font-medium transition-colors duration-200"
          >
            {link}
          </a>
        ))}
      </div>

      {/* Desktop Actions */}
      <div className="hidden md:flex items-center gap-3">
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 rounded-lg text-sm font-medium text-white border border-white/12 hover:border-white/30 hover:bg-white/5 transition-all duration-200"
        >
          Log in
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-[#7c6ff7] hover:bg-[#6b5fe6] hover:-translate-y-px transition-all duration-200"
        >
          Get started
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden text-white p-1"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          {menuOpen ? (
            <path
              d="M5 5l12 12M17 5L5 17"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          ) : (
            <path
              d="M4 7h14M4 11h14M4 15h14"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-[#0a0a0b] border-b border-white/6 px-6 py-4 flex flex-col gap-4 md:hidden">
          {["Features", "Pricing", "Docs", "Changelog"].map((link) => (
            <a
              key={link}
              href="#"
              className="text-[#8b8fa8] text-sm font-medium"
            >
              {link}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/6">
            <button className="w-full py-2.5 rounded-lg text-sm font-medium text-white border border-white/12">
              Log in
            </button>
            <button className="w-full py-2.5 rounded-lg text-sm font-semibold text-white bg-[#7c6ff7]">
              Get started
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
