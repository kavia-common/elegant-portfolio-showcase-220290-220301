/**
 * Card to display project details with accessible semantics.
 */
export default function ProjectCard({ project }) {
  const { title, description, tags = [], image, url, repo } = project || {};

  return (
    <article className="card group flex h-full flex-col overflow-hidden">
      {image ? (
        <img
          src={image}
          alt={title ? `${title} preview` : "Project preview"}
          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="mt-2 text-sm text-gray-600">{description}</p>

        {tags.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2">
            {tags.map((t, i) => (
              <li key={`${t}-${i}`} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                {t}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-4 flex gap-2">
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="btn-primary px-4 py-2 text-sm"
              aria-label={`Open ${title} live demo`}
            >
              Live
            </a>
          ) : null}
          {repo ? (
            <a
              href={repo}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary px-4 py-2 text-sm"
              aria-label={`Open ${title} repository`}
            >
              Code
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
