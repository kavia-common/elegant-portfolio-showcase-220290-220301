import { useEffect, useState } from "react";
import SkillPill from "../components/SkillPill";
import { getAbout } from "../services/api";

/**
 * About page with profile and skills.
 */
export default function About() {
  const [about, setAbout] = useState(null);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let mounted = true;
    setStatus("loading");
    getAbout()
      .then((data) => {
        if (!mounted) return;
        setAbout(data || {});
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
        <h1 className="text-2xl font-bold text-gray-900">About</h1>
        <p className="mt-1 text-sm text-gray-600">
          Learn more about my background, values, and the tools I love using.
        </p>
      </header>

      {status === "loading" ? (
        <p className="text-gray-500">Loading profile...</p>
      ) : status === "error" ? (
        <p className="text-error">Failed to load about data.</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="card p-6 lg:col-span-1">
            <div className="flex items-center gap-4">
              <div className="grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-2xl">🧑‍💻</div>
              <div>
                <h2 className="text-lg font-semibold">{about?.name || "Your Name"}</h2>
                <p className="text-sm text-gray-600">{about?.title || "Product Engineer"}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-gray-700">
              {about?.bio ||
                "Passionate about building user-centric experiences, with a focus on quality, performance, and delightful details."}
            </p>
          </div>

          <div className="card p-6 lg:col-span-2">
            <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
            <p className="mt-1 text-sm text-gray-600">Core technologies and strengths:</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(about?.skills || ["React", "TypeScript", "Node.js", "MongoDB"]).map((s, i) => (
                <SkillPill key={`${s}-${i}`} label={s.label || s} level={s.level || "intermediate"} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
