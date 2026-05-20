import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


// ─── EXACT SAME STYLES FROM INDEX.JS ───────────────────────────────────────
const sharedStyles = {
  page: {
    background: "#0A0A0A",
    color: "#F5F5F5",
    fontFamily: "Barlow, Arial, sans-serif",
    minHeight: "100vh",
  },
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
    borderBottom: "1px solid rgba(214,40,40,0.22)",
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
  navBtn: {
    background: "#D62828",
    color: "#fff",
    textDecoration: "none",
    padding: "12px 18px",
    borderRadius: "2px",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontSize: "0.72rem",
    fontWeight: 700,
    boxShadow: "0 10px 30px rgba(214,40,40,0.35)",
  },
  footer: {
    borderTop: "1px solid rgba(214,40,40,0.18)",
    padding: "28px 5%",
    color: "#8F8F8F",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "12px",
    background: "#0A0A0A",
  },
  btnPrimary: {
    background: "#D62828",
    color: "#fff",
    textDecoration: "none",
    padding: "14px 22px",
    borderRadius: "2px",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontSize: "0.72rem",
    fontWeight: 700,
    boxShadow: "0 10px 30px rgba(214,40,40,0.35)",
    border: "none",
    cursor: "pointer",
  },
};

// ─── PROFILE-SPECIFIC CSS ────────────────────────────────────────────────────
const profileCSS = `
  .profile-hero {
    position: relative; height: 320px; overflow: hidden;
  }
  .profile-hero-img {
    width: 100%; height: 100%; object-fit: cover;
    filter: brightness(0.28) saturate(0.45);
  }
  .profile-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(105deg, rgba(10,10,10,0.92) 30%, rgba(214,40,40,0.12) 100%);
  }
  .profile-hero-grid {
    position: absolute; inset: 0;
    background-image:
      repeating-linear-gradient(90deg, rgba(214,40,40,0.035) 0, rgba(214,40,40,0.035) 1px, transparent 1px, transparent 55px),
      repeating-linear-gradient(0deg, rgba(214,40,40,0.035) 0, rgba(214,40,40,0.035) 1px, transparent 1px, transparent 55px);
  }
  .hero-label {
    position: absolute; top: 22px; left: 5%;
    color: #D62828; font-size: 0.68rem; font-weight: 700; letter-spacing: 3px;
    text-transform: uppercase; border: 1px solid rgba(214,40,40,0.45);
    padding: 5px 12px; background: rgba(10,10,10,0.5);
  }
  .profile-wave { position: absolute; bottom: 0; left: 0; right: 0; }

  .profile-body { background: #0D0D0D; padding-bottom: 72px; }
  .profile-container { max-width: 1100px; margin: 0 auto; padding: 0 5%; }

  .profile-card {
    background: #121212;
    border: 1px solid rgba(214,40,40,0.14);
    border-top: 2px solid #D62828;
    margin-top: -60px; position: relative; z-index: 10;
  }

  .profile-top {
    display: grid; grid-template-columns: 1fr auto 1fr;
    align-items: end; padding: 0 28px 24px; gap: 20px;
  }

  .profile-stats { display: flex; padding-top: 22px; }
  .stat-item {
    text-align: center; padding: 14px 26px;
    border-right: 1px solid rgba(214,40,40,0.1);
    cursor: pointer; position: relative; transition: background .2s;
  }
  .stat-item::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
    background: #D62828; transform: scaleX(0); transition: transform .25s;
  }
  .stat-item:hover { background: rgba(214,40,40,0.05); }
  .stat-item:hover::after { transform: scaleX(1); }
  .stat-item:last-child { border-right: none; }
  .stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.6rem; color: #F5F5F5; line-height: 1; display: block;
  }
  .stat-lbl {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: #666; display: block; margin-top: 3px;
  }

  .av-center { display: flex; flex-direction: column; align-items: center; }
  .av-wrap { position: relative; margin-top: -52px; }
  .av-frame {
    width: 108px; height: 108px;
    border: 3px solid #D62828; overflow: hidden; background: #1a1a1a;
  }
  .av-frame img { width: 100%; height: 100%; object-fit: cover; }
  .av-badge {
    position: absolute; bottom: -2px; right: -2px;
    background: #D62828; color: #fff;
    font-size: 0.62rem; font-weight: 800; letter-spacing: 1.5px;
    text-transform: uppercase; padding: 2px 7px;
  }
  .av-status {
    display: flex; align-items: center; gap: 5px; margin-top: 9px;
    font-size: 0.68rem; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: #555;
  }
  .sdot {
    width: 6px; height: 6px; border-radius: 50%; background: #22c55e;
    box-shadow: 0 0 5px rgba(34,197,94,0.6);
  }

  .pconn { display: flex; justify-content: flex-end; align-items: flex-end; padding-top: 22px; gap: 10px; }
  .btn-msg {
    background: transparent; cursor: pointer;
    border: 1px solid rgba(214,40,40,0.35); color: #999;
    font-family: Barlow, sans-serif; font-weight: 700;
    font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase;
    padding: 11px 18px; border-radius: 2px; transition: all .2s;
  }
  .btn-msg:hover { border-color: #D62828; color: #D62828; }

  .profile-identity {
    text-align: center;
    border-top: 1px solid rgba(255,255,255,0.05);
    padding: 26px 28px;
  }
  .profile-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2.8rem, 5vw, 4.8rem);
    letter-spacing: 4px; color: #F5F5F5; line-height: 1;
  }
  .profile-loc {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 0.7rem; font-weight: 700; letter-spacing: 3px;
    text-transform: uppercase; color: #555; margin-top: 7px;
  }
  .profile-loc .pin { color: #D62828; }
  .profile-meta { display: flex; justify-content: center; gap: 32px; margin-top: 16px; }
  .meta-item {
    display: flex; align-items: center; gap: 8px;
    font-size: 0.88rem; font-weight: 500; color: #A5A5A5;
  }
  .meta-icon {
    width: 28px; height: 28px;
    background: rgba(214,40,40,0.1); border: 1px solid rgba(214,40,40,0.22);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.72rem; color: #D62828; flex-shrink: 0;
  }

  .profile-bio {
    border-top: 1px solid rgba(255,255,255,0.05);
    padding: 28px 12%; text-align: center;
  }
  .profile-bio p { font-size: 0.95rem; color: #8A8A8A; line-height: 1.85; }
  .show-more {
    background: none; border: none; cursor: pointer;
    font-weight: 700; font-size: 0.7rem; letter-spacing: 2px;
    text-transform: uppercase; color: #D62828;
    margin-top: 12px; display: inline-flex; align-items: center; gap: 5px;
    transition: gap .2s; font-family: Barlow, sans-serif;
  }
  .show-more:hover { gap: 9px; }

  .profile-grid {
    display: grid; grid-template-columns: 1fr 300px; gap: 20px; margin-top: 22px;
  }

  .sc {
    background: #121212; border: 1px solid rgba(255,255,255,0.045);
    border-top: 2px solid #D62828; margin-bottom: 20px;
  }
  .sc-header {
    display: flex; align-items: center; justify-content: space-between;
    padding: 15px 22px; border-bottom: 1px solid rgba(255,255,255,0.045);
  }
  .sc-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.1rem; letter-spacing: 2.5px; color: #F5F5F5;
    display: flex; align-items: center; gap: 9px;
  }
  .sc-bar { width: 3px; height: 16px; background: #D62828; flex-shrink: 0; }
  .sc-link {
    font-weight: 700; font-size: 0.68rem; letter-spacing: 1.5px;
    text-transform: uppercase; color: #D62828;
    background: none; border: none; cursor: pointer;
    font-family: Barlow, sans-serif; transition: opacity .2s;
  }
  .sc-link:hover { opacity: 0.65; }
  .sc-body { padding: 18px 22px; }

  .alist { display: flex; flex-direction: column; gap: 9px; }
  .aitem {
    display: flex; align-items: center; gap: 13px;
    padding: 11px 13px; background: #0A0A0A;
    border-left: 2px solid transparent;
    transition: border-color .2s, background .2s; cursor: pointer;
  }
  .aitem:hover { border-left-color: #D62828; background: #151515; }
  .aicon {
    width: 34px; height: 34px; flex-shrink: 0;
    background: rgba(214,40,40,0.1); border: 1px solid rgba(214,40,40,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.9rem; border-radius: 2px;
  }
  .ameta { flex: 1; }
  .atitle { font-size: 0.85rem; font-weight: 600; color: #D8D8D8; }
  .atime { font-size: 0.75rem; color: #4A4A4A; margin-top: 2px; }
  .atag {
    font-weight: 700; font-size: 0.62rem; letter-spacing: 1.5px;
    text-transform: uppercase; color: #D62828;
    background: rgba(214,40,40,0.1); border: 1px solid rgba(214,40,40,0.25);
    padding: 2px 8px; border-radius: 2px;
  }

  .pi { margin-bottom: 16px; }
  .ph { display: flex; justify-content: space-between; margin-bottom: 6px; }
  .pn { font-size: 0.7rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #ADADAD; }
  .pp { font-family: 'Bebas Neue', sans-serif; font-size: 1rem; color: #D62828; }
  .pt { height: 2px; background: #1E1E1E; position: relative; overflow: hidden; border-radius: 999px; }
  .pf { position: absolute; top: 0; left: 0; height: 100%; background: linear-gradient(90deg, #D62828, #FF5A5A); }

  .ii {
    display: flex; align-items: center; gap: 11px;
    padding: 9px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .ii:last-child { border-bottom: none; }
  .iico {
    width: 28px; height: 28px; flex-shrink: 0;
    background: rgba(214,40,40,0.1); border: 1px solid rgba(214,40,40,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.72rem; color: #D62828; border-radius: 2px;
  }
  .ila { font-size: 0.62rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #4A4A4A; }
  .iva { font-size: 0.85rem; font-weight: 600; color: #C5C5C5; margin-top: 1px; }

  .abo-tag {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(214,40,40,0.1); border: 1px solid rgba(214,40,40,0.3);
    padding: 7px 13px; margin-bottom: 16px; border-radius: 2px;
  }
  .abo-dot { width: 5px; height: 5px; border-radius: 50%; background: #D62828; }
  .abo-tag span {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: #D62828;
  }

  .pgrid { display: grid; grid-template-columns: repeat(3,1fr); gap: 3px; }
  .pc {
    aspect-ratio: 1; background: #1A1A1A;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.1rem; opacity: 0.35; cursor: pointer;
    transition: opacity .25s, background .25s;
  }
  .pc:hover { opacity: 0.65; background: rgba(214,40,40,0.1); }

  /* ── NUTRITION SECTION ── */
  .nutri-grid {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 16px;
  }
  .nutri-card {
    background: #0A0A0A; border: 1px solid rgba(214,40,40,0.12);
    padding: 14px 16px; position: relative; overflow: hidden;
  }
  .nutri-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #D62828, transparent);
  }
  .nutri-label {
    font-size: 0.62rem; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: #4A4A4A; display: block; margin-bottom: 4px;
  }
  .nutri-value {
    font-family: 'Bebas Neue', sans-serif; font-size: 1.9rem;
    color: #F5F5F5; line-height: 1;
  }
  .nutri-unit { font-size: 0.75rem; color: #666; margin-left: 4px; }

  .nutri-macros {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 14px;
  }
  .macro-item {
    background: #0A0A0A; border: 1px solid rgba(255,255,255,0.04);
    padding: 10px 12px; text-align: center;
  }
  .macro-name {
    font-size: 0.6rem; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: #4A4A4A; display: block;
  }
  .macro-val {
    font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem;
    display: block; margin-top: 2px;
  }
  .macro-val.prot { color: #ef4444; }
  .macro-val.carb { color: #f59e0b; }
  .macro-val.fat  { color: #3b82f6; }
  .macro-sub { font-size: 0.65rem; color: #444; }

  .nutri-bmi {
    margin-top: 14px; padding: 12px 16px;
    background: #0A0A0A; border: 1px solid rgba(214,40,40,0.12);
    display: flex; align-items: center; justify-content: space-between;
  }
  .bmi-left {}
  .bmi-label { font-size: 0.62rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #4A4A4A; }
  .bmi-val { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: #F5F5F5; }
  .bmi-status {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; padding: 3px 10px; border-radius: 2px;
  }
  .bmi-normal { background: rgba(34,197,94,0.1); color: #22c55e; border: 1px solid rgba(34,197,94,0.3); }
  .bmi-over   { background: rgba(251,191,36,0.1); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); }
  .bmi-under  { background: rgba(59,130,246,0.1); color: #3b82f6; border: 1px solid rgba(59,130,246,0.3); }

  /* ── LOGOUT BUTTON ── */
  .logout-zone {
    margin-top: 32px; padding: 24px 0;
    border-top: 1px solid rgba(214,40,40,0.12);
    display: flex; justify-content: center;
  }
  .btn-logout {
    background: transparent;
    border: 1px solid rgba(214,40,40,0.4);
    color: #D62828;
    font-family: Barlow, sans-serif;
    font-weight: 700; font-size: 0.75rem;
    letter-spacing: 2.5px; text-transform: uppercase;
    padding: 13px 32px; cursor: pointer;
    border-radius: 2px; transition: all .25s;
    display: flex; align-items: center; gap: 10px;
  }
  .btn-logout:hover {
    background: rgba(214,40,40,0.08);
    border-color: #D62828;
    box-shadow: 0 0 20px rgba(214,40,40,0.2);
  }
`;

