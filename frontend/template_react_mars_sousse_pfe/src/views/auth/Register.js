import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { registerUser } from "services/apiUser";

const plans = [
  { id: "standard", name: "Standard", price: "39 DT/mois" },
  { id: "premium", name: "Premium", price: "69 DT/mois" },
  { id: "coaching", name: "Coaching", price: "99 DT/mois" },
];

const objectifs = [
  { id: "Prise de masse", label: "💪 Prise de masse" },
  { id: "Perte de poids", label: "🔥 Perte de poids" },
  { id: "Remise en forme", label: "🏃 Remise en forme" },
  { id: "Sèche", label: "⚡ Sèche" },
];

export default function Register() {
  const history = useHistory();
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [selectedObjectif, setSelectedObjectif] = useState("Prise de masse");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    age: "",
    poids: "",
    taille: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    if (form.password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    setLoading(true);
    try {
      const data = await registerUser({
        prenom: form.firstName,
        nom: form.lastName,
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        password: form.password,
        numTelephone: form.phone,
        age: form.age ? Number(form.age) : undefined,
        poids: form.poids ? Number(form.poids) : undefined,
        taille: form.taille ? Number(form.taille) : undefined,
        objectif: selectedObjectif,
        abonnement: selectedPlan,
        role: "membre",
      });

      if (data.token) localStorage.setItem("token", data.token);
      if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

      history.push("/auth/login");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          err.message ||
          "Erreur lors de l'inscription"
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
          <span style={styles.icon}>👤</span>
        </div>
        <h1 style={styles.title}>CRÉER MON COMPTE</h1>
        <p style={styles.subtitle}>
          Rejoignez GymAccess et commencez votre transformation
        </p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <div style={styles.sectionTitle}>INFORMATIONS PERSONNELLES</div>
            <div style={styles.grid}>
              <Input
                label="PRÉNOM"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="Ahmed"
              />
              <Input
                label="NOM"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Chaabane"
              />
              <Input
                label="EMAIL"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="votre@email.com"
              />
              <Input
                label="TÉLÉPHONE"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+216 XX XXX XXX"
              />
              <Input
                label="MOT DE PASSE"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
              />
              <Input
                label="CONFIRMER"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <div style={styles.sectionTitle}>BILAN CORPOREL</div>
            <div style={styles.grid3}>
              <Input
                label="ÂGE"
                name="age"
                type="number"
                value={form.age}
                onChange={handleChange}
                placeholder="25"
              />
              <Input
                label="POIDS (kg)"
                name="poids"
                type="number"
                value={form.poids}
                onChange={handleChange}
                placeholder="75"
              />
              <Input
                label="TAILLE (cm)"
                name="taille"
                type="number"
                value={form.taille}
                onChange={handleChange}
                placeholder="175"
              />
            </div>
          </div>

          <div>
            <div style={styles.sectionTitle}>OBJECTIF</div>
            <div style={styles.objectifGrid}>
              {objectifs.map((obj) => {
                const active = selectedObjectif === obj.id;
                return (
                  <button
                    key={obj.id}
                    type="button"
                    onClick={() => setSelectedObjectif(obj.id)}
                    style={{
                      ...styles.objectifCard,
                      borderColor: active ? "#D62828" : "#333",
                      background: active
                        ? "rgba(239,68,68,0.1)"
                        : "#111",
                    }}
                  >
                    <div style={{ ...styles.planName, fontSize: "0.85rem" }}>
                      {obj.label}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <div style={styles.sectionTitle}>ABONNEMENT</div>
            <div style={styles.planGrid}>
              {plans.map((plan) => {
                const active = selectedPlan === plan.id;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlan(plan.id)}
                    style={{
                      ...styles.planCard,
                      borderColor: active ? "#D62828" : "#333",
                      background: active
                        ? "rgba(239,68,68,0.1)"
                        : "#111",
                    }}
                  >
                    <div style={styles.planName}>{plan.name.toUpperCase()}</div>
                    <div style={styles.planPrice}>{plan.price}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "INSCRIPTION EN COURS..." : "CRÉER MON COMPTE"}
          </button>
        </form>

        <p style={styles.footer}>
          Déjà membre ?{" "}
          <Link to="/auth/login" style={styles.linkRed}>
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label style={styles.label}>{label}</label>
      <input
        style={styles.input}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={type !== "number"}
      />
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
    padding: "3rem 1rem",
    position: "relative",
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
    maxWidth: "700px",
    background: "#111",
    border: "1px solid #222",
    borderRadius: "20px",
    padding: "3rem",
    boxShadow: "0 20px 60px rgba(220,38,38,0.25)",
  },
  iconWrap: {
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#D62828,#991b1b)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto 1.5rem",
  },
  icon: { fontSize: "32px" },
  title: {
    color: "#fff",
    textAlign: "center",
    fontSize: "2rem",
    fontWeight: 800,
    letterSpacing: "0.2em",
    marginBottom: "0.8rem",
  },
  subtitle: { textAlign: "center", color: "#888", marginBottom: "2.5rem" },
  errorBox: {
    background: "rgba(220,38,38,0.12)",
    border: "1px solid rgba(220,38,38,0.4)",
    color: "#f87171",
    borderRadius: "8px",
    padding: "0.75rem 1rem",
    marginBottom: "1.5rem",
    fontSize: "0.88rem",
    textAlign: "center",
  },
  form: { display: "flex", flexDirection: "column", gap: "2rem" },
  sectionTitle: {
    color: "#D62828",
    fontSize: "0.72rem",
    fontWeight: 800,
    letterSpacing: "0.2em",
    marginBottom: "1rem",
    borderBottom: "1px solid rgba(239,68,68,0.2)",
    paddingBottom: "0.5rem",
  },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.2rem" },
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
  objectifGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.8rem",
  },
  objectifCard: {
    border: "2px solid",
    borderRadius: "10px",
    padding: "0.9rem",
    cursor: "pointer",
    transition: "0.2s",
    textAlign: "center",
  },
  planGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" },
  planCard: {
    border: "2px solid",
    borderRadius: "12px",
    padding: "1.2rem",
    cursor: "pointer",
    transition: "0.2s",
  },
  planName: {
    color: "#fff",
    fontWeight: 800,
    letterSpacing: "0.1em",
    textAlign: "center",
  },
  planPrice: {
    color: "#888",
    marginTop: "0.5rem",
    textAlign: "center",
    fontSize: "0.9rem",
  },
  button: {
    background: "linear-gradient(135deg,#D62828,#991b1b)",
    border: "none",
    borderRadius: "12px",
    padding: "1rem",
    color: "#fff",
    fontWeight: 800,
    fontSize: "1rem",
    letterSpacing: "0.15em",
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(220,38,38,0.35)",
  },
  footer: { textAlign: "center", marginTop: "2rem", color: "#888" },
  linkRed: { color: "#D62828", textDecoration: "none", fontWeight: 700 },
};
