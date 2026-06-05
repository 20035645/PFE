import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    bottom: 0,
    width: "256px",
    background: "#111111",
    borderRight: "1px solid rgba(214,40,40,0.18)",
    display: "flex",
    flexDirection: "column",
    zIndex: 40,
    fontFamily: "'Barlow', Arial, sans-serif",
    overflowY: "auto",
  },
  header: {
    padding: "20px 20px 16px",
    borderBottom: "1px solid rgba(214,40,40,0.15)",
    background: "rgba(10,10,10,0.6)",
    flexShrink: 0,
  },
  body: {
    flex: 1,
    padding: "8px 0",
    overflowY: "auto",
  },
  sectionLabel: {
    padding: "18px 20px 8px",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "0.72rem",
    letterSpacing: "3px",
    color: "#D62828",
    textTransform: "uppercase",
  },
  divider: {
    border: "none",
    borderTop: "1px solid rgba(214,40,40,0.13)",
    margin: "6px 0",
  },
  statsCard: {
    margin: "12px 14px 16px",
    padding: "14px 16px",
    background: "rgba(214,40,40,0.07)",
    border: "1px solid rgba(214,40,40,0.22)",
  },
  statsLabel: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "0.72rem",
    letterSpacing: "2px",
    color: "#D62828",
    marginBottom: "10px",
  },
  statsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statItem: { textAlign: "center" },
  statValue: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "1.5rem",
    color: "#F5F5F5",
    letterSpacing: "1px",
    lineHeight: 1,
  },
  statDesc: {
    fontSize: "0.65rem",
    color: "#666",
    textTransform: "uppercase",
    letterSpacing: "1px",
    marginTop: "2px",
  },
  footer: {
    padding: "14px 20px",
    borderTop: "1px solid rgba(214,40,40,0.15)",
    background: "rgba(10,10,10,0.4)",
    flexShrink: 0,
  },
  userRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  avatar: {
    width: "32px",
    height: "32px",
    background: "#D62828",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "0.9rem",
    color: "#fff",
    letterSpacing: "1px",
    flexShrink: 0,
  },
};

function NavItem({ to, icon, label, badge }) {
  const location = useLocation();
  const active = location.pathname === to;

  return (
    <li style={{ listStyle: "none" }}>
      <Link
        to={to}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "10px 20px",
          color: active ? "#D62828" : "#7A7A7A",
          textDecoration: "none",
          fontSize: "0.75rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "2px",
          background: active ? "rgba(214,40,40,0.1)" : "transparent",
          borderLeft: active ? "2px solid #D62828" : "2px solid transparent",
          transition: "all 0.15s ease",
        }}
      >
        <i
          className={`${icon} text-sm`}
          style={{ width: "16px", textAlign: "center", opacity: active ? 1 : 0.6 }}
        />
        <span style={{ flex: 1 }}>{label}</span>

        {/* ✅ Badge optionnel (ex: nombre de membres en attente) */}
        {badge > 0 && (
          <span style={{
            background: "#D62828",
            color: "#fff",
            fontSize: "0.6rem",
            fontWeight: 700,
            padding: "2px 6px",
            borderRadius: "10px",
            letterSpacing: "0.5px",
            lineHeight: 1.4,
          }}>
            {badge}
          </span>
        )}
      </Link>
    </li>
  );
}

