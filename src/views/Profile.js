import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { notifyAuthChange } from "services/authSession";

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
};

const profileCSS = `
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes barGrow {
    from { width: 0; }
  }
  @keyframes pulse {
    0%, 100% { box-shadow: 0 0 5px rgba(34,197,94,0.5); }
    50%       { box-shadow: 0 0 12px rgba(34,197,94,0.9); }
  }

  /* ── HERO ── */
  .profile-hero {
    position: relative; height: 340px; overflow: hidden;
  }
  .profile-hero-img {
    width: 100%; height: 100%; object-fit: cover;
    filter: brightness(0.22) saturate(0.4);
    transform: scale(1.04);
    transition: transform 8s ease;
  }
  .profile-hero:hover .profile-hero-img { transform: scale(1); }
  .profile-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(105deg, rgba(10,10,10,0.95) 30%, rgba(214,40,40,0.1) 100%);
  }
  .profile-hero-grid {
    position: absolute; inset: 0;
    background-image:
      repeating-linear-gradient(90deg, rgba(214,40,40,0.04) 0, rgba(214,40,40,0.04) 1px, transparent 1px, transparent 55px),
      repeating-linear-gradient(0deg,  rgba(214,40,40,0.04) 0, rgba(214,40,40,0.04) 1px, transparent 1px, transparent 55px);
  }
  .hero-label {
    position: absolute; top: 22px; left: 5%;
    color: #D62828; font-size: 0.68rem; font-weight: 700; letter-spacing: 3px;
    text-transform: uppercase; border: 1px solid rgba(214,40,40,0.45);
    padding: 5px 14px; background: rgba(10,10,10,0.6);
    animation: fadeUp 0.6s ease both;
  }
  .hero-bottom-label {
    position: absolute; bottom: 72px; left: 5%;
    animation: fadeUp 0.7s 0.1s ease both;
  }
  .hero-bottom-label h2 {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2rem, 4vw, 3.2rem);
    letter-spacing: 4px; color: #F5F5F5; line-height: 1; margin: 0;
  }
  .hero-bottom-label span {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 3px;
    text-transform: uppercase; color: #555; margin-top: 6px; display: block;
  }
  .profile-wave { position: absolute; bottom: 0; left: 0; right: 0; }

  /* ── BODY ── */
  .profile-body { background: #0D0D0D; padding-bottom: 72px; }
  .profile-container {
    max-width: 1100px; margin: 0 auto; padding: 0 5%;
    animation: fadeUp 0.5s 0.1s ease both;
  }

  /* ── PROFILE CARD ── */
  .profile-card {
    background: #121212;
    border: 1px solid rgba(214,40,40,0.14);
    border-top: 3px solid #D62828;
    margin-top: -60px; position: relative; z-index: 10;
    box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  }

  .profile-top {
    display: grid; grid-template-columns: 1fr auto 1fr;
    align-items: end; padding: 0 28px 24px; gap: 20px;
  }

  /* Stats */
  .profile-stats { display: flex; padding-top: 22px; }
  .stat-item {
    text-align: center; padding: 14px 28px;
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
    font-size: 2.8rem; color: #F5F5F5; line-height: 1; display: block;
  }
  .stat-lbl {
    font-size: 0.65rem; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: #555; display: block; margin-top: 3px;
  }

  /* Avatar */
  .av-center { display: flex; flex-direction: column; align-items: center; }
  .av-wrap { position: relative; margin-top: -56px; }
  .av-frame {
    width: 112px; height: 112px;
    border: 3px solid #D62828; overflow: hidden; background: #1a1a1a;
    box-shadow: 0 0 0 5px rgba(214,40,40,0.12), 0 12px 32px rgba(0,0,0,0.6);
    transition: box-shadow .3s;
  }
  .av-frame:hover {
    box-shadow: 0 0 0 5px rgba(214,40,40,0.3), 0 12px 40px rgba(214,40,40,0.2);
  }
  .av-frame img { width: 100%; height: 100%; object-fit: cover; }
  .av-badge {
    position: absolute; bottom: -2px; right: -4px;
    background: #D62828; color: #fff;
    font-size: 0.6rem; font-weight: 800; letter-spacing: 1.5px;
    text-transform: uppercase; padding: 3px 8px;
  }
  .av-status {
    display: flex; align-items: center; gap: 6px; margin-top: 10px;
    font-size: 0.65rem; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: #4a4a4a;
  }
  .sdot {
    width: 7px; height: 7px; border-radius: 50%; background: #22c55e;
    animation: pulse 2s infinite;
  }

  /* Identity */
  .profile-identity {
    text-align: center;
    border-top: 1px solid rgba(255,255,255,0.05);
    padding: 28px 28px 22px;
  }
  .profile-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(2.6rem, 5vw, 4.6rem);
    letter-spacing: 4px; color: #F5F5F5; line-height: 1;
  }
  .profile-email { color: #555; margin-top: 8px; font-size: 0.85rem; }
  .profile-loc {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 0.68rem; font-weight: 700; letter-spacing: 3px;
    text-transform: uppercase; color: #444; margin-top: 8px;
  }
  .profile-loc .pin { color: #D62828; }
  .profile-meta { display: flex; justify-content: center; gap: 28px; margin-top: 18px; flex-wrap: wrap; }
  .meta-item {
    display: flex; align-items: center; gap: 9px;
    font-size: 0.88rem; font-weight: 500; color: #A0A0A0;
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
    padding: 8px 16px;
  }
  .meta-icon {
    width: 26px; height: 26px;
    background: rgba(214,40,40,0.1); border: 1px solid rgba(214,40,40,0.22);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.7rem; color: #D62828; flex-shrink: 0;
  }

  /* Bio */
  .profile-bio {
    border-top: 1px solid rgba(255,255,255,0.05);
    padding: 24px 14%; text-align: center;
  }
  .profile-bio p { font-size: 0.92rem; color: #7A7A7A; line-height: 1.9; }
  .show-more {
    background: none; border: none; cursor: pointer;
    font-weight: 700; font-size: 0.68rem; letter-spacing: 2px;
    text-transform: uppercase; color: #D62828;
    margin-top: 10px; display: inline-flex; align-items: center; gap: 5px;
    transition: gap .2s; font-family: Barlow, sans-serif;
  }
  .show-more:hover { gap: 9px; }

  /* ── GRID ── */
  .profile-grid {
    display: grid; grid-template-columns: 1fr 300px; gap: 20px; margin-top: 22px;
  }

  /* ── SECTION CARD ── */
  .sc {
    background: #121212; border: 1px solid rgba(255,255,255,0.045);
    border-top: 2px solid #D62828; margin-bottom: 20px;
    transition: box-shadow .25s;
  }
  .sc:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.4); }
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

  /* ── ACTIVITY ── */
  .alist { display: flex; flex-direction: column; gap: 8px; }
  .aitem {
    display: flex; align-items: center; gap: 13px;
    padding: 12px 14px; background: #0A0A0A;
    border-left: 2px solid transparent;
    transition: border-color .2s, background .2s, transform .2s; cursor: pointer;
  }
  .aitem:hover { border-left-color: #D62828; background: #111; transform: translateX(3px); }
  .aicon {
    width: 36px; height: 36px; flex-shrink: 0;
    background: rgba(214,40,40,0.1); border: 1px solid rgba(214,40,40,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.95rem; border-radius: 2px;
  }
  .ameta { flex: 1; }
  .atitle { font-size: 0.85rem; font-weight: 600; color: #D8D8D8; }
  .atime { font-size: 0.72rem; color: #3A3A3A; margin-top: 3px; }
  .atag {
    font-weight: 700; font-size: 0.6rem; letter-spacing: 1.5px;
    text-transform: uppercase; color: #D62828;
    background: rgba(214,40,40,0.08); border: 1px solid rgba(214,40,40,0.22);
    padding: 3px 9px; border-radius: 2px; white-space: nowrap;
  }
  .atag.green { color: #22c55e; background: rgba(34,197,94,0.08); border-color: rgba(34,197,94,0.25); }
  .atag.yellow { color: #fbbf24; background: rgba(251,191,36,0.08); border-color: rgba(251,191,36,0.25); }

  /* ── PROGRESSION ── */
  .pi { margin-bottom: 18px; }
  .pi:last-child { margin-bottom: 0; }
  .ph { display: flex; justify-content: space-between; margin-bottom: 7px; align-items: center; }
  .pn { font-size: 0.7rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #ADADAD; }
  .pp { font-family: 'Bebas Neue', sans-serif; font-size: 1.1rem; color: #D62828; }
  .pt { height: 3px; background: #1E1E1E; position: relative; overflow: hidden; }
  .pf {
    position: absolute; top: 0; left: 0; height: 100%;
    background: linear-gradient(90deg, #D62828, #FF5A5A);
    animation: barGrow 1.2s cubic-bezier(.4,0,.2,1) both;
  }

  /* ── INFORMATIONS ── */
  .abo-tag {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(214,40,40,0.08); border: 1px solid rgba(214,40,40,0.25);
    padding: 8px 14px; margin-bottom: 18px;
  }
  .abo-dot { width: 6px; height: 6px; border-radius: 50%; background: #D62828; animation: pulse 2s infinite; }
  .abo-tag span {
    font-size: 0.68rem; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: #D62828;
  }
  .ii {
    display: flex; align-items: center; gap: 12px;
    padding: 11px 0; border-bottom: 1px solid rgba(255,255,255,0.04);
    transition: background .2s;
  }
  .ii:last-child { border-bottom: none; }
  .iico {
    width: 30px; height: 30px; flex-shrink: 0;
    background: rgba(214,40,40,0.08); border: 1px solid rgba(214,40,40,0.18);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.75rem; color: #D62828; border-radius: 2px;
  }
  .ila { font-size: 0.6rem; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #3A3A3A; }
  .iva { font-size: 0.85rem; font-weight: 600; color: #C0C0C0; margin-top: 2px; }

  /* ── NUTRITION ── */
  .nutri-grid {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 16px;
  }
  .nutri-card {
    background: #0A0A0A; border: 1px solid rgba(214,40,40,0.1);
    padding: 14px 16px; position: relative; overflow: hidden;
    transition: border-color .2s;
  }
  .nutri-card:hover { border-color: rgba(214,40,40,0.3); }
  .nutri-card::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 2px;
    background: linear-gradient(90deg, #D62828, transparent);
  }
  .nutri-label {
    font-size: 0.6rem; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: #3A3A3A; display: block; margin-bottom: 5px;
  }
  .nutri-value {
    font-family: 'Bebas Neue', sans-serif; font-size: 2rem;
    color: #F5F5F5; line-height: 1;
  }
  .nutri-unit { font-size: 0.72rem; color: #555; margin-left: 4px; }
  .nutri-macros {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 14px;
  }
  .macro-item {
    background: #0A0A0A; border: 1px solid rgba(255,255,255,0.04);
    padding: 11px 10px; text-align: center;
    transition: border-color .2s;
  }
  .macro-item:hover { border-color: rgba(214,40,40,0.2); }
  .macro-name {
    font-size: 0.58rem; font-weight: 700; letter-spacing: 2px;
    text-transform: uppercase; color: #3A3A3A; display: block;
  }
  .macro-val { font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; display: block; margin-top: 3px; }
  .macro-val.prot { color: #ef4444; }
  .macro-val.carb { color: #f59e0b; }
  .macro-val.fat  { color: #3b82f6; }
  .macro-sub { font-size: 0.62rem; color: #3A3A3A; }
  .nutri-bmi {
    margin-top: 14px; padding: 14px 16px;
    background: #0A0A0A; border: 1px solid rgba(214,40,40,0.1);
    display: flex; align-items: center; justify-content: space-between;
  }
  .bmi-label { font-size: 0.6rem; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #3A3A3A; }
  .bmi-val { font-family: 'Bebas Neue', sans-serif; font-size: 2.2rem; color: #F5F5F5; margin-top: 3px; }
  .bmi-status {
    font-size: 0.65rem; font-weight: 700; letter-spacing: 1.5px;
    text-transform: uppercase; padding: 4px 12px; border-radius: 2px;
  }
  .bmi-normal { background: rgba(34,197,94,0.1); color: #22c55e; border: 1px solid rgba(34,197,94,0.3); }
  .bmi-over   { background: rgba(251,191,36,0.1); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); }
  .bmi-under  { background: rgba(59,130,246,0.1); color: #3b82f6; border: 1px solid rgba(59,130,246,0.3); }

  /* ── LOGOUT ── */
  .logout-zone {
    margin-top: 32px; padding: 28px 0;
    border-top: 1px solid rgba(214,40,40,0.1);
    display: flex; justify-content: center;
  }
  .btn-logout {
    background: transparent;
    border: 1px solid rgba(214,40,40,0.35); color: #D62828;
    font-family: Barlow, sans-serif; font-weight: 700; font-size: 0.75rem;
    letter-spacing: 2.5px; text-transform: uppercase;
    padding: 14px 36px; cursor: pointer; border-radius: 2px;
    transition: all .25s; display: flex; align-items: center; gap: 10px;
  }
  .btn-logout:hover {
    background: rgba(214,40,40,0.08); border-color: #D62828;
    box-shadow: 0 0 24px rgba(214,40,40,0.18); transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    .profile-grid { grid-template-columns: 1fr; }
    .profile-top { grid-template-columns: 1fr; justify-items: center; }
    .profile-stats { justify-content: center; }
    .profile-bio { padding: 24px 5%; }
  }
`;

