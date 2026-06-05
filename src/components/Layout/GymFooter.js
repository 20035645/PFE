import React from "react";
import { Link } from "react-router-dom";
import { colors, fonts } from "theme/gymTheme";

export default function GymFooter() {
  return (
    <footer
      style={{
        marginTop: "auto",
        padding: "2.5rem 5%",
        borderTop: `1px solid ${colors.borderRed}`,
        background: colors.dark,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      <div style={{ fontFamily: fonts.display, fontSize: "1.4rem", letterSpacing: "3px" }}>
        GYM<span style={{ color: colors.red }}>ACCESS</span>
      </div>
      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        <Link to="/" style={linkStyle}>Accueil</Link>
        <Link to="/auth/login" style={linkStyle}>Connexion</Link>
        <Link to="/auth/register" style={linkStyle}>Inscription</Link>
      </div>
      <div style={{ color: colors.mutedDark, fontSize: "0.8rem" }}>
        © {new Date().getFullYear()} GymAccess — Tous droits réservés
      </div>
    </footer>
  );
}

const linkStyle = {
  color: colors.muted,
  textDecoration: "none",
  fontSize: "0.8rem",
  letterSpacing: "1px",
};
