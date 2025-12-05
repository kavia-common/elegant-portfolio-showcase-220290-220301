import { useRef } from "react";

/**
 * Simple horizontal carousel with scroll snapping and controls.
 */
export default function Carousel({ children, title = "Projects" }) {
  const ref = useRef(null);

  const scrollBy = (delta) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: delta, behavior: "smooth" });
  };

  return (
    <section aria-label={title}>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-320)}
            className="rounded-lg border border-black/5 bg-[var(--surface)] px-3 py-2 text-sm shadow-soft transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Scroll left"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollBy(320)}
            className="rounded-lg border border-black/5 bg-[var(--surface)] px-3 py-2 text-sm shadow-soft transition hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Scroll right"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
        role="region"
        aria-roledescription="carousel"
      >
        {Array.isArray(children)
          ? children.map((child, idx) => (
              <div
                key={idx}
                className="min-w-[280px] max-w-[320px] snap-start"
                role="group"
                aria-roledescription="slide"
                aria-label={`Slide ${idx + 1} of ${children.length}`}
              >
                {child}
              </div>
            ))
          : children}
      </div>
    </section>
  );
}
