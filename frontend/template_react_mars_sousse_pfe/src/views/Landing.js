import React from "react";
import { Link } from "react-router-dom";

// ── STYLES ──────────────────────────────────────────────
const styles = {
  // globals
  body: {
    fontFamily: "'Barlow', sans-serif",
    background: "#0A0A0A",
    color: "#F5F5F5",
    overflowX: "hidden",
    margin: 0,
  },
  // NAV
  nav: {
    position: "fixed", top: 0, left: 0, width: "100%", zIndex: 100,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 5%", height: "72px",
    background: "rgba(10,10,10,0.92)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(214,40,40,0.2)",
    boxSizing: "border-box",
  },
  logo: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "1.7rem", letterSpacing: "3px", color: "#F5F5F5",
    textDecoration: "none",
  },
  logoSpan: { color: "#D62828" },
  navLinks: { display: "flex", gap: "2.5rem", listStyle: "none", margin: 0, padding: 0 },
  navLink: {
    textDecoration: "none", color: "#888", fontWeight: 600,
    fontSize: "0.78rem", letterSpacing: "2px", textTransform: "uppercase",
    transition: "color 0.3s ease",
  },
  navBtn: {
    background: "#D62828", color: "#F5F5F5", padding: "0.55rem 1.4rem",
    borderRadius: "2px", letterSpacing: "2px", fontWeight: 700,
    fontSize: "0.78rem", textTransform: "uppercase", textDecoration: "none",
    transition: "all 0.3s ease", boxShadow: "0 4px 15px rgba(214,40,40,0.3)",
    cursor: "pointer",
  },
  // HERO
  hero: {
    position: "relative", minHeight: "100vh",
    display: "flex", alignItems: "center", overflow: "hidden",
  },
  heroBg: {
    position: "absolute", inset: 0,
    background: "linear-gradient(105deg, rgba(10,10,10,0.88) 40%, rgba(214,40,40,0.08) 100%)",
    backgroundImage: [
      "linear-gradient(105deg, rgba(10,10,10,0.88) 40%, rgba(214,40,40,0.08) 100%)",
      "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80')",
    ].join(", "),
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  heroContent: {
    position: "relative", padding: "0 8%", maxWidth: "800px",
    animation: "fadeUp 1s ease both",
  },
  heroTag: {
    display: "inline-block", fontSize: "0.7rem", letterSpacing: "4px",
    textTransform: "uppercase", color: "#D62828",
    border: "1px solid #D62828", padding: "0.3rem 0.9rem", marginBottom: "1.5rem",
  },
  heroTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(3.5rem, 8vw, 7rem)",
    lineHeight: 0.95, letterSpacing: "2px", marginBottom: "1.5rem",
  },
  heroAccent: { color: "#D62828" },
  heroDesc: {
    color: "#bbb", fontSize: "1.05rem", lineHeight: 1.7,
    maxWidth: "500px", marginBottom: "2.5rem", fontWeight: 300,
  },
  heroBtns: { display: "flex", gap: "1rem", flexWrap: "wrap" },
  btnPrimary: {
    background: "#D62828", color: "#F5F5F5", padding: "0.85rem 2rem",
    fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: "0.8rem",
    letterSpacing: "3px", textTransform: "uppercase",
    border: "none", cursor: "pointer", borderRadius: "2px",
    textDecoration: "none", display: "inline-block",
    transition: "all 0.3s ease", boxShadow: "0 6px 20px rgba(214,40,40,0.4)",
  },
  btnOutline: {
    background: "transparent", color: "#F5F5F5", padding: "0.85rem 2rem",
    fontFamily: "'Barlow', sans-serif", fontWeight: 700, fontSize: "0.8rem",
    letterSpacing: "3px", textTransform: "uppercase",
    border: "1px solid rgba(255,255,255,0.4)",
    cursor: "pointer", borderRadius: "2px",
    textDecoration: "none", display: "inline-block",
    transition: "all 0.3s ease",
  },
  // STATS
  statsBar: {
    background: "#111111",
    borderTop: "1px solid rgba(214,40,40,0.3)",
    borderBottom: "1px solid rgba(214,40,40,0.3)",
    display: "flex", justifyContent: "space-around", flexWrap: "wrap",
    padding: "2rem 5%", gap: "1rem",
  },
  stat: { textAlign: "center" },
  statNum: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "2.6rem", color: "#D62828", letterSpacing: "2px",
  },
  statLabel: { fontSize: "0.72rem", letterSpacing: "3px", textTransform: "uppercase", color: "#888" },
  // SECTION
  section: { padding: "6rem 8%" },
  sectionDark: { padding: "6rem 8%", background: "#1A1A1A" },
  sectionTag: { fontSize: "0.7rem", letterSpacing: "4px", textTransform: "uppercase", color: "#D62828", marginBottom: "0.7rem" },
  sectionTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(2.2rem, 5vw, 3.8rem)", letterSpacing: "2px",
    marginBottom: "3rem", lineHeight: 1.05,
  },
  // COURSES
  coursGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" },
  coursCard: {
    background: "#111111", border: "1px solid #222",
    padding: "2rem", borderRadius: "3px",
    transition: "border-color .3s, transform .3s",
    cursor: "default",
  },
  coursCardHover: { borderColor: "#D62828", transform: "translateY(-4px)" },
  coursIcon: { fontSize: "2rem", marginBottom: "1rem" },
  coursName: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", letterSpacing: "2px", marginBottom: "0.5rem" },
  coursDesc: { color: "#888", fontSize: "0.9rem", lineHeight: 1.6 },
  // PROGRAMS
  programsContainer: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center", marginBottom: "4rem" },
  programsInfo: { display: "flex", flexDirection: "column", gap: "1.5rem" },
  programsDesc: { color: "#bbb", fontSize: "1rem", lineHeight: 1.7, maxWidth: "500px" },
  programsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" },
  programCard: {
    background: "#111111", border: "1px solid #222",
    padding: "2rem", borderRadius: "3px",
    overflow: "hidden", transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    cursor: "pointer", position: "relative",
    boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
  },
  programCardImage: {
    width: "100%", height: "300px",
    backgroundSize: "cover", backgroundPosition: "center",
    marginBottom: "1.5rem", borderRadius: "2px",
    transition: "transform 0.4s ease, filter 0.4s ease",
    filter: "brightness(0.9)",
  },
  programNumber: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "2.5rem", color: "#D62828", letterSpacing: "2px", marginBottom: "0.5rem",
  },
  programLabel: { fontSize: "0.65rem", letterSpacing: "3px", textTransform: "uppercase", color: "#888", marginBottom: "0.5rem" },
  programName: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.6rem", letterSpacing: "2px", marginBottom: "1rem" },
  programCardDesc: { color: "#888", fontSize: "0.85rem", lineHeight: 1.6 },
  // PLANS
  plansGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem", alignItems: "start" },
  plan: { 
    background: "#111111", border: "1px solid #222", borderRadius: "3px", padding: "2.5rem 2rem", textAlign: "center",
    transition: "all 0.3s ease", boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  },
  planFeatured: {
    background: "linear-gradient(135deg, #1a0000 0%, #111111 100%)",
    border: "2px solid #D62828",
    borderRadius: "3px", padding: "2.5rem 2rem", textAlign: "center",
    boxShadow: "0 0 50px rgba(214,40,40,0.4), inset 0 0 30px rgba(214,40,40,0.1)",
    transition: "all 0.3s ease",
  },
  planBadge: {
    display: "inline-block", background: "#D62828",
    fontSize: "0.65rem", letterSpacing: "3px", textTransform: "uppercase",
    padding: "0.25rem 0.8rem", marginBottom: "1.5rem", borderRadius: "2px",
  },
  planName: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.8rem", letterSpacing: "2px", marginBottom: "1.5rem" },
  planPrice: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", color: "#F5F5F5", lineHeight: 1, marginBottom: "1.5rem" },
  planPriceAmount: { color: "#D62828", fontSize: "2.8rem" },
  planPriceUnit: { color: "#888", fontSize: "0.9rem", fontFamily: "'Barlow', sans-serif", fontWeight: 300 },
  planFeatures: { listStyle: "none", margin: "2rem 0", textAlign: "left", padding: 0 },
  planFeatureItem: {
    padding: "0.6rem 0", color: "#ccc", fontSize: "0.9rem",
    borderBottom: "1px solid #1e1e1e", display: "flex", alignItems: "center", gap: "0.6rem",
  },
  featureArrow: { color: "#D62828", flexShrink: 0 },
  // CONTACT
  contactGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" },
  contactInfoP: { color: "#888", lineHeight: 1.8, marginBottom: "2rem" },
  contactItem: { display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.2rem" },
  contactIcon: {
    width: "40px", height: "40px",
    background: "rgba(214,40,40,0.12)",
    border: "1px solid rgba(214,40,40,0.3)",
    display: "flex", alignItems: "center", justifyContent: "center",
    flexShrink: 0, fontSize: "1rem",
  },
  contactText: { color: "#ccc", fontSize: "0.9rem" },
  contactForm: { display: "flex", flexDirection: "column", gap: "1rem" },
  formInput: {
    background: "#111111", border: "1px solid #2a2a2a",
    color: "#F5F5F5", padding: "0.9rem 1.2rem",
    fontFamily: "'Barlow', sans-serif", fontSize: "0.9rem",
    borderRadius: "2px", outline: "none",
  },
  // MODAL
  modalOverlay: {
    position: "fixed", inset: 0, zIndex: 999,
    background: "rgba(0,0,0,0.85)",
    backdropFilter: "blur(6px)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  modalBox: {
    background: "#111111",
    border: "1px solid rgba(214,40,40,0.4)",
    borderRadius: "4px",
    padding: "3rem 2.5rem",
    width: "100%", maxWidth: "420px",
    position: "relative",
    boxShadow: "0 0 60px rgba(214,40,40,0.2)",
    animation: "fadeUp 0.35s ease both",
  },
  modalClose: {
    position: "absolute", top: "1rem", right: "1.2rem",
    background: "none", border: "none", color: "#888",
    fontSize: "1.4rem", cursor: "pointer", lineHeight: 1,
  },
  modalTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "2rem", letterSpacing: "3px",
    marginBottom: "0.3rem",
  },
  modalSub: { color: "#888", fontSize: "0.85rem", marginBottom: "2rem" },
  modalLabel: {
    display: "block", fontSize: "0.7rem", letterSpacing: "2px",
    textTransform: "uppercase", color: "#888", marginBottom: "0.4rem",
  },
  modalInput: {
    width: "100%", background: "#0A0A0A",
    border: "1px solid #2a2a2a", color: "#F5F5F5",
    padding: "0.85rem 1rem", fontFamily: "'Barlow', sans-serif",
    fontSize: "0.95rem", borderRadius: "2px", outline: "none",
    marginBottom: "1.2rem", boxSizing: "border-box",
  },
  modalInputFocus: { borderColor: "#D62828" },
  modalForgot: {
    display: "block", textAlign: "right", color: "#888",
    fontSize: "0.78rem", textDecoration: "none", marginTop: "-0.8rem",
    marginBottom: "1.5rem", cursor: "pointer",
  },
  modalDivider: {
    textAlign: "center", color: "#444", fontSize: "0.8rem",
    margin: "1.5rem 0", position: "relative",
  },
  modalError: {
    background: "rgba(214,40,40,0.1)", border: "1px solid rgba(214,40,40,0.4)",
    color: "#ff6b6b", padding: "0.7rem 1rem", borderRadius: "2px",
    fontSize: "0.85rem", marginBottom: "1rem",
  },
  modalSuccess: {
    background: "rgba(40,214,100,0.1)", border: "1px solid rgba(40,214,100,0.4)",
    color: "#6bffaa", padding: "0.7rem 1rem", borderRadius: "2px",
    fontSize: "0.85rem", marginBottom: "1rem", textAlign: "center",
  },
  // FOOTER
  footer: {
    background: "#0A0A0A",
    borderTop: "1px solid rgba(214,40,40,0.2)",
    padding: "2rem 8%",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    flexWrap: "wrap", gap: "1rem",
  },
  footerLogo: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.4rem", letterSpacing: "3px" },
};

