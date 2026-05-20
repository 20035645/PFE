import React from "react";
import { Link } from "react-router-dom";

// ─── Shared design tokens (mirrors landing page) ────────────────────────────
const RED = "#D62828";
const BG = "#0A0A0A";
const CARD_BG = "#121212";
const CARD_BORDER = "#232323";
const TEXT_MUTED = "#B5B5B5";
const TEXT_DIM = "#9A9A9A";

const styles = {
  page: {
    background: BG,
    color: "#F5F5F5",
    fontFamily: "Barlow, Arial, sans-serif",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  // ── Navbar (identical to landing) ──────────────────────────────────────────
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "18px 5%",
    background: "rgba(10,10,10,0.92)",
    backdropFilter: "blur(12px)",
    borderBottom: `1px solid rgba(214,40,40,0.22)`,
  },
  logo: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "2rem",
    letterSpacing: "4px",
    margin: 0,
  },
  navLinks: {
    display: "flex",
    gap: "24px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  navLink: {
    color: "#A3A3A3",
    textDecoration: "none",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontSize: "0.75rem",
    fontWeight: 700,
  },
  navLinkActive: {
    color: RED,
    textDecoration: "none",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontSize: "0.75rem",
    fontWeight: 700,
  },
  navBtn: {
    background: RED,
    color: "#fff",
    textDecoration: "none",
    padding: "12px 18px",
    borderRadius: "2px",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontSize: "0.72rem",
    fontWeight: 700,
    boxShadow: `0 10px 30px rgba(214,40,40,0.35)`,
    cursor: "pointer",
    border: "none",
  },
  // ── Layout ─────────────────────────────────────────────────────────────────
  wrapper: {
    display: "flex",
    flex: 1,
  },
  // ── Sidebar ────────────────────────────────────────────────────────────────
  sidebar: {
    width: "240px",
    minHeight: "calc(100vh - 68px)",
    background: "#0D0D0D",
    borderRight: `1px solid rgba(214,40,40,0.16)`,
    padding: "32px 0",
    display: "flex",
    flexDirection: "column",
    gap: 0,
    flexShrink: 0,
  },
  sidebarSection: {
    padding: "0 20px",
    marginBottom: "8px",
  },
  sidebarLabel: {
    color: "#4A4A4A",
    fontSize: "0.62rem",
    letterSpacing: "3px",
    textTransform: "uppercase",
    padding: "16px 20px 8px",
    fontWeight: 700,
  },
  sidebarItem: (active) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 20px",
    cursor: "pointer",
    background: active ? "rgba(214,40,40,0.1)" : "transparent",
    borderLeft: active ? `3px solid ${RED}` : "3px solid transparent",
    color: active ? "#F5F5F5" : TEXT_MUTED,
    fontSize: "0.82rem",
    fontWeight: active ? 700 : 500,
    letterSpacing: "0.5px",
    userSelect: "none",
    transition: "all 0.15s",
  }),
  sidebarIcon: {
    fontSize: "1rem",
    width: "20px",
    textAlign: "center",
  },
  // ── Main content ───────────────────────────────────────────────────────────
  main: {
    flex: 1,
    padding: "36px 40px",
    overflowY: "auto",
  },
  pageHeader: {
    marginBottom: "32px",
  },
  tag: {
    color: RED,
    textTransform: "uppercase",
    letterSpacing: "3px",
    fontSize: "0.72rem",
    marginBottom: "8px",
  },
  pageTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "2.8rem",
    letterSpacing: "2px",
    lineHeight: 1,
    margin: 0,
  },
  // ── Stat cards row ─────────────────────────────────────────────────────────
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginBottom: "28px",
  },
  statCard: {
    background: "#111111",
    border: `1px solid rgba(214,40,40,0.16)`,
    padding: "22px",
  },
  statValue: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "2.8rem",
    color: RED,
    letterSpacing: "3px",
    margin: "6px 0 0",
    lineHeight: 1,
  },
  statLabel: {
    color: TEXT_DIM,
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontSize: "0.68rem",
  },
  statDelta: (positive) => ({
    fontSize: "0.72rem",
    color: positive ? "#4ade80" : "#f87171",
    marginTop: "4px",
  }),
  // ── Generic grid helpers ───────────────────────────────────────────────────
  grid2: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "20px",
  },
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
    marginBottom: "20px",
  },
  // ── Panel ──────────────────────────────────────────────────────────────────
  panel: {
    background: CARD_BG,
    border: `1px solid ${CARD_BORDER}`,
    padding: "24px",
  },
  panelTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "1.35rem",
    letterSpacing: "1px",
    margin: "0 0 18px",
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },
  badge: (color) => ({
    display: "inline-block",
    background: color === "red" ? "rgba(214,40,40,0.15)" : color === "green" ? "rgba(74,222,128,0.12)" : "rgba(251,191,36,0.12)",
    color: color === "red" ? RED : color === "green" ? "#4ade80" : "#fbbf24",
    fontSize: "0.62rem",
    letterSpacing: "2px",
    textTransform: "uppercase",
    padding: "4px 8px",
    borderRadius: "2px",
    fontWeight: 700,
  }),
  // ── Table ──────────────────────────────────────────────────────────────────
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    color: TEXT_DIM,
    fontSize: "0.62rem",
    letterSpacing: "2px",
    textTransform: "uppercase",
    textAlign: "left",
    paddingBottom: "10px",
    borderBottom: `1px solid #1E1E1E`,
    fontWeight: 700,
  },
  td: {
    padding: "13px 0",
    borderBottom: `1px solid #181818`,
    fontSize: "0.88rem",
    color: "#DEDEDE",
    verticalAlign: "middle",
  },
  // ── Progress bar ───────────────────────────────────────────────────────────
  progressTrack: {
    background: "#1E1E1E",
    height: "6px",
    borderRadius: "3px",
    overflow: "hidden",
    width: "100%",
    margin: "6px 0",
  },
  progressFill: (pct) => ({
    width: `${pct}%`,
    height: "100%",
    background: `linear-gradient(90deg, ${RED}, #ff6b6b)`,
    borderRadius: "3px",
  }),
  // ── Avatar ─────────────────────────────────────────────────────────────────
  avatar: (color) => ({
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    background: color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "1rem",
    color: "#fff",
    flexShrink: 0,
  }),
  // ── Séance card ────────────────────────────────────────────────────────────
  seanceCard: {
    background: "#111",
    border: `1px solid #1E1E1E`,
    padding: "14px 16px",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
  },
  timePill: {
    background: "rgba(214,40,40,0.12)",
    color: RED,
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "1px",
    padding: "6px 10px",
    flexShrink: 0,
    minWidth: "60px",
    textAlign: "center",
  },
  // ── Activity feed ──────────────────────────────────────────────────────────
  feedItem: {
    display: "flex",
    gap: "12px",
    padding: "12px 0",
    borderBottom: "1px solid #181818",
    alignItems: "flex-start",
  },
  feedDot: {
    width: "8px",
    height: "8px",
    background: RED,
    borderRadius: "50%",
    flexShrink: 0,
    marginTop: "5px",
  },
  // ── Footer (identical to landing) ─────────────────────────────────────────
  footer: {
    borderTop: `1px solid rgba(214,40,40,0.18)`,
    padding: "28px 5%",
    color: "#8F8F8F",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "12px",
    background: BG,
  },
};

