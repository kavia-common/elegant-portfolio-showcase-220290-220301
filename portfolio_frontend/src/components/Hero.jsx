import { Link } from "react-router-dom";

/**
 * Hero section with gradient text and CTAs.
 */
export default function Hero() {
  return (
    <section
      className="relative overflow-hidden rounded-3xl bg-[var(--surface)] p-8 sm:p-12 shadow-soft ring-1 ring-black/5"
      aria-labelledby="home-hero-title"
    >
      <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 left-4 h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />

      <div className="relative">
        <p className="mb-2 text-sm font-semibold text-primary">Hello, I’m</p>
        <h1
          id="home-hero-title"
          className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl"
        >
          A Modern, Animated Portfolio
        </h1>
        <p className="mt-3 max-w-2xl text-base text-gray-600">
          Showcasing projects, experience, and passion for crafting delightful digital products.
          Built with React, Tailwind CSS, and a clean API-driven architecture.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link className="btn-primary" to="/projects" aria-label="View projects">
            View Projects
          </Link>
          <Link className="btn-secondary" to="/contact" aria-label="Contact me">
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
}
