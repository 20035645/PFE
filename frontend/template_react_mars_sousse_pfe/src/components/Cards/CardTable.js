import React, { useEffect, useState } from "react";
import { getAllUsers, deleteUser } from "Services/apiUser";
import LoadingSpinner from "components/UI/LoadingSpinner";
import EmptyState from "components/UI/EmptyState";
import { colors } from "theme/gymTheme";

export default function CardTable() {
  const [membres, setMembres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchMembres = async () => {
    try {
      const res = await getAllUsers();
      const tous = res.data;
      setMembres(tous.filter((u) => u.role === "membre"));
    } catch (err) {
      console.error("Erreur chargement membres:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembres();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Supprimer ${name} ?`)) {
      try {
        await deleteUser(id);
        setMembres((prev) => prev.filter((m) => m._id !== id));
      } catch (err) {
        alert("Erreur lors de la suppression");
      }
    }
  };

  const avatarColors = [colors.red, "#10b981", "#8b5cf6", "#f59e0b", "#3b82f6", "#ec4899"];
  const getColor = (name) => avatarColors[name?.charCodeAt(0) % avatarColors.length] || colors.red;

  const filtered = membres.filter(
    (m) =>
      m.name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="gym-card" style={{ backgroundColor: colors.dark, borderRadius: "12px", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "1rem 1.5rem", borderBottom: "1px solid #2a2a2a", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <h3 style={{ color: "white", fontFamily: "Oswald, sans-serif", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.05em", margin: 0 }}>
            Liste des Membres
          </h3>
          <span className="badge-red" style={{ padding: "0.2rem 0.7rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 700 }}>
            {membres.length} membres
          </span>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="gym-input"
            style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem", width: "180px" }}
          />
          <button
            style={{ background: "linear-gradient(135deg,#ef4444,#991b1b)", border: "none", color: "white", padding: "0.4rem 1rem", borderRadius: "8px", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.1em", cursor: "pointer" }}
          >
            + AJOUTER
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        {loading ? (
          <LoadingSpinner label="Chargement des membres..." />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="👥"
            title="Aucun membre"
            message={search ? "Aucun résultat pour cette recherche." : "Aucun membre inscrit pour le moment."}
          />
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
                const initials = m.name?.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
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
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: m.statut === "actif" ? "#10b981" : "#6b7280" }}></div>
                        <span style={{ color: m.statut === "actif" ? "#10b981" : "#6b7280", fontSize: "0.85rem", fontWeight: 600, textTransform: "capitalize" }}>
                          {m.statut || "actif"}
                        </span>
                      </div>
                    </td>

                    {/* Inscription */}
                    <td style={{ padding: "0.85rem 1.25rem", color: "#9ca3af", fontSize: "0.85rem" }}>
                      {new Date(m.dateInscrit || m.createdAt).toLocaleDateString("fr-FR", { month: "short", year: "numeric" })}
                    </td>

                    {/* Actions */}
                    <td style={{ padding: "0.85rem 1.25rem" }}>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button
                          title="Voir"
                          style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.3)", color: "#3b82f6", padding: "0.3rem 0.6rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.75rem" }}
                        >
                          👁
                        </button>
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
  );
}