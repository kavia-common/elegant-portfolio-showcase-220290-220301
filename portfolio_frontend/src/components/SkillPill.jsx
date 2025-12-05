export default function SkillPill({ label, level = "intermediate" }) {
  const levelColor =
    level === "expert"
      ? "bg-success/10 text-success"
      : level === "beginner"
      ? "bg-secondary/10 text-secondary"
      : "bg-primary/10 text-primary";

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${levelColor}`}>
      {label}
    </span>
  );
}
