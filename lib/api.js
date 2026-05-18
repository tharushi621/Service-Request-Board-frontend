const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ─── Token helpers ────────────────────────────────────────────────────────────

function getToken() {
  try {
    const stored = localStorage.getItem("auth");
    if (!stored) return null;
    return JSON.parse(stored).token || null;
  } catch {
    return null;
  }
}

function authHeaders() {
  const token = getToken();
  return token
    ? { "Content-Type": "application/json", Authorization: `Bearer ${token}` }
    : { "Content-Type": "application/json" };
}

/**
 * Call this before any protected action (post/delete).
 * Returns true if logged in, otherwise redirects to /auth?redirect=<current path>.
 */
export function requireAuth(redirectPath = "/") {
  const token = getToken();
  if (!token) {
    window.location.href = `/auth?redirect=${encodeURIComponent(redirectPath)}`;
    return false;
  }
  return true;
}

// ─── Jobs API ─────────────────────────────────────────────────────────────────

export async function getJobs({ category, status, search } = {}) {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (status) params.set("status", status);
  if (search) params.set("search", search);

  const res = await fetch(`${API_URL}/api/jobs?${params.toString()}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch jobs");
  const data = await res.json();
  return data.data;
}

export async function getJob(id) {
  const res = await fetch(`${API_URL}/api/jobs/${id}`, { cache: "no-store" });
  if (!res.ok) throw new Error("Job not found");
  const data = await res.json();
  return data.data;
}

export async function createJob(body) {
  if (!requireAuth("/jobs/new")) return;

  const res = await fetch(`${API_URL}/api/jobs`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create job");
  return data.data;
}

export async function updateJobStatus(id, status) {
  if (!requireAuth(`/jobs/${id}`)) return;

  const res = await fetch(`${API_URL}/api/jobs/${id}`, {
    method: "PATCH",
    headers: authHeaders(),
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update status");
  return data.data;
}

export async function deleteJob(id) {
  if (!requireAuth(`/jobs/${id}`)) return;

  const res = await fetch(`${API_URL}/api/jobs/${id}`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete job");
  return data;
}