// ─── Data ────────────────────────────────────────────────────────────────────
const clients = [
  { name: "Sami Ben Ali", goal: "Prise de masse", progress: 72, sessions: 18, status: "active", avatar: "#D62828" },
  { name: "Leila Mansouri", goal: "Sèche & cardio", progress: 55, sessions: 12, status: "active", avatar: "#7c3aed" },
  { name: "Karim Jebali", goal: "Remise en forme", progress: 30, sessions: 5, status: "warning", avatar: "#0891b2" },
  { name: "Amira Trabelsi", goal: "Transformation", progress: 88, sessions: 24, status: "active", avatar: "#059669" },
  { name: "Youssef Khaled", goal: "Performance", progress: 61, sessions: 16, status: "active", avatar: "#d97706" },
];

const todaySeances = [
  { time: "08:00", client: "Sami Ben Ali", type: "Musculation", duration: "60 min" },
  { time: "10:30", client: "Leila Mansouri", type: "Cardio HIIT", duration: "45 min" },
  { time: "12:00", client: "Amira Trabelsi", type: "Bilan mensuel", duration: "30 min" },
  { time: "15:00", client: "Karim Jebali", type: "Remise en forme", duration: "60 min" },
  { time: "17:30", client: "Youssef Khaled", type: "Performance", duration: "75 min" },
];

