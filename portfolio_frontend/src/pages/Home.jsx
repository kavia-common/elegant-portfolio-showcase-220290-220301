import { useEffect, useState } from "react";
import Hero from "../components/Hero";
import Carousel from "../components/Carousel";
import ProjectCard from "../components/ProjectCard";
import { getProjects } from "../services/api";

/**
 * Home page with hero and featured projects.
 */
export default function Home() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let mounted = true;
    setStatus("loading");
    getProjects({ featured: true })
      .then((data) => {
        if (!mounted) return;
        setProjects(Array.isArray(data) ? data : data?.items || []);
        setStatus("success");
      })
      .catch(() => {
        if (!mounted) return;
        setStatus("error");
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="space-y-8 sm:space-y-10">
      <Hero />
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Featured Projects</h2>
        {status === "loading" ? (
          <p className="text-gray-500">Loading...</p>
        ) : status === "error" ? (
          <p className="text-error">Unable to load projects right now.</p>
        ) : projects.length ? (
          <Carousel title="Featured Projects">
            {projects.map((p) => (
              <ProjectCard key={p.id || p._id || p.title} project={p} />
            ))}
          </Carousel>
        ) : (
          <p className="text-gray-500">No featured projects available.</p>
        )}
      </section>
    </div>
  );
}