const sliderBtn = {
  position: "absolute", top: "50%", transform: "translateY(-50%)",
  zIndex: 3, background: "rgba(0,0,0,0.5)", color: "#fff",
  border: "1px solid rgba(255,255,255,0.2)", borderRadius: "2px",
  width: "48px", height: "48px", fontSize: "1.3rem",
  cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
  transition: "background .2s, border-color .2s",
};

const dotsContainer = {
  position: "absolute", bottom: "2rem", left: "50%",
  transform: "translateX(-50%)", zIndex: 3,
  display: "flex", gap: "0.5rem", alignItems: "center",
};

const dot = {
  height: "8px", borderRadius: "4px",
  border: "none", cursor: "pointer", padding: 0,
  transition: "all 0.3s ease",
};

// ── PROGRAMS DATA ────────────────────────────────────────
const programs = [
  {
    number: "01",
    label: "Programme",
    name: "Force",
    desc: "Powerlifting, haltérophilie olympique, hypertrophie. Développez une force durable.",
    image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80",
  },
  {
    number: "02",
    label: "Programme",
    name: "Condition Physique",
    desc: "HIIT, protocoles d'athlète hybride, développement du cardio. Surpassez tout le monde.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
  },
  {
    number: "03",
    label: "Programme",
    name: "Combat",
    desc: "Boxe, Muay Thaï et BJJ. Fondamentaux à travers la préparation au combat avec des compétiteurs actifs.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
  },
];

