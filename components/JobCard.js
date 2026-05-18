import Link from "next/link";
import StatusBadge from "./StatusBadge";

const CATEGORY_ICONS = {
  Plumbing: "🔧",
  Electrical: "⚡",
  Painting: "🎨",
  Joinery: "🪵",
  Other: "🏠",
};

export default function JobCard({ job }) {
  const icon = CATEGORY_ICONS[job.category] || "🏠";
  const date = new Date(job.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-brand-300 transition-all cursor-pointer group">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-xl flex-shrink-0">{icon}</span>
            <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors truncate">
              {job.title}
            </h3>
          </div>
          <StatusBadge status={job.status} />
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 mb-4">
          {job.description}
        </p>

        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-3">
            {job.location && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </span>
            )}
            {job.category && (
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {job.category}
              </span>
            )}
          </div>
          <span>{date}</span>
        </div>
      </div>
    </Link>
  );
}
