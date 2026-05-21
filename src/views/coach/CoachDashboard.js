// src/views/coach/CoachDashboard.js
// ─── Dashboard Coach — connecté aux vrais endpoints backend ──────────────────
// React Router v5  |  React 17/18  |  Pas de Next.js
// ─────────────────────────────────────────────────────────────────────────────
import React from "react";
import { useHistory } from "react-router-dom";
import { coachAPI, programmeAPI, seanceAPI, progressionAPI, memberAPI } from "../../services/apiBooks";

// ─── Design tokens ───────────────────────────────────────────────────────────
const RED          = "#D62828";
const BG           = "#0A0A0A"; 
const CARD_BG      = "#121212";
const CARD_BORDER  = "#232323";
const TEXT_MUTED   = "#B5B5B5";
const TEXT_DIM     = "#9A9A9A";
const AVATAR_COLORS = ["#D62828","#7c3aed","#0891b2","#059669","#d97706","#be185d","#0f766e"];

// ─── Styles ──────────────────────────────────────────────────────────────────
const S = {
  page:       { background: BG, color: "#F5F5F5", fontFamily: "Barlow, Arial, sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" },
  nav:        { position: "sticky", top: 0, zIndex: 50, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 5%", background: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(214,40,40,0.22)" },
  logo:       { fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "4px", margin: 0, textDecoration: "none", color: "#F5F5F5" },
  navLink:    { color: "#A3A3A3", textDecoration: "none", textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.75rem", fontWeight: 700 },
  navBtn:     { background: RED, color: "#fff", padding: "10px 18px", border: "none", textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.72rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 10px 30px rgba(214,40,40,0.35)", borderRadius: "2px" },
  wrapper:    { display: "flex", flex: 1 },
  sidebar:    { width: "240px", minHeight: "calc(100vh - 68px)", background: "#0D0D0D", borderRight: "1px solid rgba(214,40,40,0.16)", padding: "32px 0", display: "flex", flexDirection: "column", flexShrink: 0 },
  sideLabel:  { color: "#4A4A4A", fontSize: "0.62rem", letterSpacing: "3px", textTransform: "uppercase", padding: "16px 20px 8px", fontWeight: 700 },
  main:       { flex: 1, padding: "36px 40px", overflowY: "auto" },
  pageTag:    { color: RED, textTransform: "uppercase", letterSpacing: "3px", fontSize: "0.72rem", marginBottom: "8px" },
  pageTitle:  { fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.8rem", letterSpacing: "2px", lineHeight: 1, margin: "0 0 28px" },
  statsRow:   { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" },
  statCard:   { background: "#111", border: "1px solid rgba(214,40,40,0.16)", padding: "22px" },
  statVal:    { fontFamily: "'Bebas Neue', sans-serif", fontSize: "2.8rem", color: RED, letterSpacing: "3px", margin: "6px 0 0", lineHeight: 1 },
  statLbl:    { color: TEXT_DIM, textTransform: "uppercase", letterSpacing: "2px", fontSize: "0.68rem" },
  panel:      { background: CARD_BG, border: `1px solid ${CARD_BORDER}`, padding: "24px", marginBottom: "20px" },
  panelTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.35rem", letterSpacing: "1px", margin: "0 0 18px" },
  panelHdr:   { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" },
  grid2:      { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" },
  grid3:      { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" },
  table:      { width: "100%", borderCollapse: "collapse" },
  th:         { color: TEXT_DIM, fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase", textAlign: "left", paddingBottom: "10px", borderBottom: "1px solid #1E1E1E", fontWeight: 700 },
  td:         { padding: "13px 0", borderBottom: "1px solid #181818", fontSize: "0.88rem", color: "#DEDEDE", verticalAlign: "middle" },
  track:      { background: "#1E1E1E", height: "6px", borderRadius: "3px", overflow: "hidden", width: "100%", margin: "6px 0" },
  seanceCard: { background: "#111", border: "1px solid #1E1E1E", padding: "14px 16px", marginBottom: "10px", display: "flex", alignItems: "center", gap: "14px" },
  timePill:   { background: "rgba(214,40,40,0.12)", color: RED, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "1px", padding: "6px 10px", flexShrink: 0, minWidth: "60px", textAlign: "center" },
  input:      { background: "#0D0D0D", border: "1px solid #2A2A2A", color: "#F5F5F5", padding: "12px 14px", fontSize: "0.88rem", width: "100%", boxSizing: "border-box", outline: "none", fontFamily: "Barlow, Arial, sans-serif", borderRadius: "2px" },
  footer:     { borderTop: "1px solid rgba(214,40,40,0.18)", padding: "28px 5%", color: "#8F8F8F", display: "flex", justifyContent: "space-between", background: BG },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const bdg = (color) => ({
  display: "inline-block",
  background: color === "red" ? "rgba(214,40,40,0.15)" : color === "green" ? "rgba(74,222,128,0.12)" : "rgba(251,191,36,0.12)",
  color: color === "red" ? RED : color === "green" ? "#4ade80" : "#fbbf24",
  fontSize: "0.62rem", letterSpacing: "2px", textTransform: "uppercase",
  padding: "4px 8px", borderRadius: "2px", fontWeight: 700,
});

const avt   = (color) => ({ width: "36px", height: "36px", borderRadius: "50%", background: color || RED, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", color: "#fff", flexShrink: 0 });
const fmtDate = (d) => d ? new Date(d).toLocaleDateString("fr-FR") : "—";
const label = (t) => <div style={{ ...S.statLbl, marginBottom: "6px" }}>{t}</div>;

// ─── Spinner ─────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "60px 0" }}>
      <div style={{ width: "36px", height: "36px", border: `3px solid #222`, borderTop: `3px solid ${RED}`, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}

// ─── Error banner ─────────────────────────────────────────────────────────────
function ErrBanner({ msg, onClose }) {
  if (!msg) return null;
  return (
    <div style={{ background: "rgba(214,40,40,0.12)", border: "1px solid rgba(214,40,40,0.4)", color: "#fca5a5", padding: "12px 16px", marginBottom: "16px", display: "flex", justifyContent: "space-between", fontSize: "0.85rem", borderRadius: "2px" }}>
      {msg}
      <span style={{ cursor: "pointer", marginLeft: "12px" }} onClick={onClose}>✕</span>
    </div>
  );
}

// ─── Modal ───────────────────────────────────────────────────────────────────
function Modal({ onClose, title, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#111", border: "1px solid rgba(214,40,40,0.3)", padding: "36px", width: "540px", maxWidth: "94vw", maxHeight: "90vh", overflowY: "auto", position: "relative", borderRadius: "2px" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "transparent", border: "none", color: TEXT_MUTED, fontSize: "1.3rem", cursor: "pointer" }}>✕</button>
        {title && <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", letterSpacing: "2px", marginBottom: "22px" }}>{title}</div>}
        {children}
      </div>
    </div>
  );
}

// ─── Sidebar item ─────────────────────────────────────────────────────────────
function SidebarItem({ icon, label, active, onClick, danger }) {
  const [hov, setHov] = React.useState(false);
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 20px", cursor: "pointer", background: active ? "rgba(214,40,40,0.1)" : hov ? "rgba(255,255,255,0.04)" : "transparent", borderLeft: active ? `3px solid ${RED}` : "3px solid transparent", color: danger ? "#f87171" : active ? "#F5F5F5" : hov ? "#F5F5F5" : TEXT_MUTED, fontSize: "0.82rem", fontWeight: active ? 700 : 500, transition: "all 0.15s", userSelect: "none" }}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span style={{ fontSize: "1rem", width: "20px", textAlign: "center" }}>{icon}</span>
      {label}
    </div>
  );
}

// ─── Stat card ────────────────────────────────────────────────────────────────
function StatCard({ value, label, delta, positive }) {
  return (
    <div style={S.statCard}>
      <div style={S.statLbl}>{label}</div>
      <div style={S.statVal}>{value ?? "—"}</div>
      {delta && <div style={{ fontSize: "0.72rem", color: positive ? "#4ade80" : "#f87171", marginTop: "4px" }}>{delta}</div>}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VIEW 1 — Vue d'ensemble
// ══════════════════════════════════════════════════════════════════════════════
function DashboardHome({ coachId }) {
  const [data, setData] = React.useState({ coaches: 0, programmes: [], seances: [], progressions: [] });
  const [load, setLoad] = React.useState(true);
  const [err,  setErr]  = React.useState("");

  React.useEffect(() => {
    Promise.all([
      programmeAPI.getAll(),
      seanceAPI.getAll(),
      progressionAPI.getAll(),
      coachAPI.getAll(),
    ])
      .then(([programmes, seances, progressions, coaches]) => {
        setData({ coaches: coaches.length, programmes, seances, progressions });
      })
      .catch(e => setErr(e.message))
      .finally(() => setLoad(false));
  }, []);

  if (load) return <Spinner />;

  // Séances d'aujourd'hui
  const today = new Date().toISOString().split("T")[0];
  const todaySeances = data.seances.filter(s => s.date && s.date.startsWith(today));

  // Progression moyenne (basée sur poids/taille → on affiche le nombre total)



  return (
    <>
      <div style={S.pageTag}>Coach Dashboard</div>
      <h1 style={S.pageTitle}>VUE D'ENSEMBLE</h1>
      <ErrBanner msg={err} onClose={() => setErr("")} />

      <div style={S.statsRow}>
        <StatCard value={data.coaches}           label="Coaches actifs" />
        <StatCard value={todaySeances.length}    label="Séances aujourd'hui" />
        <StatCard value={data.programmes.length} label="Programmes actifs" />
        <StatCard value={data.progressions.length} label="Progressions enregistrées" positive />
      </div>

      <div style={S.grid2}>
        {/* Séances du jour */}
        <div style={S.panel}>
          <div style={S.panelHdr}>
            <h2 style={S.panelTitle}>SÉANCES DU JOUR</h2>
            <span style={bdg("red")}>Aujourd'hui</span>
          </div>
          {todaySeances.length === 0 && (
            <div style={{ color: TEXT_DIM, fontSize: "0.85rem", padding: "20px 0" }}>
              Aucune séance prévue aujourd'hui
            </div>
          )}
          {todaySeances.slice(0, 5).map((s) => (
            <div key={s._id} style={S.seanceCard}>
              <div style={S.timePill}>{s.heure || "—"}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.88rem", fontWeight: 700, color: "#F5F5F5", marginBottom: "2px" }}>
                  {s.programme?.name || "—"}
                </div>
                <div style={{ fontSize: "0.75rem", color: TEXT_MUTED }}>
                  Coach : {s.coach?.name || "—"} · Capacité : {s.membres?.length || 0}/{s.capacite}
                </div>
              </div>
              <span style={bdg("green")}>Confirmée</span>
            </div>
          ))}
        </div>

        {/* Dernières progressions */}
        <div style={S.panel}>
          <h2 style={S.panelTitle}>PROGRESSIONS RÉCENTES</h2>
          {data.progressions.length === 0 && (
            <div style={{ color: TEXT_DIM, fontSize: "0.85rem", padding: "20px 0" }}>Aucune progression enregistrée</div>
          )}
          {data.progressions.slice(0, 5).map((p, i) => (
            <div key={p._id} style={{ display: "flex", gap: "12px", padding: "12px 0", borderBottom: "1px solid #181818", alignItems: "flex-start" }}>
              <div style={{ width: "8px", height: "8px", background: RED, borderRadius: "50%", flexShrink: 0, marginTop: "5px" }} />
              <div>
                <div style={{ fontSize: "0.85rem", color: "#DEDEDE", marginBottom: "2px" }}>
                  {p.membre?.name || "Membre"} — {p.objectif || "Objectif non défini"}
                </div>
                <div style={{ fontSize: "0.72rem", color: TEXT_DIM }}>
                  {p.poids ? `${p.poids} kg` : ""} {p.taille ? `· ${p.taille} cm` : ""}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Programmes en cours */}
      <div style={S.panel}>
        <h2 style={S.panelTitle}>PROGRAMMES EN COURS</h2>
        <div style={S.grid3}>
          {data.programmes.slice(0, 3).map((p) => (
            <div key={p._id} style={{ background: "#111", border: "1px solid #1E1E1E", padding: "18px", borderRadius: "2px" }}>
              <div style={{ fontSize: "0.62rem", color: RED, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "6px" }}>{p.niveau || "—"}</div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.15rem", letterSpacing: "1px", marginBottom: "8px" }}>{p.name}</div>
              <div style={{ fontSize: "0.75rem", color: TEXT_MUTED }}>
                Coach : {p.coach?.name || "—"} · {p.duree} sem.
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VIEW 2 — Programmes  (vrai CRUD → /programme)
// ══════════════════════════════════════════════════════════════════════════════
function ProgrammesView() {
  const [programmes, setProgrammes] = React.useState([]);
  const [coaches,    setCoaches]    = React.useState([]);
  const [load,  setLoad]   = React.useState(true);
  const [saving,setSaving] = React.useState(false);
  const [err,   setErr]    = React.useState("");
  const [showCreate,  setShowCreate]  = React.useState(false);
  const [editTarget,  setEditTarget]  = React.useState(null);

  const emptyForm = { name: "", description: "", duree: 8, niveau: "débutant", coach: "" };
  const [form, setForm] = React.useState(emptyForm);

  const fetchAll = () =>
    Promise.all([programmeAPI.getAll(), coachAPI.getAll()])
      .then(([p, c]) => { setProgrammes(p); setCoaches(c); })
      .catch(e => setErr(e.message))
      .finally(() => setLoad(false));

  React.useEffect(() => { fetchAll(); }, []);

  const openCreate = () => { setForm(emptyForm); setShowCreate(true); };
  const openEdit   = (p) => {
    setForm({ name: p.name, description: p.description || "", duree: p.duree, niveau: p.niveau || "débutant", coach: p.coach?._id || p.coach || "" });
    setEditTarget(p);
  };

  const handleSave = async () => {
    if (!form.name.trim()) { setErr("Le nom est requis"); return; }
    setSaving(true);
    try {
      if (editTarget) {
        await programmeAPI.update(editTarget._id, form);
        setEditTarget(null);
      } else {
        await programmeAPI.add(form);
        setShowCreate(false);
      }
      fetchAll();
    } catch (e) { setErr(e.message); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce programme ?")) return;
    try { await programmeAPI.delete(id); fetchAll(); } catch (e) { setErr(e.message); }
  };

  const niveauColor = { débutant: "#059669", intermédiaire: "#d97706", avancé: "#D62828" };

  if (load) return <Spinner />;

  const ProgrammeForm = () => (
    <>
      <ErrBanner msg={err} onClose={() => setErr("")} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
        <div style={{ gridColumn: "1/-1" }}>
          {label("Nom du programme *")}
          <input style={S.input} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Ex: Force & Masse" />
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          {label("Description")}
          <textarea style={{ ...S.input, minHeight: "70px", resize: "vertical" }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Objectifs, méthode..." />
        </div>
        <div>
          {label("Durée (semaines)")}
          <input style={S.input} type="number" min={1} max={52} value={form.duree} onChange={e => setForm(f => ({ ...f, duree: +e.target.value }))} />
        </div>
        <div>
          {label("Niveau")}
          <select style={S.input} value={form.niveau} onChange={e => setForm(f => ({ ...f, niveau: e.target.value }))}>
            {["débutant","intermédiaire","avancé"].map(n => <option key={n}>{n}</option>)}
          </select>
        </div>
        <div style={{ gridColumn: "1/-1" }}>
          {label("Coach assigné")}
          <select style={S.input} value={form.coach} onChange={e => setForm(f => ({ ...f, coach: e.target.value }))}>
            <option value="">— Sélectionner un coach —</option>
            {coaches.map(c => <option key={c._id} value={c._id}>{c.name} · {c.specialite}</option>)}
          </select>
        </div>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button style={S.navBtn} onClick={handleSave} disabled={saving}>
          {saving ? "Sauvegarde..." : "💾 Sauvegarder"}
        </button>
        <button onClick={() => { setShowCreate(false); setEditTarget(null); }} style={{ ...S.navBtn, background: "transparent", border: "1px solid #333", boxShadow: "none" }}>
          Annuler
        </button>
      </div>
    </>
  );

  return (
    <>
      <div style={S.pageTag}>Planification</div>
      <h1 style={S.pageTitle}>PROGRAMMES D'ENTRAÎNEMENT</h1>
      <ErrBanner msg={err} onClose={() => setErr("")} />

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <button style={S.navBtn} onClick={openCreate}>+ Créer un programme</button>
      </div>

      {programmes.length === 0 && !load && (
        <div style={{ ...S.panel, textAlign: "center", color: TEXT_DIM, padding: "60px" }}>
          Aucun programme. Créez-en un !
        </div>
      )}

      <div style={S.grid3}>
        {programmes.map(p => (
          <div key={p._id} style={{ ...S.panel, display: "flex", flexDirection: "column", marginBottom: 0 }}>
            <div style={{ fontSize: "0.62rem", color: niveauColor[p.niveau] || RED, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "8px", fontWeight: 700 }}>
              {p.niveau || "—"}
            </div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", letterSpacing: "1px", margin: "0 0 6px" }}>{p.name}</h3>
            {p.description && (
              <div style={{ color: TEXT_DIM, fontSize: "0.75rem", marginBottom: "8px", lineHeight: 1.4 }}>{p.description}</div>
            )}
            <div style={{ color: TEXT_MUTED, fontSize: "0.78rem", marginBottom: "14px" }}>
              {p.duree} semaines · Coach : {p.coach?.name || "Non assigné"}
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "auto" }}>
              <button onClick={() => openEdit(p)} style={{ ...S.navBtn, padding: "8px 14px", fontSize: "0.68rem" }}>✏️ Modifier</button>
              <button onClick={() => handleDelete(p._id)} style={{ ...S.navBtn, background: "transparent", border: "1px solid #333", boxShadow: "none", padding: "8px 12px", fontSize: "0.68rem", color: "#f87171" }}>🗑️</button>
            </div>
          </div>
        ))}
      </div>

      {showCreate && (
        <Modal onClose={() => setShowCreate(false)} title="NOUVEAU PROGRAMME">
          <ProgrammeForm />
        </Modal>
      )}
      {editTarget && (
        <Modal onClose={() => setEditTarget(null)} title={`MODIFIER — ${editTarget.name}`}>
          <ProgrammeForm />
        </Modal>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VIEW 3 — Séances  (vrai CRUD → /seances)
// ══════════════════════════════════════════════════════════════════════════════
function SeancesView() {
  const [seances,    setSeances]    = React.useState([]);
  const [coaches,    setCoaches]    = React.useState([]);
  const [programmes, setProgrammes] = React.useState([]);
  const [members,    setMembers]    = React.useState([]);
  const [load,   setLoad]   = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [err,    setErr]    = React.useState("");
  const [showAdd,setShowAdd]= React.useState(false);

  const today = new Date().toISOString().split("T")[0];
  const emptyForm = { date: today, heure: "09:00", capacite: 10, coach: "", programme: "" };
  const [form, setForm] = React.useState(emptyForm);

  const fetchAll = () =>
    Promise.all([seanceAPI.getAll(), coachAPI.getAll(), programmeAPI.getAll(), memberAPI.getAll()])
      .then(([s, c, p, m]) => { setSeances(s); setCoaches(c); setProgrammes(p); setMembers(m); })
      .catch(e => setErr(e.message))
      .finally(() => setLoad(false));

  React.useEffect(() => { fetchAll(); }, []);

  const handleAdd = async () => {
    if (!form.coach || !form.programme) { setErr("Coach et programme sont requis"); return; }
    setSaving(true);
    try { await seanceAPI.add(form); setShowAdd(false); setForm(emptyForm); fetchAll(); }
    catch (e) { setErr(e.message); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette séance ?")) return;
    try { await seanceAPI.delete(id); fetchAll(); } catch (e) { setErr(e.message); }
  };

  if (load) return <Spinner />;

  return (
    <>
      <div style={S.pageTag}>Planning</div>
      <h1 style={S.pageTitle}>SÉANCES</h1>
      <ErrBanner msg={err} onClose={() => setErr("")} />

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
        <button style={S.navBtn} onClick={() => setShowAdd(true)}>+ Nouvelle séance</button>
      </div>

      <div style={S.panel}>
        <div style={S.panelHdr}>
          <h2 style={S.panelTitle}>TOUTES LES SÉANCES</h2>
          <span style={bdg("red")}>{seances.length} séance{seances.length !== 1 ? "s" : ""}</span>
        </div>
        {seances.length === 0 && <div style={{ color: TEXT_DIM, textAlign: "center", padding: "40px" }}>Aucune séance planifiée</div>}
        {seances.map(s => (
          <div key={s._id} style={{ ...S.seanceCard, flexWrap: "wrap" }}>
            <div style={S.timePill}>{s.heure || "—"}</div>
            <div style={{ flex: 1, minWidth: "200px" }}>
              <div style={{ fontSize: "0.88rem", fontWeight: 700, marginBottom: "3px" }}>
                {s.programme?.name || "—"}
              </div>
              <div style={{ fontSize: "0.75rem", color: TEXT_MUTED }}>
                📅 {fmtDate(s.date)} · 👤 {s.coach?.name || "—"} · 👥 {s.membres?.length || 0}/{s.capacite}
              </div>
            </div>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={bdg(s.membres?.length >= s.capacite ? "red" : "green")}>
                {s.membres?.length >= s.capacite ? "Complet" : "Places dispo"}
              </span>
              <button onClick={() => handleDelete(s._id)} style={{ background: "transparent", border: "1px solid #333", color: "#f87171", padding: "5px 9px", cursor: "pointer", fontSize: "0.75rem", borderRadius: "2px" }}>✕</button>
            </div>
          </div>
        ))}
      </div>

      {showAdd && (
        <Modal onClose={() => setShowAdd(false)} title="NOUVELLE SÉANCE">
          <ErrBanner msg={err} onClose={() => setErr("")} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
            <div>
              {label("Date")}
              <input style={S.input} type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
            </div>
            <div>
              {label("Heure")}
              <input style={S.input} type="time" value={form.heure} onChange={e => setForm(f => ({ ...f, heure: e.target.value }))} />
            </div>
            <div>
              {label("Capacité")}
              <input style={S.input} type="number" min={1} value={form.capacite} onChange={e => setForm(f => ({ ...f, capacite: +e.target.value }))} />
            </div>
            <div>
              {label("Coach *")}
              <select style={S.input} value={form.coach} onChange={e => setForm(f => ({ ...f, coach: e.target.value }))}>
                <option value="">— Sélectionner —</option>
                {coaches.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              {label("Programme *")}
              <select style={S.input} value={form.programme} onChange={e => setForm(f => ({ ...f, programme: e.target.value }))}>
                <option value="">— Sélectionner —</option>
                {programmes.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={S.navBtn} onClick={handleAdd} disabled={saving}>{saving ? "Ajout..." : "Planifier"}</button>
            <button onClick={() => setShowAdd(false)} style={{ ...S.navBtn, background: "transparent", border: "1px solid #333", boxShadow: "none" }}>Annuler</button>
          </div>
        </Modal>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// VIEW 4 — Progressions  (→ /progressions)
// ══════════════════════════════════════════════════════════════════════════════
function ProgressionsView() {
  const [progs,   setProgs]   = React.useState([]);
  const [members, setMembers] = React.useState([]);
  const [seances, setSeances] = React.useState([]);
  const [load,    setLoad]    = React.useState(true);
  const [saving,  setSaving]  = React.useState(false);
  const [err,     setErr]     = React.useState("");
  const [editing, setEditing] = React.useState(null);
  const [showAdd, setShowAdd] = React.useState(false);

  const emptyForm = { poids: "", taille: "", objectif: "", membre: "", seance: "" };
  const [form, setForm] = React.useState(emptyForm);

  const fetchAll = () =>
    Promise.all([progressionAPI.getAll(), memberAPI.getAll(), seanceAPI.getAll()])
      .then(([p, m, s]) => { setProgs(p); setMembers(m); setSeances(s); })
      .catch(e => setErr(e.message))
      .finally(() => setLoad(false));

  React.useEffect(() => { fetchAll(); }, []);

  const handleAdd = async () => {
    if (!form.membre) { setErr("Membre requis"); return; }
    setSaving(true);
    try {
        const payload = {
            ...form,
            seance: form.seance || undefined  // ← "" devient undefined
        };
        await progressionAPI.add(payload);
        setShowAdd(false);
        setForm(emptyForm);
        fetchAll();
    }
    catch (e) { setErr(e.message); }
    setSaving(false);
};

  const handleUpdate = async () => {
    setSaving(true);
    try { await progressionAPI.update(editing._id, { poids: editing.poids, taille: editing.taille, objectif: editing.objectif }); setEditing(null); fetchAll(); }
    catch (e) { setErr(e.message); }
    setSaving(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette progression ?")) return;
    try { await progressionAPI.delete(id); fetchAll(); } catch (e) { setErr(e.message); }
  };

  if (load) return <Spinner />;

  return (
    <>
      <div style={S.pageTag}>Suivi</div>
      <h1 style={S.pageTitle}>SUIVI DES PROGRESSIONS</h1>
      <ErrBanner msg={err} onClose={() => setErr("")} />

      <div style={S.statsRow}>
        <StatCard value={progs.length}                                         label="Entrées total" />
        <StatCard value={members.length}                                       label="Membres suivis" />
        <StatCard value={progs.filter(p=>p.objectif).length}                  label="Avec objectif" positive />
        <StatCard value={progs.length ? Math.round(progs.reduce((s,p)=>s+(+p.poids||0),0)/progs.length)+"kg" : "—"} label="Poids moyen" />
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "16px" }}>
        <button style={S.navBtn} onClick={() => setShowAdd(true)}>+ Ajouter progression</button>
      </div>

      <div style={S.panel}>
        <h2 style={S.panelTitle}>TOUTES LES PROGRESSIONS</h2>
        {progs.length === 0 && <div style={{ color: TEXT_DIM, textAlign: "center", padding: "40px" }}>Aucune progression enregistrée</div>}
        <table style={S.table}>
          <thead>
            <tr>{["Membre","Poids","Taille","Objectif","Séance","Actions"].map(h => <th key={h} style={S.th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {progs.map((p, i) => (
              <tr key={p._id}>
                <td style={S.td}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ ...avt(AVATAR_COLORS[i % AVATAR_COLORS.length]) }}>{(p.membre?.name || "?")[0].toUpperCase()}</div>
                    <span style={{ fontWeight: 600 }}>{p.membre?.name || "—"}</span>
                  </div>
                </td>
                <td style={S.td}>{p.poids ? `${p.poids} kg` : "—"}</td>
                <td style={S.td}>{p.taille ? `${p.taille} cm` : "—"}</td>
                <td style={S.td}><span style={{ color: TEXT_MUTED }}>{p.objectif || "—"}</span></td>
                <td style={S.td}>{p.seance ? fmtDate(p.seance?.date) : "—"}</td>
                <td style={S.td}>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button onClick={() => setEditing({ ...p, poids: p.poids || "", taille: p.taille || "", objectif: p.objectif || "" })} style={{ background: "transparent", border: "1px solid rgba(214,40,40,0.4)", color: RED, padding: "5px 10px", cursor: "pointer", fontSize: "0.72rem", borderRadius: "2px" }}>✏️</button>
                    <button onClick={() => handleDelete(p._id)} style={{ background: "transparent", border: "1px solid #333", color: "#f87171", padding: "5px 10px", cursor: "pointer", fontSize: "0.72rem", borderRadius: "2px" }}>✕</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Ajouter */}
      {showAdd && (
        <Modal onClose={() => setShowAdd(false)} title="NOUVELLE PROGRESSION">
          <ErrBanner msg={err} onClose={() => setErr("")} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
            <div style={{ gridColumn: "1/-1" }}>
              {label("Membre *")}
              <select style={S.input} value={form.membre} onChange={e => setForm(f => ({ ...f, membre: e.target.value }))}>
                <option value="">— Sélectionner —</option>
                {members.map(m => <option key={m._id} value={m._id}>{m.name}</option>)}
              </select>
            </div>
            <div>
              {label("Poids (kg)")}
              <input style={S.input} type="number" value={form.poids} onChange={e => setForm(f => ({ ...f, poids: e.target.value }))} placeholder="75" />
            </div>
            <div>
              {label("Taille (cm)")}
              <input style={S.input} type="number" value={form.taille} onChange={e => setForm(f => ({ ...f, taille: e.target.value }))} placeholder="180" />
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              {label("Objectif")}
              <input style={S.input} value={form.objectif} onChange={e => setForm(f => ({ ...f, objectif: e.target.value }))} placeholder="Ex: Prise de masse, perte de poids..." />
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              {label("Séance liée (optionnel)")}
              <select style={S.input} value={form.seance} onChange={e => setForm(f => ({ ...f, seance: e.target.value }))}>
                <option value="">— Aucune —</option>
                {seances.map(s => <option key={s._id} value={s._id}>{fmtDate(s.date)} {s.heure} — {s.programme?.name || "—"}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={S.navBtn} onClick={handleAdd} disabled={saving}>{saving ? "Ajout..." : "Ajouter"}</button>
            <button onClick={() => setShowAdd(false)} style={{ ...S.navBtn, background: "transparent", border: "1px solid #333", boxShadow: "none" }}>Annuler</button>
          </div>
        </Modal>
      )}

      {/* Modal Modifier */}
      {editing && (
        <Modal onClose={() => setEditing(null)} title="MODIFIER PROGRESSION">
          <ErrBanner msg={err} onClose={() => setErr("")} />
          <div style={{ marginBottom: "14px" }}>
            {label("Membre")}
            <div style={{ fontWeight: 600, color: "#F5F5F5" }}>{editing.membre?.name || "—"}</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px", marginBottom: "16px" }}>
            <div>
              {label("Poids (kg)")}
              <input style={S.input} type="number" value={editing.poids} onChange={e => setEditing(x => ({ ...x, poids: e.target.value }))} />
            </div>
            <div>
              {label("Taille (cm)")}
              <input style={S.input} type="number" value={editing.taille} onChange={e => setEditing(x => ({ ...x, taille: e.target.value }))} />
            </div>
            <div style={{ gridColumn: "1/-1" }}>
              {label("Objectif")}
              <input style={S.input} value={editing.objectif} onChange={e => setEditing(x => ({ ...x, objectif: e.target.value }))} />
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button style={S.navBtn} onClick={handleUpdate} disabled={saving}>{saving ? "Sauvegarde..." : "💾 Sauvegarder"}</button>
            <button onClick={() => setEditing(null)} style={{ ...S.navBtn, background: "transparent", border: "1px solid #333", boxShadow: "none" }}>Annuler</button>
          </div>
        </Modal>
      )}
    </>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// LAYOUT PRINCIPAL
// ══════════════════════════════════════════════════════════════════════════════
const NAV_ITEMS = [
  { key: "home",        icon: "⊞", label: "Vue d'ensemble"  },
  { key: "programmes",  icon: "📋", label: "Programmes"      },
  { key: "seances",     icon: "📅", label: "Séances"         },
  { key: "progressions",icon: "📈", label: "Progressions"    },
];

export default function CoachDashboard() {
  const history = useHistory();                              // ← React Router v5
  const [activeView, setActiveView] = React.useState("home");
  const [coachName,  setCoachName]  = React.useState("");

  React.useEffect(() => {
    // Charger fonts
    if (!document.getElementById("gymaccess-fonts")) {
      const link = document.createElement("link");
      link.id   = "gymaccess-fonts";
      link.href = "https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800&family=Bebas+Neue&display=swap";
      link.rel  = "stylesheet";
      document.head.appendChild(link);
    }

    // Récupérer le coach depuis localStorage
    const stored = localStorage.getItem("gymaccess_user");
    if (stored) {
      try { setCoachName(JSON.parse(stored).name || "Coach"); } catch {}
    }
  }, []);

  // ── Logout : supprime token + redirect vers /  ────────────────────────────
  const handleLogout = () => {
    localStorage.removeItem("gymaccess_token");
    localStorage.removeItem("gymaccess_user");
    history.push("/");          // → landing page (Route path="/" dans index.js)
  };

  const renderView = () => {
    switch (activeView) {
      case "programmes":   return <ProgrammesView />;
      case "seances":      return <SeancesView />;
      case "progressions": return <ProgressionsView />;
      default:             return <DashboardHome />;
    }
  };

  return (
    <div style={S.page}>
      {/* ── Navbar ── */}
      <nav style={S.nav}>
        <a href="/" style={{ ...S.logo, textDecoration: "none", color: "#F5F5F5" }}>
          GYM<span style={{ color: RED }}>ACCESS</span>
        </a>
        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <a href="/#salle"        style={S.navLink}>Salle</a>
          <a href="/#services"     style={S.navLink}>Services</a>
          <a href="/#nutrition"    style={S.navLink}>Nutrition</a>
          <a href="/#abonnements"  style={S.navLink}>Abonnements</a>
          {coachName && (
            <span style={{ color: TEXT_MUTED, fontSize: "0.78rem" }}>👋 {coachName}</span>
          )}
          <button onClick={handleLogout} style={{ ...S.navBtn, background: "transparent", border: "1px solid rgba(214,40,40,0.6)", boxShadow: "none" }}>
            Se déconnecter
          </button>
        </div>
      </nav>

      {/* ── Body ── */}
      <div style={S.wrapper}>
        {/* Sidebar */}
        <aside style={S.sidebar}>
          {/* Profil coach */}
          <div style={{ padding: "0 20px 24px", borderBottom: "1px solid #1A1A1A", marginBottom: "8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "44px", height: "44px", borderRadius: "4px", background: RED, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", color: "#fff" }}>
                {coachName?.[0]?.toUpperCase() || "C"}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>{coachName || "Coach"}</div>
                <div style={{ fontSize: "0.68rem", color: RED, textTransform: "uppercase", letterSpacing: "1px" }}>Coach certifié</div>
              </div>
            </div>
          </div>

          <div style={S.sideLabel}>Navigation</div>
          {NAV_ITEMS.map(item => (
            <SidebarItem
              key={item.key}
              icon={item.icon}
              label={item.label}
              active={activeView === item.key}
              onClick={() => setActiveView(item.key)}
            />
          ))}

          {/* Se déconnecter — pas de Paramètres */}
          <div style={{ marginTop: "auto", borderTop: "1px solid #1A1A1A", paddingTop: "16px" }}>
            <SidebarItem icon="🔓" label="Se déconnecter" danger onClick={handleLogout} />
          </div>
        </aside>

        {/* Contenu */}
        <main style={S.main}>{renderView()}</main>
      </div>

      {/* ── Footer ── */}
      <footer style={S.footer}>
        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.5rem", letterSpacing: "3px" }}>
          GYM<span style={{ color: RED }}>ACCESS</span>
        </div>
        <div>© 2026 GymAccess — Tous droits réservés</div>
      </footer>
    </div>
  );
}