const activities = [
  { icon: "🏋️", title: "Séance Musculation — Pectoraux", time: "Aujourd'hui, 08:30", tag: "Terminé" },
  { icon: "🔥", title: "HIIT Cardio — 45 min", time: "Hier, 18:00", tag: "Terminé" },
  { icon: "🥗", title: "Plan Nutrition mis à jour", time: "Il y a 2 jours", tag: "Nutrition" },
  { icon: "📊", title: "Bilan mensuel complété", time: "Il y a 4 jours", tag: "Bilan" },
];

const progresses = [
  { name: "Endurance", pct: 78 },
  { name: "Force", pct: 65 },
  { name: "Souplesse", pct: 45 },
  { name: "Nutrition", pct: 88 },
];

const infoItems = [
  { icon: "📅", label: "Membre depuis", value: "Janvier 2023" },
  { icon: "🎯", label: "Objectif", value: "Prise de masse" },
  { icon: "👨‍🏫", label: "Coach assigné", value: "Mehdi Trabelsi" },
  { icon: "📍", label: "Localisation", value: "Tunis, Tunisie" },
];

// ── Nutrition calculator helpers ──────────────────────────────────────────────
function calcBMR(poids, taille, age, genre = "homme") {
  // Mifflin-St Jeor
  if (genre === "homme") return Math.round(10 * poids + 6.25 * taille - 5 * age + 5);
  return Math.round(10 * poids + 6.25 * taille - 5 * age - 161);
}

