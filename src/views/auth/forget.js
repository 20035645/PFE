// FORGET.JS

import React from "react";
import { Link } from "react-router-dom";

export default function Forget() {
  return (
    <>
      <div style={styles.page}>
        <div style={styles.overlay}></div>

        <div style={styles.card}>
          <div style={styles.iconWrap}>
            <span style={styles.icon}>🔑</span>
          </div>

          <h1 style={styles.title}>RESET PASSWORD</h1>

          <p style={styles.subtitle}>
            Entrez votre email pour réinitialiser votre mot de passe
          </p>

          <form>
            <div style={styles.inputGroup}>
              <label style={styles.label} htmlFor="grid-password">
                EMAIL
              </label>

              <input
                type="email"
                placeholder="votre@email.com"
                style={styles.input}
              />
            </div>

            <div style={styles.buttonWrap}>
              <button
                style={styles.button}
                type="button"
              >
                ENVOYER
              </button>
            </div>
          </form>

          <div style={styles.bottomLinks}>
            <div>
              <Link
                to="/auth/login"
                style={styles.link}
              >
                Retour connexion
              </Link>
            </div>

            <div>
              <Link
                to="/auth/register"
                style={styles.linkRed}
              >
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
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
    lineHeight: "1.6",
  },

  inputGroup: {
    marginBottom: "1.5rem",
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

  buttonWrap: {
    marginTop: "1.5rem",
  },

  button: {
    width: "100%",
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
  },

  bottomLinks: {
    marginTop: "2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  link: {
    color: "#aaa",
    textDecoration: "none",
    fontSize: "0.9rem",
  },

  linkRed: {
    color: "#ef4444",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "0.9rem",
  },
};