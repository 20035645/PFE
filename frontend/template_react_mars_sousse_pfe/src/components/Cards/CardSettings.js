import React, { useState } from "react";

const Section = ({ title, children }) => (
  <div style={{ marginBottom: "2.5rem" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1.5rem" }}>
      <span style={{
        display: "inline-block",
        width: "3px",
        height: "18px",
        background: "#e11d48",
        borderRadius: "2px",
        flexShrink: 0,
      }} />
      <h6 style={{
        color: "#e5e7eb",
        fontSize: "0.7rem",
        fontFamily: "'Barlow Condensed', sans-serif",
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        fontWeight: 700,
        margin: 0,
      }}>
        {title}
      </h6>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, #2a2a2a, transparent)" }} />
    </div>
    {children}
  </div>
);

const Field = ({ label, type = "text", defaultValue = "", placeholder = "", icon, readOnly = false }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: "1.25rem" }}>
      <label style={{
        display: "block",
        color: "#6b7280",
        fontSize: "0.65rem",
        fontFamily: "'Barlow Condensed', sans-serif",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        marginBottom: "6px",
        fontWeight: 600,
      }}>
        {label}
      </label>
      <div style={{ position: "relative" }}>
        {icon && (
          <span style={{
            position: "absolute",
            left: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: focused ? "#e11d48" : "#4b5563",
            fontSize: "0.85rem",
            transition: "color 0.2s",
            pointerEvents: "none",
          }}>
            {icon}
          </span>
        )}
        <input
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          readOnly={readOnly}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%",
            padding: icon ? "11px 14px 11px 36px" : "11px 14px",
            background: focused ? "#161616" : "#0f0f0f",
            border: `1px solid ${focused ? "#e11d48" : "#1f1f1f"}`,
            borderRadius: "6px",
            color: readOnly ? "#6b7280" : "#f3f4f6",
            fontSize: "0.875rem",
            fontFamily: "'Barlow', sans-serif",
            outline: "none",
            transition: "border-color 0.2s, background 0.2s",
            boxSizing: "border-box",
            boxShadow: focused ? "0 0 0 3px rgba(225,29,72,0.08)" : "none",
          }}
        />
      </div>
    </div>
  );
};

const Toggle = ({ label, description, defaultChecked = false }) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "14px 16px",
      background: "#0f0f0f",
      border: "1px solid #1a1a1a",
      borderRadius: "8px",
      marginBottom: "10px",
      cursor: "pointer",
      transition: "border-color 0.2s",
      borderColor: checked ? "#2a0a14" : "#1a1a1a",
    }}
      onClick={() => setChecked(!checked)}
    >
      <div>
        <div style={{ color: "#e5e7eb", fontSize: "0.875rem", fontFamily: "'Barlow', sans-serif", fontWeight: 500 }}>
          {label}
        </div>
        {description && (
          <div style={{ color: "#4b5563", fontSize: "0.75rem", fontFamily: "'Barlow', sans-serif", marginTop: "2px" }}>
            {description}
          </div>
        )}
      </div>
      <div style={{
        width: "40px",
        height: "22px",
        borderRadius: "11px",
        background: checked ? "#e11d48" : "#1f1f1f",
        border: `1px solid ${checked ? "#e11d48" : "#2a2a2a"}`,
        position: "relative",
        flexShrink: 0,
        transition: "background 0.2s",
      }}>
        <div style={{
          position: "absolute",
          top: "3px",
          left: checked ? "20px" : "3px",
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          background: "white",
          transition: "left 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.4)",
        }} />
      </div>
    </div>
  );
};

const Badge = ({ label }) => (
  <span style={{
    display: "inline-flex",
    alignItems: "center",
    gap: "5px",
    padding: "3px 10px",
    background: "rgba(225,29,72,0.1)",
    border: "1px solid rgba(225,29,72,0.25)",
    borderRadius: "20px",
    color: "#e11d48",
    fontSize: "0.65rem",
    fontFamily: "'Barlow Condensed', sans-serif",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontWeight: 600,
  }}>
    <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#e11d48", display: "inline-block" }} />
    {label}
  </span>
);