function calcTDEE(bmr, activite = "modere") {
  const factors = { sedentaire: 1.2, leger: 1.375, modere: 1.55, intense: 1.725, tres_intense: 1.9 };
  return Math.round(bmr * (factors[activite] || 1.55));
}

function calcBMI(poids, taille) {
  const h = taille / 100;
  return (poids / (h * h)).toFixed(1);
}

function getBMIStatus(bmi) {
  if (bmi < 18.5) return { label: "Insuffisance", cls: "bmi-under" };
  if (bmi < 25)   return { label: "Normal", cls: "bmi-normal" };
  if (bmi < 30)   return { label: "Surpoids", cls: "bmi-over" };
  return { label: "Obésité", cls: "bmi-over" };
}

// Macros répartition selon objectif
function calcMacros(calories, objectif = "prise de masse") {
  let prot, carb, fat;
  if (objectif.toLowerCase().includes("masse")) {
    prot = Math.round((calories * 0.30) / 4);
    carb = Math.round((calories * 0.45) / 4);
    fat  = Math.round((calories * 0.25) / 9);
  } else if (objectif.toLowerCase().includes("perte") || objectif.toLowerCase().includes("séch")) {
    prot = Math.round((calories * 0.40) / 4);
    carb = Math.round((calories * 0.30) / 4);
    fat  = Math.round((calories * 0.30) / 9);
  } else {
    prot = Math.round((calories * 0.30) / 4);
    carb = Math.round((calories * 0.40) / 4);
    fat  = Math.round((calories * 0.30) / 9);
  }
  return { prot, carb, fat };
}

