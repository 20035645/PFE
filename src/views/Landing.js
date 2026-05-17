import React, { useState, useEffect } from "react";
import API from "../services/api";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700;800&display=swap');
:root{--red:#D62828;--black:#0A0A0A;--dark:#111111;--card:#141414;--border:rgba(214,40,40,0.16);--gray:#A3A3A3;}
*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{background:var(--black);color:#F5F5F5;font-family:'Barlow',sans-serif;}

.nav{display:flex;justify-content:space-between;align-items:center;padding:18px 5%;background:rgba(10,10,10,0.92);border-bottom:1px solid var(--border);position:sticky;top:0;z-index:99;backdrop-filter:blur(12px);}
.logo{font-family:'Bebas Neue';font-size:1.9rem;letter-spacing:4px;color:#F5F5F5;}
.logo em{color:var(--red);font-style:normal;}
.nav-links{display:flex;gap:22px;align-items:center;}
.nav-links a{color:#A3A3A3;text-decoration:none;text-transform:uppercase;letter-spacing:2px;font-size:.72rem;font-weight:700;transition:.2s;}
.nav-links a:hover{color:#F5F5F5;}
.nav-cta{background:var(--red);color:#fff;border:none;padding:11px 18px;font-family:'Barlow';font-weight:700;letter-spacing:2px;font-size:.72rem;text-transform:uppercase;cursor:pointer;box-shadow:0 8px 24px rgba(214,40,40,.35);}

.hero-nutr{position:relative;padding:100px 5% 70px;min-height:80vh;display:flex;align-items:center;overflow:hidden;}
.hero-bg{position:absolute;inset:0;background:linear-gradient(105deg,rgba(10,10,10,.97) 40%,rgba(214,40,40,.12) 100%);}
.hero-bg img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;opacity:.18;}
.hero-inner{position:relative;z-index:2;max-width:640px;}
.hero-tag{display:inline-block;border:1px solid rgba(214,40,40,.5);color:var(--red);padding:6px 14px;text-transform:uppercase;letter-spacing:3px;font-size:.68rem;margin-bottom:20px;}
.hero-title{font-family:'Bebas Neue';font-size:clamp(3.5rem,7vw,6.5rem);line-height:.92;letter-spacing:2px;margin-bottom:18px;}
.hero-title em{color:var(--red);font-style:normal;}
.hero-sub{color:#C0C0C0;line-height:1.8;font-size:1.05rem;margin-bottom:30px;}
.hero-btns{display:flex;gap:14px;flex-wrap:wrap;}
.btn-red{background:var(--red);color:#fff;border:none;padding:14px 24px;font-family:'Barlow';font-weight:700;letter-spacing:2px;font-size:.75rem;text-transform:uppercase;cursor:pointer;box-shadow:0 10px 28px rgba(214,40,40,.4);}
.btn-ghost{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.2);padding:14px 24px;font-family:'Barlow';font-weight:700;letter-spacing:2px;font-size:.75rem;text-transform:uppercase;cursor:pointer;}
.hero-stats{display:flex;gap:32px;margin-top:36px;}
.hstat-val{font-family:'Bebas Neue';font-size:2.2rem;color:var(--red);letter-spacing:2px;line-height:1;}
.hstat-lbl{font-size:.65rem;color:#666;text-transform:uppercase;letter-spacing:2px;margin-top:2px;}

.sec{padding:80px 5%;}
.sec-dark{background:#0e0e0e;}
.sec-label{color:var(--red);text-transform:uppercase;letter-spacing:3px;font-size:.68rem;margin-bottom:10px;}
.sec-title{font-family:'Bebas Neue';font-size:clamp(2.2rem,4.5vw,3.6rem);line-height:1;letter-spacing:2px;margin-bottom:14px;}
.sec-sub{color:#B0B0B0;line-height:1.8;max-width:560px;}

.stats-strip{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--border);border-bottom:1px solid var(--border);background:#0e0e0e;}
.sstrip-cell{padding:26px;text-align:center;border-right:1px solid var(--border);}
.sstrip-cell:last-child{border-right:none;}
.sstrip-num{font-family:'Bebas Neue';font-size:2.6rem;color:var(--red);letter-spacing:2px;}
.sstrip-lbl{font-size:.65rem;color:#666;text-transform:uppercase;letter-spacing:2px;margin-top:4px;}

.calc-wrap{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:36px;align-items:start;}
.calc-form{background:var(--card);border:1px solid var(--border);padding:28px;}
.calc-label{font-size:.7rem;text-transform:uppercase;letter-spacing:2px;color:#777;margin-bottom:6px;display:block;}
.calc-input,.calc-select{width:100%;background:#0A0A0A;border:1px solid #1e1e1e;color:#F5F5F5;padding:10px 14px;font-family:'Barlow';font-size:.9rem;margin-bottom:16px;outline:none;}
.calc-input:focus,.calc-select:focus{border-color:rgba(214,40,40,.5);}
.gender-row{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;}
.gender-btn{background:#0A0A0A;border:1px solid #1e1e1e;color:#777;padding:10px;font-family:'Bebas Neue';font-size:1.1rem;letter-spacing:2px;cursor:pointer;transition:.2s;}
.gender-btn.active{border-color:var(--red);color:var(--red);}
.calc-btn{width:100%;background:var(--red);color:#fff;border:none;padding:14px;font-family:'Bebas Neue';font-size:1.3rem;letter-spacing:3px;cursor:pointer;margin-top:4px;}
.calc-results{background:var(--card);border:1px solid var(--border);padding:28px;}
.res-main{text-align:center;padding:24px 0;border-bottom:1px solid #1e1e1e;margin-bottom:20px;}
.res-cal{font-family:'Bebas Neue';font-size:4rem;color:var(--red);letter-spacing:3px;line-height:1;}
.res-cal-lbl{font-size:.7rem;color:#666;text-transform:uppercase;letter-spacing:2px;margin-top:6px;}
.macros-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px;}
.macro-box{background:#0A0A0A;border:1px solid #1e1e1e;padding:16px;text-align:center;}
.macro-val{font-family:'Bebas Neue';font-size:1.8rem;letter-spacing:2px;line-height:1;}
.macro-lbl{font-size:.62rem;color:#666;text-transform:uppercase;letter-spacing:2px;margin-top:4px;}

.plans-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-top:32px;}
.plan-c{background:var(--card);border:1px solid var(--border);padding:26px;}
.plan-c.featured{border-color:var(--red);box-shadow:0 0 32px rgba(214,40,40,.15);}
.plan-badge{display:inline-block;background:var(--red);color:#fff;font-size:.62rem;text-transform:uppercase;letter-spacing:2px;padding:4px 10px;margin-bottom:10px;}
.plan-name{font-family:'Bebas Neue';font-size:1.8rem;letter-spacing:2px;margin-bottom:4px;}
.plan-price{font-family:'Bebas Neue';font-size:3rem;color:var(--red);letter-spacing:2px;line-height:1;}
.plan-period{font-size:.68rem;color:#555;text-transform:uppercase;letter-spacing:2px;margin-bottom:18px;margin-top:2px;}
.plan-feats{list-style:none;padding:0;margin-bottom:20px;}
.plan-feats li{padding:7px 0;font-size:.82rem;color:#C0C0C0;border-bottom:1px solid #1a1a1a;display:flex;align-items:center;gap:8px;}
.plan-feats li span{color:var(--red);font-weight:700;}
.plan-btn{width:100%;border:1px solid rgba(214,40,40,.4);background:transparent;color:var(--red);padding:12px;font-family:'Bebas Neue';font-size:1.1rem;letter-spacing:3px;cursor:pointer;transition:.2s;}
.plan-btn:hover,.plan-c.featured .plan-btn{background:var(--red);color:#fff;}

.meals-tabs{display:flex;border-bottom:1px solid var(--border);margin-bottom:28px;}
.meal-tab{background:none;border:none;color:#666;padding:12px 22px;font-family:'Bebas Neue';font-size:1.05rem;letter-spacing:2px;cursor:pointer;border-bottom:2px solid transparent;transition:.2s;}
.meal-tab.on{color:var(--red);border-bottom-color:var(--red);}
.meals-panel{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
.meal-row{display:flex;align-items:center;gap:14px;padding:14px 0;border-bottom:1px solid #161616;}
.meal-num{font-family:'Bebas Neue';font-size:1.4rem;color:var(--red);min-width:28px;}
.meal-name{font-weight:700;font-size:.88rem;color:#F0F0F0;}
.meal-type{font-size:.68rem;color:#555;text-transform:uppercase;letter-spacing:2px;margin-top:2px;}
.macros-summary{background:var(--card);border:1px solid var(--border);padding:24px;}
.macro-big{font-family:'Bebas Neue';font-size:4rem;color:var(--red);letter-spacing:3px;line-height:1;text-align:center;}
.macro-big-lbl{text-align:center;font-size:.65rem;color:#555;text-transform:uppercase;letter-spacing:2px;margin-bottom:20px;}
.mbar-row{margin-bottom:14px;}
.mbar-header{display:flex;justify-content:space-between;font-size:.7rem;text-transform:uppercase;letter-spacing:1px;color:#777;margin-bottom:6px;}
.mbar-track{background:#1a1a1a;height:4px;}
.mbar-fill{height:4px;background:var(--red);transition:.4s;}

.coaches-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:32px;}
.coach-c{background:var(--card);border:1px solid var(--border);padding:22px;text-align:center;transition:.3s;}
.coach-c:hover{border-color:rgba(214,40,40,.45);transform:translateY(-4px);}
.coach-avatar{width:64px;height:64px;background:rgba(214,40,40,.12);border:1px solid var(--border);margin:0 auto 14px;display:flex;align-items:center;justify-content:center;font-family:'Bebas Neue';font-size:1.4rem;color:var(--red);letter-spacing:2px;}
.coach-name{font-family:'Bebas Neue';font-size:1.25rem;letter-spacing:2px;margin-bottom:4px;}
.coach-spec{font-size:.68rem;color:var(--red);text-transform:uppercase;letter-spacing:2px;margin-bottom:12px;}
.coach-stats{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;}
.cstat{background:#0A0A0A;padding:8px;text-align:center;}
.cstat-v{font-family:'Bebas Neue';font-size:1.3rem;letter-spacing:1px;}
.cstat-l{font-size:.58rem;color:#555;text-transform:uppercase;letter-spacing:1px;}
.coach-book{width:100%;background:transparent;border:1px solid rgba(214,40,40,.35);color:var(--red);padding:9px;font-family:'Bebas Neue';font-size:1rem;letter-spacing:2px;cursor:pointer;transition:.2s;}
.coach-book:hover{background:var(--red);color:#fff;}

.tips-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:32px;}
.tip-c{background:var(--card);border:1px solid var(--border);border-left:3px solid var(--red);padding:22px;transition:.3s;}
.tip-c:hover{transform:translateY(-3px);}
.tip-title{font-family:'Bebas Neue';font-size:1.2rem;letter-spacing:2px;margin-bottom:8px;margin-top:10px;}
.tip-txt{font-size:.82rem;color:#888;line-height:1.7;}

.bar-nutr{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:32px;}
.baritem{background:var(--card);border:1px solid var(--border);padding:20px;transition:.3s;}
.baritem:hover{border-color:rgba(214,40,40,.45);transform:translateY(-3px);}
.baritem-badge{display:inline-block;font-size:.62rem;text-transform:uppercase;letter-spacing:2px;padding:3px 8px;border:1px solid rgba(214,40,40,.4);color:var(--red);margin-bottom:10px;}
.baritem-name{font-family:'Bebas Neue';font-size:1.35rem;letter-spacing:2px;margin-bottom:6px;}
.baritem-desc{font-size:.78rem;color:#777;line-height:1.6;}
.baritem-price{font-family:'Bebas Neue';font-size:1.5rem;color:var(--red);letter-spacing:2px;margin-top:10px;}

.cta-band{background:rgba(214,40,40,.07);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:60px 5%;text-align:center;}
.cta-title{font-family:'Bebas Neue';font-size:clamp(2.5rem,5vw,4.5rem);letter-spacing:3px;margin-bottom:14px;}
.cta-sub{color:#A0A0A0;font-size:1rem;line-height:1.8;max-width:500px;margin:0 auto 28px;}
.cta-btns{display:flex;gap:14px;justify-content:center;}

.footer{border-top:1px solid var(--border);padding:24px 5%;background:#080808;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;}
.footer-logo{font-family:'Bebas Neue';font-size:1.5rem;letter-spacing:3px;}
.footer-logo em{color:var(--red);font-style:normal;}
.footer-copy{font-size:.72rem;color:#444;text-transform:uppercase;letter-spacing:1px;}

@media(max-width:768px){
  .nav-links{display:none;}
  .calc-wrap,.meals-panel,.plans-grid,.coaches-grid{grid-template-columns:1fr;}
  .stats-strip,.bar-nutr{grid-template-columns:1fr 1fr;}
  .tips-grid{grid-template-columns:1fr;}
}
`;

const MEALS = {
  seche: {
    cal: 1800, p: 160, g: 180, l: 55, meals: [
      { n: "01", name: "Blancs d'œufs + yaourt grec", type: "Petit-déjeuner" },
      { n: "02", name: "Salade + poulet grillé + légumes", type: "Déjeuner" },
      { n: "03", name: "Amandes + pomme", type: "Collation" },
      { n: "04", name: "Poisson vapeur + haricots verts", type: "Dîner" },
      { n: "05", name: "Caséine + infusion minceur", type: "Pré-sleep" },
    ]
  },
  maintien: {
    cal: 2400, p: 150, g: 280, l: 70, meals: [
      { n: "01", name: "Avoine + fruits + miel", type: "Petit-déjeuner" },
      { n: "02", name: "Riz + légumineuses + légumes", type: "Déjeuner" },
      { n: "03", name: "Fromage blanc + noix", type: "Collation" },
      { n: "04", name: "Saumon + quinoa + brocolis", type: "Dîner" },
      { n: "05", name: "Lait chaud + banane", type: "Pré-sleep" },
    ]
  },
  masse: {
    cal: 3200, p: 180, g: 400, l: 80, meals: [
      { n: "01", name: "Œufs + avoine + banane", type: "Petit-déjeuner" },
      { n: "02", name: "Poulet + riz + légumes + huile", type: "Déjeuner" },
      { n: "03", name: "Shake protéiné + fruits secs", type: "Collation pré-workout" },
      { n: "04", name: "Thon + pâtes + huile d'olive", type: "Dîner" },
      { n: "05", name: "Viande rouge + patate douce", type: "Post-training" },
      { n: "06", name: "Caséine + beurre d'amande", type: "Pré-sleep" },
    ]
  },
};

const COACHES = [
  { initials: "NA", name: "NABIL A.", spec: "Prise de masse & force", years: 8, clients: 120, rating: "4.9" },
  { initials: "SB", name: "SARRA B.", spec: "Sèche & rééquilibrage", years: 6, clients: 85, rating: "5.0" },
  { initials: "AM", name: "AMINE M.", spec: "Performance & HIIT", years: 5, clients: 95, rating: "4.8" },
  { initials: "LT", name: "LEILA T.", spec: "Nutrition végétale", years: 7, clients: 110, rating: "4.9" },
];

const TIPS = [
  { title: "Timing des repas", txt: "Consomme 30g de protéines dans les 30 min post-entraînement pour maximiser la synthèse musculaire de 40%." },
  { title: "Fréquence des repas", txt: "5 à 6 petits repas espacés de 3h maintiennent ton métabolisme actif et évitent les pics de glycémie." },
  { title: "Protéines complètes", txt: "Combine légumineuses + céréales pour obtenir tous les acides aminés essentiels si tu suis une alimentation végétale." },
  { title: "Hydratation active", txt: "Bois 500ml d'eau 2h avant l'effort, 200ml toutes les 20min pendant et 600ml par heure d'entraînement intense." },
  { title: "Glucides intelligents", txt: "Privilégie les glucides à index glycémique bas (avoine, patate douce, riz complet) pour une énergie stable toute la journée." },
  { title: "Progression calorique", txt: "Augmente ou réduis tes calories de 100-200 kcal par semaine max. Les changements brusques perturbent le métabolisme." },
];

const BAR = [
  { badge: "Sèche", name: "BOWL PROTÉINÉ", desc: "Quinoa, poulet grillé, légumes rôtis, sauce tahini. 480 kcal · 42g prot.", price: "8.5 DT" },
  { badge: "Énergie", name: "SMOOTHIE BOOST", desc: "Banane, whey vanille, beurre d'arachide, lait d'avoine. 320 kcal · 28g prot.", price: "6.5 DT" },
  { badge: "Masse", name: "WRAP MASSE", desc: "Tortilla complète, thon, avocat, riz, légumes. 620 kcal · 52g prot.", price: "9 DT" },
  { badge: "Recovery", name: "SHAKE RECOVERY", desc: "Whey, BCAA, miel, lait entier, cacao. Post-training idéal. 380 kcal.", price: "7 DT" },
];

export default function NutritionPage() {
  const [genre, setGenre] = useState("H");
  const [age, setAge] = useState(25);
  const [poids, setPoids] = useState(75);
  const [taille, setTaille] = useState(175);
  const [activite, setActivite] = useState(1.375);
  const [objectif, setObjectif] = useState("maintien");
  const [result, setResult] = useState({ cal: 2456, bmr: 1876, p: 184, g: 307, l: 82, imc: 24.5, imcTxt: "Normal" });
  const [mealTab, setMealTab] = useState("seche");
  const [backendMessage, setBackendMessage] = useState("");

  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const calcCalories = () => {
    let bmr = genre === "H"
      ? Math.round(88.362 + 13.397 * poids + 4.799 * taille - 5.677 * age)
      : Math.round(447.593 + 9.247 * poids + 3.098 * taille - 4.330 * age);
    let tdee = Math.round(bmr * activite);
    if (objectif === "deficit") tdee -= 500;
    if (objectif === "surplus") tdee += 300;
    const p = Math.round(poids * 2.2);
    const l = Math.round(tdee * 0.25 / 9);
    const g = Math.round((tdee - p * 4 - l * 9) / 4);
    const imc = +(poids / ((taille / 100) ** 2)).toFixed(1);
    const imcTxt = imc < 18.5 ? "Insuffisant" : imc < 25 ? "Normal" : imc < 30 ? "Surpoids" : "Obésité";
    setResult({ cal: tdee, bmr, p, g, l, imc, imcTxt });
  };

  useEffect(() => {

    API.get("/test")
      .then((res) => {
        setBackendMessage(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });

  }, []);
  const meal = MEALS[mealTab];

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="logo">GYM<em>ACCESS</em></div>
        <div className="nav-links">
          <a href="/">Acceuil</a>

          <a href="#calc">Calculateur</a>

          <a href="#plans">Plans</a>

          <a href="#repas">Repas</a>

          <a href="#coachs">Coachs</a>

          <a href="#conseils">Conseils</a>

          <a href="#bar">Bar</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-nutr">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1400&q=80" alt="nutrition" />
        </div>
        <div className="hero-inner">
          <div className="hero-tag">Nutrition & Performance</div>
          <h1 className="hero-title">MANGE MIEUX.<br /><em>PERFORME PLUS.</em></h1>
          <p className="hero-sub">Calcule tes besoins exacts en calories, découvre ton plan repas personnalisé et suis les conseils de nos experts nutritionnistes certifiés.</p>
          <div style={{ color: "red", marginTop: "20px" }}>
            
          </div>
          <div className="hero-btns">
            <button className="btn-red" onClick={() => scroll("calc")}>Calculer mes calories →</button>
            <button className="btn-ghost" onClick={() => scroll("coachs")}>Voir les coachs</button>
          </div>
          <div className="hero-stats">
            <div><div className="hstat-val">850+</div><div className="hstat-lbl">Plans créés</div></div>
            <div><div className="hstat-val">4</div><div className="hstat-lbl">Experts nutrition</div></div>
            <div><div className="hstat-val">98%</div><div className="hstat-lbl">Satisfaction</div></div>
          </div>
        </div>
      </section>

      {/* STRIP STATS */}
      <div className="stats-strip">
        {[["850+", "Plans nutritionnels"], ["4", "Coachs certifiés"], ["3", "Objectifs couverts"], ["7j/7", "Bar alimentaire"]].map(([n, l]) => (
          <div key={l} className="sstrip-cell">
            <div className="sstrip-num">{n}</div>
            <div className="sstrip-lbl">{l}</div>
          </div>
        ))}
      </div>

      {/* CALCULATEUR */}
      <section id="calc" className="sec">
        <div className="sec-label">Outil interactif</div>
        <h2 className="sec-title">CALCULATEUR DE<br />CALORIES & IMC</h2>
        <p className="sec-sub">Renseigne tes données pour obtenir tes besoins caloriques journaliers et tes macros idéales.</p>
        <div className="calc-wrap">
          <div className="calc-form">
            <span className="calc-label">Genre</span>
            <div className="gender-row">
              <button className={`gender-btn${genre === "H" ? " active" : ""}`} onClick={() => setGenre("H")}>HOMME</button>
              <button className={`gender-btn${genre === "F" ? " active" : ""}`} onClick={() => setGenre("F")}>FEMME</button>
            </div>
            <span className="calc-label">Âge</span>
            <input className="calc-input" type="number" value={age} onChange={e => setAge(+e.target.value)} min={14} max={80} />
            <span className="calc-label">Poids (kg)</span>
            <input className="calc-input" type="number" value={poids} onChange={e => setPoids(+e.target.value)} min={30} max={200} />
            <span className="calc-label">Taille (cm)</span>
            <input className="calc-input" type="number" value={taille} onChange={e => setTaille(+e.target.value)} min={120} max={220} />
            <span className="calc-label">Niveau d'activité</span>
            <select className="calc-select" value={activite} onChange={e => setActivite(+e.target.value)}>
              <option value={1.2}>Sédentaire</option>
              <option value={1.375}>Légèrement actif (1-3x/sem)</option>
              <option value={1.55}>Modérément actif (3-5x/sem)</option>
              <option value={1.725}>Très actif (6-7x/sem)</option>
              <option value={1.9}>Extrêmement actif</option>
            </select>
            <span className="calc-label">Objectif</span>
            <select className="calc-select" value={objectif} onChange={e => setObjectif(e.target.value)}>
              <option value="deficit">Perte de poids (-500 kcal)</option>
              <option value="maintien">Maintien du poids</option>
              <option value="surplus">Prise de masse (+300 kcal)</option>
            </select>
            <button className="calc-btn" onClick={calcCalories}>CALCULER →</button>
          </div>
          <div className="calc-results">
            <div className="res-main">
              <div className="res-cal">{result.cal.toLocaleString("fr")}</div>
              <div className="res-cal-lbl">calories recommandées / jour</div>
            </div>
            <div className="macros-grid">
              <div className="macro-box"><div className="macro-val" style={{ color: "#D62828" }}>{result.p}g</div><div className="macro-lbl">Protéines</div></div>
              <div className="macro-box"><div className="macro-val">{result.g}g</div><div className="macro-lbl">Glucides</div></div>
              <div className="macro-box"><div className="macro-val" style={{ color: "#A3A3A3" }}>{result.l}g</div><div className="macro-lbl">Lipides</div></div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderTop: "1px solid #1e1e1e" }}>
              <span style={{ fontSize: ".7rem", textTransform: "uppercase", letterSpacing: "2px", color: "#777" }}>IMC</span>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontFamily: "'Bebas Neue'", fontSize: "1.5rem", letterSpacing: "2px" }}>{result.imc}</span>
                <span style={{ fontSize: ".65rem", padding: "4px 10px", background: "rgba(29,158,117,.15)", color: "#1D9E75", border: "1px solid rgba(29,158,117,.3)" }}>{result.imcTxt}</span>
              </div>
            </div>
            <div style={{ marginTop: "16px", padding: "14px", background: "#0A0A0A", border: "1px solid #1a1a1a" }}>
              <div style={{ fontSize: ".65rem", textTransform: "uppercase", letterSpacing: "2px", color: "#555", marginBottom: "6px" }}>Métabolisme de base (BMR)</div>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: "1.6rem", letterSpacing: "2px" }}>{result.bmr.toLocaleString("fr")} kcal</div>
            </div>
          </div>
        </div>
      </section>

      {/* PLANS */}
      <section id="plans" className="sec sec-dark">
        <div className="sec-label">Programmes</div>
        <h2 className="sec-title">PLANS NUTRITIONNELS<br />PERSONNALISÉS</h2>
        <p className="sec-sub">Trois approches adaptées à ton objectif, rédigées par nos coachs nutrition certifiés.</p>
        <div className="plans-grid">
          {[
            { name: "SÈCHE", cal: "1 800", period: "déficit contrôlé", feats: ["160g protéines / jour", "180g glucides ciblés", "55g lipides essentiels", "5 repas structurés", "Suivi hebdomadaire"] },
            { name: "MAINTIEN", cal: "2 400", period: "équilibre parfait", featured: true, feats: ["150g protéines / jour", "280g glucides équilibrés", "70g lipides sains", "5 repas + collations", "Plan repas 7 jours"] },
            { name: "MASSE", cal: "3 200", period: "surplus optimisé", feats: ["180g protéines / jour", "400g glucides énergie", "80g lipides de qualité", "6 repas + pré-workout", "Suivi bihebdomadaire"] },
          ].map(p => (
            <div key={p.name} className={`plan-c${p.featured ? " featured" : ""}`}>
              {p.featured && <div className="plan-badge">Recommandé</div>}
              <div className="plan-name">{p.name}</div>
              <div className="plan-price">{p.cal}</div>
              <div className="plan-period">calories / jour · {p.period}</div>
              <ul className="plan-feats">{p.feats.map(f => <li key={f}><span>→</span>{f}</li>)}</ul>
              <button className="plan-btn">Choisir ce plan</button>
            </div>
          ))}
        </div>
      </section>

      {/* REPAS */}
      <section id="repas" className="sec">
        <div className="sec-label">Alimentation quotidienne</div>
        <h2 className="sec-title">PLAN REPAS<br />JOURNALIER</h2>
        <div className="meals-tabs">
          {[["seche", "SÈCHE"], ["maintien", "MAINTIEN"], ["masse", "PRISE DE MASSE"]].map(([k, l]) => (
            <button key={k} className={`meal-tab${mealTab === k ? " on" : ""}`} onClick={() => setMealTab(k)}>{l}</button>
          ))}
        </div>
        <div className="meals-panel">
          <div>{meal.meals.map(m => (
            <div key={m.n} className="meal-row">
              <div className="meal-num">{m.n}</div>
              <div><div className="meal-name">{m.name}</div><div className="meal-type">{m.type}</div></div>
            </div>
          ))}</div>
          <div className="macros-summary">
            <div className="macro-big">{meal.cal.toLocaleString("fr")}</div>
            <div className="macro-big-lbl">calories / jour</div>
            {[["Protéines", meal.p, "bar-p"], ["Glucides", meal.g, "bar-g"], ["Lipides", meal.l, "bar-l"]].map(([name, val, id], i) => (
              <div key={name} className="mbar-row">
                <div className="mbar-header"><span>{name}</span><span>{val}g</span></div>
                <div className="mbar-track">
                  <div className="mbar-fill" style={{ width: `${Math.round(val * (i === 2 ? 9 : 4) / meal.cal * 100)}%`, background: i === 0 ? "#D62828" : i === 1 ? "#888" : "#555" }} />
                </div>
              </div>
            ))}
            <button className="btn-red" style={{ width: "100%", marginTop: "20px", border: "none" }}>Obtenir mon plan →</button>
          </div>
        </div>
      </section>

      {/* COACHS */}
      <section id="coachs" className="sec sec-dark">
        <div className="sec-label">Experts</div>
        <h2 className="sec-title">NOS COACHS<br />NUTRITION</h2>
        <div className="coaches-grid">
          {COACHES.map(c => (
            <div key={c.name} className="coach-c">
              <div className="coach-avatar">{c.initials}</div>
              <div className="coach-name">{c.name}</div>
              <div className="coach-spec">{c.spec}</div>
              <div className="coach-stats">
                <div className="cstat"><div className="cstat-v">{c.years}</div><div className="cstat-l">Ans exp.</div></div>
                <div className="cstat"><div className="cstat-v">{c.clients}</div><div className="cstat-l">Clients</div></div>
              </div>
              <div style={{ fontSize: ".72rem", color: "#555", textAlign: "center", marginBottom: "12px" }}>★★★★★ {c.rating}</div>
              <button className="coach-book">Réserver</button>
            </div>
          ))}
        </div>
      </section>

      {/* CONSEILS */}
      <section id="conseils" className="sec">
        <div className="sec-label">Expertise</div>
        <h2 className="sec-title">CONSEILS DE<br />NOS EXPERTS</h2>
        <div className="tips-grid">
          {TIPS.map(t => (
            <div key={t.title} className="tip-c">
              <div className="tip-title">{t.title}</div>
              <p className="tip-txt">{t.txt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BAR */}
      <section id="bar" className="sec sec-dark">
        <div className="sec-label">Bar alimentaire</div>
        <h2 className="sec-title">NOTRE CATALOGUE<br />NUTRITION</h2>
        <div className="bar-nutr">
          {BAR.map(b => (
            <div key={b.name} className="baritem">
              <div className="baritem-badge">{b.badge}</div>
              <div className="baritem-name">{b.name}</div>
              <p className="baritem-desc">{b.desc}</p>
              <div className="baritem-price">{b.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="cta-band">
        <div className="sec-label" style={{ textAlign: "center" }}>Passe à l'action</div>
        <div className="cta-title">PRÊT À TRANSFORMER<br />TON ALIMENTATION ?</div>
        <p className="cta-sub">Réserve une consultation gratuite de 30 min avec l'un de nos coachs nutrition certifiés.</p>
        <div className="cta-btns">
          <button className="btn-red">Consultation gratuite →</button>
        </div>
      </div>

      {/* FOOTER IDENTIQUE À INDEX.JS */}
      <footer className="footer">
        <div className="footer-logo">
          GYM<span style={{ color: "#D62828" }}>ACCESS</span>
        </div>
        <div className="footer-copy">
          © 2026 GymAccess — Tous droits réservés
        </div>
      </footer>
    </>
  );
}