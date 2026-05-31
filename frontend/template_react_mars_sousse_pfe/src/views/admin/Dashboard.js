import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js";


export default function Dashboard() {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const lineInstance = useRef(null);
  const barInstance = useRef(null);

  const [membres, setMembres] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resMembres, resCoaches] = await Promise.all([
          fetch("http://localhost:5000/api/members/getAllMembers").then(r => r.json()),
          fetch("http://localhost:5000/api/coaches/getAllCoaches").then(r => r.json()),
        ]);
        const m = Array.isArray(resMembres) ? resMembres.filter(u => u.role === "membre") : [];
        const c = Array.isArray(resCoaches) ? resCoaches : [];
        setMembres(m);
        setCoaches(c);

        // ── Graphique LINE : inscriptions par mois ──
        const months = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
        const countByMonth = Array(12).fill(0);
        m.forEach((mb) => {
          const d = new Date(mb.dateInscrit || mb.createdAt);
          countByMonth[d.getMonth()]++;
        });

        if (lineInstance.current) lineInstance.current.destroy();
        const ctxLine = lineChartRef.current.getContext("2d");
        lineInstance.current = new Chart(ctxLine, {
          type: "line",
          data: {
            labels: months,
            datasets: [{
              label: "Nouveaux membres",
              backgroundColor: "rgba(225,29,72,0.1)",
              borderColor: "#e11d48",
              data: countByMonth,
              borderWidth: 2,
              pointBackgroundColor: "#e11d48",
              pointRadius: 4,
              tension: 0.4,
              fill: true,
            }],
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            legend: { labels: { fontColor: "#9ca3af", fontFamily: "Rajdhani", fontSize: 12 }, position: "bottom" },
            tooltips: { mode: "index", intersect: false, backgroundColor: "#1a1a1a", borderColor: "#e11d48", borderWidth: 1, titleFontColor: "#fff", bodyFontColor: "#9ca3af" },
            scales: {
              xAxes: [{ gridLines: { display: false }, ticks: { fontColor: "#6b7280", fontFamily: "Rajdhani", fontSize: 11 } }],
              yAxes: [{ ticks: { fontColor: "#6b7280", fontFamily: "Rajdhani", fontSize: 11, beginAtZero: true }, gridLines: { color: "rgba(255,255,255,0.05)", drawBorder: false, zeroLineColor: "transparent" } }],
            },
          },
        });

        // ── Graphique BAR : membres par objectif ──
        const objectifCount = {};
        m.forEach((mb) => {
          const obj = mb.objectif || "Non défini";
          objectifCount[obj] = (objectifCount[obj] || 0) + 1;
        });
        const objLabels = Object.keys(objectifCount);
        const objData = Object.values(objectifCount);

        if (barInstance.current) barInstance.current.destroy();
        const ctxBar = barChartRef.current.getContext("2d");
        barInstance.current = new Chart(ctxBar, {
          type: "bar",
          data: {
            labels: objLabels,
            datasets: [{
              label: "Membres par objectif",
              backgroundColor: objLabels.map((_, i) => `rgba(225,29,72,${0.5 + i * 0.1})`),
              borderColor: "#e11d48",
              borderWidth: 0,
              data: objData,
            }],
          },
          options: {
            maintainAspectRatio: false,
            responsive: true,
            legend: { labels: { fontColor: "#9ca3af", fontFamily: "Rajdhani", fontSize: 12 }, position: "bottom" },
            tooltips: { mode: "index", intersect: false, backgroundColor: "#1a1a1a", borderColor: "#e11d48", borderWidth: 1, titleFontColor: "#fff", bodyFontColor: "#9ca3af" },
            scales: {
              xAxes: [{ gridLines: { display: false }, ticks: { fontColor: "#6b7280", fontFamily: "Rajdhani", fontSize: 11 } }],
              yAxes: [{ ticks: { fontColor: "#6b7280", fontFamily: "Rajdhani", fontSize: 11, beginAtZero: true }, gridLines: { color: "rgba(255,255,255,0.05)", drawBorder: false, zeroLineColor: "transparent" } }],
            },
          },
        });

      } catch (err) {
        console.error("Erreur:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => {
      if (lineInstance.current) lineInstance.current.destroy();
      if (barInstance.current) barInstance.current.destroy();
    };
  }, []);

  const actifs = membres.filter((m) => m.statut === "actif" || m.status === "active").length;
  const inactifs = membres.filter((m) => m.statut !== "actif" && m.status !== "active").length;
  const now = new Date();
  const newThisMonth = membres.filter((m) => {
    const d = new Date(m.dateInscrit || m.createdAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div style={{ padding: "1.5rem" }}>

      {/* ── Graphiques ── */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>

        {/* Line Chart */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <p style={{ color: "#e11d48", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Vue d'ensemble</p>
            <h2 style={{ color: "white", fontFamily: "Oswald, sans-serif", fontSize: "1.2rem", margin: "0.2rem 0 0" }}>Inscriptions par Mois</h2>
          </div>
          <div style={{ padding: "1rem", height: "300px" }}>
            <canvas ref={lineChartRef}></canvas>
          </div>
        </div>

        {/* Bar Chart */}
        <div style={cardStyle}>
          <div style={cardHeaderStyle}>
            <p style={{ color: "#e11d48", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>Répartition</p>
            <h2 style={{ color: "white", fontFamily: "Oswald, sans-serif", fontSize: "1.2rem", margin: "0.2rem 0 0" }}>Membres par Objectif</h2>
          </div>
          <div style={{ padding: "1rem", height: "300px" }}>
            <canvas ref={barChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* ── Stats rapides ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
        {[
          { label: "Total Membres", value: membres.length, color: "#e11d48", icon: "👥" },
          { label: "Actifs", value: actifs, color: "#10b981", icon: "✅" },
          { label: "Inactifs", value: inactifs, color: "#f59e0b", icon: "⚠️" },
          { label: "Nouveaux ce mois", value: newThisMonth, color: "#6366f1", icon: "🆕" },
        ].map((s, i) => (
          <div key={i} style={{ ...cardStyle, display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.25rem" }}>
            <div style={{ width: 45, height: 45, borderRadius: "50%", background: `${s.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", flexShrink: 0 }}>
              {s.icon}
            </div>
            <div>
              <p style={{ color: "#9ca3af", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>{s.label}</p>
              <p style={{ color: "white", fontSize: "1.8rem", fontWeight: 800, margin: 0, lineHeight: 1.2 }}>
                {loading ? "..." : s.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Derniers inscrits ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>

        {/* Derniers membres */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ color: "white", fontWeight: 700, fontSize: "1rem", margin: 0 }}>👥 Derniers Membres</h3>
            <span style={badgeStyle}>{membres.length} total</span>
          </div>
          {loading ? <p style={{ color: "#9ca3af", textAlign: "center" }}>Chargement...</p> : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Membre", "Statut", "Inscription"].map((h, i) => (
                    <th key={i} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {membres.slice(0, 6).map((m, i) => (
                  <tr key={m._id} style={{ borderBottom: "1px solid #1a1a1a" }}>
                    <td style={tdStyle}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <div style={avatarStyle}>{m.name?.charAt(0).toUpperCase()}</div>
                        <div>
                          <div style={{ color: "white", fontWeight: 600, fontSize: "0.82rem" }}>{m.name}</div>
                          <div style={{ color: "#6b7280", fontSize: "0.72rem" }}>{m.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={tdStyle}>
                      <span style={{ padding: "0.2rem 0.6rem", borderRadius: "999px", fontSize: "0.7rem", fontWeight: 700, background: m.statut === "actif" ? "rgba(16,185,129,0.15)" : "rgba(225,29,72,0.15)", color: m.statut === "actif" ? "#10b981" : "#e11d48", border: `1px solid ${m.statut === "actif" ? "rgba(16,185,129,0.3)" : "rgba(225,29,72,0.3)"}` }}>
                        {m.statut || "actif"}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, color: "#9ca3af" }}>
                      {new Date(m.dateInscrit || m.createdAt).toLocaleDateString("fr-FR", { day: "numeric", month: "short" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Coaches */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ color: "white", fontWeight: 700, fontSize: "1rem", margin: 0 }}>🏋️ Coaches</h3>
            <span style={badgeStyle}>{coaches.length} coaches</span>
          </div>
          {loading ? <p style={{ color: "#9ca3af", textAlign: "center" }}>Chargement...</p> : coaches.length === 0 ? (
            <p style={{ color: "#9ca3af", textAlign: "center", padding: "2rem" }}>Aucun coach enregistré</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Coach", "Spécialité", "Tarif"].map((h, i) => (
                    <th key={i} style={thStyle}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {coaches.map((c, i) => (
                  <tr key={c._id} style={{ borderBottom: "1px solid #1a1a1a" }}>
                    <td style={tdStyle}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <div style={{ ...avatarStyle, background: "linear-gradient(135deg,#f59e0b,#b45309)" }}>{c.name?.charAt(0).toUpperCase()}</div>
                        <span style={{ color: "white", fontWeight: 600, fontSize: "0.82rem" }}>{c.name}</span>
                      </div>
                    </td>
                    <td style={{ ...tdStyle, color: "#f59e0b" }}>{c.specialite || "-"}</td>
                    <td style={{ ...tdStyle, color: "#10b981" }}>{c.tarif ? `${c.tarif} DT/h` : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

const cardStyle = { backgroundColor: "#111111", border: "1px solid #2a2a2a", borderRadius: "12px" };
const cardHeaderStyle = { padding: "1rem 1.25rem", borderBottom: "1px solid #2a2a2a" };
const thStyle = { padding: "0.6rem 1rem", textAlign: "left", fontSize: "0.7rem", color: "#9ca3af", fontWeight: 700, letterSpacing: "0.1em", borderBottom: "1px solid #2a2a2a", backgroundColor: "#1a1a1a", textTransform: "uppercase" };
const tdStyle = { padding: "0.75rem 1rem", fontSize: "0.82rem", color: "#d1d5db" };
const avatarStyle = { width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg,#e11d48,#9f1239)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: "0.8rem", flexShrink: 0 };
const badgeStyle = { background: "rgba(225,29,72,0.1)", color: "#e11d48", border: "1px solid rgba(225,29,72,0.2)", padding: "0.2rem 0.6rem", borderRadius: "999px", fontSize: "0.75rem", fontWeight: 700 };