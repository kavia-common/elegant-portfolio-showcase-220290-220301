import { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import ProjectCard from "../components/ProjectCard";
import { getProjects } from "../services/api";

/**
 * Projects page fetching from /api/projects and displaying in carousel and grid.
 */
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let mounted = true;
    setStatus("loading");
    getProjects()
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
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
        <p className="mt-1 text-sm text-gray-600">A curated selection of work across web and product.</p>
      </header>

      {status === "loading" ? (
        <p className="text-gray-500">Loading projects...</p>
      ) : status === "error" ? (
        <p className="text-error">Failed to load projects.</p>
      ) : projects.length ? (
        <>
          <Carousel title="Browse">
            {projects.map((p) => (
              <ProjectCard key={p.id || p._id || p.title} project={p} />
            ))}
          </Carousel>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={(p.id || p._id || p.title) + "-grid"} project={p} />
            ))}
          </div>
        </>
      ) : (
        <p className="text-gray-500">No projects to show yet.</p>
      )}
    </div>
  );
}
