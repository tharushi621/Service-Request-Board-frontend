"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import StatusBadge from "../../components/StatusBadge";
import { getJob, updateJobStatus, deleteJob } from "../../lib/api";

const STATUSES = ["Open", "In Progress", "Closed"];

const CATEGORY_ICONS = {
  Plumbing: "🔧",
  Electrical: "⚡",
  Painting: "🎨",
  Joinery: "🪵",
  Other: "🏠",
};

export default function JobDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusValue, setStatusValue] = useState("");
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await getJob(id);
        setJob(data);
        setStatusValue(data.status);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    if (newStatus === job.status) return;
    setUpdating(true);
    setStatusMsg(null);
    try {
      const updated = await updateJobStatus(id, newStatus);
      setJob(updated);
      setStatusValue(updated.status);
      setStatusMsg({ type: "success", text: `Status updated to "${updated.status}"` });
    } catch (err) {
      setStatusMsg({ type: "error", text: err.message });
      setStatusValue(job.status);
    } finally {
      setUpdating(false);
      setTimeout(() => setStatusMsg(null), 3000);
    }
  };

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    setDeleting(true);
    try {
      await deleteJob(id);
      router.push("/");
    } catch (err) {
      setStatusMsg({ type: "error", text: err.message });
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl border border-gray-200 p-8 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
          <div className="h-4 bg-gray-100 rounded w-full mb-2" />
          <div className="h-4 bg-gray-100 rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <div className="text-5xl mb-4">😕</div>
        <p className="font-semibold text-gray-700 mb-1">Job not found</p>
        <p className="text-sm text-gray-400 mb-4">{error}</p>
        <Link href="/" className="text-brand-600 hover:underline text-sm">
          ← Back to jobs
        </Link>
      </div>
    );
  }

  const icon = CATEGORY_ICONS[job.category] || "🏠";
  const date = new Date(job.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-brand-600 transition-colors">
          Jobs
        </Link>
        <span>/</span>
        <span className="text-gray-700 truncate">{job.title}</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-gray-100">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{icon}</span>
              <h1 className="text-xl font-bold text-gray-900">{job.title}</h1>
            </div>
            <StatusBadge status={job.status} />
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            {job.category && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                {job.category}
              </span>
            )}
            {job.location && (
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {job.location}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Posted {date}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="p-6 sm:p-8 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Description
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
            {job.description}
          </p>
        </div>

        {/* Contact */}
        {(job.contactName || job.contactEmail) && (
          <div className="p-6 sm:p-8 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Contact
            </h2>
            <div className="space-y-1.5 text-sm text-gray-700">
              {job.contactName && (
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {job.contactName}
                </p>
              )}
              {job.contactEmail && (
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href={`mailto:${job.contactEmail}`} className="text-brand-600 hover:underline">
                    {job.contactEmail}
                  </a>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="p-6 sm:p-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Actions
          </h2>

          {statusMsg && (
            <div
              className={`text-sm rounded-lg px-4 py-3 mb-4 ${
                statusMsg.type === "success"
                  ? "bg-green-50 border border-green-200 text-green-700"
                  : "bg-red-50 border border-red-200 text-red-700"
              }`}
            >
              {statusMsg.text}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Status dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600 font-medium whitespace-nowrap">
                Update status:
              </label>
              <select
                value={statusValue}
                onChange={(e) => handleStatusChange(e.target.value)}
                disabled={updating}
                className="text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white disabled:opacity-60"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {updating && (
                <span className="text-xs text-gray-400 animate-pulse">Saving…</span>
              )}
            </div>

            {/* Delete */}
            <button
              onClick={handleDelete}
              disabled={deleting}
              className={`text-sm font-medium px-4 py-2 rounded-lg border transition-colors ${
                confirmDelete
                  ? "bg-red-600 text-white border-red-600 hover:bg-red-700"
                  : "text-red-500 border-red-200 hover:bg-red-50"
              } disabled:opacity-60`}
            >
              {deleting ? "Deleting…" : confirmDelete ? "Confirm Delete" : "Delete Job"}
            </button>
            {confirmDelete && !deleting && (
              <button
                onClick={() => setConfirmDelete(false)}
                className="text-sm text-gray-400 hover:text-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Link href="/" className="text-sm text-gray-400 hover:text-brand-600 transition-colors">
          ← Back to all jobs
        </Link>
      </div>
    </div>
  );
}