// ── COURSES DATA ─────────────────────────────────────────
const courses = [
  { icon: "🥊", name: "Boxe & Combat", desc: "Cours collectifs de boxe anglaise, MMA et self-défense avec des instructeurs professionnels." },
  { icon: "🏋️", name: "Musculation", desc: "Programmes personnalisés de renforcement musculaire pour tous niveaux, du débutant au confirmé." },
  { icon: "🔥", name: "CrossFit", desc: "Entraînements HIIT intenses qui combinent force, endurance et agilité en sessions de 45 min." },
  { icon: "🧘", name: "Yoga & Étirement", desc: "Sessions de récupération active et de mobilité pour équilibrer vos entraînements intensifs." },
  { icon: "🚴", name: "Spinning", desc: "Vélos stationnaires avec coaching audio et musique pour brûler jusqu'à 600 cal par séance." },
  { icon: "⚡", name: "Cardio Training", desc: "Programmes cardio variés sur tapis, elliptiques et rameurs avec suivi de performance." },
];

// ── MEMBERSHIP DATA ──────────────────────────────────────
const memberships = [
  {
    name: "Accès Journalier", price: "29", unit: "/ jour", featured: false,
    features: ["Accès à une seule séance", "Tous les horaires d'ouverture", "Casier & serviette"],
  },
  {
    name: "Accès Total", price: "149", unit: "/ mois", featured: true,
    features: ["Accès illimité 24h/24", "Tous les cours collectifs", "Salle libre & sparring", "Salle de récupération"],
  },
  {
    name: "Coaching Premium", price: "299", unit: "/ mois", featured: false,
    features: ["Tous les avantages Accès Total", "1 séance hebdomadaire avec un coach", "Programme personnalisé", "Suivi nutritionnel"],
  },
];

