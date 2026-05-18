"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createJob } from "../../../lib/api";

const CATEGORIES = ["Plumbing", "Electrical", "Painting", "Joinery", "Other"];

const EMPTY_FORM = {
  title: "",
  description: "",
  category: "Plumbing",
  location: "",
  contactName: "",
  contactEmail: "",
};

function validate(fields) {
  const errors = {};
  if (!fields.title.trim()) errors.title = "Title is required.";
  if (!fields.description.trim()) errors.description = "Description is required.";
  if (fields.contactEmail && !/^\S+@\S+\.\S+$/.test(fields.contactEmail)) {
    errors.contactEmail = "Please enter a valid email address.";
  }
  return errors;
}

export default function NewJobPage() {
  const router = useRouter();
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setServerError(null);

    try {
      const job = await createJob(form);
      router.push(`/jobs/${job._id}`);
    } catch (err) {
      setServerError(err.message);
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link href="/" className="hover:text-brand-600 transition-colors">
          Jobs
        </Link>
        <span>/</span>
        <span className="text-gray-700">New Request</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
        <h1 className="text-xl font-bold text-gray-900 mb-1">Post a Service Request</h1>
        <p className="text-sm text-gray-500 mb-6">
          Fill in the details below and tradespeople will be able to browse and respond.
        </p>

        {serverError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-6">
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g. Leaking kitchen tap needs fixing"
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
                errors.title ? "border-red-400 bg-red-50" : "border-gray-200"
              }`}
            />
            {errors.title && (
              <p className="text-xs text-red-500 mt-1">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe the work needed in as much detail as possible…"
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none ${
                errors.description ? "border-red-400 bg-red-50" : "border-gray-200"
              }`}
            />
            {errors.description && (
              <p className="text-xs text-red-500 mt-1">{errors.description}</p>
            )}
          </div>

          {/* Category + Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 bg-white"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Glasgow"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Contact name + email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                name="contactName"
                value={form.contactName}
                onChange={handleChange}
                placeholder="e.g. James Reid"
                className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Contact Email
              </label>
              <input
                type="email"
                name="contactEmail"
                value={form.contactEmail}
                onChange={handleChange}
                placeholder="e.g. james@example.com"
                className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
                  errors.contactEmail ? "border-red-400 bg-red-50" : "border-gray-200"
                }`}
              />
              {errors.contactEmail && (
                <p className="text-xs text-red-500 mt-1">{errors.contactEmail}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="bg-brand-600 hover:bg-brand-700 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
            >
              {submitting ? "Posting…" : "Post Request"}
            </button>
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
