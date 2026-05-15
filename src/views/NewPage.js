import React from "react";
import { Link } from "react-router-dom";

const pricingPlans = [
  {
    name: "Essential",
    price: "29€",
    unit: "/mois",
    oldPrice: "39€",
    badge: "Entrée de gamme",
    featured: false,
    features: [
      "Accès salle 24/7",
      "Cardio + musculation",
      "1 bilan de départ",
      "Vestiaires + douches",
    ],
    popular: false,
  },
  {
    name: "Performance",
    price: "49€",
    unit: "/mois",
    oldPrice: "59€",
    badge: "Le plus complet",
    featured: true,
    features: [
      "Accès illimité 24/7",
      "2 coachings/mois",
      "Programme nutrition",
      "Accès bar alimentaire",
      "Suivi résultats",
    ],
    popular: true,
  },
  {
    name: "Elite",
    price: "79€",
    unit: "/mois",
    oldPrice: "99€",
    badge: "Suivi premium",
    featured: false,
    features: [
      "Coaching hebdomadaire",
      "Plan alimentaire complet",
      "Réductions bar 20%",
      "Priorité planning",
      "Séances privées",
    ],
    popular: false,
  },
];

const benefits = [
  {
    icon: "✅",
    title: "Accès 24/7",
    desc: "Salle ouverte non-stop, 365 jours par an.",
  },
  {
    icon: "🏋️",
    title: "5 zones d'entraînement",
    desc: "Musculation guidée, poids libres, cardio, HIIT, récupération.",
  },
  {
    icon: "👥",
    title: "Coachs certifiés",
    desc: "15+ experts pour structurer votre progression.",
  },
  {
    icon: "🥗",
    title: "Bar nutrition",
    desc: "Smoothies, bowls, snacks protéinés sur place.",
  },
];

const faqItems = [
  {
    question: "Puis-je tester la salle avant de m'abonner ?",
    answer: "Oui ! Venez pour une visite gratuite et un essai d'1h avec un coach.",
  },
  {
    question: "Y a-t-il un engagement minimum ?",
    answer: "Tous nos abonnements sont sans engagement. Résiliez quand vous voulez.",
  },
  {
    question: "Le bar alimentaire est-il inclus ?",
    answer: "Accès gratuit aux échantillons. Réductions dès Performance (10-20%).",
  },
  {
    question: "Comment choisir le bon abonnement ?",
    answer: "Prenez rendez-vous avec un coach pour un bilan personnalisé gratuit.",
  },
];

