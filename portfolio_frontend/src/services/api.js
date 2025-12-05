import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:3001";

const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// PUBLIC_INTERFACE
export function getAbout() {
  /** Fetch about/profile data */
  return api.get("/api/about").then((r) => r.data);
}

// PUBLIC_INTERFACE
export function getProjects(params = {}) {
  /** Fetch projects list with optional query params */
  return api.get("/api/projects", { params }).then((r) => r.data);
}

// PUBLIC_INTERFACE
export function getExperience() {
  /** Fetch experience timeline/cards */
  return api.get("/api/experience").then((r) => r.data);
}

// PUBLIC_INTERFACE
export function postContact(payload) {
  /** Send contact form payload */
  return api.post("/api/contact", payload).then((r) => r.data);
}

export default api;