// ── Nutrition Section Component ───────────────────────────────────────────────
function NutritionSection({ user }) {
  // Valeurs par défaut si non renseignées dans le profil
  const poids  = user?.poids  || 75;
  const taille = user?.taille || 175;
  const age    = user?.age    || 25;
  const genre  = user?.genre  || "homme";
  const objectif = user?.objectif || "Prise de masse";

  const bmr     = calcBMR(poids, taille, age, genre);
  const tdee    = calcTDEE(bmr);
  // Ajustement selon objectif
  const calCible = objectif.toLowerCase().includes("masse")
    ? tdee + 300
    : objectif.toLowerCase().includes("perte") || objectif.toLowerCase().includes("séch")
      ? tdee - 400
      : tdee;

  const macros = calcMacros(calCible, objectif);
  const bmi    = calcBMI(poids, taille);
  const bmiStatus = getBMIStatus(parseFloat(bmi));

  return (
    <div className="sc">
      <div className="sc-header">
        <span className="sc-title"><span className="sc-bar" />Nutrition & Bilan Corporel</span>
      </div>
      <div className="sc-body">

        {/* Poids / Taille / Âge */}
        <div className="nutri-grid">
          <div className="nutri-card">
            <span className="nutri-label">Poids</span>
            <span className="nutri-value">{poids}<span className="nutri-unit">kg</span></span>
          </div>
          <div className="nutri-card">
            <span className="nutri-label">Taille</span>
            <span className="nutri-value">{taille}<span className="nutri-unit">cm</span></span>
          </div>
          <div className="nutri-card">
            <span className="nutri-label">Âge</span>
            <span className="nutri-value">{age}<span className="nutri-unit">ans</span></span>
          </div>
          <div className="nutri-card">
            <span className="nutri-label">Calories cibles / jour</span>
            <span className="nutri-value" style={{ color: "#D62828" }}>{calCible}<span className="nutri-unit">kcal</span></span>
          </div>
        </div>

        {/* Macros */}
        <div style={{ marginTop: "6px" }}>
          <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#444" }}>
            Répartition des macronutriments
          </span>
        </div>
        <div className="nutri-macros">
          <div className="macro-item">
            <span className="macro-name">Protéines</span>
            <span className="macro-val prot">{macros.prot}g</span>
            <span className="macro-sub">30%</span>
          </div>
          <div className="macro-item">
            <span className="macro-name">Glucides</span>
            <span className="macro-val carb">{macros.carb}g</span>
            <span className="macro-sub">45%</span>
          </div>
          <div className="macro-item">
            <span className="macro-name">Lipides</span>
            <span className="macro-val fat">{macros.fat}g</span>
            <span className="macro-sub">25%</span>
          </div>
        </div>

        {/* BMI */}
        <div className="nutri-bmi">
          <div className="bmi-left">
            <div className="bmi-label">Indice de Masse Corporelle (IMC)</div>
            <div className="bmi-val">{bmi}</div>
          </div>
          <span className={`bmi-status ${bmiStatus.cls}`}>{bmiStatus.label}</span>
        </div>

      </div>
    </div>
  );
}