export default function Sidebar({ pendingCount = 0 }) {
  const [collapseShow, setCollapseShow] = useState(false);
  const [sidebarStats, setSidebarStats] = useState({
    totalMembres: 0,
    actifs: 0,
    seances: 0,
  });

  useEffect(() => {
    async function fetchSidebarStats() {
      try {
        const res = await fetch("http://localhost:5000/api/members/getAllMembers");
        const members = await res.json();
        const membresSeulement = members.filter(m => m.role === "membre");
        const actifs = membresSeulement.filter(m => m.statut === "actif").length;
        setSidebarStats({
          totalMembres: membresSeulement.length,
          actifs,
          seances: 0, // tu peux connecter /api/seances plus tard
        });
      } catch (err) {
        console.error("Erreur stats sidebar:", err);
      }
    }
    fetchSidebarStats();
  }, []);

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;700;800&family=Bebas+Neue&display=swap"
        rel="stylesheet"
      />

      {/* Mobile toggle */}
      <button
        onClick={() => setCollapseShow(!collapseShow)}
        style={{
          position: "fixed",
          top: "16px",
          left: "16px",
          zIndex: 50,
          display: "none",
          background: "rgba(17,17,17,0.9)",
          border: "1px solid rgba(214,40,40,0.3)",
          color: "#F5F5F5",
          padding: "8px 12px",
          cursor: "pointer",
        }}
        className="md:hidden"
      >
        <i className="fas fa-bars" />
      </button>

      <nav style={styles.nav} className={`md:flex ${collapseShow ? "flex" : "hidden md:flex"}`}>

        {/* Header / Logo */}
        <div style={styles.header}>
          <Link to="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: "2rem",
              letterSpacing: "4px",
              color: "#F5F5F5",
              lineHeight: 1,
            }}>
              GYM<span style={{ color: "#D62828" }}>ACCESS</span>
            </div>
          </Link>
        </div>

        {/* Body */}
        <div style={styles.body}>

          <div style={styles.sectionLabel}>Administration</div>
          <ul style={{ padding: 0, margin: 0 }}>
            <NavItem to="/admin/dashboard" icon="fas fa-chart-bar" label="Dashboard" />
            <NavItem to="/admin/settings" icon="fas fa-cog" label="Paramètres" />
            {/* ✅ NOUVEAU — lien Paiements avec badge si membres en attente */}
            <NavItem to="/admin/paiements" icon="fas fa-credit-card" label="Paiements" badge={pendingCount} />
            <NavItem to="/admin/tables" icon="fas fa-users" label="Membres" />
            <NavItem to="/admin/maps" icon="fas fa-map-marked-alt" label="Localisation" />
          </ul>

          <hr style={styles.divider} />
          <div style={styles.sectionLabel}>Pages</div>
          <ul style={{ padding: 0, margin: 0 }}>
            <NavItem to="/" icon="fas fa-dumbbell" label="Salle de sport" />
            <NavItem to="/auth/login" icon="fas fa-sign-in-alt" label="Connexion" />
            <NavItem to="/auth/register" icon="fas fa-user-plus" label="Inscription" />
          </ul>

          <hr style={styles.divider} />

          {/* Quick stats */}
          <div style={styles.statsCard}>
            <div style={styles.statsLabel}>Aujourd'hui</div>
            <div style={styles.statsRow}>
              <div style={styles.statItem}>
                <div style={styles.statValue}>{sidebarStats.totalMembres}</div>
                <div style={styles.statDesc}>Membres</div>
              </div>
              <div style={{ width: "1px", background: "rgba(214,40,40,0.2)", alignSelf: "stretch" }} />
              <div style={styles.statItem}>
                <div style={{ ...styles.statValue, color: "#D62828" }}>{sidebarStats.actifs}</div>
                <div style={styles.statDesc}>Actifs</div>
              </div>
              <div style={{ width: "1px", background: "rgba(214,40,40,0.2)", alignSelf: "stretch" }} />
              <div style={styles.statItem}>
                <div style={styles.statValue}>{sidebarStats.seances}</div>
                <div style={styles.statDesc}>Séances</div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer utilisateur */}
        <div style={styles.footer}>
          <div style={styles.userRow}>
            <div style={styles.avatar}>AD</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#F5F5F5", textTransform: "uppercase", letterSpacing: "1px" }}>
                Admin
              </div>
              <div style={{ fontSize: "0.65rem", color: "#555", textTransform: "uppercase", letterSpacing: "1px", marginTop: "2px" }}>
                Administrateur
              </div>
            </div>
            <UserDropdown />
          </div>
        </div>

      </nav>
    </>
  );
}