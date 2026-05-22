import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { loginUser } from "Services/apiUser";
import { notifyAuthChange } from "Services/authSession";

export default function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await loginUser({ email, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      notifyAuthChange();

      const role = res.data.user.role;
      if (role === "admin") {
        history.push("/admin/dashboard");
      } else if (role === "coach") {
        history.push("/coach/dashboard");
      } else {
        history.push("/profile");
      }
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.message ||
          "Erreur de connexion"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay} />

      <div style={styles.card}>
        <div style={styles.iconWrap}>
          <span style={styles.icon}>🔐</span>
        </div>

        <h1 style={styles.title}>CONNEXION</h1>
        <p style={styles.subtitle}>Connectez-vous à votre espace GymAccess</p>

        {error && <div style={styles.errorBox}>{error}</div>}

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

        <p style={styles.demoHint}>
          Seed — <span style={{ color: "#888" }}>admin@gym.com</span> /{" "}
          <span style={{ color: "#888" }}>Admin123!</span>
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
  icon: { fontSize: "30px" },
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: 800,
    letterSpacing: "0.2em",
    marginBottom: "0.7rem",
  },
  subtitle: { color: "#888", textAlign: "center", marginBottom: "2rem" },
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
  form: { display: "flex", flexDirection: "column", gap: "1.5rem" },
  label: {
    display: "block",
    color: "#aaa",
    fontSize: "0.75rem",
    fontWeight: 700,
    marginBottom: "0.5rem",
    letterSpacing: "0.15em",
  },
  input: {
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
    background: "linear-gradient(135deg,#D62828,#991b1b)",
    border: "none",
    color: "#fff",
    padding: "1rem",
    borderRadius: "10px",
    fontWeight: 800,
    fontSize: "0.95rem",
    letterSpacing: "0.15em",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(220,38,38,0.35)",
  },
  links: { marginTop: "1rem", textAlign: "right" },
  link: { color: "#aaa", textDecoration: "none", fontSize: "0.9rem" },
  footer: { textAlign: "center", color: "#888", marginTop: "2rem" },
  linkRed: { color: "#ef4444", textDecoration: "none", fontWeight: 700 },
  demoHint: {
    color: "#444",
    fontSize: "0.72rem",
    textAlign: "center",
    marginTop: "1.5rem",
  },
};
