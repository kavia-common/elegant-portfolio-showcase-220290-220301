export default function ExperienceItem({ item }) {
  const { role, company, period, description, highlights = [] } = item || {};

  return (
    <li className="relative pl-6">
      <span className="absolute left-0 top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20" aria-hidden="true" />
      <div className="card p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-900">{role}</h3>
          <span className="text-xs font-medium text-gray-500">{period}</span>
        </div>
        <p className="mt-1 text-sm text-gray-600">{company}</p>
        <p className="mt-2 text-sm text-gray-700">{description}</p>
        {highlights.length > 0 ? (
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-700">
            {highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
}
