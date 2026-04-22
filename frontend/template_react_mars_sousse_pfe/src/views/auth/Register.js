import React from "react";
import { Link, useHistory } from "react-router-dom";

const API = "http://localhost:5000/api/auth";

export default function Register() {
  const history = useHistory();

  const [nom, setNom] = React.useState("");
  const [prenom, setPrenom] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [focusField, setFocusField] = React.useState(null);

  const handleRegister = async () => {
    setError("");

    // Validations frontend
    if (!nom || !prenom || !email || !password || !confirm) {
      setError("Veuillez remplir tous les champs."); return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères."); return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas."); return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, prenom, email, password }),
      });
      const data = await res.json();

      if (!res.ok) { setError(data.message || "Erreur lors de l'inscription."); return; }

      // Sauvegarder le token
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccess(true);

      // Redirection après 1.5s
      setTimeout(() => history.push("/"), 1500);

    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.page}>
      <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;600;700&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse  { 0%,100%{opacity:.5} 50%{opacity:1} }
        *{box-sizing:border-box}
        input:-webkit-autofill{-webkit-box-shadow:0 0 0 1000px #0A0A0A inset!important;-webkit-text-fill-color:#F5F5F5!important}
      `}</style>

      <div style={s.bgLines}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{ ...s.bgLine, left: `${i * 20}%`, animationDelay: `${i * 0.4}s` }} />
        ))}
      </div>
      <div style={s.blob} />

      <div style={s.card}>
        <Link to="/" style={s.logo}>GYM<span style={s.red}>ACCESS</span></Link>

        {success ? (
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🎉</div>
            <div style={s.title}>COMPTE CRÉÉ !</div>
            <p style={{ color: "#aaa", marginTop: "0.5rem" }}>Bienvenue dans la famille GymAccess !</p>
            <p style={{ color: "#555", fontSize: "0.8rem", marginTop: "0.5rem" }}>Redirection en cours...</p>
          </div>
        ) : (
          <>
            <div style={s.title}>CRÉER UN <span style={s.red}>COMPTE</span></div>
            <p style={s.sub}>Rejoignez la communauté GymAccess</p>

            {error && <div style={s.errorBox}>⚠ {error}</div>}

            {/* Nom + Prénom côte à côte */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <label style={s.label}>Nom</label>
                <input
                  style={{ ...s.input, ...(focusField === "nom" ? s.inputFocus : {}) }}
                  type="text" placeholder="Ben Ali"
                  value={nom} onChange={e => setNom(e.target.value)}
                  onFocus={() => setFocusField("nom")} onBlur={() => setFocusField(null)}
                />
              </div>
              <div>
                <label style={s.label}>Prénom</label>
                <input
                  style={{ ...s.input, ...(focusField === "prenom" ? s.inputFocus : {}) }}
                  type="text" placeholder="Ahmed"
                  value={prenom} onChange={e => setPrenom(e.target.value)}
                  onFocus={() => setFocusField("prenom")} onBlur={() => setFocusField(null)}
                />
              </div>
            </div>

            <label style={s.label}>Adresse Email</label>
            <input
              style={{ ...s.input, ...(focusField === "email" ? s.inputFocus : {}) }}
              type="email" placeholder="exemple@email.com"
              value={email} onChange={e => setEmail(e.target.value)}
              onFocus={() => setFocusField("email")} onBlur={() => setFocusField(null)}
            />

            <label style={s.label}>Mot de passe</label>
            <div style={{ position: "relative", marginBottom: "1.2rem" }}>
              <input
                style={{ ...s.input, marginBottom: 0, paddingRight: "3rem", ...(focusField === "pass" ? s.inputFocus : {}) }}
                type={showPass ? "text" : "password"} placeholder="Min. 6 caractères"
                value={password} onChange={e => setPassword(e.target.value)}
                onFocus={() => setFocusField("pass")} onBlur={() => setFocusField(null)}
              />
              <button onClick={() => setShowPass(!showPass)} style={s.eyeBtn}>
                {showPass ? "🙈" : "👁"}
              </button>
            </div>

            <label style={s.label}>Confirmer le mot de passe</label>
            <input
              style={{
                ...s.input,
                ...(focusField === "confirm" ? s.inputFocus : {}),
                ...(confirm && confirm !== password ? { borderColor: "#D62828" } : {}),
                ...(confirm && confirm === password ? { borderColor: "#28a745" } : {}),
              }}
              type="password" placeholder="••••••••"
              value={confirm} onChange={e => setConfirm(e.target.value)}
              onFocus={() => setFocusField("confirm")} onBlur={() => setFocusField(null)}
              onKeyDown={e => e.key === "Enter" && handleRegister()}
            />

            <button
              style={{ ...s.btnPrimary, opacity: loading ? 0.7 : 1, marginTop: "0.5rem" }}
              onClick={handleRegister} disabled={loading}
            >
              {loading ? "INSCRIPTION..." : "S'INSCRIRE"}
            </button>

            <div style={s.divider}>
              <div style={s.divLine} /><span style={s.divText}>déjà membre ?</span><div style={s.divLine} />
            </div>

            <Link to="/auth/login" style={s.btnOutline}>SE CONNECTER</Link>

            <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
              <Link to="/" style={{ color: "#555", fontSize: "0.78rem", textDecoration: "none" }}>← Retour à l'accueil</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: "100vh", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Barlow',sans-serif", color: "#F5F5F5", position: "relative", overflow: "hidden", padding: "2rem 1rem" },
  bgLines: { position: "absolute", inset: 0, pointerEvents: "none" },
  bgLine: { position: "absolute", top: 0, width: "1px", height: "100%", background: "linear-gradient(to bottom,transparent,rgba(214,40,40,0.08),transparent)", animation: "pulse 4s ease-in-out infinite" },
  blob: { position: "absolute", width: "500px", height: "500px", background: "radial-gradient(circle,rgba(214,40,40,0.12) 0%,transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" },
  card: { position: "relative", zIndex: 1, background: "#111111", border: "1px solid rgba(214,40,40,0.3)", borderRadius: "4px", padding: "3rem 2.5rem", width: "100%", maxWidth: "460px", boxShadow: "0 0 80px rgba(214,40,40,0.12)", animation: "fadeUp 0.5s ease both" },
  logo: { display: "block", textAlign: "center", fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.8rem", letterSpacing: "4px", color: "#F5F5F5", textDecoration: "none", marginBottom: "2rem" },
  red: { color: "#D62828" },
  title: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.9rem", letterSpacing: "3px", marginBottom: "0.3rem", textAlign: "center" },
  sub: { color: "#888", fontSize: "0.85rem", textAlign: "center", marginBottom: "2rem" },
  errorBox: { background: "rgba(214,40,40,0.1)", border: "1px solid rgba(214,40,40,0.4)", color: "#ff6b6b", padding: "0.7rem 1rem", borderRadius: "2px", fontSize: "0.85rem", marginBottom: "1rem" },
  label: { display: "block", fontSize: "0.7rem", letterSpacing: "2px", textTransform: "uppercase", color: "#888", marginBottom: "0.5rem" },
  input: { width: "100%", background: "#0A0A0A", border: "1px solid #2a2a2a", color: "#F5F5F5", padding: "0.85rem 1rem", fontFamily: "'Barlow',sans-serif", fontSize: "0.95rem", borderRadius: "2px", outline: "none", marginBottom: "1.2rem", transition: "border-color .2s" },
  inputFocus: { borderColor: "#D62828" },
  eyeBtn: { position: "absolute", right: "0.8rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: "1rem" },
  btnPrimary: { width: "100%", background: "#D62828", color: "#F5F5F5", padding: "0.9rem", fontFamily: "'Barlow',sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "3px", textTransform: "uppercase", border: "none", cursor: "pointer", borderRadius: "2px", textAlign: "center", display: "block" },
  divider: { display: "flex", alignItems: "center", gap: "1rem", margin: "1.5rem 0" },
  divLine: { flex: 1, height: "1px", background: "#222" },
  divText: { color: "#555", fontSize: "0.8rem" },
  btnOutline: { width: "100%", background: "transparent", color: "#F5F5F5", padding: "0.9rem", fontFamily: "'Barlow',sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "3px", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", borderRadius: "2px", textAlign: "center", textDecoration: "none", display: "block" },
};