const testimonials = [
  {
    name: "Sarah M.",
    plan: "Performance",
    quote: "J'ai perdu 8kg en 2 mois avec le coaching et les plans nutrition. Résultats concrets !",
  },
  {
    name: "Karim B.",
    plan: "Elite",
    quote: "Le suivi hebdo change tout. Mes performances explosent depuis 3 mois.",
  },
  {
    name: "Léa D.",
    plan: "Essential",
    quote: "Parfait pour débuter. Salle impeccable, horaires flexibles, tout ce qu'il faut.",
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
    minHeight: "90vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    background: "linear-gradient(135deg, rgba(10,10,10,0.94) 0%, rgba(214,40,40,0.12) 100%)",
    position: "relative",
    overflow: "hidden",
  },
  heroContent: {
    maxWidth: "800px",
    padding: "0 5%",
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
    fontSize: "clamp(3.8rem, 8vw, 6.5rem)",
    lineHeight: 0.92,
    letterSpacing: "2px",
    margin: "0 0 24px",
  },
  heroDesc: {
    color: "#C7C7C7",
    fontSize: "1.2rem",
    lineHeight: 1.75,
    marginBottom: "36px",
  },
  heroButtons: {
    display: "flex",
    gap: "18px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  btnPrimary: {
    background: "#D62828",
    color: "#fff",
    textDecoration: "none",
    padding: "16px 28px",
    borderRadius: "2px",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontSize: "0.8rem",
    fontWeight: 700,
    boxShadow: "0 10px 30px rgba(214,40,40,0.35)",
    border: "none",
    cursor: "pointer",
  },
  btnSecondary: {
    background: "transparent",
    color: "#fff",
    textDecoration: "none",
    padding: "16px 28px",
    borderRadius: "2px",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontSize: "0.8rem",
    fontWeight: 700,
    border: "1px solid rgba(255,255,255,0.2)",
    cursor: "pointer",
  },
  section: {
    padding: "100px 5%",
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
    fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
    lineHeight: 1,
    letterSpacing: "2px",
    margin: "0 0 24px",
    textAlign: "center",
  },
  text: {
    color: "#B5B5B5",
    lineHeight: 1.75,
    fontSize: "1.05rem",
    maxWidth: "720px",
    margin: "0 auto 36px",
  },
  pricingGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "24px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  planCard: {
    background: "#121212",
    border: "1px solid #232323",
    padding: "36px 28px",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    position: "relative",
    transition: "all 0.3s ease",
  },
  featuredPlan: {
    background: "linear-gradient(135deg, #1b0505 0%, #111111 100%)",
    border: "2px solid #D62828",
    boxShadow: "0 0 50px rgba(214,40,40,0.25)",
    transform: "scale(1.05)",
  },
  planPopular: {
    position: "absolute",
    top: "-12px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#D62828",
    color: "#fff",
    padding: "6px 16px",
    borderRadius: "20px",
    fontSize: "0.7rem",
    fontWeight: 700,
    letterSpacing: "1px",
  },
  badge: {
    display: "inline-block",
    color: "#D62828",
    fontSize: "0.72rem",
    textTransform: "uppercase",
    letterSpacing: "2px",
    marginBottom: "12px",
  },
  planName: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "1.8rem",
    letterSpacing: "1px",
    margin: "0 0 16px",
  },
  planPrice: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "4rem",
    letterSpacing: "3px",
    margin: "0 0 12px",
  },
  oldPrice: {
    position: "absolute",
    right: "28px",
    top: "36px",
    fontSize: "0.85rem",
    color: "#6B6B6B",
    textDecoration: "line-through",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: "24px 0 32px",
    flexGrow: 1,
    display: "grid",
    gap: "12px",
    color: "#C4C4C4",
  },
  benefitsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginTop: "64px",
  },
  benefitCard: {
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
    padding: "24px",
    background: "rgba(17,17,17,0.6)",
    border: "1px solid rgba(214,40,40,0.12)",
  },
  faqGrid: {
    display: "grid",
    gap: "24px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  faqItem: {
    background: "#121212",
    border: "1px solid #232323",
    borderRadius: "8px",
    overflow: "hidden",
  },
  faqQuestion: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "1.3rem",
    padding: "24px 28px",
    margin: 0,
    background: "#1a1a1a",
    cursor: "pointer",
    borderBottom: "1px solid #232323",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqAnswer: {
    padding: "0 28px 24px",
    color: "#B5B5B5",
    lineHeight: 1.7,
    maxHeight: 0,
    overflow: "hidden",
    transition: "all 0.3s ease",
  },
  testimonialsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
    marginTop: "48px",
  },
  testimonialCard: {
    background: "#121212",
    border: "1px solid rgba(214,40,40,0.15)",
    padding: "32px 24px",
    textAlign: "center",
  },
  contactGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
    alignItems: "center",
    maxWidth: "1000px",
    margin: "0 auto",
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

function PricingCard({ plan, index }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      style={{
        ...styles.planCard,
        ...(plan.featured ? styles.featuredPlan : {}),
        transform: hovered ? "translateY(-8px)" : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {plan.popular && <div style={styles.planPopular}>Le plus populaire</div>}
      
      <div style={styles.oldPrice}>{plan.oldPrice}</div>
      
      <div style={styles.badge}>{plan.badge}</div>
      <h3 style={styles.planName}>{plan.name}</h3>
      
      <div style={styles.planPrice}>
        <span style={{ color: "#D62828" }}>{plan.price}</span>
        <span style={{ 
          color: "#A0A0A0", 
          fontSize: "1.1rem", 
          fontFamily: "Barlow, sans-serif",
          display: "block",
          fontWeight: 400
        }}>
          {plan.unit}
        </span>
      </div>

      <ul style={styles.list}>
        {plan.features.map((feature, i) => (
          <li key={i}>▸ {feature}</li>
        ))}
      </ul>

      <Link 
        to="/auth/register" 
        style={{
          ...styles.btnPrimary,
          background: hovered ? "#B82727" : "#D62828",
        }}
      >
        Choisir {plan.name}
      </Link>
    </div>
  );
}

function FaqItem({ item }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div style={styles.faqItem}>
      <h4 
        style={styles.faqQuestion}
        onClick={() => setOpen(!open)}
      >
        {item.question}
        <span>{open ? "−" : "+"}</span>
      </h4>
      <div style={{
        ...styles.faqAnswer,
        maxHeight: open ? "500px" : "0px",
        paddingTop: open ? "24px" : "0",
      }}>
        {item.answer}
      </div>
    </div>
  );
}

