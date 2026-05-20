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
  getAll:    ()         => request("/coaches/getAllCoaches"),
  getById:   (id)       => request(`/coaches/getCoachById/${id}`),
  add:       (body)     => request("/coaches/addCoach",           { method: "POST",   body: JSON.stringify(body) }),
  update:    (id, body) => request(`/coaches/updateCoach/${id}`,  { method: "PUT",    body: JSON.stringify(body) }),
  delete:    (id)       => request(`/coaches/deleteCoach/${id}`,  { method: "DELETE" }),
};

// ── /programme ───────────────────────────────────────────────────────────────
export const programmeAPI = {
  getAll:    ()         => request("/programme/getAllProgrammes"),
  getById:   (id)       => request(`/programme/getProgrammeById/${id}`),
  add:       (body)     => request("/programme/addProgramme",              { method: "POST",   body: JSON.stringify(body) }),
  update:    (id, body) => request(`/programme/updateProgramme/${id}`,     { method: "PUT",    body: JSON.stringify(body) }),
  delete:    (id)       => request(`/programme/deleteProgramme/${id}`,     { method: "DELETE" }),
};

// ── /seances ─────────────────────────────────────────────────────────────────
export const seanceAPI = {
  getAll:           ()              => request("/seances/getAllSeances"),
  getById:          (id)            => request(`/seances/getSeanceById/${id}`),
  getByProgramme:   (programmeId)   => request(`/seances/getSeancesByProgramme/${programmeId}`),
  getByMembre:      (membreId)      => request(`/seances/getSeancesByMembre/${membreId}`),
  add:              (body)          => request("/seances/addSeance",                    { method: "POST",   body: JSON.stringify(body) }),
  update:           (id, body)      => request(`/seances/updateSeance/${id}`,           { method: "PUT",    body: JSON.stringify(body) }),
  delete:           (id)            => request(`/seances/deleteSeance/${id}`,           { method: "DELETE" }),
  inscrireMembre:   (id, membreId)  => request(`/seances/inscrireMembre/${id}`,         { method: "POST",   body: JSON.stringify({ membreId }) }),
};

// ── /progressions ────────────────────────────────────────────────────────────
export const progressionAPI = {
  getAll:        ()           => request("/progressions/getAllProgressions"),
  getById:       (id)         => request(`/progressions/getProgressionById/${id}`),
  getByMembre:   (membreId)   => request(`/progressions/getProgressionsByMembre/${membreId}`),
  add:           (body)       => request("/progressions/addProgression",              { method: "POST",   body: JSON.stringify(body) }),
  update:        (id, body)   => request(`/progressions/updateProgression/${id}`,     { method: "PUT",    body: JSON.stringify(body) }),
  delete:        (id)         => request(`/progressions/deleteProgression/${id}`,     { method: "DELETE" }),
};

// ── /members ─────────────────────────────────────────────────────────────────
export const memberAPI = {
  getAll:  () => request("/members/getAllMembers"),
  getById: (id) => request(`/members/getMemberById/${id}`),
};