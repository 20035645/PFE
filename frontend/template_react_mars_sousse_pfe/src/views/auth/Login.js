<<<<<<< HEAD
import React from "react";
import { Link } from "react-router-dom";
import { AUTH_API } from "Services/api";

export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPass, setShowPass] = React.useState(false);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userName, setUserName] = React.useState("");
  const [focusField, setFocusField] = React.useState(null);

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${AUTH_API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || data.message || "Email ou mot de passe incorrect.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUserName(data.user?.name || email);
      setLoggedIn(true);
    } catch {
      setError("Impossible de contacter le serveur.");
=======
// LOGIN.JS

import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "../../services/apiUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");       // ← ajout
  const [loading, setLoading] = useState(false); // ← ajout

  const history = useHistory(); // ← ajout

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser({ email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      const role = res.data.user.role;
      console.log(role);

      // Redirige selon le rôle
      // Redirige selon le rôle
      if (role === "admin") {
        history.push("/admin/dashboard");
      } else if (role === "coach") {
        history.push("/coach/dashboard");  // ← ajout
      } else {
        history.push("/profile"); // membre
      }

    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || "Erreur de connexion");
>>>>>>> 4e3b5072001c40ddd098fb493cbb1d7eb6202f9e
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        <div style={styles.iconWrap}>
          <span style={styles.icon}>🔐</span>
        </div>

        <h1 style={styles.title}>CONNEXION</h1>

        <p style={styles.subtitle}>
          Connectez-vous à votre espace GymAccess
        </p>

        {/* ← Message d'erreur ajouté */}
        {error && (
          <div style={styles.errorBox}>
            {error}
          </div>
<<<<<<< HEAD
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
            <button
              style={{ ...s.btnPrimary, opacity: loading ? 0.7 : 1 }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "CONNEXION..." : "SE CONNECTER"}
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
              Seed — <span style={{ color: "#888" }}>admin@gym.com</span> / <span style={{ color: "#888" }}>Admin123!</span>
            </p>
          </>
=======
>>>>>>> 4e3b5072001c40ddd098fb493cbb1d7eb6202f9e
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label style={styles.label}>EMAIL</label>

            <input
              type="email"
              required
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
          </div>

          <div>
            <label style={styles.label}>MOT DE PASSE</label>

            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>

          {/* ← loading ajouté sur le bouton */}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "CONNEXION..." : "SE CONNECTER"}
          </button>
        </form>

        <div style={styles.links}>
          <Link to="/auth/forget" style={styles.link}>
            Mot de passe oublié ?
          </Link>
        </div>

        <p style={styles.footer}>
          Pas encore membre ?{" "}
          <Link to="/auth/register" style={styles.linkRed}>
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    width: "100%",
    background: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    padding: "2rem",
    boxSizing: "border-box",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at top, rgba(220,38,38,0.15), transparent 40%)",
  },

  card: {
    position: "relative",
    zIndex: 2,
    width: "100%",
    maxWidth: "430px",
    background: "#111",
    border: "1px solid #222",
    borderRadius: "18px",
    padding: "2.5rem",
    boxShadow: "0 20px 60px rgba(220,38,38,0.25)",
  },

  iconWrap: {
    width: "70px",
    height: "70px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#dc2626,#991b1b)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 1.5rem",
  },

  icon: {
    fontSize: "30px",
  },

  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: 800,
    letterSpacing: "0.2em",
    marginBottom: "0.7rem",
  },

  subtitle: {
    color: "#888",
    textAlign: "center",
    marginBottom: "2rem",
  },

  // ← style du message d'erreur ajouté
  errorBox: {
    background: "rgba(220,38,38,0.12)",
    border: "1px solid rgba(220,38,38,0.4)",
    color: "#f87171",
    borderRadius: "8px",
    padding: "0.75rem 1rem",
    marginBottom: "1rem",
    fontSize: "0.88rem",
    textAlign: "center",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },

  label: {
    display: "block",
    color: "#aaa",
    fontSize: "0.75rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
    letterSpacing: "0.15em",
  },

  input: {
<<<<<<< HEAD
    width: "100%", background: "#0A0A0A",
    border: "1px solid #2a2a2a", color: "#F5F5F5",
    padding: "0.85rem 1rem",
    fontFamily: "'Barlow', sans-serif", fontSize: "0.95rem",
    borderRadius: "2px", outline: "none",
    marginBottom: "1.2rem",
    transition: "border .2s",
  },
  inputFocus: { border: "1px solid #D62828" },
  eyeBtn: {
    position: "absolute", right: "0.8rem", top: "50%",
    transform: "translateY(-50%)",
    background: "none", border: "none",
    color: "#888", cursor: "pointer", fontSize: "1rem",
=======
    width: "100%",
    background: "#000",
    border: "1px solid #333",
    borderRadius: "10px",
    padding: "1rem",
    color: "#fff",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
  },

  button: {
    marginTop: "0.5rem",
    background: "linear-gradient(135deg,#ef4444,#991b1b)",
    border: "none",
    color: "#fff",
    padding: "1rem",
    borderRadius: "10px",
    fontWeight: 800,
    fontSize: "0.95rem",
    letterSpacing: "0.15em",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(220,38,38,0.35)",
>>>>>>> 4e3b5072001c40ddd098fb493cbb1d7eb6202f9e
  },

  links: {
    marginTop: "1rem",
    textAlign: "right",
  },

  link: {
    color: "#aaa",
    textDecoration: "none",
    fontSize: "0.9rem",
  },

  footer: {
    textAlign: "center",
    color: "#888",
    marginTop: "2rem",
  },

  linkRed: {
    color: "#ef4444",
    textDecoration: "none",
    fontWeight: 700,
  },
};