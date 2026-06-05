import React, { useEffect, useState } from "react";
import { deleteUser } from "services/apiUser";
import LoadingSpinner from "components/UI/LoadingSpinner";
import EmptyState from "components/UI/EmptyState";
import { colors } from "theme/gymTheme";

const API = "http://localhost:5000/api";

// ── Modal overlay style ──
const overlayStyle = {
  position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)",
  display: "flex", alignItems: "center", justifyContent: "center",
  zIndex: 1000, padding: "1rem",
};
const modalStyle = {
  background: "#111111", border: "1px solid #2a2a2a", borderRadius: "16px",
  width: "100%", maxWidth: "520px", maxHeight: "90vh", overflowY: "auto",
};
const inputStyle = {
  width: "100%", background: "#1a1a1a", border: "1px solid #2a2a2a",
  borderRadius: "8px", color: "white", padding: "0.5rem 0.75rem",
  fontSize: "0.85rem", outline: "none", boxSizing: "border-box",
};
const labelStyle = { color: "#9ca3af", fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", display: "block", marginBottom: "0.3rem" };
const btnPrimary = { background: "linear-gradient(135deg,#ef4444,#991b1b)", border: "none", color: "white", padding: "0.5rem 1.25rem", borderRadius: "8px", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" };
const btnSecondary = { background: "transparent", border: "1px solid #2a2a2a", color: "#9ca3af", padding: "0.5rem 1.25rem", borderRadius: "8px", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" };

export default function CardTable() {
  const [membres, setMembres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatut, setFilterStatut] = useState("tous");

  // Modals
  const [showAdd, setShowAdd] = useState(false);
  const [showView, setShowView] = useState(null); // membre object
  const [saving, setSaving] = useState(false);

  // Formulaire ajout
  const emptyForm = { name: "", email: "", password: "", phone: "", age: "", objectif: "musculation", abonnementType: "mensuel" };
  const [form, setForm] = useState(emptyForm);

  const fetchMembres = async () => {
    try {
      const res = await fetch(`${API}/members/getAllMembers`);
      const data = await res.json();
      setMembres(Array.isArray(data) ? data.filter(u => u.role === "membre") : []);
    } catch (err) {
      console.error("Erreur chargement membres:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMembres(); }, []);

  // ── Supprimer ──
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Supprimer ${name} ?`)) return;
    try {
      await deleteUser(id);
      setMembres(prev => prev.filter(m => m._id !== id));
    } catch { alert("Erreur lors de la suppression"); }
  };

  // ── Changer statut (accepter / refuser) ──
  const handleStatut = async (id, newStatut) => {
    try {
      await fetch(`${API}/members/updateStatus/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatut }),
      });
      setMembres(prev => prev.map(m => m._id === id ? { ...m, status: newStatut, statut: newStatut } : m));
      if (showView?._id === id) setShowView(prev => ({ ...prev, statut: newStatut }));
    } catch { alert("Erreur mise à jour statut"); }
  };

  // ── Ajouter membre ──
  const handleAdd = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Nom, email et mot de passe sont obligatoires.");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch(`${API}/members/addMember`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password, phone: form.phone ? Number(form.phone) : undefined, age: form.age ? Number(form.age) : undefined, objectif: form.objectif, abonnementType: form.abonnementType }),
      });
      if (!res.ok) throw new Error();
      setForm(emptyForm);
      setShowAdd(false);
      await fetchMembres();
    } catch { alert("Erreur lors de l'ajout du membre"); }
    finally { setSaving(false); }
  };

  const avatarColors = [colors.red, "#10b981", "#8b5cf6", "#f59e0b", "#3b82f6", "#ec4899"];
  const getColor = (name) => avatarColors[name?.charCodeAt(0) % avatarColors.length] || colors.red;

  const getStatutColor = (m) => {
    const s = m.statut || m.status;
    if (s === "actif" || s === "active") return "#10b981";
    if (s === "pending") return "#f59e0b";
    if (s === "rejected" || s === "inactif") return "#e11d48";
    return "#6b7280";
  };
  const getStatutLabel = (m) => {
    const s = m.statut || m.status;
    if (s === "actif" || s === "active") return "Actif";
    if (s === "pending") return "En attente";
    if (s === "rejected") return "Refusé";
    if (s === "inactif") return "Inactif";
    return s || "-";
  };

  const filtered = membres
    .filter(m => filterStatut === "tous" || (m.statut || m.status) === filterStatut)
    .filter(m =>
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase())
    );

  const pendingCount = membres.filter(m => m.statut === "pending" || m.status === "pending").length;

  return (
    <>
      <div className="gym-card" style={{ backgroundColor: colors.dark, borderRadius: "12px", overflow: "hidden" }}>

        {/* ── Header ── */}
        <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid #2a2a2a", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <h3 style={{ color: "white", fontFamily: "Oswald, sans-serif", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.05em", margin: 0 }}>
              Liste des Membres
            </h3>
            <span className="badge-red" style={{ padding: "0.2rem 0.7rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 700 }}>
              {membres.length} membres
            </span>
            {pendingCount > 0 && (
              <span style={{ background: "rgba(245,158,11,0.15)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.3)", padding: "0.2rem 0.7rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 700 }}>
                ⏳ {pendingCount} en attente
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: "0.75rem", alignItems: "center", flexWrap: "wrap" }}>
            {/* Filtre statut */}
            <select
              value={filterStatut}
              onChange={e => setFilterStatut(e.target.value)}
              style={{ ...inputStyle, width: "140px", cursor: "pointer" }}
            >
              <option value="tous">Tous</option>
              <option value="active">Actifs</option>
              <option value="pending">En attente</option>
              <option value="rejected">Refusés</option>
            </select>
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ ...inputStyle, width: "180px" }}
            />
            <button onClick={() => setShowAdd(true)} style={btnPrimary}>
              + AJOUTER
            </button>
          </div>
        </div>

        {/* ── Table ── */}
        <div style={{ overflowX: "auto" }}>
          {loading ? (
            <LoadingSpinner label="Chargement des membres..." />
          ) : filtered.length === 0 ? (
            <EmptyState icon="👥" title="Aucun membre" message={search ? "Aucun résultat pour cette recherche." : "Aucun membre inscrit pour le moment."} />
          ) : (
            <table className="gym-table" style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Membre", "Abonnement", "Téléphone", "Statut", "Inscription", "Actions"].map((h, i) => (
                    <th key={i} style={{ padding: "0.75rem 1.25rem", textAlign: "left", fontSize: "0.72rem", color: "#9ca3af", fontWeight: 700, letterSpacing: "0.1em", borderBottom: "1px solid #2a2a2a", backgroundColor: "#1a1a1a", textTransform: "uppercase" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((m, i) => {
                  const color = getColor(m.name);
                  const initials = m.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
                  const statutColor = getStatutColor(m);
                  const isPending = m.statut === "pending" || m.status === "pending";
                  return (
                    <tr key={m._id} style={{ borderBottom: "1px solid #1a1a1a", background: i % 2 === 0 ? "transparent" : "#0a0a0a" }}>

                      {/* Membre */}
                      <td style={{ padding: "0.85rem 1.25rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg,${color},${color}88)`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "0.8rem", flexShrink: 0 }}>
                            {initials}
                          </div>
                          <div>
                            <div style={{ color: "white", fontWeight: 600, fontSize: "0.85rem" }}>{m.name}</div>
                            <div style={{ color: "#6b7280", fontSize: "0.75rem" }}>{m.email}</div>
                          </div>
                        </div>
                      </td>

                      {/* Abonnement */}
                      <td style={{ padding: "0.85rem 1.25rem" }}>
                        <span style={{ background: `${color}22`, color, border: `1px solid ${color}44`, padding: "0.2rem 0.6rem", borderRadius: "999px", fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase" }}>
                          {m.objectif || "Standard"}
                        </span>
                      </td>

                      {/* Téléphone */}
                      <td style={{ padding: "0.85rem 1.25rem", color: "#9ca3af", fontSize: "0.85rem" }}>
                        {m.numTelephone || "-"}
                      </td>

                      {/* Statut */}
                      <td style={{ padding: "0.85rem 1.25rem" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          <div style={{ width: 8, height: 8, borderRadius: "50%", background: statutColor }}></div>
                          <span style={{ color: statutColor, fontSize: "0.85rem", fontWeight: 600 }}>
                            {getStatutLabel(m)}
                          </span>
                        </div>
                      </td>

                      {/* Inscription */}
                      <td style={{ padding: "0.85rem 1.25rem", color: "#9ca3af", fontSize: "0.85rem" }}>
                        {new Date(m.dateInscrit || m.createdAt).toLocaleDateString("fr-FR", { month: "short", year: "numeric" })}
                      </td>

                      {/* Actions */}
                      <td style={{ padding: "0.85rem 1.25rem" }}>
                        <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                          {/* Voir */}
                          <button
                            title="Voir le profil"
                            onClick={() => setShowView(m)}
                            style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", color: "#3b82f6", padding: "0.3rem 0.6rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem" }}
                          >
                            👁
                          </button>

                          {/* Accepter si pending */}
                          {isPending && (
                            <button
                              title="Accepter"
                              onClick={() => handleStatut(m._id, "active")}
                              style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", color: "#10b981", padding: "0.3rem 0.6rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem" }}
                            >
                              ✓
                            </button>
                          )}
                          {/* Refuser si pending */}
                          {isPending && (
                            <button
                              title="Refuser"
                              onClick={() => handleStatut(m._id, "rejected")}
                              style={{ background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", color: "#f59e0b", padding: "0.3rem 0.6rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem" }}
                            >
                              ✕
                            </button>
                          )}

                          {/* Supprimer */}
                          <button
                            title="Supprimer"
                            onClick={() => handleDelete(m._id, m.name)}
                            style={{ background: "rgba(225,29,72,0.15)", border: "1px solid rgba(225,29,72,0.3)", color: "#e11d48", padding: "0.3rem 0.6rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem" }}
                          >
                            🗑
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          MODAL — AJOUTER MEMBRE
      ══════════════════════════════════════════ */}
      {showAdd && (
        <div style={overlayStyle} onClick={() => setShowAdd(false)}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>
            {/* Header modal */}
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #2a2a2a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ color: "#e11d48", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Gestion membres</p>
                <h3 style={{ color: "white", fontFamily: "Oswald, sans-serif", fontSize: "1.2rem", margin: "0.2rem 0 0" }}>Ajouter un Membre</h3>
              </div>
              <button onClick={() => setShowAdd(false)} style={{ background: "none", border: "none", color: "#6b7280", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
            </div>

            {/* Body */}
            <div style={{ padding: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { label: "Nom complet *", key: "name", type: "text", full: true },
                { label: "Email *", key: "email", type: "email", full: true },
                { label: "Mot de passe *", key: "password", type: "password", full: false },
                { label: "Téléphone", key: "phone", type: "text" },
                { label: "Âge", key: "age", type: "number" },
                { label: "Poids (kg)", key: "poids", type: "number" },
                { label: "Taille (cm)", key: "taille", type: "number" },
              ].map(f => (
                <div key={f.key} style={{ gridColumn: f.full ? "1 / -1" : "auto" }}>
                  <label style={labelStyle}>{f.label}</label>
                  <input
                    type={f.type}
                    value={form[f.key]}
                    onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                    style={inputStyle}
                  />
                </div>
              ))}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Objectif</label>
                <select value={form.objectif} onChange={e => setForm(p => ({ ...p, objectif: e.target.value }))} style={{ ...inputStyle, cursor: "pointer" }}>
                  <option value="musculation">Musculation</option>
                  <option value="perte_de_poids">Perte de poids</option>
                  <option value="cardio">Cardio</option>
                  <option value="souplesse">Souplesse</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid #2a2a2a", display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
              <button onClick={() => setShowAdd(false)} style={btnSecondary}>Annuler</button>
              <button onClick={handleAdd} disabled={saving} style={{ ...btnPrimary, opacity: saving ? 0.6 : 1 }}>
                {saving ? "Enregistrement..." : "Ajouter"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════
          MODAL — VOIR MEMBRE
      ══════════════════════════════════════════ */}
      {showView && (
        <div style={overlayStyle} onClick={() => setShowView(null)}>
          <div style={modalStyle} onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #2a2a2a", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <p style={{ color: "#e11d48", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Profil membre</p>
                <h3 style={{ color: "white", fontFamily: "Oswald, sans-serif", fontSize: "1.2rem", margin: "0.2rem 0 0" }}>{showView.name}</h3>
              </div>
              <button onClick={() => setShowView(null)} style={{ background: "none", border: "none", color: "#6b7280", fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
            </div>

            {/* Avatar + infos principales */}
            <div style={{ padding: "1.5rem", borderBottom: "1px solid #2a2a2a", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg,${getColor(showView.name)},${getColor(showView.name)}88)`, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "1.1rem", flexShrink: 0 }}>
                {showView.name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
              </div>
              <div>
                <div style={{ color: "white", fontWeight: 700, fontSize: "1rem" }}>{showView.name}</div>
                <div style={{ color: "#6b7280", fontSize: "0.8rem" }}>{showView.email}</div>
                <div style={{ marginTop: "0.3rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: getStatutColor(showView) }}></div>
                  <span style={{ color: getStatutColor(showView), fontSize: "0.8rem", fontWeight: 600 }}>{getStatutLabel(showView)}</span>
                </div>
              </div>
            </div>

            {/* Détails */}
            <div style={{ padding: "1.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              {[
                { label: "Téléphone", value: showView.numTelephone || "-" },
                { label: "Âge", value: showView.age ? `${showView.age} ans` : "-" },
                { label: "Poids", value: showView.poids ? `${showView.poids} kg` : "-" },
                { label: "Taille", value: showView.taille ? `${showView.taille} cm` : "-" },
                { label: "Objectif", value: showView.objectif || "-" },
                { label: "Inscription", value: new Date(showView.dateInscrit || showView.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) },
              ].map((f, i) => (
                <div key={i} style={{ background: "#1a1a1a", borderRadius: "8px", padding: "0.75rem 1rem" }}>
                  <div style={{ color: "#6b7280", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "0.2rem" }}>{f.label}</div>
                  <div style={{ color: "white", fontSize: "0.9rem", fontWeight: 600 }}>{f.value}</div>
                </div>
              ))}
            </div>

            {/* Actions statut si pending */}
            {(showView.statut === "pending" || showView.status === "pending") && (
              <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid #2a2a2a", background: "rgba(245,158,11,0.05)" }}>
                <p style={{ color: "#f59e0b", fontSize: "0.8rem", fontWeight: 700, margin: "0 0 0.75rem" }}>⏳ Inscription en attente de validation</p>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    onClick={() => handleStatut(showView._id, "active")}
                    style={{ ...btnPrimary, background: "linear-gradient(135deg,#10b981,#065f46)", flex: 1 }}
                  >
                    ✓ Accepter
                  </button>
                  <button
                    onClick={() => handleStatut(showView._id, "rejected")}
                    style={{ ...btnPrimary, background: "linear-gradient(135deg,#f59e0b,#92400e)", flex: 1 }}
                  >
                    ✕ Refuser
                  </button>
                </div>
              </div>
            )}

            {/* Footer */}
            <div style={{ padding: "1rem 1.5rem", borderTop: "1px solid #2a2a2a", display: "flex", justifyContent: "flex-end" }}>
              <button onClick={() => setShowView(null)} style={btnSecondary}>Fermer</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}