export default function CardSettings() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600&family=Barlow+Condensed:wght@600;700&display=swap" rel="stylesheet" />

      <div style={{
        background: "#0a0a0a",
        border: "1px solid #1a1a1a",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
      }}>

        {/* HEADER */}
        <div style={{
          padding: "20px 28px",
          borderBottom: "1px solid #141414",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "linear-gradient(to right, #0d0d0d, #0a0a0a)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <h6 style={{
                  color: "#f9fafb",
                  fontSize: "1.1rem",
                  fontFamily: "'Barlow Condensed', sans-serif",
                  letterSpacing: "0.08em",
                  fontWeight: 700,
                  margin: 0,
                  textTransform: "uppercase",
                }}>
                  Paramètres Administrateur
                </h6>
                <Badge label="Admin uniquement" />
              </div>
              <p style={{
                color: "#4b5563",
                fontSize: "0.75rem",
                fontFamily: "'Barlow', sans-serif",
                margin: "3px 0 0",
              }}>
                Configuration système · GymAccess v2.4
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            style={{
              padding: "9px 22px",
              background: saved ? "#16a34a" : "#e11d48",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: "0.8rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 0.3s",
              display: "flex",
              alignItems: "center",
              gap: "7px",
            }}
          >
            <span>{saved ? "✓" : "↑"}</span>
            {saved ? "Sauvegardé" : "Sauvegarder"}
          </button>
        </div>

        <div style={{ padding: "28px 28px 10px" }}>

          {/* ── INFOS SALLE ── */}
          <Section title="Informations de la Salle">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <Field label="Nom de la salle" defaultValue="GymAccess" icon="🏷" />
              <Field label="Téléphone" defaultValue="+216 XX XXX XXX" icon="📞" />
              <Field label="Adresse" defaultValue="La Marsa, Tunis" icon="📍" />
              <Field label="Email de contact" defaultValue="contact@gymaccess.tn" icon="✉" />
              <Field label="Site web" placeholder="https://gymaccess.tn" icon="🌐" />
              <Field label="Capacité maximale (membres)" defaultValue="500" icon="#" />
            </div>
          </Section>

          <div style={{ height: "1px", background: "#141414", margin: "0 0 2.5rem" }} />

          {/* ── SÉCURITÉ ── */}
          <Section title="Sécurité Administrateur">
            <div style={{
              padding: "12px 16px",
              background: "rgba(225,29,72,0.05)",
              border: "1px solid rgba(225,29,72,0.12)",
              borderRadius: "8px",
              marginBottom: "1.25rem",
              display: "flex",
              gap: "10px",
              alignItems: "flex-start",
            }}>
              <span style={{ fontSize: "0.8rem", marginTop: "1px" }}>🔒</span>
              <p style={{ color: "#9ca3af", fontSize: "0.78rem", fontFamily: "'Barlow', sans-serif", margin: 0, lineHeight: 1.5 }}>
                Le mot de passe doit contenir au moins <strong style={{ color: "#e5e7eb" }}>8 caractères</strong>, une majuscule et un caractère spécial. Les changements sont journalisés.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0 20px" }}>
              <Field label="Mot de passe actuel" type="password" placeholder="••••••••" icon="🔑" />
              <Field label="Nouveau mot de passe" type="password" placeholder="••••••••" icon="🔐" />
              <Field label="Confirmer mot de passe" type="password" placeholder="••••••••" icon="🔐" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <Field label="Email administrateur" defaultValue="admin@gymaccess.tn" icon="✉" />
              <Field label="Dernière connexion" defaultValue="Aujourd'hui, 09:32" readOnly icon="🕒" />
            </div>
          </Section>

          <div style={{ height: "1px", background: "#141414", margin: "0 0 2.5rem" }} />

          {/* ── NOTIFICATIONS ── */}
          <Section title="Notifications & Alertes">
            <Toggle
              label="Nouveaux membres"
              description="Recevoir une alerte à chaque nouvelle inscription"
              defaultChecked
            />
            <Toggle
              label="Abonnements expirés"
              description="Notification 3 jours avant et le jour de l'expiration"
              defaultChecked
            />
            <Toggle
              label="Emails automatiques"
              description="Rappels de renouvellement et confirmations envoyés aux membres"
              defaultChecked
            />
            <Toggle
              label="Rapport journalier"
              description="Résumé quotidien des présences et paiements par email"
            />
            <Toggle
              label="Alertes de sécurité"
              description="Tentatives de connexion suspectes et accès non autorisés"
              defaultChecked
            />
          </Section>

          <div style={{ height: "1px", background: "#141414", margin: "0 0 2.5rem" }} />

          {/* ── SYSTÈME ── */}
          <Section title="Configuration Système">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
              <Field label="Fuseau horaire" defaultValue="Africa/Tunis (UTC+1)" icon="🌍" />
              <Field label="Devise" defaultValue="TND — Dinar Tunisien" icon="💱" />
              <Field label="Langue de l'interface" defaultValue="Français" icon="🗣" />
              <Field label="Format de date" defaultValue="JJ/MM/AAAA" icon="📅" />
            </div>
          </Section>

        </div>

        {/* FOOTER */}
        <div style={{
          padding: "14px 28px",
          borderTop: "1px solid #141414",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#070707",
        }}>
          <span style={{ color: "#374151", fontSize: "0.7rem", fontFamily: "'Barlow', sans-serif" }}>
            GymAccess Admin Panel · Toutes les modifications sont enregistrées de manière sécurisée
          </span>
          <span style={{ color: "#374151", fontSize: "0.7rem", fontFamily: "'Barlow', sans-serif" }}>
            v2.4.1
          </span>
        </div>
      </div>
    </>
  );
}