// ── SLIDES DATA ──────────────────────────────────────────
const slides = [
  {
    url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80",
    tag: "Équipements Modernes",
    title: "TRANSFORMEZ VOTRE CORPS, DÉPASSEZ VOS LIMITES !",
    accent: "CORPS,",
    desc: "Rejoignez GymAccess et profitez d'équipements modernes, de coachs certifiés et d'un accès 24h/24.",
  },
  {
    url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80",
    tag: "Coachs Certifiés",
    title: "ATTEIGNEZ VOS OBJECTIFS AVEC NOS EXPERTS !",
    accent: "OBJECTIFS",
    desc: "Nos coachs certifiés créent des programmes personnalisés adaptés à votre niveau et vos ambitions.",
  },
  {
    url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&q=80",
    tag: "Accès 24h/24",
    title: "ENTRAÎNEZ-VOUS QUAND VOUS VOULEZ !",
    accent: "QUAND",
    desc: "Accès illimité 24h/24 et 7j/7. Votre salle de sport toujours disponible, à votre rythme.",
  },
];

// ── COMPONENT ────────────────────────────────────────────
export default function Index() {
  const [hoveredCard,    setHoveredCard]    = React.useState(null);
  const [currentSlide,   setCurrentSlide]   = React.useState(0);
  const [transitioning,  setTransitioning]  = React.useState(false);

  // Auto-play 5s
  React.useEffect(() => {
    const t = setInterval(() => changeSlide((currentSlide + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [currentSlide]);

  const changeSlide = (idx) => {
    if (transitioning) return;
    setTransitioning(true);
    setCurrentSlide(idx);
    setTimeout(() => setTransitioning(false), 700);
  };

  const prevSlide = () => changeSlide((currentSlide - 1 + slides.length) % slides.length);
  const nextSlide = () => changeSlide((currentSlide + 1) % slides.length);

  const sl = slides[currentSlide];

  // Build title with accent word in red
  const renderTitle = (title, accent) => {
    const parts = title.split(accent);
    return (
      <>
        {parts[0]}
        <span style={styles.heroAccent}>{accent}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <div style={styles.body}>

      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap"
        rel="stylesheet"
      />

      {/* CSS keyframes */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(214,40,40,0.3); }
          50% { box-shadow: 0 0 40px rgba(214,40,40,0.6); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb { background: #D62828; border-radius: 10px; transition: background 0.3s; }
        ::-webkit-scrollbar-thumb:hover { background: #ff5555; }
      `}</style>

      {/* ── NAV ── */}
      <nav style={styles.nav}>
        <div style={styles.logo}>GYM<span style={styles.logoSpan}>ACCESS</span></div>
        <ul style={styles.navLinks}>
          <li><a href="#hero" style={styles.navLink} onMouseEnter={e => e.target.style.color = '#D62828'} onMouseLeave={e => e.target.style.color = '#888'}>Accueil</a></li>
          <li><a href="#cours" style={styles.navLink} onMouseEnter={e => e.target.style.color = '#D62828'} onMouseLeave={e => e.target.style.color = '#888'}>Cours</a></li>
          <li><a href="#abonnements" style={styles.navLink} onMouseEnter={e => e.target.style.color = '#D62828'} onMouseLeave={e => e.target.style.color = '#888'}>Abonnements</a></li>
          <li><a href="#contact" style={styles.navLink} onMouseEnter={e => e.target.style.color = '#D62828'} onMouseLeave={e => e.target.style.color = '#888'}>Contact</a></li>
          <li>
            <Link to="/auth/login" style={styles.navBtn} onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 8px 25px rgba(214,40,40,0.5)'; }} onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 4px 15px rgba(214,40,40,0.3)'; }}>Espace Membre</Link>
          </li>
        </ul>
      </nav>

      {/* ── HERO SLIDER ── */}
      <section id="hero" style={styles.hero}>

        {/* Background images */}
        {slides.map((s, i) => (
          <div key={i} style={{
            position: "absolute", inset: 0,
            backgroundImage: [
              "linear-gradient(105deg, rgba(10,10,10,0.88) 40%, rgba(214,40,40,0.06) 100%)",
              `url('${s.url}')`,
            ].join(", "),
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: i === currentSlide ? 1 : 0,
            transition: "opacity 0.7s ease",
            zIndex: 0,
          }} />
        ))}

        {/* Content */}
        <div style={{ ...styles.heroContent, zIndex: 2, opacity: transitioning ? 0 : 1, transition: "opacity 0.4s ease" }}>
          <div style={styles.heroTag}>{sl.tag}</div>
          <h1 style={styles.heroTitle}>{renderTitle(sl.title, sl.accent)}</h1>
          <p style={styles.heroDesc}>{sl.desc}</p>
          <div style={styles.heroBtns}>
            <a href="#abonnements" style={styles.btnPrimary}>Rejoignez-Nous</a>
            <a href="#abonnements" style={styles.btnOutline}>Voir Nos Offres</a>
          </div>
        </div>

        {/* Arrow Left */}
        <button onClick={prevSlide} style={{...sliderBtn, left: "2%"}}>&#8592;</button>

        {/* Arrow Right */}
        <button onClick={nextSlide} style={{...sliderBtn, right: "2%"}}>&#8594;</button>

        {/* Dots */}
        <div style={dotsContainer}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => changeSlide(i)}
              style={{
                ...dot,
                background: i === currentSlide ? "#D62828" : "rgba(255,255,255,0.3)",
                width:  i === currentSlide ? "28px" : "8px",
              }}
            />
          ))}
        </div>

      </section>

      {/* ── STATS BAR ── */}
      <div style={styles.statsBar}>
        {[
          { num: "1200+", label: "Membres Actifs" },
          { num: "24/7",  label: "Accès Libre" },
          { num: "30+",   label: "Cours par Semaine" },
          { num: "15+",   label: "Coachs Certifiés" },
        ].map((s) => (
          <div key={s.label} style={styles.stat}>
            <div style={styles.statNum}>{s.num}</div>
            <div style={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* ── THE WORK ── */}
      <section id="cours" style={styles.sectionDark}>
        <div style={styles.sectionTag}>Nos Programmes</div>
        <div style={styles.sectionTitle}>Trois façons de vous surpasser.</div>
        <div style={styles.programsContainer}>
          <div style={styles.programsInfo}>
            <p style={styles.programsDesc}>
              Chaque programme est dirigé par un coach, périodisé et adapté à votre corps - et non l'inverse.
            </p>
          </div>
        </div>
        <div style={styles.programsGrid}>
          {programs.map((p) => (
            <div
              key={p.number}
              style={{
                ...styles.programCard,
                ...(hoveredCard === p.number ? { borderColor: "#D62828", transform: "translateY(-8px)", boxShadow: "0 15px 40px rgba(214,40,40,0.3)" } : {}),
              }}
              onMouseEnter={() => setHoveredCard(p.number)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{ ...styles.programCardImage, backgroundImage: `url('${p.image}')`, ...(hoveredCard === p.number ? { transform: "scale(1.05)", filter: "brightness(1.1)" } : {}) }} />
              <div style={styles.programNumber}>{p.number}</div>
              <div style={styles.programLabel}>{p.label}</div>
              <div style={styles.programName}>{p.name}</div>
              <p style={styles.programCardDesc}>{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── MEMBERSHIP ── */}
      <section id="abonnements" style={styles.section}>
        <div style={styles.sectionTag}>Abonnements</div>
        <div style={styles.sectionTitle}>Choisissez votre combat.</div>
        <div style={styles.plansGrid}>
          {memberships.map((m) => (
            <div key={m.name} style={m.featured ? styles.planFeatured : styles.plan}
              onMouseEnter={e => {
                if (m.featured) {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 0 60px rgba(214,40,40,0.5), inset 0 0 40px rgba(214,40,40,0.15)';
                } else {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.5)';
                }
              }}
              onMouseLeave={e => {
                if (m.featured) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 0 50px rgba(214,40,40,0.4), inset 0 0 30px rgba(214,40,40,0.1)';
                } else {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.3)';
                }
              }}
            >
              {m.featured && <div style={styles.planBadge}>Le Plus Populaire</div>}
              <div style={styles.planName}>{m.name}</div>
              <div style={styles.planPrice}>
                <span style={{ color: "#F5F5F5" }}>€</span>
                <span style={styles.planPriceAmount}>{m.price}</span>
                <div style={styles.planPriceUnit}>{m.unit}</div>
              </div>
              <ul style={styles.planFeatures}>
                {m.features.map((f) => (
                  <li key={f} style={styles.planFeatureItem}>
                    <span style={styles.featureArrow}>▸</span> {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                style={{
                  ...(m.featured ? styles.btnPrimary : styles.btnOutline),
                  width: "100%", textAlign: "center",
                }}
                onMouseEnter={e => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = m.featured ? '0 10px 30px rgba(214,40,40,0.6)' : '0 6px 20px rgba(255,255,255,0.2)';
                  if (!m.featured) e.target.style.borderColor = '#D62828';
                  if (!m.featured) e.target.style.color = '#D62828';
                }}
                onMouseLeave={e => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = m.featured ? '0 6px 20px rgba(214,40,40,0.4)' : 'none';
                  if (!m.featured) e.target.style.borderColor = 'rgba(255,255,255,0.4)';
                  if (!m.featured) e.target.style.color = '#F5F5F5';
                }}
              >
                COMMENCER MAINTENANT
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={styles.sectionDark}>
        <div style={styles.sectionTag}>Nous Trouver</div>
        <div style={styles.sectionTitle}>CONTACT</div>
        <div style={styles.contactGrid}>
          {/* Info */}
          <div>
            <p style={styles.contactInfoP}>
              Une question ? Prêt à commencer votre transformation ?
              Notre équipe est là pour vous accompagner.
            </p>
            {[
              { icon: "📍", text: "123 Avenue des Champs-Élysées, Paris 75008" },
              { icon: "📞", text: "+33 1 23 45 67 89" },
              { icon: "✉️", text: "contact@gymaccess.fr" },
              { icon: "⏰", text: "Lun – Dim : 24h/24" },
            ].map((item) => (
              <div key={item.text} style={styles.contactItem}>
                <div style={styles.contactIcon}>{item.icon}</div>
                <div style={styles.contactText}>{item.text}</div>
              </div>
            ))}
          </div>
          {/* Form */}
          <div style={styles.contactForm}>
            <input style={styles.formInput} type="text"  placeholder="Votre Nom" />
            <input style={styles.formInput} type="email" placeholder="Votre Email" />
            <input style={styles.formInput} type="text"  placeholder="Sujet" />
            <textarea
              style={{ ...styles.formInput, resize: "vertical", minHeight: "120px" }}
              placeholder="Votre message..."
            />
            <button style={styles.btnPrimary}>Envoyer le Message</button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={styles.footer}>
        <div style={styles.footerLogo}>
          GYM<span style={styles.logoSpan}>ACCESS</span>
        </div>
        <p style={{ color: "#888", fontSize: "0.8rem" }}>© 2026 GymAccess France — Tous droits réservés</p>
        <p style={{ color: "#444", fontSize: "0.75rem" }}>Transformez-vous. Dépassez-vous.</p>
      </footer>

    </div>
  );
}