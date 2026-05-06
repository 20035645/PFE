import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

// ─── COUNTDOWN TIMER ──────────────────────────────────────────────────────────
function Countdown() {
  const [time, setTime] = useState({ h: 23, m: 59, s: 59 });
  useEffect(() => {
    const iv = setInterval(() => {
      setTime((prev) => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) { h = 23; m = 59; s = 59; }
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center gap-2">
      {[{ v: pad(time.h), l: "H" }, { v: pad(time.m), l: "M" }, { v: pad(time.s), l: "S" }].map(({ v, l }, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center">
            <div
              className="w-14 h-14 flex items-center justify-center rounded-lg font-black text-2xl"
              style={{ background: "#1a1a1a", border: "1px solid #e11d4833", color: "#e11d48", fontFamily: "Oswald, sans-serif" }}
            >
              {v}
            </div>
            <span style={{ fontSize: "9px", color: "#4b5563", fontFamily: "Rajdhani, sans-serif", letterSpacing: "0.1em", marginTop: "4px" }}>{l}</span>
          </div>
          {i < 2 && <span style={{ color: "#e11d48", fontSize: "20px", fontWeight: 900, marginBottom: "12px" }}>:</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

// ─── ANIMATED COUNTER ─────────────────────────────────────────────────────────
function AnimCounter({ target, suffix = "+" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let step = 0;
        const steps = 50;
        const iv = setInterval(() => {
          step++;
          setVal(Math.floor((target * step) / steps));
          if (step >= steps) clearInterval(iv);
        }, 30);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

// ─── HERO LANDING ─────────────────────────────────────────────────────────────
function HeroLanding() {
  const [videoHovered, setVideoHovered] = useState(false);

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: "100vh", paddingTop: "80px", background: "#080608" }}
    >
      {/* ── Diagonal split background ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(110deg, #0d0208 55%, #1a0510 55%)",
        }}
      />
      {/* Red accent panel far right */}
      <div
        className="absolute top-0 right-0 bottom-0"
        style={{ width: "3px", background: "linear-gradient(to bottom, transparent, #e11d48, transparent)" }}
      />
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-4"
        style={{
          backgroundImage: "linear-gradient(rgba(225,29,72,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(225,29,72,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Top-left glow */}
      <div
        className="absolute"
        style={{ top: "-100px", left: "-100px", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(225,29,72,0.08) 0%, transparent 65%)" }}
      />
      {/* Bottom-right glow */}
      <div
        className="absolute"
        style={{ bottom: "-100px", right: "20%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(225,29,72,0.06) 0%, transparent 65%)" }}
      />

      <div className="container mx-auto px-4 relative z-10 flex flex-wrap items-center" style={{ minHeight: "calc(100vh - 80px)" }}>

        {/* ── LEFT column ── */}
        <div className="w-full lg:w-1/2 px-4 py-16">

          {/* Offer badge */}
          <div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-lg mb-8"
            style={{ background: "rgba(225,29,72,0.08)", border: "1px solid rgba(225,29,72,0.3)" }}
          >
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#e11d48", display: "inline-block", boxShadow: "0 0 8px #e11d48", animation: "pulse 1.5s infinite" }} />
            <span style={{ color: "#e11d48", fontFamily: "Rajdhani, sans-serif", fontSize: "12px", letterSpacing: "0.15em", fontWeight: 700 }}>
              OFFRE LIMITÉE — PREMIER MOIS À MOITIÉ PRIX
            </span>
          </div>

          {/* Main headline */}
          <h1
            style={{
              fontFamily: "Oswald, sans-serif",
              color: "white",
              lineHeight: 0.95,
              letterSpacing: "0.01em",
              fontSize: "clamp(3.8rem, 7vw, 6.5rem)",
              fontWeight: 900,
              marginBottom: "0",
            }}
          >
            FORGE
          </h1>
          <h1
            style={{
              fontFamily: "Oswald, sans-serif",
              color: "#e11d48",
              lineHeight: 0.95,
              letterSpacing: "0.01em",
              fontSize: "clamp(3.8rem, 7vw, 6.5rem)",
              fontWeight: 900,
              WebkitTextStroke: "1px #e11d48",
              marginBottom: "0",
            }}
          >
            TON CORPS.
          </h1>
          <h2
            style={{
              fontFamily: "Oswald, sans-serif",
              color: "#4b5563",
              lineHeight: 1.1,
              letterSpacing: "0.15em",
              fontSize: "clamp(1rem, 2.5vw, 1.8rem)",
              fontWeight: 500,
              marginTop: "8px",
              marginBottom: "24px",
            }}
          >
            TRANSFORME TA VIE. MAINTENANT.
          </h2>

          <p
            style={{
              color: "#9ca3af",
              fontFamily: "Rajdhani, sans-serif",
              lineHeight: "1.8",
              maxWidth: "460px",
              fontSize: "16px",
              marginBottom: "32px",
            }}
          >
            Rejoins <strong style={{ color: "white" }}>+1247 membres</strong> qui ont déjà transformé leur physique grâce à nos équipements premium, coachs certifiés et suivi nutritionnel personnalisé.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
            <Link
              to="/auth/register"
              className="px-8 py-4 rounded-lg font-bold inline-flex items-center gap-2 transition-all hover:opacity-90 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #e11d48, #9f1239)",
                color: "white",
                fontFamily: "Oswald, sans-serif",
                letterSpacing: "0.12em",
                fontSize: "15px",
                boxShadow: "0 0 40px rgba(225,29,72,0.35)",
              }}
            >
              <i className="fas fa-fire" />
              REJOINDRE MAINTENANT
            </Link>
            <a
              href="tel:+21671000000"
              className="px-6 py-4 rounded-lg font-bold inline-flex items-center gap-2 transition-all hover:border-gray-500"
              style={{
                border: "1px solid #2a2a2a",
                color: "#9ca3af",
                fontFamily: "Oswald, sans-serif",
                letterSpacing: "0.1em",
                fontSize: "15px",
                background: "transparent",
              }}
            >
              <i className="fas fa-phone" />
              APPELER
            </a>
          </div>

          {/* Countdown */}
          <div
            className="p-5 rounded-xl inline-block"
            style={{ background: "#0f0f0f", border: "1px solid #2a2a2a" }}
          >
            <p style={{ color: "#6b7280", fontFamily: "Rajdhani, sans-serif", fontSize: "11px", letterSpacing: "0.12em", marginBottom: "10px" }}>
              ⏱ OFFRE EXPIRE DANS
            </p>
            <Countdown />
          </div>

          {/* Trust badges */}
          <div className="flex gap-6 mt-8 flex-wrap">
            {[
              { icon: "fas fa-shield-alt", text: "Sans engagement" },
              { icon: "fas fa-star", text: "Note 4.9/5" },
              { icon: "fas fa-medal", text: "N°1 Tunis" },
            ].map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <i className={b.icon} style={{ color: "#e11d48", fontSize: "12px" }} />
                <span style={{ color: "#6b7280", fontFamily: "Rajdhani, sans-serif", fontSize: "12px", letterSpacing: "0.06em" }}>{b.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT column — Video card ── */}
        <div className="hidden lg:flex w-full lg:w-1/2 px-4 py-16 items-center justify-center">
          <div className="relative" style={{ width: "100%", maxWidth: "480px" }}>

            {/* Main video card */}
            <div
              className="relative overflow-hidden rounded-2xl cursor-pointer"
              style={{
                aspectRatio: "16/10",
                background: "linear-gradient(135deg, #1a0510 0%, #0d020a 100%)",
                border: "1px solid #2a2a2a",
                boxShadow: "0 30px 80px rgba(0,0,0,0.7)",
              }}
              onMouseEnter={() => setVideoHovered(true)}
              onMouseLeave={() => setVideoHovered(false)}
            >
              {/* Fake video content */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Background grid */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "linear-gradient(rgba(225,29,72,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(225,29,72,0.4) 1px, transparent 1px)",
                    backgroundSize: "30px 30px",
                  }}
                />
                {/* Silhouette placeholder */}
                <div className="absolute bottom-0 flex items-end justify-center" style={{ opacity: 0.07 }}>
                  <svg width="200" height="280" viewBox="0 0 200 280" fill="white">
                    <ellipse cx="100" cy="36" rx="28" ry="28" />
                    <rect x="52" y="70" width="96" height="110" rx="20" />
                    <rect x="28" y="80" width="30" height="90" rx="14" />
                    <rect x="142" y="80" width="30" height="90" rx="14" />
                    <rect x="52" y="178" width="40" height="100" rx="14" />
                    <rect x="108" y="178" width="40" height="100" rx="14" />
                  </svg>
                </div>
                {/* Glow center */}
                <div style={{ width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(225,29,72,0.2) 0%, transparent 70%)" }} />
              </div>

              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div
                  className="transition-all"
                  style={{
                    width: videoHovered ? "80px" : "70px",
                    height: videoHovered ? "80px" : "70px",
                    borderRadius: "50%",
                    background: videoHovered ? "rgba(225,29,72,0.9)" : "rgba(225,29,72,0.7)",
                    border: "2px solid rgba(255,255,255,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: videoHovered ? "0 0 40px rgba(225,29,72,0.6)" : "0 0 20px rgba(225,29,72,0.3)",
                    transition: "all 0.2s ease",
                  }}
                >
                  <i className="fas fa-play" style={{ color: "white", fontSize: "22px", marginLeft: "4px" }} />
                </div>
              </div>

              {/* Top label */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
                <span style={{ color: "white", fontFamily: "Rajdhani, sans-serif", fontSize: "11px", letterSpacing: "0.1em" }}>VISITE VIRTUELLE</span>
              </div>

              {/* Bottom overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 p-4"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.8), transparent)" }}
              >
                <p style={{ color: "white", fontFamily: "Oswald, sans-serif", fontSize: "14px", letterSpacing: "0.05em" }}>
                  Découvrez GymAccess en vidéo
                </p>
                <p style={{ color: "#9ca3af", fontFamily: "Rajdhani, sans-serif", fontSize: "11px" }}>
                  2 minutes — Visite complète des installations
                </p>
              </div>
            </div>

            {/* Floating stat cards */}
            <div
              className="absolute px-4 py-3 rounded-xl"
              style={{
                top: "-20px",
                right: "-20px",
                background: "#111",
                border: "1px solid #2a2a2a",
                boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
                minWidth: "120px",
              }}
            >
              <div style={{ fontFamily: "Oswald, sans-serif", fontSize: "24px", fontWeight: 900, color: "#e11d48" }}>4.9★</div>
              <div style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "10px", color: "#6b7280", letterSpacing: "0.08em" }}>NOTE MOYENNE</div>
            </div>

            <div
              className="absolute px-4 py-3 rounded-xl"
              style={{
                bottom: "-20px",
                left: "-20px",
                background: "#111",
                border: "1px solid rgba(16,185,129,0.3)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
              }}
            >
              <div className="flex items-center gap-2">
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e" }} />
                <span style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "11px", color: "white", letterSpacing: "0.06em" }}>OUVERT MAINTENANT</span>
              </div>
              <div style={{ fontFamily: "Oswald, sans-serif", fontSize: "13px", color: "#22c55e", marginTop: "2px" }}>06:00 — 23:00</div>
            </div>

            {/* Members joined today */}
            <div
              className="absolute px-4 py-3 rounded-xl"
              style={{
                bottom: "30px",
                right: "-24px",
                background: "#111",
                border: "1px solid #2a2a2a",
                boxShadow: "0 8px 30px rgba(0,0,0,0.6)",
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                    style={{ background: `linear-gradient(135deg, #e11d48, #9f1239)`, border: "1px solid #0f0f0f", marginLeft: i > 0 ? "-8px" : 0 }}>
                    <i className="fas fa-user" style={{ color: "white", fontSize: "8px" }} />
                  </div>
                ))}
              </div>
              <div style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "10px", color: "#6b7280" }}>+12 inscrits aujourd'hui</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 z-10" style={{ transform: "translateX(-50%)" }}>
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span style={{ color: "#4b5563", fontFamily: "Rajdhani, sans-serif", fontSize: "11px" }}>Défiler</span>
          <i className="fas fa-chevron-down" style={{ color: "#e11d48", fontSize: "11px" }} />
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}

// ─── MAIN LANDING ─────────────────────────────────────────────────────────────
export default function Landing() {
  const [activeNutrition, setActiveNutrition] = useState(0);

  const nutritionPlans = [
    {
      title: "Prise de Masse",
      icon: "fas fa-fire",
      calories: "3200",
      macros: { p: "180g", c: "400g", f: "80g" },
      color: "#e11d48",
      meals: ["Oeufs + Avoine + Banane", "Poulet + Riz + Légumes", "Shake Protéiné + Fruits", "Thon + Pâtes + Huile Olive", "Viande + Patate douce"],
    },
    {
      title: "Perte de Poids",
      icon: "fas fa-weight",
      calories: "1800",
      macros: { p: "160g", c: "150g", f: "60g" },
      color: "#f97316",
      meals: ["Blancs d'oeufs + Légumes", "Salade de thon + Quinoa", "Yaourt grec + Amandes", "Poulet grillé + Salade", "Soupe de légumes"],
    },
    {
      title: "Maintien & Forme",
      icon: "fas fa-balance-scale",
      calories: "2400",
      macros: { p: "150g", c: "280g", f: "70g" },
      color: "#10b981",
      meals: ["Muesli + Lait + Fruits", "Sandwich poulet + Crudités", "Fruits + Noix", "Poisson + Légumes vapeur", "Oeufs + Toast complet"],
    },
  ];

  const coachs = [
    { name: "Coach Nabil", specialty: "Musculation & Force", exp: "8 ans", clients: 120, rating: 4.9, icon: "fas fa-dumbbell" },
    { name: "Coach Sarra", specialty: "Yoga & Bien-être", exp: "6 ans", clients: 85, rating: 5.0, icon: "fas fa-spa" },
    { name: "Coach Amine", specialty: "CrossFit & HIIT", exp: "5 ans", clients: 95, rating: 4.8, icon: "fas fa-bolt" },
    { name: "Coach Leila", specialty: "Cardio & Nutrition", exp: "7 ans", clients: 110, rating: 4.9, icon: "fas fa-heartbeat" },
  ];

  const plans = [
    {
      name: "Standard",
      price: "39",
      icon: "fas fa-id-card",
      color: "#6b7280",
      features: ["Accès salle 7j/7", "Vestiaires & Douches", "Cours collectifs x4/sem", "Bilan mensuel", null, null],
    },
    {
      name: "Premium",
      price: "69",
      icon: "fas fa-crown",
      color: "#e11d48",
      featured: true,
      features: ["Accès salle 7j/7", "Vestiaires & Douches", "Cours collectifs illimités", "Bilan mensuel", "Programme personnalisé", "Accès spa & sauna"],
    },
    {
      name: "Coaching",
      price: "99",
      icon: "fas fa-user-tie",
      color: "#8b5cf6",
      features: ["Tout Premium inclus", "4 séances coach/mois", "Suivi nutritionnel", "Plan alimentaire", "Accès prioritaire", "Suivi app mobile"],
    },
  ];

  const conseils = [
    { icon: "fas fa-bed", title: "Récupération", desc: "Dormez 7-9h par nuit. La croissance musculaire se produit pendant le repos, pas pendant l'entraînement." },
    { icon: "fas fa-tint", title: "Hydratation", desc: "Buvez 2-3 litres d'eau par jour. Une déshydratation de 2% réduit vos performances de 20%." },
    { icon: "fas fa-apple-alt", title: "Nutrition Post-Training", desc: "Consommez des protéines dans les 30 minutes après l'effort pour maximiser la synthèse musculaire." },
    { icon: "fas fa-redo", title: "Progression", desc: "Augmentez les charges de 5% par semaine. La surcharge progressive est la clé de la progression." },
    { icon: "fas fa-brain", title: "Connexion Muscle", desc: "Concentrez-vous sur le muscle travaillé. La connexion mentale améliore l'activation musculaire de 35%." },
    { icon: "fas fa-calendar-check", title: "Régularité", desc: "3 à 5 séances par semaine avec constance surpassent 7 séances irrégulières. La consistance prime." },
  ];

  return (
    <>
      <IndexNavbar />
      <main style={{ backgroundColor: "#0a0a0a" }}>

        {/* ===== HERO CINÉMATIQUE ===== */}
        <HeroLanding />

        {/* ===== STATS BAR ===== */}
        <div
          className="py-10 px-4"
          style={{ backgroundColor: "#0f0f0f", borderTop: "1px solid #1a1a1a", borderBottom: "1px solid #1a1a1a" }}
        >
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-12">
              {[
                { target: 1247, suffix: "+", label: "Membres actifs", icon: "fas fa-users" },
                { target: 15, suffix: "+", label: "Coachs certifiés", icon: "fas fa-user-tie" },
                { target: 50, suffix: "+", label: "Cours / semaine", icon: "fas fa-calendar-check" },
                { target: 8, suffix: " ans", label: "D'expérience", icon: "fas fa-award" },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(225,29,72,0.1)", border: "1px solid rgba(225,29,72,0.2)" }}
                  >
                    <i className={s.icon} style={{ color: "#e11d48", fontSize: "18px" }} />
                  </div>
                  <div>
                    <div className="text-3xl font-black" style={{ color: "#e11d48", fontFamily: "Oswald, sans-serif" }}>
                      <AnimCounter target={s.target} suffix={s.suffix} />
                    </div>
                    <div className="text-xs uppercase" style={{ color: "#6b7280", fontFamily: "Rajdhani, sans-serif", letterSpacing: "0.1em" }}>{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== SERVICES SECTION ===== */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs uppercase tracking-widest" style={{ color: "#e11d48", fontFamily: "Rajdhani, sans-serif" }}>Nos Équipements</span>
              <h2 className="text-4xl font-bold mt-2" style={{ color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
                TOUT CE DONT VOUS AVEZ BESOIN
              </h2>
            </div>
            <div className="flex flex-wrap -mx-4">
              {[
                { icon: "fas fa-dumbbell", title: "Zone Musculation", desc: "Plus de 200 machines et équipements de dernière génération pour tous vos exercices.", count: "200+ machines" },
                { icon: "fas fa-running", title: "Cardio Zone", desc: "Tapis roulants, vélos elliptiques, rameurs et bien plus pour votre condition physique.", count: "50+ appareils" },
                { icon: "fas fa-users", title: "Cours Collectifs", desc: "Yoga, CrossFit, Zumba, Pilates, Boxe - Plus de 30 cours par semaine.", count: "30+ cours/sem" },
                { icon: "fas fa-spa", title: "Espace Détente", desc: "Sauna, hammam, espace récupération pour vous régénérer après l'effort.", count: "Premium" },
              ].map((service, i) => (
                <div key={i} className="w-full lg:w-3/12 md:w-6/12 px-4 mb-8">
                  <div
                    className="p-6 h-full rounded-xl transition-all hover:border-red-900"
                    style={{ backgroundColor: "#111111", border: "1px solid #2a2a2a" }}
                  >
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: "rgba(225,29,72,0.1)", border: "1px solid rgba(225,29,72,0.2)" }}
                    >
                      <i className={`${service.icon} text-2xl`} style={{ color: "#e11d48" }} />
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.03em" }}>
                      {service.title}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "#9ca3af", fontFamily: "Rajdhani, sans-serif", lineHeight: "1.7" }}>
                      {service.desc}
                    </p>
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: "rgba(225,29,72,0.1)", color: "#e11d48", border: "1px solid rgba(225,29,72,0.2)", fontFamily: "Rajdhani, sans-serif" }}
                    >
                      {service.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== NUTRITION SECTION ===== */}
        <section id="nutrition" className="py-20 px-4" style={{ backgroundColor: "#111111" }}>
          <div className="container mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs uppercase tracking-widest" style={{ color: "#e11d48", fontFamily: "Rajdhani, sans-serif" }}>Nutrition</span>
              <h2 className="text-4xl font-bold mt-2" style={{ color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
                PLANS NUTRITIONNELS
              </h2>
              <p className="mt-3 text-sm" style={{ color: "#9ca3af", fontFamily: "Rajdhani, sans-serif" }}>
                Des programmes alimentaires adaptés à votre objectif
              </p>
            </div>
            <div className="flex justify-center gap-3 mb-10 flex-wrap">
              {nutritionPlans.map((plan, i) => (
                <button
                  key={i}
                  className="px-5 py-2 rounded-full text-sm font-bold transition-all"
                  style={{
                    fontFamily: "Oswald, sans-serif",
                    letterSpacing: "0.08em",
                    background: activeNutrition === i ? `linear-gradient(135deg, ${plan.color}, ${plan.color}99)` : "rgba(255,255,255,0.05)",
                    color: activeNutrition === i ? "white" : "#9ca3af",
                    border: activeNutrition === i ? "none" : "1px solid #2a2a2a",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveNutrition(i)}
                >
                  <i className={`${plan.icon} mr-2`} />{plan.title}
                </button>
              ))}
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="rounded-2xl p-8" style={{ backgroundColor: "#1a1a1a", border: `1px solid ${nutritionPlans[activeNutrition].color}33` }}>
                <div className="flex flex-wrap -mx-4">
                  <div className="w-full lg:w-4/12 px-4 mb-6 lg:mb-0">
                    <h3 className="text-xl font-bold mb-6" style={{ color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
                      {nutritionPlans[activeNutrition].title}
                    </h3>
                    <div className="mb-6">
                      <div className="text-4xl font-black" style={{ color: nutritionPlans[activeNutrition].color, fontFamily: "Oswald, sans-serif" }}>
                        {nutritionPlans[activeNutrition].calories}
                      </div>
                      <div className="text-sm" style={{ color: "#9ca3af", fontFamily: "Rajdhani, sans-serif" }}>calories / jour</div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { label: "Protéines", value: nutritionPlans[activeNutrition].macros.p, color: "#e11d48" },
                        { label: "Glucides", value: nutritionPlans[activeNutrition].macros.c, color: "#f97316" },
                        { label: "Lipides", value: nutritionPlans[activeNutrition].macros.f, color: "#10b981" },
                      ].map((macro, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="text-sm" style={{ color: "#9ca3af", fontFamily: "Rajdhani, sans-serif" }}>{macro.label}</span>
                          <span className="text-sm font-bold" style={{ color: macro.color, fontFamily: "Oswald, sans-serif" }}>{macro.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="w-full lg:w-8/12 px-4">
                    <h4 className="text-sm uppercase mb-4 font-bold" style={{ color: "#9ca3af", fontFamily: "Rajdhani, sans-serif", letterSpacing: "0.1em" }}>
                      Plan repas journalier
                    </h4>
                    <div className="space-y-3">
                      {nutritionPlans[activeNutrition].meals.map((meal, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg"
                          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid #2a2a2a" }}>
                          <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{
                              background: `${nutritionPlans[activeNutrition].color}22`,
                              color: nutritionPlans[activeNutrition].color,
                              fontFamily: "Oswald, sans-serif",
                              border: `1px solid ${nutritionPlans[activeNutrition].color}44`,
                            }}
                          >
                            {i + 1}
                          </div>
                          <span className="text-sm" style={{ color: "white", fontFamily: "Rajdhani, sans-serif" }}>{meal}</span>
                          <span className="ml-auto text-xs" style={{ color: "#4b5563", fontFamily: "Rajdhani, sans-serif" }}>
                            {["Petit-déjeuner", "Déjeuner", "Collation", "Dîner", "Pré-sleep"][i]}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Link to="/auth/register" className="text-xs font-bold hover:text-red-300 transition-colors"
                        style={{ color: "#e11d48", fontFamily: "Oswald, sans-serif", letterSpacing: "0.08em" }}>
                        Obtenir mon plan personnalisé →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== ABONNEMENTS SECTION ===== */}
        <section id="abonnements" className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs uppercase tracking-widest" style={{ color: "#e11d48", fontFamily: "Rajdhani, sans-serif" }}>Tarifs</span>
              <h2 className="text-4xl font-bold mt-2" style={{ color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
                NOS ABONNEMENTS
              </h2>
              <p className="mt-3 text-sm" style={{ color: "#9ca3af", fontFamily: "Rajdhani, sans-serif" }}>
                Sans engagement, résiliable à tout moment
              </p>
            </div>
            <div className="flex flex-wrap justify-center -mx-4">
              {plans.map((plan, i) => (
                <div key={i} className="w-full lg:w-4/12 md:w-6/12 px-4 mb-8">
                  <div
                    className="rounded-2xl p-8 h-full relative overflow-hidden transition-all hover:scale-105"
                    style={{
                      background: plan.featured ? "linear-gradient(135deg, #1a0510 0%, #111111 100%)" : "#111111",
                      border: plan.featured ? `2px solid ${plan.color}` : "1px solid #2a2a2a",
                      boxShadow: plan.featured ? "0 0 40px rgba(225,29,72,0.2)" : "none",
                    }}
                  >
                    {plan.featured && (
                      <div className="absolute top-0 right-0">
                        <div
                          className="px-4 py-1 rounded-bl-xl text-xs font-bold"
                          style={{ background: "linear-gradient(135deg, #e11d48, #9f1239)", color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.1em" }}
                        >
                          POPULAIRE
                        </div>
                      </div>
                    )}
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${plan.color}22`, border: `1px solid ${plan.color}44` }}>
                      <i className={`${plan.icon} text-xl`} style={{ color: plan.color }} />
                    </div>
                    <h3 className="text-2xl font-bold mb-1" style={{ color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
                      {plan.name}
                    </h3>
                    <div className="flex items-end gap-1 mb-6">
                      <span className="text-4xl font-black" style={{ color: plan.color, fontFamily: "Oswald, sans-serif" }}>{plan.price}</span>
                      <span className="text-sm mb-2" style={{ color: "#6b7280", fontFamily: "Rajdhani, sans-serif" }}>DT/mois</span>
                    </div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center gap-3 text-sm"
                          style={{ color: feature ? "#9ca3af" : "#3a3a3a", fontFamily: "Rajdhani, sans-serif" }}>
                          <i className={`fas fa-${feature ? "check" : "times"} text-xs`} style={{ color: feature ? plan.color : "#3a3a3a" }} />
                          {feature || <span style={{ color: "#3a3a3a" }}>Non inclus</span>}
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/auth/register"
                      className="block text-center py-3 rounded-lg font-bold text-sm transition-all"
                      style={{
                        fontFamily: "Oswald, sans-serif",
                        letterSpacing: "0.1em",
                        background: plan.featured ? `linear-gradient(135deg, ${plan.color}, ${plan.color}99)` : "transparent",
                        color: plan.featured ? "white" : plan.color,
                        border: `1px solid ${plan.color}`,
                      }}
                    >
                      CHOISIR CE PLAN
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== COACHS SECTION ===== */}
        <section id="coachs" className="py-20 px-4" style={{ backgroundColor: "#111111" }}>
          <div className="container mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs uppercase tracking-widest" style={{ color: "#e11d48", fontFamily: "Rajdhani, sans-serif" }}>Experts</span>
              <h2 className="text-4xl font-bold mt-2" style={{ color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
                NOS COACHS CERTIFIÉS
              </h2>
              <p className="mt-3 text-sm" style={{ color: "#9ca3af", fontFamily: "Rajdhani, sans-serif" }}>
                Des professionnels dédiés à votre réussite
              </p>
            </div>
            <div className="flex flex-wrap -mx-4">
              {coachs.map((coach, i) => (
                <div key={i} className="w-full lg:w-3/12 md:w-6/12 px-4 mb-8">
                  <div className="p-6 text-center h-full rounded-xl transition-all hover:border-red-900"
                    style={{ backgroundColor: "#1a1a1a", border: "1px solid #2a2a2a" }}>
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4"
                      style={{ background: "linear-gradient(135deg, #e11d48, #9f1239)", boxShadow: "0 0 20px rgba(225,29,72,0.3)" }}
                    >
                      <i className={`${coach.icon} text-2xl text-white`} />
                    </div>
                    <h3 className="text-xl font-bold mb-1" style={{ color: "white", fontFamily: "Oswald, sans-serif" }}>{coach.name}</h3>
                    <p className="text-xs mb-4" style={{ color: "#e11d48", fontFamily: "Rajdhani, sans-serif", letterSpacing: "0.08em" }}>{coach.specialty}</p>
                    <div className="flex justify-center gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold" style={{ color: "white", fontFamily: "Oswald, sans-serif" }}>{coach.exp}</div>
                        <div className="text-xs" style={{ color: "#6b7280", fontFamily: "Rajdhani, sans-serif" }}>Expérience</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold" style={{ color: "white", fontFamily: "Oswald, sans-serif" }}>{coach.clients}</div>
                        <div className="text-xs" style={{ color: "#6b7280", fontFamily: "Rajdhani, sans-serif" }}>Clients</div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <i key={j} className="fas fa-star text-xs" style={{ color: j < Math.floor(coach.rating) ? "#f59e0b" : "#2a2a2a" }} />
                      ))}
                      <span className="text-xs ml-1" style={{ color: "#9ca3af", fontFamily: "Rajdhani, sans-serif" }}>{coach.rating}</span>
                    </div>
                    <Link to="/auth/register"
                      className="block text-center py-2 px-4 rounded text-xs font-bold transition-all hover:bg-red-900 hover:bg-opacity-30"
                      style={{ fontFamily: "Oswald, sans-serif", letterSpacing: "0.08em", color: "#e11d48", border: "1px solid rgba(225,29,72,0.3)" }}>
                      RÉSERVER UNE SÉANCE
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CONSEILS SECTION ===== */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs uppercase tracking-widest" style={{ color: "#e11d48", fontFamily: "Rajdhani, sans-serif" }}>Expertise</span>
              <h2 className="text-4xl font-bold mt-2" style={{ color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
                CONSEILS DE NOS EXPERTS
              </h2>
            </div>
            <div className="flex flex-wrap -mx-4">
              {conseils.map((conseil, i) => (
                <div key={i} className="w-full lg:w-4/12 md:w-6/12 px-4 mb-8">
                  <div className="p-6 h-full flex gap-4 rounded-xl transition-all hover:border-red-900"
                    style={{ backgroundColor: "#111111", border: "1px solid #2a2a2a" }}>
                    <div
                      className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(225,29,72,0.1)", border: "1px solid rgba(225,29,72,0.2)" }}
                    >
                      <i className={`${conseil.icon} text-lg`} style={{ color: "#e11d48" }} />
                    </div>
                    <div>
                      <h3 className="text-base font-bold mb-2" style={{ color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.03em" }}>
                        {conseil.title}
                      </h3>
                      <p className="text-sm" style={{ color: "#9ca3af", fontFamily: "Rajdhani, sans-serif", lineHeight: "1.7" }}>
                        {conseil.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <section className="py-24 px-4" style={{ background: "linear-gradient(135deg, #1a0510 0%, #0a0a0a 50%, #1a0510 100%)" }}>
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ background: "linear-gradient(135deg, #e11d48, #9f1239)", boxShadow: "0 0 60px rgba(225,29,72,0.5)" }}
              >
                <i className="fas fa-dumbbell text-white text-3xl" />
              </div>
              <h2 className="text-5xl font-black mb-4" style={{ color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
                PRÊT(E) À COMMENCER?
              </h2>
              <p className="text-lg mb-8" style={{ color: "#9ca3af", fontFamily: "Rajdhani, sans-serif" }}>
                Rejoignez plus de 1247 membres qui ont déjà transformé leur vie avec GymAccess.
                Premier mois à <span style={{ color: "#e11d48", fontWeight: 700 }}>moitié prix.</span>
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link
                  to="/auth/register"
                  className="px-10 py-4 rounded-lg text-base font-bold inline-flex items-center gap-2 transition-all hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #e11d48, #9f1239)",
                    color: "white",
                    fontFamily: "Oswald, sans-serif",
                    letterSpacing: "0.1em",
                    boxShadow: "0 0 30px rgba(225,29,72,0.4)",
                  }}
                >
                  <i className="fas fa-fire" />
                  REJOINDRE MAINTENANT
                </Link>
                <a
                  href="tel:+21671000000"
                  className="px-10 py-4 rounded-lg text-base font-bold inline-flex items-center gap-2 transition-all hover:border-red-500"
                  style={{ border: "1px solid #2a2a2a", color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.1em" }}
                >
                  <i className="fas fa-phone" />
                  APPELER
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}