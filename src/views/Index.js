import React from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&q=80",
    tag: "Équipements modernes",
    title: "TRANSFORMEZ VOTRE CORPS, DÉPASSEZ VOS LIMITES",
    accent: "DÉPASSEZ",
    desc: "Une salle premium, des coachs certifiés, une vraie intensité d'entraînement et un accompagnement complet.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&q=80",
    tag: "Coachs certifiés",
    title: "ATTEIGNEZ VOS OBJECTIFS AVEC DES EXPERTS",
    accent: "OBJECTIFS",
    desc: "Nos coachs structurent chaque progression : transformation physique, performance, cardio et remise en forme.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1600&q=80",
    tag: "Nutrition sportive",
    title: "BOOSTEZ VOS RÉSULTATS AVEC UN CATALOGUE ALIMENTAIRE",
    accent: "RÉSULTATS",
    desc: "Programmes nutritionnels, bar alimentaire, smoothies, bowls fitness et suivi hebdomadaire.",
  },
];

const facilityZones = [
  {
    title: "Zone musculation guidée",
    desc: "Machines premium pour cibler chaque groupe musculaire avec précision.",
  },
  {
    title: "Espace poids libres",
    desc: "Haltères, racks, bancs et stations pour la force et la prise de masse.",
  },
  {
    title: "Studio cardio & HIIT",
    desc: "Tapis, vélos, rameurs et circuits dynamiques pour l'endurance et la sèche.",
  },
  {
    title: "Récupération & mobilité",
    desc: "Zone dédiée aux étirements, au gainage et à la préparation physique.",
  },
];

const services = [
  {
    icon: "🏋️",
    title: "Plateau premium",
    desc: "Machines guidées, zone fonctionnelle, cardio dernière génération.",
  },
  {
    icon: "⏱️",
    title: "Accès élargi",
    desc: "Ouverture large, accueil fluide, vestiaires et espace propre.",
  },
  {
    icon: "👥",
    title: "Coaching humain",
    desc: "Suivi constant, bilan et ajustements selon vos résultats.",
  },
  {
    icon: "🥗",
    title: "Bar alimentaire",
    desc: "Snacks protéinés, bowls, smoothies et récupération sur place.",
  },
];

const coaches = [
  {
    name: "Maya",
    specialty: "Transformation & cardio boxing",
    desc: "Accompagnement intensif pour perte de poids, remise en forme et confiance physique.",
  },
  {
    name: "Nassim",
    specialty: "Musculation & performance athlétique",
    desc: "Programmes de force, prise de masse et structuration de cycles d'entraînement.",
  },
  {
    name: "Clara",
    specialty: "Mobilité & recomposition corporelle",
    desc: "Rééquilibrage global, posture, tonicité et progression durable.",
  },
];

const nutritionPrograms = [
  "Perte de poids structurée sur 8 semaines",
  "Prise de masse et renforcement musculaire",
  "Remise en forme progressive après arrêt",
  "Nutrition sportive avec suivi hebdomadaire",
];

const nutritionCatalog = [
  {
    title: "Menu sèche",
    badge: "Faible sucre",
    desc: "Repas contrôlés, snacks protéinés et organisation simple sur 7 jours.",
  },
  {
    title: "Menu prise de masse",
    badge: "Haute énergie",
    desc: "Répartition calorique optimisée avec collations avant et après séance.",
  },
  {
    title: "Bar smoothies",
    badge: "Disponible 7j/7",
    desc: "Smoothies protéinés, boosters récupération et recettes fraîches préparées sur place.",
  },
  {
    title: "Catalogue nutrition sport",
    badge: "Commande rapide",
    desc: "Bowls, wraps fitness, boissons fonctionnelles et packs hebdomadaires à emporter.",
  },
];

const memberships = [
  {
    name: "Essential",
    price: "29€",
    unit: "/mois",
    badge: "Entrée de gamme",
    featured: false,
    features: ["Accès salle", "Cardio + musculation", "1 bilan de départ"],
  },
  {
    name: "Performance",
    price: "49€",
    unit: "/mois",
    badge: "Le plus complet",
    featured: true,
    features: ["Accès illimité", "2 coachings/mois", "Programme nutrition"],
  },
  {
    name: "Elite",
    price: "79€",
    unit: "/mois",
    badge: "Suivi premium",
    featured: false,
    features: [
      "Coaching hebdo",
      "Plan alimentaire complet",
      "Réductions bar alimentaire",
    ],
  },
];