const programs = [
  { name: "Force & Masse 8 semaines", clients: 3, progress: 65, type: "Musculation" },
  { name: "Cardio Brûle-Graisse", clients: 2, progress: 40, type: "Cardio" },
  { name: "Remise en Forme Progressive", clients: 1, progress: 30, type: "Général" },
];

const activityFeed = [
  { text: "Sami Ben Ali a complété la séance du jour", time: "Il y a 2h" },
  { text: "Nouveau bilan envoyé à Leila Mansouri", time: "Il y a 4h" },
  { text: "Programme 'Force & Masse' mis à jour", time: "Hier, 18:30" },
  { text: "Karim Jebali a manqué 2 séances cette semaine", time: "Hier, 10:00" },
  { text: "Amira Trabelsi a atteint son objectif intermédiaire", time: "Lundi" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────
function SidebarItem({ icon, label, active, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      style={{
        ...styles.sidebarItem(active),
        ...(hover && !active ? { color: "#F5F5F5", background: "rgba(255,255,255,0.04)" } : {}),
      }}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span style={styles.sidebarIcon}>{icon}</span>
      {label}
    </div>
  );
}

function StatCard({ value, label, delta, positive }) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statLabel}>{label}</div>
      <div style={styles.statValue}>{value}</div>
      {delta && <div style={styles.statDelta(positive)}>{delta}</div>}
    </div>
  );
}

