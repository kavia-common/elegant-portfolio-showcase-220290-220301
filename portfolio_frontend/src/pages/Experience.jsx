import { useEffect, useState } from "react";
import ExperienceItem from "../components/ExperienceItem";
import { getExperience } from "../services/api";

/**
 * Experience page showing a vertical timeline of roles.
 */
export default function Experience() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let mounted = true;
    setStatus("loading");
    getExperience()
      .then((data) => {
        if (!mounted) return;
        setItems(Array.isArray(data) ? data : data?.items || []);
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
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Experience</h1>
        <p className="mt-1 text-sm text-gray-600">
          A timeline of roles, responsibilities, and impact.
        </p>
      </header>

      {status === "loading" ? (
        <p className="text-gray-500">Loading experience...</p>
      ) : status === "error" ? (
        <p className="text-error">Failed to load experience.</p>
      ) : items.length ? (
        <ol className="relative space-y-6 border-l border-black/5 pl-3">
          {items.map((item, i) => (
            <ExperienceItem key={item.id || item._id || i} item={item} />
          ))}
        </ol>
      ) : (
        <p className="text-gray-500">No experience entries found.</p>
      )}
    </div>
  );
}
