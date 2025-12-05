import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

/**
 * Sticky navbar with animated active underline and theme toggle.
 * Accessible semantics and focus styles included.
 */
export default function Navbar({ theme = "light", onToggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 2);
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 font-medium transition text-sm sm:text-base ${
      isActive ? "text-primary" : "text-gray-600 hover:text-gray-900"
    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded`;

  const activeIndicator = ({ isActive }) =>
    isActive ? (
      <span
        aria-hidden="true"
        className="absolute inset-x-2 -bottom-0.5 h-0.5 bg-primary rounded-full transition-all"
      />
    ) : null;

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/60 ${
        isScrolled ? "shadow-soft" : ""
      }`}
      role="banner"
    >
      <nav className="container-page flex items-center justify-between py-3" aria-label="Primary">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 ring-1 ring-primary/20 grid place-items-center">
            <span className="text-primary font-bold">∑</span>
          </div>
          <span className="sr-only">Portfolio Home</span>
        </div>

        <ul className="hidden gap-2 sm:flex">
          {[
            ["Home", "/"],
            ["Projects", "/projects"],
            ["About", "/about"],
            ["Experience", "/experience"],
            ["Contact", "/contact"],
          ].map(([label, path]) => (
            <li key={path} className="relative">
              <NavLink to={path} className={linkClass} end={path === "/"}>
                {({ isActive }) => (
                  <>
                    <span>{label}</span>
                    {activeIndicator({ isActive })}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="inline-flex items-center justify-center rounded-lg border border-black/5 bg-[var(--surface)] px-3 py-2 text-sm shadow-soft transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
            title="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
            <span className="ml-2 hidden sm:inline">{theme === "light" ? "Dark" : "Light"}</span>
          </button>
        </div>
      </nav>

      <div className="sm:hidden border-t border-black/5">
        <ul className="container-page flex flex-wrap items-center gap-2 py-2">
          {[
            ["Home", "/"],
            ["Projects", "/projects"],
            ["About", "/about"],
            ["Experience", "/experience"],
            ["Contact", "/contact"],
          ].map(([label, path]) => (
            <li key={path}>
              <NavLink to={path} className={linkClass} end={path === "/"}>{label}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