const activities = [
  { icon: "🏋️", title: "Séance Musculation — Pectoraux", time: "Aujourd'hui, 08:30", tag: "Terminé", tagCls: "green" },
  { icon: "🔥", title: "HIIT Cardio — 45 min",           time: "Hier, 18:00",        tag: "Terminé", tagCls: "green" },
  { icon: "🥗", title: "Plan Nutrition mis à jour",       time: "Il y a 2 jours",     tag: "Nutrition", tagCls: "" },
  { icon: "📊", title: "Bilan mensuel complété",          time: "Il y a 4 jours",     tag: "Bilan",   tagCls: "yellow" },
];

const progresses = [
  { name: "Endurance", pct: 78 },
  { name: "Force",     pct: 65 },
  { name: "Souplesse", pct: 45 },
  { name: "Nutrition", pct: 88 },
];

function calcBMR(poids, taille, age, genre = "homme") {
  if (genre === "homme") return Math.round(10 * poids + 6.25 * taille - 5 * age + 5);
  return Math.round(10 * poids + 6.25 * taille - 5 * age - 161);
}
function calcTDEE(bmr) { return Math.round(bmr * 1.55); }
function calcBMI(poids, taille) { const h = taille / 100; return (poids / (h * h)).toFixed(1); }
function getBMIStatus(bmi) {
  if (bmi < 18.5) return { label: "Insuffisance", cls: "bmi-under" };
  if (bmi < 25)   return { label: "Normal",       cls: "bmi-normal" };
  if (bmi < 30)   return { label: "Surpoids",     cls: "bmi-over" };
  return { label: "Obésité", cls: "bmi-over" };
}
function calcMacros(calories, objectif = "") {
  const o = objectif.toLowerCase();
  if (o.includes("masse")) {
    return { prot: Math.round((calories * 0.30) / 4), carb: Math.round((calories * 0.45) / 4), fat: Math.round((calories * 0.25) / 9) };
  } else if (o.includes("perte") || o.includes("séch")) {
    return { prot: Math.round((calories * 0.40) / 4), carb: Math.round((calories * 0.30) / 4), fat: Math.round((calories * 0.30) / 9) };
  }
  return { prot: Math.round((calories * 0.30) / 4), carb: Math.round((calories * 0.40) / 4), fat: Math.round((calories * 0.30) / 9) };
}