export default function Profile() {

  const [showFull, setShowFull] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    history.push("/");
  };

  return (
    <div style={sharedStyles.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800&family=Bebas+Neue&display=swap"
        rel="stylesheet"
      />
      <style>{profileCSS}</style>

      {/* NAVBAR */}
      <nav style={sharedStyles.nav}>
        <div>
          <p style={sharedStyles.logo}>
            GYM<span style={{ color: "#D62828" }}>ACCESS</span>
          </p>
        </div>
        <div style={sharedStyles.navLinks}>
          <a href="/#salle" style={sharedStyles.navLink}>Salle</a>
          <a href="/#services" style={sharedStyles.navLink}>Services</a>
          <a href="/#coachs" style={sharedStyles.navLink}>Coachs</a>
          <a href="/#nutrition" style={sharedStyles.navLink}>Nutrition</a>
          <a href="/#abonnements" style={sharedStyles.navLink}>Abonnements</a>
          <a href="/#contact" style={sharedStyles.navBtn}>Nous rejoindre</a>
        </div>
      </nav>

      {/* HERO BANNER */}
      <section className="profile-hero">
        <img
          className="profile-hero-img"
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80"
          alt="Gym banner"
        />
        <div className="profile-hero-overlay" />
        <div className="profile-hero-grid" />
        <span className="hero-label">Profil Membre Premium</span>
        <svg className="profile-wave" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 56" preserveAspectRatio="none" height="56">
          <polygon fill="#0D0D0D" points="1440 0 1440 56 0 56" />
        </svg>
      </section>

      {/* PROFILE BODY */}
      <div className="profile-body">
        <div className="profile-container">

          {/* PROFILE CARD */}
          <div className="profile-card">

            {/* TOP */}
            <div className="profile-top">
              <div className="profile-stats">
                {[["22", "Amis"], ["10", "Photos"]].map(([n, l]) => (
                  <div className="stat-item" key={l}>
                    <span className="stat-num">{n}</span>
                    <span className="stat-lbl">{l}</span>
                  </div>
                ))}
              </div>

              <div className="av-center">
                <div className="av-wrap">
                  <div className="av-frame">
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80"
                      alt={user?.name}
                    />
                  </div>
                  <span className="av-badge">Premium</span>
                </div>
              </div>


            </div>

            {/* IDENTITY */}
            <div className="profile-identity">
              <h1 className="profile-name">{user?.name || "Membre GymAccess"}</h1>
              <p style={{ color: "#777", marginTop: "10px" }}>{user?.email}</p>
              <div className="profile-loc">
                <span className="pin">▸</span>
                Tunis, Tunisie
              </div>
              <div className="profile-meta">
                <div className="meta-item">
                  <span className="meta-icon">🎯</span>
                  {user?.objectif || "Prise de masse"}
                </div>
                <div className="meta-item">
                  <span className="meta-icon">📞</span>
                  {user?.numTelephone || "—"}
                </div>
              </div>
            </div>

            {/* BIO */}
            <div className="profile-bio">
              <p>
                {showFull
                  ? "Passionné de fitness et de performance, ce membre s'entraîne avec discipline pour atteindre ses objectifs. Chaque séance est une opportunité de se surpasser et de progresser vers la meilleure version de soi-même."
                  : "Passionné de fitness et de performance, ce membre s'entraîne avec discipline pour atteindre ses objectifs."}
              </p>
              <button className="show-more" onClick={() => setShowFull(v => !v)}>
                {showFull ? "Voir moins ←" : "Voir plus →"}
              </button>
            </div>
          </div>

          {/* BOTTOM GRID */}
          <div className="profile-grid">

            {/* LEFT */}
            <div>
              {/* Activité Récente */}
              <div className="sc">
                <div className="sc-header">
                  <span className="sc-title"><span className="sc-bar" />Activité Récente</span>
                  <button className="sc-link">Tout voir →</button>
                </div>
                <div className="sc-body">
                  <div className="alist">
                    {activities.map((a, i) => (
                      <div className="aitem" key={i}>
                        <div className="aicon">{a.icon}</div>
                        <div className="ameta">
                          <div className="atitle">{a.title}</div>
                          <div className="atime">{a.time}</div>
                        </div>
                        <span className="atag">{a.tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── NUTRITION (nouvelle section) ── */}
              <NutritionSection user={user} />

              {/* Progression */}
              <div className="sc">
                <div className="sc-header">
                  <span className="sc-title"><span className="sc-bar" />Progression</span>
                  <button className="sc-link">Détails →</button>
                </div>
                <div className="sc-body">
                  {progresses.map((p, i) => (
                    <div className="pi" key={i}>
                      <div className="ph">
                        <span className="pn">{p.name}</span>
                        <span className="pp">{p.pct}%</span>
                      </div>
                      <div className="pt">
                        <div className="pf" style={{ width: `${p.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div>
              <div className="sc">
                <div className="sc-header">
                  <span className="sc-title"><span className="sc-bar" />Informations</span>
                </div>
                <div className="sc-body">
                  <div className="abo-tag">
                    <span className="abo-dot" />
                    <span>Abonnement Performance</span>
                  </div>
                  {infoItems.map((item, i) => (
                    <div className="ii" key={i}>
                      <div className="iico">{item.icon}</div>
                      <div>
                        <div className="ila">{item.label}</div>
                        <div className="iva">{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sc">
                <div className="sc-header">
                  <span className="sc-title"><span className="sc-bar" />Photos</span>
                  <button className="sc-link">10 photos →</button>
                </div>
                <div className="sc-body" style={{ padding: "14px" }}>
                  <div className="pgrid">
                    {["🏋️", "💪", "🔥", "🥗", "🏃", "🎯", "⚡", "📊", "🏆"].map((e, i) => (
                      <div className="pc" key={i}>{e}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── BOUTON SE DÉCONNECTER ── */}
          <div className="logout-zone">
            <button className="btn-logout" onClick={handleLogout}>
              <span>→</span>
              Se déconnecter
            </button>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer style={sharedStyles.footer}>
        <div style={sharedStyles.logo}>
          GYM<span style={{ color: "#D62828" }}>ACCESS</span>
        </div>
        <div>© 2026 GymAccess — Tous droits réservés</div>
      </footer>
    </div>
  );
}