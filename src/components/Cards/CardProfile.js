import React, { useEffect, useState } from "react";
import { getAllUsers } from "services/apiUser";

export default function CardProfile() {
  const [membre, setMembre] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getAllUsers();
        const membres = res.data.filter((u) => u.role === "membre" && u.statut === "actif");
        if (membres.length > 0) setMembre(membres[0]);
      } catch (err) {
        console.error("Erreur CardProfile:", err);
      }
    }
    fetchData();
  }, []);

  const initials = membre?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "?";

  const dateInscrit = membre ? new Date(membre.dateInscrit || membre.createdAt) : null;
  const moisActif = dateInscrit
    ? Math.max(1, Math.round((new Date() - dateInscrit) / (1000 * 60 * 60 * 24 * 30)))
    : 0;

  return (
    <div
      style={{
        backgroundColor: "#111111",
        border: "1px solid #2a2a2a",
        borderRadius: "12px",
        overflow: "hidden",
        marginTop: "0",
      }}
    >
      {/* Bandeau top */}
      <div style={{ height: "80px", background: "linear-gradient(135deg,#e11d48,#7f1d1d)", position: "relative" }}>
        <div style={{
          position: "absolute",
          bottom: "-36px",
          left: "50%",
          transform: "translateX(-50%)",
          width: 72,
          height: 72,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#e11d48,#9f1239)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "3px solid #111",
          fontSize: "1.4rem",
          fontWeight: 800,
          color: "white",
          fontFamily: "Oswald, sans-serif",
          letterSpacing: "0.05em",
        }}>
          {initials}
        </div>
      </div>

      <div style={{ paddingTop: "48px", paddingBottom: "24px", textAlign: "center", padding: "48px 20px 24px" }}>
        {/* Nom */}
        <h3 style={{ color: "white", fontFamily: "Oswald, sans-serif", fontSize: "1.2rem", fontWeight: 700, margin: "0 0 4px", letterSpacing: "0.05em" }}>
          {membre?.name || "—"}
        </h3>

        {/* Badge statut */}
        <div style={{ marginBottom: "12px" }}>
          <span style={{
            background: "rgba(225,29,72,0.12)",
            color: "#e11d48",
            border: "1px solid rgba(225,29,72,0.25)",
            padding: "3px 12px",
            borderRadius: "999px",
            fontSize: "0.72rem",
            fontWeight: 700,
            fontFamily: "Rajdhani, sans-serif",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}>
            {membre?.abonnement || "Membre Standard"}
          </span>
        </div>

        {/* Infos */}
        <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginBottom: "20px" }}>
          <div style={{ color: "#9ca3af", fontSize: "0.82rem", fontFamily: "Rajdhani, sans-serif" }}>
            <i className="fas fa-map-marker-alt" style={{ color: "#e11d48", marginRight: "6px" }}></i>
            {membre?.ville || "Tunis"}, Tunisie
          </div>
          <div style={{ color: "#9ca3af", fontSize: "0.82rem", fontFamily: "Rajdhani, sans-serif" }}>
            <i className="fas fa-dumbbell" style={{ color: "#e11d48", marginRight: "6px" }}></i>
            Objectif : {membre?.objectif || "—"}
          </div>
          <div style={{ color: "#9ca3af", fontSize: "0.82rem", fontFamily: "Rajdhani, sans-serif" }}>
            <i className="fas fa-envelope" style={{ color: "#e11d48", marginRight: "6px" }}></i>
            {membre?.email || "—"}
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          borderTop: "1px solid #2a2a2a",
          paddingTop: "16px",
          gap: "8px",
        }}>
          {[
            { label: "Programmes", value: membre?.programmes ?? 22, color: "white" },
            { label: "Mois actif",  value: moisActif,               color: "#e11d48" },
            { label: "Séances",     value: membre?.seances ?? 89,    color: "white" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Oswald, sans-serif", fontSize: "1.4rem", fontWeight: 700, color: s.color }}>
                {s.value}
              </div>
              <div style={{ fontSize: "0.72rem", color: "#6b7280", fontFamily: "Rajdhani, sans-serif", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}