function NutritionSection({ user }) {
  const poids    = user?.poids    || 75;
  const taille   = user?.taille   || 175;
  const age      = user?.age      || 25;
  const genre    = user?.genre    || "homme";
  const objectif = user?.objectif || "Prise de masse";
  const bmr      = calcBMR(poids, taille, age, genre);
  const tdee     = calcTDEE(bmr);
  const calCible = objectif.toLowerCase().includes("masse")
    ? tdee + 300
    : objectif.toLowerCase().includes("perte") || objectif.toLowerCase().includes("séch")
      ? tdee - 400 : tdee;
  const macros    = calcMacros(calCible, objectif);
  const bmi       = calcBMI(poids, taille);
  const bmiStatus = getBMIStatus(parseFloat(bmi));

  return (
    <div className="sc">
      <div className="sc-header">
        <span className="sc-title"><span className="sc-bar" />Nutrition & Bilan Corporel</span>
      </div>
      <div className="sc-body">
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
        <div style={{ fontSize: "0.62rem", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "#333", marginBottom: "4px" }}>
          Répartition macronutriments
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
        <div className="nutri-bmi">
          <div>
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
  const [user, setUser]         = useState(null);
  const history = useHistory();

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try { setUser(JSON.parse(stored)); } catch {}
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    notifyAuthChange();
    history.push("/");
  };

  const infoItems = [
    { icon: "📅", label: "Membre depuis",   value: "Janvier 2023" },
    { icon: "🎯", label: "Objectif",         value: user?.objectif || "Prise de masse" },
    { icon: "👨‍🏫", label: "Coach assigné",    value: "Mehdi Trabelsi" },
    { icon: "📍", label: "Localisation",     value: "Tunis, Tunisie" },
  ];

  return (
    <div style={sharedStyles.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800&family=Bebas+Neue&display=swap" rel="stylesheet" />
      <style>{profileCSS}</style>

      {/* NAVBAR */}
      <nav style={sharedStyles.nav}>
        <p style={sharedStyles.logo}>GYM<span style={{ color: "#D62828" }}>ACCESS</span></p>
        <div style={sharedStyles.navLinks}>
          <a href="/#salle"       style={sharedStyles.navLink}>Salle</a>
          <a href="/#services"    style={sharedStyles.navLink}>Services</a>
          <a href="/#coachs"      style={sharedStyles.navLink}>Coachs</a>
          <a href="/#nutrition"   style={sharedStyles.navLink}>Nutrition</a>
          <a href="/#abonnements" style={sharedStyles.navLink}>Abonnements</a>
          <a href="/#contact"     style={sharedStyles.navBtn}>Nous rejoindre</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="profile-hero">
        <img
          className="profile-hero-img"
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80"
          alt="Gym banner"
        />
        <div className="profile-hero-overlay" />
        <div className="profile-hero-grid" />
        <span className="hero-label">Profil Membre Premium</span>
        <div className="hero-bottom-label">
          <h2>{user?.name?.toUpperCase() || "MEMBRE GYMACCESS"}</h2>
          <span>Membre actif · GymAccess</span>
        </div>
        <svg className="profile-wave" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 56" preserveAspectRatio="none" height="56">
          <polygon fill="#0D0D0D" points="1440 0 1440 56 0 56" />
        </svg>
      </section>

      {/* BODY */}
      <div className="profile-body">
        <div className="profile-container">

          {/* PROFILE CARD */}
          <div className="profile-card">
            <div className="profile-top">

              {/* Stats gauche */}
              <div className="profile-stats">
                {[["12", "Séances"], ["4", "Programmes"]].map(([n, l]) => (
                  <div className="stat-item" key={l}>
                    <span className="stat-num">{n}</span>
                    <span className="stat-lbl">{l}</span>
                  </div>
                ))}
              </div>

              {/* Avatar centre */}
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
                <div className="av-status">
                  <span className="sdot" />
                  En ligne
                </div>
              </div>

              {/* Stats droite */}
              <div className="profile-stats" style={{ justifyContent: "flex-end" }}>
                {[["88%", "Nutrition"], ["78%", "Endurance"]].map(([n, l]) => (
                  <div className="stat-item" key={l}>
                    <span className="stat-num">{n}</span>
                    <span className="stat-lbl">{l}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* IDENTITY */}
            <div className="profile-identity">
              <h1 className="profile-name">{user?.name || "Membre GymAccess"}</h1>
              <p className="profile-email">{user?.email}</p>
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
                <div className="meta-item">
                  <span className="meta-icon">🏆</span>
                  Membre Premium
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
                        <span className={`atag ${a.tagCls}`}>{a.tag}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Nutrition */}
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
            </div>
          </div>

          {/* LOGOUT */}
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
        <div style={sharedStyles.logo}>GYM<span style={{ color: "#D62828" }}>ACCESS</span></div>
        <div>© 2026 GymAccess — Tous droits réservés</div>
      </footer>
    </div>
  );
}