// ─── Views ────────────────────────────────────────────────────────────────────
function DashboardHome() {
  return (
    <>
      <div style={styles.pageHeader}>
        <div style={styles.tag}>Coach Dashboard</div>
        <h1 style={styles.pageTitle}>VUE D'ENSEMBLE</h1>
      </div>

      <div style={styles.statsRow}>
        <StatCard value="5" label="Clients actifs" delta="↑ +1 ce mois" positive />
        <StatCard value="5" label="Séances aujourd'hui" delta="↑ +2 vs semaine passée" positive />
        <StatCard value="3" label="Programmes actifs" />
        <StatCard value="63%" label="Progression moyenne" delta="↑ +8% ce mois" positive />
      </div>

      <div style={styles.grid2}>
        {/* Today's schedule */}
        <div style={styles.panel}>
          <div style={styles.panelHeader}>
            <h2 style={styles.panelTitle}>SÉANCES DU JOUR</h2>
            <span style={styles.badge("red")}>Aujourd'hui</span>
          </div>
          {todaySeances.map((s) => (
            <div key={s.time} style={styles.seanceCard}>
              <div style={styles.timePill}>{s.time}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#F5F5F5", marginBottom: "2px" }}>{s.client}</div>
                <div style={{ fontSize: "0.75rem", color: TEXT_MUTED }}>{s.type} · {s.duration}</div>
              </div>
              <div style={styles.badge("green")}>Confirmé</div>
            </div>
          ))}
        </div>

        {/* Activity feed */}
        <div style={styles.panel}>
          <h2 style={styles.panelTitle}>ACTIVITÉ RÉCENTE</h2>
          {activityFeed.map((item, i) => (
            <div key={i} style={styles.feedItem}>
              <div style={styles.feedDot} />
              <div>
                <div style={{ fontSize: "0.85rem", color: "#DEDEDE", marginBottom: "2px" }}>{item.text}</div>
                <div style={{ fontSize: "0.72rem", color: TEXT_DIM }}>{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Programs summary */}
      <div style={styles.panel}>
        <h2 style={styles.panelTitle}>PROGRAMMES EN COURS</h2>
        <div style={styles.grid3}>
          {programs.map((p) => (
            <div key={p.name} style={{ background: "#111", border: "1px solid #1E1E1E", padding: "18px" }}>
              <div style={{ fontSize: "0.62rem", color: RED, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>{p.type}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.15rem", letterSpacing: "1px", marginBottom: "10px" }}>{p.name}</div>
              <div style={{ fontSize: "0.75rem", color: TEXT_MUTED, marginBottom: "8px" }}>{p.clients} client(s)</div>
              <div style={styles.progressTrack}>
                <div style={styles.progressFill(p.progress)} />
              </div>
              <div style={{ fontSize: "0.72rem", color: TEXT_DIM, marginTop: "4px" }}>{p.progress}% complété</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ClientsView() {
  const [selected, setSelected] = React.useState(null);
  return (
    <>
      <div style={styles.pageHeader}>
        <div style={styles.tag}>Gestion</div>
        <h1 style={styles.pageTitle}>MES CLIENTS</h1>
      </div>

      <div style={styles.panel}>
        <div style={styles.panelHeader}>
          <h2 style={styles.panelTitle}>LISTE DES CLIENTS</h2>
          <span style={{ ...styles.badge("red"), fontSize: "0.72rem" }}>{clients.length} clients</span>
        </div>
        <table style={styles.table}>
          <thead>
            <tr>
              {["Client", "Objectif", "Progression", "Séances", "Statut", "Actions"].map((h) => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.name}>
                <td style={styles.td}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={styles.avatar(c.avatar)}>{c.name[0]}</div>
                    <span style={{ fontWeight: 600 }}>{c.name}</span>
                  </div>
                </td>
                <td style={styles.td}><span style={{ color: TEXT_MUTED }}>{c.goal}</span></td>
                <td style={{ ...styles.td, minWidth: "140px" }}>
                  <div style={styles.progressTrack}>
                    <div style={styles.progressFill(c.progress)} />
                  </div>
                  <span style={{ fontSize: "0.72rem", color: TEXT_DIM }}>{c.progress}%</span>
                </td>
                <td style={styles.td}><span style={{ color: "#F5F5F5" }}>{c.sessions}</span></td>
                <td style={styles.td}>
                  <span style={styles.badge(c.status === "active" ? "green" : "yellow")}>
                    {c.status === "active" ? "Actif" : "Attention"}
                  </span>
                </td>
                <td style={styles.td}>
                  <button
                    onClick={() => setSelected(c)}
                    style={{ background: "transparent", border: `1px solid rgba(214,40,40,0.4)`, color: RED, padding: "6px 12px", cursor: "pointer", fontSize: "0.72rem", letterSpacing: "1px", textTransform: "uppercase" }}
                  >
                    Voir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#111", border: `1px solid rgba(214,40,40,0.3)`, padding: "36px", width: "460px", position: "relative" }}>
            <button onClick={() => setSelected(null)} style={{ position: "absolute", top: 16, right: 16, background: "transparent", border: "none", color: TEXT_MUTED, fontSize: "1.2rem", cursor: "pointer" }}>✕</button>
            <div style={styles.tag}>Fiche client</div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "22px" }}>
              <div style={{ ...styles.avatar(selected.avatar), width: "52px", height: "52px", fontSize: "1.4rem" }}>{selected.name[0]}</div>
              <div>
                <h2 style={{ ...styles.pageTitle, fontSize: "1.8rem", margin: 0 }}>{selected.name}</h2>
                <div style={{ color: TEXT_MUTED, fontSize: "0.82rem" }}>{selected.goal}</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "22px" }}>
              {[["Séances", selected.sessions], ["Progression", `${selected.progress}%`], ["Statut", selected.status === "active" ? "Actif" : "Attention"], ["Plan", "Performance"]].map(([k, v]) => (
                <div key={k} style={{ background: "#0D0D0D", border: "1px solid #1E1E1E", padding: "14px" }}>
                  <div style={styles.statLabel}>{k}</div>
                  <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", color: RED }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={styles.progressTrack}>
              <div style={styles.progressFill(selected.progress)} />
            </div>
            <div style={{ fontSize: "0.75rem", color: TEXT_DIM, marginTop: "6px", marginBottom: "22px" }}>{selected.progress}% de l'objectif atteint</div>
            <button style={styles.navBtn}>Modifier programme</button>
          </div>
        </div>
      )}
    </>
  );
}

function ProgramsView() {
  const [showCreate, setShowCreate] = React.useState(false);
  const [name, setName] = React.useState("");
  const [type, setType] = React.useState("Musculation");

  const inputStyle = {
    background: "#0D0D0D",
    border: "1px solid #2A2A2A",
    color: "#F5F5F5",
    padding: "12px 14px",
    fontSize: "0.88rem",
    width: "100%",
    boxSizing: "border-box",
    outline: "none",
    fontFamily: "Barlow, Arial, sans-serif",
  };

  return (
    <>
      <div style={styles.pageHeader}>
        <div style={styles.tag}>Planification</div>
        <h1 style={styles.pageTitle}>PROGRAMMES D'ENTRAÎNEMENT</h1>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <button onClick={() => setShowCreate(true)} style={styles.navBtn}>+ Créer un programme</button>
      </div>

      {showCreate && (
        <div style={{ ...styles.panel, marginBottom: "20px", border: `1px solid rgba(214,40,40,0.35)` }}>
          <h2 style={styles.panelTitle}>NOUVEAU PROGRAMME</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "14px", marginBottom: "16px" }}>
            <div>
              <div style={{ ...styles.statLabel, marginBottom: "8px" }}>Nom du programme</div>
              <input style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Force 8 semaines..." />
            </div>
            <div>
              <div style={{ ...styles.statLabel, marginBottom: "8px" }}>Type</div>
              <select style={inputStyle} value={type} onChange={(e) => setType(e.target.value)}>
                {["Musculation", "Cardio", "HIIT", "Mobilité", "Général"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <div style={{ ...styles.statLabel, marginBottom: "8px" }}>Durée</div>
              <select style={inputStyle}>
                {["4 semaines", "8 semaines", "12 semaines"].map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button style={styles.navBtn} onClick={() => setShowCreate(false)}>Créer</button>
            <button onClick={() => setShowCreate(false)} style={{ ...styles.navBtn, background: "transparent", border: "1px solid #333", boxShadow: "none" }}>Annuler</button>
          </div>
        </div>
      )}

      <div style={styles.grid3}>
        {programs.map((p) => (
          <div key={p.name} style={{ ...styles.panel, display: "flex", flexDirection: "column" }}>
            <div style={{ ...styles.badge("red"), marginBottom: "10px" }}>{p.type}</div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.3rem", letterSpacing: "1px", margin: "0 0 8px" }}>{p.name}</h3>
            <div style={{ color: TEXT_MUTED, fontSize: "0.8rem", marginBottom: "14px" }}>{p.clients} client(s) assigné(s)</div>
            <div style={styles.progressTrack}>
              <div style={styles.progressFill(p.progress)} />
            </div>
            <div style={{ fontSize: "0.72rem", color: TEXT_DIM, margin: "6px 0 16px" }}>{p.progress}% complété</div>
            <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
              <button style={{ ...styles.navBtn, padding: "8px 14px", fontSize: "0.68rem" }}>Modifier</button>
              <button style={{ ...styles.navBtn, background: "transparent", border: "1px solid #333", boxShadow: "none", padding: "8px 14px", fontSize: "0.68rem" }}>Détails</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function ScheduleView() {
  const days = ["LUN", "MAR", "MER", "JEU", "VEN", "SAM", "DIM"];
  const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

  const scheduled = {
    "LUN-08:00": { client: "Sami", type: "Muscu" },
    "LUN-10:30": { client: "Leila", type: "HIIT" },
    "MAR-09:00": { client: "Amira", type: "Bilan" },
    "MER-15:00": { client: "Karim", type: "Cardio" },
    "JEU-17:00": { client: "Youssef", type: "Perf" },
    "VEN-08:00": { client: "Sami", type: "Muscu" },
    "VEN-11:00": { client: "Leila", type: "Mobilité" },
    "SAM-10:00": { client: "Amira", type: "HIIT" },
  };

  return (
    <>
      <div style={styles.pageHeader}>
        <div style={styles.tag}>Planning</div>
        <h1 style={styles.pageTitle}>PLANIFIER UNE SÉANCE</h1>
      </div>

      <div style={styles.panel}>
        <div style={styles.panelHeader}>
          <h2 style={styles.panelTitle}>SEMAINE DU 19 MAI 2026</h2>
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={{ ...styles.navBtn, background: "transparent", border: "1px solid #333", boxShadow: "none", padding: "8px 14px" }}>← Préc.</button>
            <button style={{ ...styles.navBtn, padding: "8px 14px" }}>Suiv. →</button>
          </div>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ ...styles.table, minWidth: "700px" }}>
            <thead>
              <tr>
                <th style={{ ...styles.th, width: "60px" }}>H</th>
                {days.map((d) => <th key={d} style={{ ...styles.th, textAlign: "center" }}>{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {hours.map((h) => (
                <tr key={h}>
                  <td style={{ ...styles.td, color: TEXT_DIM, fontSize: "0.72rem", paddingRight: "12px", whiteSpace: "nowrap" }}>{h}</td>
                  {days.map((d) => {
                    const key = `${d}-${h}`;
                    const slot = scheduled[key];
                    return (
                      <td key={d} style={{ ...styles.td, textAlign: "center", padding: "6px 4px" }}>
                        {slot ? (
                          <div style={{ background: "rgba(214,40,40,0.15)", border: `1px solid rgba(214,40,40,0.3)`, padding: "4px 8px", borderRadius: "2px" }}>
                            <div style={{ fontSize: "0.72rem", color: RED, fontWeight: 700 }}>{slot.client}</div>
                            <div style={{ fontSize: "0.65rem", color: TEXT_MUTED }}>{slot.type}</div>
                          </div>
                        ) : (
                          <div style={{ height: "34px", border: "1px dashed #1E1E1E", borderRadius: "2px", cursor: "pointer" }} />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function ProgressionView() {
  return (
    <>
      <div style={styles.pageHeader}>
        <div style={styles.tag}>Suivi</div>
        <h1 style={styles.pageTitle}>SUIVI DES PROGRESSIONS</h1>
      </div>

      <div style={styles.statsRow}>
        <StatCard value="63%" label="Progression moyenne" delta="↑ +8% ce mois" positive />
        <StatCard value="4/5" label="Objectifs atteints" delta="↑ +1 vs mois passé" positive />
        <StatCard value="1" label="Client en difficulté" delta="↓ Karim J." />
        <StatCard value="87" label="Séances ce mois" delta="↑ +12 séances" positive />
      </div>

      <div style={styles.panel}>
        <h2 style={styles.panelTitle}>PROGRESSION PAR CLIENT</h2>
        <div style={{ display: "grid", gap: "16px" }}>
          {clients.map((c) => (
            <div key={c.name} style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div style={styles.avatar(c.avatar)}>{c.name[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontSize: "0.88rem", fontWeight: 600 }}>{c.name}</span>
                  <span style={{ fontSize: "0.82rem", color: c.progress >= 60 ? "#4ade80" : "#fbbf24" }}>{c.progress}%</span>
                </div>
                <div style={styles.progressTrack}>
                  <div style={styles.progressFill(c.progress)} />
                </div>
                <div style={{ fontSize: "0.72rem", color: TEXT_DIM, marginTop: "3px" }}>{c.goal} · {c.sessions} séances</div>
              </div>
              <span style={styles.badge(c.status === "active" ? "green" : "yellow")}>
                {c.status === "active" ? "En bonne voie" : "À surveiller"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ─── Sidebar nav config ───────────────────────────────────────────────────────
const navItems = [
  { key: "home", icon: "⊞", label: "Vue d'ensemble" },
  { key: "clients", icon: "👥", label: "Mes clients" },
  { key: "programs", icon: "📋", label: "Programmes" },
  { key: "schedule", icon: "📅", label: "Planifier séance" },
  { key: "progress", icon: "📈", label: "Suivre progression" },
];

// ─── Main component ───────────────────────────────────────────────────────────
export default function CoachDashboard() {
  const [activeView, setActiveView] = React.useState("home");

  const renderView = () => {
    switch (activeView) {
      case "clients": return <ClientsView />;
      case "programs": return <ProgramsView />;
      case "schedule": return <ScheduleView />;
      case "progress": return <ProgressionView />;
      default: return <DashboardHome />;
    }
  };

  return (
    <div style={styles.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800&family=Bebas+Neue&display=swap"
        rel="stylesheet"
      />

      {/* ── Navbar ── */}
      <nav style={styles.nav}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <p style={styles.logo}>GYM<span style={{ color: RED }}>ACCESS</span></p>
        </Link>

        <div style={styles.navLinks}>
          <Link to="/#salle" style={styles.navLink}>Salle</Link>
          <Link to="/#services" style={styles.navLink}>Services</Link>
          
          <Link to="/landing" style={styles.navLink}>Nutrition</Link>
          <Link to="/newpage" style={styles.navLink}>Abonnements</Link>
          
          <Link
            to="/auth/login"
            style={{ ...styles.navBtn, background: "transparent", border: "1px solid rgba(214,40,40,0.6)", boxShadow: "none" }}
          >
            Se connecter
          </Link>
          <Link to="/auth/register" style={styles.navBtn}>Nous rejoindre</Link>
        </div>
      </nav>

      {/* ── Body ── */}
      <div style={styles.wrapper}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          {/* Coach profile */}
          <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #1A1A1A", marginBottom: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ ...styles.avatar(RED), width: "44px", height: "44px", fontSize: "1.2rem", borderRadius: "4px" }}>N</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>Nassim</div>
                <div style={{ fontSize: "0.68rem", color: RED, textTransform: "uppercase", letterSpacing: "1px" }}>Coach certifié</div>
              </div>
            </div>
          </div>

          <div style={styles.sidebarLabel}>Navigation</div>
          {navItems.map((item) => (
            <SidebarItem
              key={item.key}
              icon={item.icon}
              label={item.label}
              active={activeView === item.key}
              onClick={() => setActiveView(item.key)}
            />
          ))}

          <div style={{ marginTop: "auto", borderTop: "1px solid #1A1A1A", paddingTop: "16px" }}>
            <SidebarItem icon="⚙️" label="Paramètres" active={false} onClick={() => {}} />
            <SidebarItem icon="🔓" label="Se déconnecter" active={false} onClick={() => {}} />
          </div>
        </aside>

        {/* Main */}
        <main style={styles.main}>
          {renderView()}
        </main>
      </div>

      {/* ── Footer (identical to landing) ── */}
      <footer style={styles.footer}>
        <div style={styles.logo}>
          GYM<span style={{ color: RED }}>ACCESS</span>
        </div>
        <div>© 2026 GymAccess — Tous droits réservés</div>
      </footer>
    </div>
  );
}