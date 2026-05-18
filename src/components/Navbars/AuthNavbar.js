import React from "react";
import { Link } from "react-router-dom";

const styles = {
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
    fontFamily: "'Barlow', Arial, sans-serif",
  },
  logo: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "2rem",
    letterSpacing: "4px",
    color: "#F5F5F5",
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
};

export default function Navbar() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;700&family=Bebas+Neue&display=swap"
        rel="stylesheet"
      />

      <nav style={styles.nav}>
        <p style={styles.logo}>
          GYM<span style={{ color: "#D62828" }}>ACCESS</span>
        </p>

        <div style={styles.navLinks}>
          <a href="/#salle" style={styles.navLink}>Salle</a>

          <a href="/#services" style={styles.navLink}>Services</a>

          <a href="/#coachs" style={styles.navLink}>Coachs</a>

          <Link to="/landing" style={styles.navLink}>
            Nutrition
          </Link>

          <Link to="/newpage" style={styles.navLink}>
            Abonnements
          </Link>

          <Link to="/auth/register" style={styles.navBtn}>
            Nous rejoindre
          </Link>

        </div>
      </nav>
    </>
  );
}