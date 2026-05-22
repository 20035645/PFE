import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { colors, fonts } from "theme/gymTheme";
import { getMemberSession } from "Services/authSession";

const links = [
  { to: "/", label: "Accueil", hash: null },
  { to: "/landing", label: "Nutrition", hash: null },
  { to: "/#tarifs", label: "Tarifs", hash: "tarifs" },
];

export default function GymNavbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const member = getMemberSession();

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    return location.pathname === path;
  };

  return (
    <nav className="gym-navbar">
      <Link to="/" style={styles.logo} onClick={() => setMenuOpen(false)}>
        GYM<span style={{ color: colors.red }}>ACCESS</span>
      </Link>

      <button
        type="button"
        className="gym-nav-toggle"
        aria-label="Menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <div className={`gym-nav-links ${menuOpen ? "gym-nav-open" : ""}`}>
        {links.map((l) => (
          <Link
            key={l.label}
            to={l.to}
            style={{
              ...styles.link,
              ...(isActive(l.to.replace("/#tarifs", "/")) ? styles.linkActive : {}),
            }}
            onClick={() => setMenuOpen(false)}
          >
            {l.label}
          </Link>
        ))}
        {member ? (
          <Link to="/profile" style={styles.btnPrimary} onClick={() => setMenuOpen(false)}>
            Mon espace
          </Link>
        ) : (
          <>
            <Link to="/auth/login" style={styles.link} onClick={() => setMenuOpen(false)}>
              Connexion
            </Link>
            <Link to="/auth/register" style={styles.btnPrimary} onClick={() => setMenuOpen(false)}>
              S&apos;inscrire
            </Link>
          </>
        )}
      </div>

      <style>{`
        .gym-navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 5%;
          background: rgba(10, 10, 10, 0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(214, 40, 40, 0.22);
        }
        .gym-nav-links {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;
        }
        .gym-nav-toggle {
          display: none;
          background: transparent;
          border: 1px solid #333;
          color: #fff;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1.1rem;
        }
        @media (max-width: 768px) {
          .gym-nav-toggle { display: block; }
          .gym-nav-links {
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            flex-direction: column;
            align-items: stretch;
            padding: 16px 5%;
            background: #111;
            border-bottom: 1px solid rgba(214,40,40,0.2);
            gap: 12px;
          }
          .gym-nav-links.gym-nav-open { display: flex; }
        }
      `}</style>
    </nav>
  );
}

const styles = {
  logo: {
    fontFamily: fonts.display,
    fontSize: "1.75rem",
    letterSpacing: "4px",
    color: colors.text,
    textDecoration: "none",
    margin: 0,
  },
  link: {
    color: colors.muted,
    textDecoration: "none",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontSize: "0.72rem",
    fontWeight: 700,
    transition: "color 0.2s",
  },
  linkActive: {
    color: colors.text,
  },
  btnPrimary: {
    background: colors.red,
    color: "#fff",
    textDecoration: "none",
    padding: "10px 16px",
    borderRadius: "4px",
    textTransform: "uppercase",
    letterSpacing: "2px",
    fontSize: "0.72rem",
    fontWeight: 700,
    textAlign: "center",
  },
};