export default function SubscriptionsPage() {
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
          <a href="/" style={styles.navLink}>Accueil</a>
          <a href="/#salle" style={styles.navLink}>Salle</a>
          <a href="/#services" style={styles.navLink}>Services</a>
          <a href="/#coachs" style={styles.navLink}>Coachs</a>
          <Link to="/landing" style={styles.navLink}>Nutrition</Link>
        </div>
      </nav>

      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <div style={styles.heroTag}>Tarifs transparents</div>
          <h1 style={styles.heroTitle}>
            CHOISISSEZ VOTRE<span style={{ color: "#D62828" }}> FORMULE</span>
          </h1>
          <p style={styles.heroDesc}>
            Des abonnements adaptés à tous les niveaux et objectifs. 
            Sans engagement, résultats garantis.
          </p>
          
          <div style={styles.heroButtons}>
            <Link to="#pricing" style={styles.btnPrimary}>Voir les tarifs</Link>
            <Link to="#faq" style={styles.btnSecondary}>Questions fréquentes</Link>
          </div>
        </div>
      </section>

      <section id="pricing" style={styles.section}>
        <div style={styles.sectionTag}>Nos formules</div>
        <h2 style={styles.title}>TROUVEZ L'ABONNEMENT QUI VOUS CORRESPOND</h2>
        <p style={styles.text}>
          Chacune de nos formules donne accès à la salle 24/7 et s'adapte 
          à votre niveau, vos objectifs et votre budget.
        </p>

        <div style={styles.pricingGrid}>
          {pricingPlans.map((plan, index) => (
            <PricingCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.title}>CE QUE VOUS GAGNEZ AVEC GYMACCESS</h2>
        
        <div style={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <div key={index} style={styles.benefitCard}>
              <div style={{ fontSize: "2.2rem", marginTop: "2px" }}>{benefit.icon}</div>
              <div>
                <h3 style={{
                  ...styles.cardTitle,
                  fontSize: "1.4rem",
                  marginBottom: "8px",
                }}>{benefit.title}</h3>
                <p style={styles.text}>{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" style={styles.section}>
        <div style={styles.sectionTag}>FAQ</div>
        <h2 style={styles.title}>TOUT CE QU'IL FAUT SAVOIR</h2>
        <p style={styles.text}>
          Questions fréquentes sur les abonnements, les modalités 
          et le déroulement de votre expérience GymAccess.
        </p>

        <div style={styles.faqGrid}>
          {faqItems.map((item, index) => (
            <FaqItem key={index} item={item} />
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.title}>CE QUE DISENT NOS MEMBRES</h2>
        
        <div style={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} style={styles.testimonialCard}>
              <p style={{
                ...styles.text,
                fontStyle: "italic",
                fontSize: "1.05rem",
                marginBottom: "24px",
                lineHeight: 1.6,
              }}>
                "{testimonial.quote}"
              </p>
              <div style={{ color: "#D62828", fontSize: "0.85rem", marginBottom: "4px" }}>
                {testimonial.plan}
              </div>
              <div style={{ color: "#9A9A9A", fontSize: "0.9rem" }}>
                {testimonial.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={styles.section}>
        <div style={styles.contactGrid}>
          <div>
            <div style={styles.sectionTag}>Prêt à commencer ?</div>
            <h2 style={{
              ...styles.title,
              textAlign: "left",
              fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
            }}>
              VOTRE PREMIER ENTRAÎNEMENT<br />
              <span style={{ color: "#D62828" }}>EST OFFERT</span>
            </h2>
            <p style={styles.text}>
              Prenez rendez-vous dès maintenant pour une visite complète, 
              un bilan personnalisé et le choix de votre formule idéale.
            </p>
            <div style={{ display: "flex", gap: "16px", marginTop: "24px", flexWrap: "wrap" }}>
              <Link to="/auth/register" style={styles.btnPrimary}>S'inscrire</Link>
            </div>
          </div>
          
          <div style={{
            background: "#121212",
            border: "1px solid #232323",
            padding: "40px",
            borderRadius: "12px",
          }}>
            <h3 style={{
              ...styles.cardTitle,
              fontSize: "1.6rem",
              marginBottom: "24px",
            }}>
              Contact rapide
            </h3>
            <div style={{ display: "grid", gap: "16px" }}>
              {[
                ["📍 Adresse", "123 Avenue des Champs-Élysées, Paris 75008"],
                ["📞 Téléphone", "+33 1 23 45 67 89"],
                ["⏰ Essai gratuit", "Disponible 7j/7"],
              ].map(([icon, text]) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "1.4rem" }}>{icon.split(" ")[0]}</span>
                  <span style={styles.text}>{text}</span>
                </div>
              ))}
            </div>
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