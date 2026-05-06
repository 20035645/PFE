import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer.js";

// ─── SLIDER DATA ──────────────────────────────────────────────────────────────
const slides = [
  {
    tag: "💪 MUSCULATION",
    title: ["FORGE", "TON CORPS"],
    highlight: "CORPS",
    desc: "Accède à plus de 200 machines premium pour sculpter chaque muscle avec précision.",
    cta: "COMMENCER MAINTENANT",
    ctaLink: "/auth/register",
    accent: "#e11d48",
    bg: "linear-gradient(135deg, #1a0008 0%, #2d0012 50%, #0a0a0a 100%)",
    icon: "fas fa-dumbbell",
    stat: { num: "200+", label: "Machines" },
  },
  {
    tag: "🔥 CARDIO ZONE",
    title: ["BRÛLE", "LES GRAISSES"],
    highlight: "GRAISSES",
    desc: "Tapis, vélos, rameurs et elliptiques de dernière génération pour fondre efficacement.",
    cta: "VOIR LES ÉQUIPEMENTS",
    ctaLink: "/auth/register",
    accent: "#f97316",
    bg: "linear-gradient(135deg, #1a0800 0%, #2d1200 50%, #0a0a0a 100%)",
    icon: "fas fa-heartbeat",
    stat: { num: "50+", label: "Appareils cardio" },
  },
  {
    tag: "🧘 COURS COLLECTIFS",
    title: ["DÉPASSEZ", "VOS LIMITES"],
    highlight: "LIMITES",
    desc: "Yoga, CrossFit, Zumba, Boxe — plus de 30 cours par semaine avec des coachs certifiés.",
    cta: "VOIR LE PLANNING",
    ctaLink: "/auth/register",
    accent: "#8b5cf6",
    bg: "linear-gradient(135deg, #0d0020 0%, #1a0040 50%, #0a0a0a 100%)",
    icon: "fas fa-users",
    stat: { num: "30+", label: "Cours / semaine" },
  },
  {
    tag: "🏆 COACHS EXPERTS",
    title: ["GUIDÉ PAR", "DES PROS"],
    highlight: "PROS",
    desc: "15 coachs certifiés à votre service pour un suivi personnalisé et des résultats garantis.",
    cta: "RENCONTRER NOS COACHS",
    ctaLink: "/coaches",
    accent: "#10b981",
    bg: "linear-gradient(135deg, #001a0d 0%, #002d1a 50%, #0a0a0a 100%)",
    icon: "fas fa-user-tie",
    stat: { num: "15+", label: "Coachs certifiés" },
  },
];

