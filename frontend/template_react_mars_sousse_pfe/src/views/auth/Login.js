import React from "react";
import { Link } from "react-router-dom";

// ── FAKE USERS (remplacer par appel API en production) ──
const USERS = [
  { email: "membre@gymaccess.tn", password: "gym2026", name: "Ahmed Ben Ali" },
  { email: "admin@gymaccess.tn", password: "admin123", name: "Admin GymAccess" },
];

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [focusField, setFocusField] = React.useState(null);

  const handleLogin = () => {
    setError("");
    if (!email || !password) { setError("Veuillez remplir tous les champs."); return; }
    const user = USERS.find(u => u.email === email && u.password === password);
    if (user) {
      setUserName(user.name);
      setLoggedIn(true);
    } else {
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div style={s.page}>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(30px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes pulse {
          0%,100% { opacity:.6; } 50% { opacity:1; }
        }
        * { box-sizing:border-box; }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:#D62828; border-radius:10px; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 1000px #0A0A0A inset !important;
          -webkit-text-fill-color: #F5F5F5 !important;
        }
      `}</style>

      {/* BG decorative lines */}
      <div style={s.bgLines}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ ...s.bgLine, left: `${i * 20}%`, animationDelay: `${i * 0.4}s` }} />
        ))}
      </div>

      {/* Red glow blob */}
      <div style={s.blob} />

      {/* ── CARD ── */}
      <div style={s.card}>

        {/* Logo */}
        <Link to="/" style={s.logo}>
          GYM<span style={s.logoRed}>ACCESS</span>
        </Link>

        {loggedIn ? (
          /* ── SUCCESS STATE ── */
          <div style={s.successBox}>
            <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>✅</div>
            <div style={s.cardTitle}>BIENVENUE !</div>
            <p style={s.cardSub}>
              Connecté en tant que{" "}
              <span style={{ color: "#D62828", fontWeight: 600 }}>{userName}</span>
            </p>
            <Link to="/" style={{ ...s.btnPrimary, display: "inline-block", marginTop: "1.5rem" }}>
              ACCUEIL
            </Link>
          </div>
        ) : (
          /* ── LOGIN FORM ── */
          <>
            <div style={s.cardTitle}>
              ESPACE <span style={s.logoRed}>MEMBRE</span>
            </div>
            <p style={s.cardSub}>Connectez-vous à votre compte GymAccess</p>

            {error && <div style={s.errorBox}>⚠ {error}</div>}

            {/* Email */}
            <label style={s.label}>Adresse Email</label>
            <input
              style={{
                ...s.input,
                ...(focusField === "email" ? s.inputFocus : {}),
              }}
              type="email"
              placeholder="exemple@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocusField("email")}
              onBlur={() => setFocusField(null)}
              onKeyDown={e => e.key === "Enter" && handleLogin()}
            />

            {/* Password */}
            <label style={s.label}>Mot de passe</label>
            <div style={{ position: "relative", marginBottom: "0.5rem" }}>
              <input
                style={{
                  ...s.input,
                  marginBottom: 0,
                  paddingRight: "3rem",
                  ...(focusField === "pass" ? s.inputFocus : {}),
                }}
                type={showPass ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocusField("pass")}
                onBlur={() => setFocusField(null)}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
              />
              <button
                onClick={() => setShowPass(!showPass)}
                style={s.eyeBtn}
              >
                {showPass ? "🙈" : "👁"}
              </button>
            </div>

            {/* Forgot */}
            <div style={{ textAlign: "right", marginBottom: "1.8rem", marginTop: "0.6rem" }}>
              <Link to="/auth/forget" style={s.forgotLink}>
                Mot de passe oublié ?
              </Link>
            </div>

            {/* Submit */}
            <button style={s.btnPrimary} onClick={handleLogin}>
              SE CONNECTER
            </button>

            {/* Divider */}
            <div style={s.divider}>
              <div style={s.dividerLine} />
              <span style={s.dividerText}>ou</span>
              <div style={s.dividerLine} />
            </div>

            {/* Register */}
            <Link to="/auth/register" style={s.btnOutline}>
              CRÉER UN COMPTE
            </Link>

            {/* Back home */}
            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <Link to="/" style={{ color: "#555", fontSize: "0.78rem", textDecoration: "none" }}>
                ← Retour à l'accueil
              </Link>
            </div>

            {/* Demo hint */}
            <p style={s.demoHint}>
              Demo — <span style={{ color: "#888" }}>membre@gymaccess.tn</span> / <span style={{ color: "#888" }}>gym2026</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// ── STYLES ──────────────────────────────────────────────
const s = {
  page: {
    minHeight: "100vh",
    background: "#0A0A0A",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Barlow', sans-serif",
    color: "#F5F5F5",
    position: "relative",
    overflow: "hidden",
    padding: "2rem 1rem",
  },
  // decorative vertical lines
  bgLines: {
    position: "absolute", inset: 0, pointerEvents: "none",
  },
  bgLine: {
    position: "absolute", top: 0, width: "1px", height: "100%",
    background: "linear-gradient(to bottom, transparent, rgba(214,40,40,0.08), transparent)",
    animation: "pulse 4s ease-in-out infinite",
  },
  // red glow
  blob: {
    position: "absolute",
    width: "500px", height: "500px",
    background: "radial-gradient(circle, rgba(214,40,40,0.12) 0%, transparent 70%)",
    top: "50%", left: "50%",
    transform: "translate(-50%, -50%)",
    pointerEvents: "none",
  },
  // card
  card: {
    position: "relative", zIndex: 1,
    background: "#111111",
    border: "1px solid rgba(214,40,40,0.3)",
    borderRadius: "4px",
    padding: "3rem 2.5rem",
    width: "100%", maxWidth: "440px",
    boxShadow: "0 0 80px rgba(214,40,40,0.12)",
    animation: "fadeUp 0.5s ease both",
  },
  logo: {
    display: "block", textAlign: "center",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "1.8rem", letterSpacing: "4px",
    color: "#F5F5F5", textDecoration: "none",
    marginBottom: "2rem",
  },
  logoRed: { color: "#D62828" },
  cardTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "1.9rem", letterSpacing: "3px",
    marginBottom: "0.3rem", textAlign: "center",
  },
  cardSub: {
    color: "#888", fontSize: "0.85rem",
    textAlign: "center", marginBottom: "2rem",
  },
  errorBox: {
    background: "rgba(214,40,40,0.1)",
    border: "1px solid rgba(214,40,40,0.4)",
    color: "#ff6b6b", padding: "0.7rem 1rem",
    borderRadius: "2px", fontSize: "0.85rem",
    marginBottom: "1rem",
  },
  label: {
    display: "block", fontSize: "0.7rem",
    letterSpacing: "2px", textTransform: "uppercase",
    color: "#888", marginBottom: "0.5rem",
  },
  input: {
    width: "100%", background: "#0A0A0A",
    border: "1px solid #2a2a2a", color: "#F5F5F5",
    padding: "0.85rem 1rem",
    fontFamily: "'Barlow', sans-serif", fontSize: "0.95rem",
    borderRadius: "2px", outline: "none",
    marginBottom: "1.2rem",
    transition: "border-color .2s",
  },
  inputFocus: { borderColor: "#D62828" },
  eyeBtn: {
    position: "absolute", right: "0.8rem", top: "50%",
    transform: "translateY(-50%)",
    background: "none", border: "none",
    color: "#888", cursor: "pointer", fontSize: "1rem",
  },
  forgotLink: {
    color: "#888", fontSize: "0.78rem",
    textDecoration: "none",
  },
  btnPrimary: {
    width: "100%", background: "#D62828", color: "#F5F5F5",
    padding: "0.9rem", fontFamily: "'Barlow', sans-serif",
    fontWeight: 700, fontSize: "0.85rem",
    letterSpacing: "3px", textTransform: "uppercase",
    border: "none", cursor: "pointer", borderRadius: "2px",
    textAlign: "center", textDecoration: "none",
    display: "block",
  },
  divider: {
    display: "flex", alignItems: "center",
    gap: "1rem", margin: "1.5rem 0",
  },
  dividerLine: { flex: 1, height: "1px", background: "#222" },
  dividerText: { color: "#555", fontSize: "0.8rem" },
  btnOutline: {
    width: "100%", background: "transparent", color: "#F5F5F5",
    padding: "0.9rem", fontFamily: "'Barlow', sans-serif",
    fontWeight: 700, fontSize: "0.85rem",
    letterSpacing: "3px", textTransform: "uppercase",
    border: "1px solid rgba(255,255,255,0.2)",
    cursor: "pointer", borderRadius: "2px",
    textAlign: "center", textDecoration: "none",
    display: "block",
  },
  successBox: { textAlign: "center", padding: "1rem 0" },
  demoHint: {
    color: "#444", fontSize: "0.72rem",
    textAlign: "center", marginTop: "1.5rem",
  },
};