const styles = {
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
  hero: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "flex-end",
    overflow: "hidden",
  },
  heroBg: (img) => ({
    position: "absolute",
    inset: 0,
    backgroundImage: `linear-gradient(105deg, rgba(10,10,10,0.94) 35%, rgba(214,40,40,0.18) 100%), url(${img})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }),
  heroGrid: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: "32px",
    padding: "120px 5% 64px",
  },
  heroTag: {
    display: "inline-block",
    border: "1px solid rgba(214,40,40,0.5)",
    color: "#D62828",
    padding: "7px 12px",
    textTransform: "uppercase",
    letterSpacing: "3px",
    fontSize: "0.7rem",
    marginBottom: "18px",
    background: "rgba(17,17,17,0.55)",
  },
  heroTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(3.8rem, 8vw, 7.2rem)",
    lineHeight: 0.92,
    letterSpacing: "2px",
    margin: "0 0 16px",
  },
  heroDesc: {
    color: "#C7C7C7",
    fontSize: "1.05rem",
    lineHeight: 1.75,
    maxWidth: "640px",
    marginBottom: "28px",
  },
  heroButtons: {
    display: "flex",
    gap: "14px",
    flexWrap: "wrap",
    marginBottom: "28px",
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
  btnSecondary: {
    background: "transparent",
    color: "#fff",
    textDecoration: "none",
    padding: "14px 22px",
    borderRadius: "2px",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontSize: "0.72rem",
    fontWeight: 700,
    border: "1px solid rgba(255,255,255,0.2)",
    cursor: "pointer",
  },
  sliderControls: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "8px",
  },
  arrowBtn: {
    width: "42px",
    height: "42px",
    background: "rgba(17,17,17,0.65)",
    color: "#fff",
    border: "1px solid rgba(255,255,255,0.16)",
    cursor: "pointer",
    fontSize: "1rem",
  },
  dots: {
    display: "flex",
    gap: "8px",
    marginLeft: "12px",
  },
  statsColumn: {
    display: "grid",
    gap: "14px",
  },
  statCard: {
    background: "rgba(17,17,17,0.88)",
    border: "1px solid rgba(214,40,40,0.16)",
    padding: "22px",
  },
  statValue: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "3rem",
    color: "#D62828",
    letterSpacing: "3px",
    margin: "8px 0 0",
  },
  statLabel: {
    color: "#9A9A9A",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontSize: "0.72rem",
  },
  band: {
    borderTop: "1px solid rgba(214,40,40,0.18)",
    borderBottom: "1px solid rgba(214,40,40,0.18)",
    background: "#111111",
    padding: "28px 5%",
  },
  bandGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    textAlign: "center",
  },
  section: {
    padding: "84px 5%",
  },
  sectionGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
    alignItems: "center",
  },
  sectionTag: {
    color: "#D62828",
    textTransform: "uppercase",
    letterSpacing: "3px",
    fontSize: "0.72rem",
    marginBottom: "12px",
  },
  title: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "clamp(2.4rem, 5vw, 4rem)",
    lineHeight: 1,
    letterSpacing: "2px",
    margin: "0 0 18px",
  },
  text: {
    color: "#B5B5B5",
    lineHeight: 1.75,
    fontSize: "1rem",
  },
  image: {
    width: "100%",
    minHeight: "440px",
    objectFit: "cover",
    border: "1px solid #232323",
    display: "block",
  },
  cards2: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "16px",
    marginTop: "22px",
  },
  card: {
    background: "#121212",
    border: "1px solid #232323",
    padding: "24px",
  },
  cardHover: {
    transform: "translateY(-4px)",
    border: "1px solid rgba(214,40,40,0.45)",
    boxShadow: "0 0 0 1px rgba(214,40,40,0.16)",
  },
  cardTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "1.55rem",
    letterSpacing: "1px",
    margin: "10px 0 8px",
  },
  cards4: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
    marginTop: "28px",
  },
  cards3: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "18px",
    marginTop: "28px",
  },
  badge: {
    display: "inline-block",
    color: "#D62828",
    fontSize: "0.72rem",
    textTransform: "uppercase",
    letterSpacing: "2px",
    marginBottom: "8px",
  },
  planCard: {
    background: "#121212",
    border: "1px solid #232323",
    padding: "28px 24px",
    display: "flex",
    flexDirection: "column",
  },
  featuredPlan: {
    background: "linear-gradient(135deg, #1b0505 0%, #111111 100%)",
    border: "1px solid #D62828",
    boxShadow: "0 0 40px rgba(214,40,40,0.2)",
  },
  planPrice: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "3rem",
    letterSpacing: "2px",
    margin: "8px 0 18px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 22px",
    display: "grid",
    gap: "10px",
    color: "#C4C4C4",
  },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "0.9fr 1.1fr",
    gap: "22px",
  },
  footer: {
    borderTop: "1px solid rgba(214,40,40,0.18)",
    padding: "28px 5%",
    color: "#8F8F8F",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "12px",
  },
};

function Dot({ active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: active ? 28 : 8,
        height: 8,
        borderRadius: 999,
        border: "none",
        background: active ? "#D62828" : "rgba(255,255,255,0.3)",
        cursor: "pointer",
      }}
    />
  );
}

function HoverCard({ children }) {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      style={{ ...styles.card, ...(hover ? styles.cardHover : {}) }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </div>
  );
}

export default function GymAccessLandingSimple() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(id);
  }, []);

  const slide = slides[currentSlide];

  const renderTitle = (title, accent) => {
    const parts = title.split(accent);
    if (parts.length < 2) return title;

    return (
      <>
        {parts[0]}
        <span style={{ color: "#D62828" }}>{accent}</span>
        {parts.slice(1).join(accent)}
      </>
    );
  };

  return (
    <div style={styles.page}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700;800&family=Bebas+Neue&display=swap"
        rel="stylesheet"
      />

      <nav style={styles.nav}>
        <div>
          <p style={styles.logo}>
            GYM<span style={{ color: "#D62828" }}>ACCESS</span>
          </p>
        </div>

        <div style={styles.navLinks}>
          <a href="#salle" style={styles.navLink}>Salle</a>
          <a href="#services" style={styles.navLink}>Services</a>
          <a href="#coachs" style={styles.navLink}>Coachs</a>
          <Link to="/landing" style={styles.navLink}>
            Nutrition
          </Link>
          <Link to="/newpage" style={styles.navLink}>
            Abonnements
          </Link>
          <Link to="/auth/login" style={{ ...styles.navBtn, background: "transparent", border: "1px solid rgba(214,40,40,0.6)", boxShadow: "none" }}>
            Se connecter
          </Link>
          <Link to="/auth/register" style={styles.navBtn}>
            Nous rejoindre
          </Link>
        </div>
      </nav>

      <section style={styles.hero}>
        <div style={styles.heroBg(slide.image)} />

        <div style={styles.heroGrid}>
          <div>
            <div style={styles.heroTag}>{slide.tag}</div>
            <h1 style={styles.heroTitle}>{renderTitle(slide.title, slide.accent)}</h1>
            <p style={styles.heroDesc}>{slide.desc}</p>

            <div style={styles.heroButtons}>
              <Link to="/newpage" style={styles.navBtn}>
                Découvrir les abonnements
              </Link>
              <a href="#services" style={styles.btnSecondary}>Explorer les services</a>
            </div>

            <div style={styles.sliderControls}>
              <button
                style={styles.arrowBtn}
                onClick={() =>
                  setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
                }
              >
                ←
              </button>
              <button
                style={styles.arrowBtn}
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              >
                →
              </button>

              <div style={styles.dots}>
                {slides.map((_, i) => (
                  <Dot key={i} active={i === currentSlide} onClick={() => setCurrentSlide(i)} />
                ))}
              </div>
            </div>
          </div>

          <div style={styles.statsColumn}>
            {[
              { label: "Coachs certifiés", value: "15+" },
              { label: "Cours / semaine", value: "30+" },
              { label: "Accès & nutrition", value: "24/7" },
            ].map((item) => (
              <div key={item.label} style={styles.statCard}>
                <div style={styles.statLabel}>{item.label}</div>
                <div style={styles.statValue}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.band}>
        <div style={styles.bandGrid}>
          {[
            { value: "1200+", label: "Membres actifs" },
            { value: "24/7", label: "Accès libre" },
            { value: "5", label: "Zones d'entraînement" },
            { value: "4", label: "Catalogues clés" },
          ].map((item) => (
            <div key={item.label}>
              <div style={styles.statValue}>{item.value}</div>
              <div style={styles.statLabel}>{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="salle" style={styles.section}>
        <div style={styles.sectionGrid}>
          <div>
            <div style={styles.sectionTag}>Définir la salle</div>
            <h2 style={styles.title}>UNE SALLE STRUCTURÉE POUR CHAQUE OBJECTIF</h2>
            <p style={styles.text}>
              GymAccess est une salle moderne qui regroupe l'entraînement libre,
              le coaching encadré et la nutrition sportive dans un seul lieu cohérent,
              lisible et motivant.
            </p>

            <div style={styles.cards2}>
              <div style={styles.card}>
                <div style={styles.badge}>Surface</div>
                <div style={styles.cardTitle}>1 200 m²</div>
              </div>
              <div style={styles.card}>
                <div style={styles.badge}>Zones</div>
                <div style={styles.cardTitle}>5 espaces</div>
              </div>
            </div>

            <div style={styles.cards2}>
              {facilityZones.map((zone) => (
                <HoverCard key={zone.title}>
                  <h3 style={styles.cardTitle}>{zone.title}</h3>
                  <p style={styles.text}>{zone.desc}</p>
                </HoverCard>
              ))}
            </div>
          </div>

          <img
            style={styles.image}
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80"
            alt="Salle premium"
          />
        </div>
      </section>

      <section id="services" style={styles.section}>
        <div style={styles.sectionTag}>Services</div>
        <h2 style={styles.title}>TOUT CE QU'IL FAUT POUR PROGRESSER DURABLEMENT</h2>

        <div style={styles.cards4}>
          {services.map((item) => (
            <HoverCard key={item.title}>
              <div style={{ fontSize: "2rem" }}>{item.icon}</div>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.text}>{item.desc}</p>
            </HoverCard>
          ))}
        </div>
      </section>

      <section id="coachs" style={styles.section}>
        <div style={styles.sectionGrid}>
          <img
            style={styles.image}
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80"
            alt="Coachs sportifs"
          />

          <div>
            <div style={styles.sectionTag}>Coachs</div>
            <h2 style={styles.title}>DES EXPERTS PRÉSENTS À CHAQUE ÉTAPE</h2>
            <p style={styles.text}>
              Chaque adhérent peut être orienté vers un coach selon ses objectifs :
              transformation physique, remise en forme, performance ou rééquilibrage.
            </p>

            <div style={{ display: "grid", gap: 16, marginTop: 24 }}>
              {coaches.map((coach) => (
                <HoverCard key={coach.name}>
                  <h3 style={styles.cardTitle}>{coach.name}</h3>
                  <div style={styles.badge}>{coach.specialty}</div>
                  <p style={styles.text}>{coach.desc}</p>
                </HoverCard>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="nutrition" style={styles.section}>
        <div style={styles.sectionGrid}>
          <div>
            <div style={styles.sectionTag}>Programme alimentaire & catalogue</div>
            <h2 style={styles.title}>UN CATALOGUE NUTRITION PENSÉ POUR LA PERFORMANCE</h2>
            <p style={styles.text}>
              Plans personnalisés, ajustements hebdomadaires et conseils pratiques
              pour aligner assiette, récupération et performance.
            </p>

            <div style={{ display: "grid", gap: 12, marginTop: 24 }}>
              {nutritionPrograms.map((item) => (
                <div key={item} style={{ ...styles.card, padding: "18px 20px" }}>
                  <span style={{ color: "#D62828", marginRight: 10 }}>✦</span>
                  <span style={{ color: "#F1F1F1" }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <img
            style={styles.image}
            src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200&q=80"
            alt="Nutrition sportive"
          />
        </div>

        <div style={styles.cards4}>
          {nutritionCatalog.map((item) => (
            <HoverCard key={item.title}>
              <div style={styles.badge}>{item.badge}</div>
              <h3 style={styles.cardTitle}>{item.title}</h3>
              <p style={styles.text}>{item.desc}</p>
            </HoverCard>
          ))}
        </div>
      </section>



      <section id="contact" style={styles.section}>
        <div style={styles.sectionTag}>Contact</div>
        <h2 style={styles.title}>PASSE À LA SALLE ET DÉMARRE FORT</h2>

        <div style={styles.contactGrid}>
          <p style={styles.text}>
            Une question, une visite ou une envie d'inscription ?
            Notre équipe t'oriente vers le bon abonnement, le bon coach
            et le bon programme alimentaire.
          </p>

          <div style={styles.cards2}>
            {[
              ["Adresse", "123 Avenue des Champs-Élysées, Paris 75008"],
              ["Téléphone", "+33 1 23 45 67 89"],
              ["Horaires", "Ouvert 24h/24, 7j/7"],
              ["Accueil", "Visite, essai et orientation programme sur demande"],
            ].map(([label, value]) => (
              <div key={label} style={styles.card}>
                <div style={styles.badge}>{label}</div>
                <div style={{ ...styles.text, color: "#F5F5F5" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer style={styles.footer}>
        <div style={styles.logo}>
          GYM<span style={{ color: "#D62828" }}>ACCESS</span>
        </div>
        <div>© 2026 GymAccess — Tous droits réservés</div>
      </footer>
    </div>
  );
}