// ─── HERO SLIDER ──────────────────────────────────────────────────────────────
function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const DURATION = 5000;

  const goTo = (index) => {
    if (animating || index === current) return;
    setPrev(current);
    setAnimating(true);
    setProgress(0);
    setTimeout(() => {
      setCurrent(index);
      setPrev(null);
      setAnimating(false);
    }, 600);
  };

  const next = () => goTo((current + 1) % slides.length);
  const prev2 = () => goTo((current - 1 + slides.length) % slides.length);

  // Auto-advance
  useEffect(() => {
    timerRef.current = setTimeout(() => next(), DURATION);
    return () => clearTimeout(timerRef.current);
  }, [current]);

  // Progress bar
  useEffect(() => {
    setProgress(0);
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / DURATION, 1);
      setProgress(p * 100);
      if (p < 1) progressRef.current = requestAnimationFrame(step);
    };
    progressRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(progressRef.current);
  }, [current]);

  const slide = slides[current];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: "80px" }}>
      {/* ── BG ── */}
      <div
        className="absolute inset-0 transition-all"
        style={{
          background: slide.bg,
          transition: "background 0.6s ease",
        }}
      />
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(${slide.accent}55 1px, transparent 1px), linear-gradient(90deg, ${slide.accent}55 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />
      {/* Glow */}
      <div
        className="absolute top-20 right-10 w-96 h-96 rounded-full opacity-10"
        style={{ background: slide.accent, filter: "blur(100px)", transition: "background 0.6s ease" }}
      />
      <div
        className="absolute bottom-20 left-10 w-64 h-64 rounded-full opacity-5"
        style={{ background: slide.accent, filter: "blur(80px)", transition: "background 0.6s ease" }}
      />

      {/* ── CONTENT ── */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-wrap items-center min-h-screen" style={{ paddingTop: "40px", paddingBottom: "100px" }}>

          {/* LEFT */}
          <div className="w-full lg:w-7/12 px-4">
            {/* Tag */}
            <div
              key={`tag-${current}`}
              className="inline-block px-4 py-1 rounded-full text-xs mb-6"
              style={{
                background: `${slide.accent}18`,
                color: slide.accent,
                border: `1px solid ${slide.accent}44`,
                fontFamily: "Rajdhani, sans-serif",
                letterSpacing: "0.15em",
                animation: "slideInLeft 0.5s ease forwards",
              }}
            >
              {slide.tag}
            </div>

            {/* Title */}
            <h1
              key={`title-${current}`}
              className="font-black mb-6"
              style={{
                color: "white",
                fontFamily: "Oswald, sans-serif",
                lineHeight: 1.0,
                letterSpacing: "0.02em",
                fontSize: "clamp(3.5rem, 8vw, 6.5rem)",
                animation: "slideInLeft 0.5s ease 0.1s forwards",
                opacity: 0,
              }}
            >
              {slide.title[0]}<br />
              {slide.title[1].split(slide.highlight).map((part, i, arr) =>
                i < arr.length - 1
                  ? <React.Fragment key={i}>{part}<span style={{ color: slide.accent }}>{slide.highlight}</span></React.Fragment>
                  : part
              )}
            </h1>

            {/* Desc */}
            <p
              key={`desc-${current}`}
              className="text-lg mb-8"
              style={{
                color: "#9ca3af",
                fontFamily: "Rajdhani, sans-serif",
                lineHeight: "1.8",
                maxWidth: "520px",
                animation: "slideInLeft 0.5s ease 0.2s forwards",
                opacity: 0,
              }}
            >
              {slide.desc}
            </p>

            {/* CTAs */}
            <div
              key={`cta-${current}`}
              className="flex flex-wrap gap-4 mb-12"
              style={{ animation: "slideInLeft 0.5s ease 0.3s forwards", opacity: 0 }}
            >
              <Link
                to={slide.ctaLink}
                className="px-8 py-4 rounded-lg text-base font-bold inline-flex items-center gap-2 transition-all hover:opacity-90"
                style={{
                  background: `linear-gradient(135deg, ${slide.accent}, ${slide.accent}99)`,
                  color: "white",
                  fontFamily: "Oswald, sans-serif",
                  letterSpacing: "0.1em",
                  boxShadow: `0 0 30px ${slide.accent}44`,
                }}
              >
                <i className="fas fa-dumbbell"></i>
                {slide.cta}
              </Link>
              <button
                onClick={next}
                className="px-8 py-4 rounded-lg text-base font-bold inline-flex items-center gap-2 transition-all hover:border-gray-400"
                style={{
                  border: "1px solid #2a2a2a",
                  color: "white",
                  background: "transparent",
                  fontFamily: "Oswald, sans-serif",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                }}
              >
                <i className="fas fa-arrow-right"></i>
                SUIVANT
              </button>
            </div>

            {/* Slide counter & dots */}
            <div className="flex items-center gap-6">
              <span style={{ color: "#4b5563", fontFamily: "Rajdhani, sans-serif", fontSize: "13px" }}>
                <span style={{ color: slide.accent, fontWeight: 700, fontSize: "20px" }}>0{current + 1}</span>
                {" "}/ 0{slides.length}
              </span>
              <div className="flex gap-2 items-center">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    style={{
                      height: "3px",
                      width: i === current ? "32px" : "8px",
                      borderRadius: "2px",
                      background: i === current ? slide.accent : "#2a2a2a",
                      border: "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Big Icon Visual */}
          <div className="hidden lg:flex w-full lg:w-5/12 px-4 justify-center items-center">
            <div
              key={`visual-${current}`}
              className="relative flex items-center justify-center"
              style={{ width: "380px", height: "380px", animation: "fadeScaleIn 0.6s ease forwards" }}
            >
              {/* Outer spinning ring */}
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  border: `1px dashed ${slide.accent}30`,
                  animation: "spin 20s linear infinite",
                }}
              />
              {/* Middle ring */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: "30px",
                  background: `radial-gradient(circle, ${slide.accent}20 0%, transparent 70%)`,
                  border: `1px solid ${slide.accent}20`,
                }}
              />
              {/* Inner ring */}
              <div
                className="absolute rounded-full"
                style={{
                  inset: "80px",
                  background: `radial-gradient(circle, ${slide.accent}35 0%, transparent 70%)`,
                  border: `1px solid ${slide.accent}40`,
                }}
              />
              {/* Center icon */}
              <div
                className="relative z-10 w-36 h-36 rounded-full flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${slide.accent}30, ${slide.accent}10)`,
                  border: `2px solid ${slide.accent}50`,
                  boxShadow: `0 0 60px ${slide.accent}30`,
                }}
              >
                <i className={`${slide.icon}`} style={{ fontSize: "4.5rem", color: slide.accent }} />
              </div>

              {/* Stat badge */}
              <div
                className="absolute bottom-8 right-0 px-4 py-3 rounded-xl flex flex-col items-center"
                style={{
                  background: "#111",
                  border: `1px solid ${slide.accent}33`,
                  boxShadow: `0 4px 20px rgba(0,0,0,0.6)`,
                  minWidth: "90px",
                }}
              >
                <span style={{ fontSize: "22px", fontWeight: 900, color: slide.accent, fontFamily: "Oswald, sans-serif" }}>
                  {slide.stat.num}
                </span>
                <span style={{ fontSize: "10px", color: "#6b7280", fontFamily: "Rajdhani, sans-serif", letterSpacing: "0.08em" }}>
                  {slide.stat.label}
                </span>
              </div>

              {/* Floating badge top-left */}
              <div
                className="absolute top-8 left-0 px-3 py-2 rounded-lg flex items-center gap-2"
                style={{
                  background: "#111",
                  border: "1px solid #2a2a2a",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                }}
              >
                <i className="fas fa-map-marker-alt text-xs" style={{ color: slide.accent }} />
                <span style={{ fontSize: "11px", color: "white", fontFamily: "Rajdhani, sans-serif" }}>Tunis N°1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── ARROWS ── */}
      <button
        onClick={prev2}
        className="absolute left-4 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:border-gray-400"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          border: "1px solid #2a2a2a",
          color: "white",
          cursor: "pointer",
          backdropFilter: "blur(4px)",
        }}
      >
        <i className="fas fa-chevron-left" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 z-20 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:border-gray-400"
        style={{
          top: "50%",
          transform: "translateY(-50%)",
          background: "rgba(0,0,0,0.5)",
          border: "1px solid #2a2a2a",
          color: "white",
          cursor: "pointer",
          backdropFilter: "blur(4px)",
        }}
      >
        <i className="fas fa-chevron-right" />
      </button>

      {/* ── PROGRESS BAR ── */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: "#1a1a1a" }}>
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: slide.accent,
            transition: "background 0.4s ease",
          }}
        />
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs" style={{ color: "#4b5563", fontFamily: "Rajdhani, sans-serif" }}>Défiler</span>
          <i className="fas fa-chevron-down text-xs" style={{ color: slide.accent }} />
        </div>
      </div>

      {/* ── ANIMATIONS ── */}
      <style>{`
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeScaleIn {
          from { opacity: 0; transform: scale(0.85); }
          to   { opacity: 1; transform: scale(1); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function Index() {
  const [counter, setCounter] = useState({ membres: 0, coachs: 0, cours: 0, ans: 0 });
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const targets = { membres: 1247, coachs: 15, cours: 50, ans: 8 };
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const p = step / steps;
      setCounter({
        membres: Math.floor(targets.membres * p),
        coachs: Math.floor(targets.coachs * p),
        cours: Math.floor(targets.cours * p),
        ans: Math.floor(targets.ans * p),
      });
      if (step >= steps) clearInterval(timer);
    }, 2000 / steps);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setActiveTestimonial((p) => (p + 1) % 3), 4000);
    return () => clearInterval(iv);
  }, []);

  const testimonials = [
    { name: "Mehdi B.", role: "Membre Premium", text: "En 4 mois avec GymAccess, j'ai perdu 12kg et gagné en confiance. Les coachs sont incroyables et les équipements top niveau.", rating: 5 },
    { name: "Yasmine T.", role: "Membre Coaching", text: "Le suivi nutritionnel personnalisé a tout changé pour moi. Je recommande GymAccess à toute personne sérieuse dans sa démarche.", rating: 5 },
    { name: "Karim S.", role: "Membre Standard", text: "Ambiance motivante, équipements modernes, staff professionnel. La meilleure salle de Tunis sans aucun doute.", rating: 5 },
  ];

  const features = [
    { icon: "fas fa-dumbbell", title: "Équipements Premium", desc: "Plus de 200 machines de dernière génération pour tous vos exercices de musculation et cardio.", badge: "200+ machines" },
    { icon: "fas fa-users", title: "Cours Collectifs", desc: "Yoga, CrossFit, Zumba, Pilates, Boxe — plus de 30 cours par semaine animés par des coachs certifiés.", badge: "30+ cours/sem" },
    { icon: "fas fa-utensils", title: "Nutrition Sur-Mesure", desc: "Plans alimentaires personnalisés selon votre objectif, suivis par nos nutritionnistes certifiés.", badge: "Plans perso" },
    { icon: "fas fa-spa", title: "Espace Bien-Être", desc: "Sauna, hammam et espace récupération pour vous régénérer et optimiser vos performances.", badge: "Premium" },
    { icon: "fas fa-mobile-alt", title: "App Mobile", desc: "Suivez vos séances, vos progrès et réservez vos cours directement depuis votre smartphone.", badge: "Gratuit" },
    { icon: "fas fa-clock", title: "Ouvert 7j/7", desc: "De 6h à 23h tous les jours, nous vous accueillons selon votre emploi du temps, sans exception.", badge: "6h - 23h" },
  ];

  const programs = [
    { icon: "fas fa-fire", title: "Prise de Masse", color: "#e11d48", desc: "Programme intensif pour développer la masse musculaire avec suivi coach hebdomadaire.", duration: "12 semaines", level: "Intermédiaire" },
    { icon: "fas fa-weight", title: "Perte de Poids", color: "#f97316", desc: "Combinaison cardio et musculation pour brûler les graisses efficacement et durablement.", duration: "8 semaines", level: "Tous niveaux" },
    { icon: "fas fa-bolt", title: "CrossFit & HIIT", color: "#8b5cf6", desc: "Entraînements fonctionnels à haute intensité pour améliorer l'endurance et la force.", duration: "6 semaines", level: "Avancé" },
    { icon: "fas fa-heart", title: "Remise en Forme", color: "#10b981", desc: "Programme doux et progressif pour retrouver la forme, idéal pour les débutants.", duration: "10 semaines", level: "Débutant" },
  ];

  return (
    <>
      <IndexNavbar />
      <main style={{ backgroundColor: "#0a0a0a" }}>

        {/* ===== HERO SLIDER ===== */}
        <HeroSlider />

        {/* ===== MARQUEE BANNER ===== */}
        <div className="py-4 overflow-hidden" style={{ backgroundColor: "#e11d48" }}>
          <div className="flex gap-12 animate-pulse" style={{ whiteSpace: "nowrap" }}>
            {["MUSCULATION", "CARDIO", "YOGA", "CROSSFIT", "NUTRITION", "PILATES", "ZUMBA", "BOXING", "HIIT", "RECOVERY"].map((item, i) => (
              <span key={i} className="inline-flex items-center gap-3 text-sm font-bold"
                style={{ color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.15em" }}>
                <i className="fas fa-star text-xs" style={{ opacity: 0.6 }}></i>
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* ===== STATS BAR ===== */}
        <div className="py-10 px-4" style={{ backgroundColor: "#111111", borderBottom: "1px solid #2a2a2a" }}>
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center gap-12">
              {[
                { num: `${counter.membres}+`, label: "Membres actifs", icon: "fas fa-users" },
                { num: `${counter.coachs}+`, label: "Coachs certifiés", icon: "fas fa-user-tie" },
                { num: `${counter.cours}+`, label: "Cours / semaine", icon: "fas fa-calendar-check" },
                { num: `${counter.ans}+`, label: "Ans d'expérience", icon: "fas fa-award" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(225,29,72,0.1)", border: "1px solid rgba(225,29,72,0.2)" }}>
                    <i className={`${stat.icon} text-lg`} style={{ color: "#e11d48" }}></i>
                  </div>
                  <div>
                    <div className="text-3xl font-black" style={{ color: "#e11d48", fontFamily: "Oswald, sans-serif" }}>{stat.num}</div>
                    <div className="text-xs uppercase" style={{ color: "#6b7280", fontFamily: "Rajdhani, sans-serif", letterSpacing: "0.1em" }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ===== FEATURES SECTION ===== */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs uppercase tracking-widest" style={{ color: "#e11d48", fontFamily: "Rajdhani, sans-serif" }}>Pourquoi nous choisir</span>
              <h2 className="text-4xl font-bold mt-2" style={{ color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
                TOUT CE DONT VOUS AVEZ BESOIN
              </h2>
              <p className="mt-3 text-sm" style={{ color: "#9ca3af", fontFamily: "Rajdhani, sans-serif" }}>
                Une expérience fitness complète sous un même toit
              </p>
            </div>
            <div className="flex flex-wrap -mx-4">
              {features.map((f, i) => (
                <div key={i} className="w-full lg:w-4/12 md:w-6/12 px-4 mb-8">
                  <div className="p-6 h-full rounded-xl transition-all hover:border-red-900"
                    style={{ backgroundColor: "#111111", border: "1px solid #2a2a2a" }}>
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: "rgba(225,29,72,0.1)", border: "1px solid rgba(225,29,72,0.2)" }}>
                      <i className={`${f.icon} text-2xl`} style={{ color: "#e11d48" }}></i>
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.03em" }}>
                      {f.title}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "#9ca3af", fontFamily: "Rajdhani, sans-serif", lineHeight: "1.7" }}>
                      {f.desc}
                    </p>
                    <span className="text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: "rgba(225,29,72,0.1)", color: "#e11d48", border: "1px solid rgba(225,29,72,0.2)", fontFamily: "Rajdhani, sans-serif" }}>
                      {f.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== PROGRAMS SECTION ===== */}
        <section className="py-20 px-4" style={{ backgroundColor: "#111111" }}>
          <div className="container mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs uppercase tracking-widest" style={{ color: "#e11d48", fontFamily: "Rajdhani, sans-serif" }}>Programmes</span>
              <h2 className="text-4xl font-bold mt-2" style={{ color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
                NOS PROGRAMMES D'ENTRAÎNEMENT
              </h2>
              <p className="mt-3 text-sm" style={{ color: "#9ca3af", fontFamily: "Rajdhani, sans-serif" }}>
                Des plans structurés pour chaque objectif et niveau
              </p>
            </div>
            <div className="flex flex-wrap -mx-4">
              {programs.map((prog, i) => (
                <div key={i} className="w-full lg:w-3/12 md:w-6/12 px-4 mb-8">
                  <div className="p-6 h-full rounded-xl transition-all hover:scale-105"
                    style={{ backgroundColor: "#1a1a1a", border: `1px solid ${prog.color}33` }}>
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${prog.color}22`, border: `1px solid ${prog.color}44` }}>
                      <i className={`${prog.icon} text-2xl`} style={{ color: prog.color }}></i>
                    </div>
                    <h3 className="text-xl font-bold mb-3" style={{ color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.03em" }}>
                      {prog.title}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: "#9ca3af", fontFamily: "Rajdhani, sans-serif", lineHeight: "1.7" }}>
                      {prog.desc}
                    </p>
                    <div className="flex gap-3 mb-4 flex-wrap">
                      <span className="text-xs px-2 py-1 rounded"
                        style={{ background: `${prog.color}11`, color: prog.color, border: `1px solid ${prog.color}33`, fontFamily: "Rajdhani, sans-serif" }}>
                        <i className="fas fa-calendar mr-1"></i>{prog.duration}
                      </span>
                      <span className="text-xs px-2 py-1 rounded"
                        style={{ background: "rgba(255,255,255,0.05)", color: "#9ca3af", border: "1px solid #2a2a2a", fontFamily: "Rajdhani, sans-serif" }}>
                        <i className="fas fa-signal mr-1"></i>{prog.level}
                      </span>
                    </div>
                    <Link to="/auth/register"
                      className="text-xs font-bold transition-colors hover:text-red-300"
                      style={{ color: prog.color, fontFamily: "Oswald, sans-serif", letterSpacing: "0.08em" }}>
                      COMMENCER CE PROGRAMME →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TESTIMONIALS SECTION ===== */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-14">
              <span className="text-xs uppercase tracking-widest" style={{ color: "#e11d48", fontFamily: "Rajdhani, sans-serif" }}>Témoignages</span>
              <h2 className="text-4xl font-bold mt-2" style={{ color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
                ILS NOUS FONT CONFIANCE
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <div className="rounded-2xl p-8 text-center mb-6"
                style={{ backgroundColor: "#111111", border: "1px solid #2a2a2a" }}>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <i key={i} className="fas fa-star" style={{ color: "#f59e0b", fontSize: "1rem" }}></i>
                  ))}
                </div>
                <p className="text-base mb-6" style={{ color: "#d1d5db", fontFamily: "Rajdhani, sans-serif", lineHeight: "1.8", fontStyle: "italic" }}>
                  "{testimonials[activeTestimonial].text}"
                </p>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: "linear-gradient(135deg, #e11d48, #9f1239)" }}>
                    <i className="fas fa-user text-white"></i>
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-sm" style={{ color: "white", fontFamily: "Oswald, sans-serif" }}>
                      {testimonials[activeTestimonial].name}
                    </div>
                    <div className="text-xs" style={{ color: "#e11d48", fontFamily: "Rajdhani, sans-serif" }}>
                      {testimonials[activeTestimonial].role}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActiveTestimonial(i)}
                    style={{
                      background: i === activeTestimonial ? "#e11d48" : "#2a2a2a",
                      border: "none", cursor: "pointer",
                      height: "8px",
                      width: i === activeTestimonial ? "24px" : "8px",
                      borderRadius: "4px",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===== HORAIRES SECTION ===== */}
        <section className="py-20 px-4" style={{ backgroundColor: "#111111" }}>
          <div className="container mx-auto">
            <div className="flex flex-wrap -mx-4 items-center">
              <div className="w-full lg:w-5/12 px-4 mb-10 lg:mb-0">
                <span className="text-xs uppercase tracking-widest" style={{ color: "#e11d48", fontFamily: "Rajdhani, sans-serif" }}>Horaires</span>
                <h2 className="text-4xl font-bold mt-2 mb-6" style={{ color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
                  TOUJOURS LÀ POUR VOUS
                </h2>
                <p className="text-sm mb-8" style={{ color: "#9ca3af", fontFamily: "Rajdhani, sans-serif", lineHeight: "1.8" }}>
                  Parce que votre emploi du temps ne doit jamais être un obstacle, GymAccess est ouvert 7 jours sur 7, de tôt le matin jusqu'au soir.
                </p>
                <Link to="/auth/register"
                  className="px-8 py-4 rounded-lg text-sm font-bold inline-flex items-center gap-2 transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #e11d48, #9f1239)", color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.1em" }}>
                  <i className="fas fa-calendar-plus"></i>
                  RÉSERVER MA VISITE
                </Link>
              </div>
              <div className="w-full lg:w-7/12 px-4">
                <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #2a2a2a" }}>
                  {[
                    { day: "Lundi — Vendredi", hours: "06:00 — 23:00" },
                    { day: "Samedi", hours: "07:00 — 22:00" },
                    { day: "Dimanche", hours: "08:00 — 20:00" },
                    { day: "Jours fériés", hours: "09:00 — 18:00" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between px-6 py-4"
                      style={{ borderBottom: i < 3 ? "1px solid #2a2a2a" : "none", backgroundColor: i % 2 === 0 ? "#1a1a1a" : "#111111" }}>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full" style={{ background: "#22c55e" }}></div>
                        <span className="font-bold text-sm" style={{ color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>{item.day}</span>
                      </div>
                      <span className="text-sm font-bold" style={{ color: "#e11d48", fontFamily: "Rajdhani, sans-serif" }}>{item.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-4 rounded-xl flex items-center gap-3"
                  style={{ background: "rgba(225,29,72,0.05)", border: "1px solid rgba(225,29,72,0.2)" }}>
                  <i className="fas fa-map-marker-alt" style={{ color: "#e11d48" }}></i>
                  <span className="text-sm" style={{ color: "#9ca3af", fontFamily: "Rajdhani, sans-serif" }}>
                    Avenue Habib Bourguiba, Tunis — Parking gratuit disponible
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="py-24 px-4" style={{ background: "linear-gradient(135deg, #1a0510 0%, #0a0a0a 50%, #1a0510 100%)" }}>
          <div className="container mx-auto text-center">
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
                style={{ background: "linear-gradient(135deg, #e11d48, #9f1239)", boxShadow: "0 0 60px rgba(225,29,72,0.5)" }}>
                <i className="fas fa-dumbbell text-white text-3xl"></i>
              </div>
              <h2 className="text-5xl font-black mb-4" style={{ color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.05em" }}>
                PRÊT(E) À COMMENCER?
              </h2>
              <p className="text-lg mb-8" style={{ color: "#9ca3af", fontFamily: "Rajdhani, sans-serif" }}>
                Rejoignez plus de 1247 membres qui ont déjà transformé leur vie avec GymAccess.
                Premier mois à <span style={{ color: "#e11d48", fontWeight: 700 }}>moitié prix.</span>
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Link to="/auth/register"
                  className="px-10 py-4 rounded-lg text-base font-bold inline-flex items-center gap-2 transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #e11d48, #9f1239)", color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.1em", boxShadow: "0 0 30px rgba(225,29,72,0.4)" }}>
                  <i className="fas fa-fire"></i>
                  REJOINDRE MAINTENANT
                </Link>
                <a href="tel:+21671000000"
                  className="px-10 py-4 rounded-lg text-base font-bold inline-flex items-center gap-2 transition-all hover:border-red-500"
                  style={{ border: "1px solid #2a2a2a", color: "white", fontFamily: "Oswald, sans-serif", letterSpacing: "0.1em" }}>
                  <i className="fas fa-phone"></i>
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