// src/lib/api.js
// ─── Calé exactement sur app.js backend ──────────────────────────────────────
//
//  /coaches      → coach.routes.js
//  /programme    → programme.routes.js
//  /seances      → seance.routes.js
//  /progressions → progression.routes.js
//  /members      → member.routes.js
//
// Port : process.env.PORT (défini dans .env backend)
// Mettre REACT_APP_API_URL=http://localhost:PORT dans .env frontend
// ─────────────────────────────────────────────────────────────────────────────

const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

function getToken() {
  return localStorage.getItem("gymaccess_token");
}

async function request(path, options = {}) {
  const token = getToken();
  const res = await fetch(`${BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Erreur réseau");
  return data;
}

// ── /coaches ─────────────────────────────────────────────────────────────────
export const coachAPI = {
  getAll: () => request("/users/getCoaches"), // ← au lieu de /coaches/getAllCoaches
  getById: (id) => request(`/users/getUserById/${id}`),
  add: (body) => request("/coaches/addCoach", { method: "POST", body: JSON.stringify(body) }),
  update: (id, body) => request(`/coaches/updateCoach/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  delete: (id) => request(`/coaches/deleteCoach/${id}`, { method: "DELETE" }),
};

// ── /programme ───────────────────────────────────────────────────────────────
export const programmeAPI = {
  getAll:   () => request("/api/programme/getAllProgrammes"),
  getById:  (id) => request(`/api/programme/getProgrammeById/${id}`),
  add:      (body) => request("/api/programme/addProgramme", { method: "POST", body: JSON.stringify(body) }),
  update:   (id, body) => request(`/api/programme/updateProgramme/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  delete:   (id) => request(`/api/programme/deleteProgramme/${id}`, { method: "DELETE" }),
};


// ── /seances ─────────────────────────────────────────────────────────────────
export const seanceAPI = {
  getAll:          () => request("/api/seances/getAllSeances"),
  getById:         (id) => request(`/api/seances/getSeanceById/${id}`),
  getByProgramme:  (id) => request(`/api/seances/getSeancesByProgramme/${id}`),
  getByMembre:     (id) => request(`/api/seances/getSeancesByMembre/${id}`),
  add:             (body) => request("/api/seances/addSeance", { method: "POST", body: JSON.stringify(body) }),
  update:          (id, body) => request(`/api/seances/updateSeance/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  delete:          (id) => request(`/api/seances/deleteSeance/${id}`, { method: "DELETE" }),
  inscrireMembre:  (id, membreId) => request(`/api/seances/inscrireMembre/${id}`, { method: "POST", body: JSON.stringify({ membreId }) }),
};

// ── /progressions ────────────────────────────────────────────────────────────
export const progressionAPI = {
  getAll:      () => request("/api/progressions/getAllProgressions"),
  getById:     (id) => request(`/api/progressions/getProgressionById/${id}`),
  getByMembre: (id) => request(`/api/progressions/getProgressionsByMembre/${id}`),
  add:         (body) => request("/api/progressions/addProgression", { method: "POST", body: JSON.stringify(body) }),
  update:      (id, body) => request(`/api/progressions/updateProgression/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  delete:      (id) => request(`/api/progressions/deleteProgression/${id}`, { method: "DELETE" }),
};

// ── /members ─────────────────────────────────────────────────────────────────
export const memberAPI = {
  getAll: () => request("/users/getMembres"),        // ← changé
  getById: (id) => request(`/users/getUserById/${id}`), // ← changé
};