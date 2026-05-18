const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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
  const res = await fetch(`${API_URL}/api/jobs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to create job");
  return data.data;
}

export async function updateJobStatus(id, status) {
  const res = await fetch(`${API_URL}/api/jobs/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to update status");
  return data.data;
}

export async function deleteJob(id) {
  const res = await fetch(`${API_URL}/api/jobs/${id}`, { method: "DELETE" });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Failed to delete job");
  return data;
}
