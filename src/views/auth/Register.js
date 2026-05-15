// REGISTER.JS
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { registerUser } from "../../services/apiUser";

const plans = [
  { id: "standard", name: "Standard", price: "39 DT/mois" },
  { id: "premium",  name: "Premium",  price: "69 DT/mois" },
  { id: "coaching", name: "Coaching", price: "99 DT/mois" },
];

export default function Register() {
  const history = useHistory();

  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", password: "", confirmPassword: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
      const res = await registerUser({
        firstName: form.firstName,
        lastName:  form.lastName,
        email:     form.email,
        phone:     form.phone,
        password:  form.password,
        plan:      selectedPlan,
      });

      if (res.data.token) localStorage.setItem("token", res.data.token);

      // Après inscription → aller sur login
      history.push("/auth/login");
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>
      <div style={styles.card}>
        <div style={styles.iconWrap}><span style={styles.icon}>👤</span></div>
        <h1 style={styles.title}>CRÉER MON COMPTE</h1>
        <p style={styles.subtitle}>Rejoignez GymAccess et commencez votre transformation</p>

        {error && <div style={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.grid}>
            <Input label="PRÉNOM"    name="firstName"       value={form.firstName}       onChange={handleChange} placeholder="Ahmed" />
            <Input label="NOM"       name="lastName"        value={form.lastName}        onChange={handleChange} placeholder="Chaabane" />
            <Input label="EMAIL"     name="email"           type="email"    value={form.email}           onChange={handleChange} placeholder="votre@email.com" />
            <Input label="TÉLÉPHONE" name="phone"           value={form.phone}           onChange={handleChange} placeholder="+216 XX XXX XXX" />
            <Input label="MOT DE PASSE" name="password"     type="password" value={form.password}        onChange={handleChange} placeholder="••••••••" />
            <Input label="CONFIRMER"    name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" />
          </div>

          <div>
            <div style={styles.label}>ABONNEMENT</div>
            <div style={styles.planGrid}>
              {plans.map((plan) => {
                const active = selectedPlan === plan.id;
                return (
                  <button key={plan.id} type="button" onClick={() => setSelectedPlan(plan.id)}
                    style={{ ...styles.planCard, borderColor: active ? "#ef4444" : "#333", background: active ? "rgba(239,68,68,0.1)" : "#111" }}>
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
          <Link to="/auth/login" style={styles.linkRed}>Se connecter</Link>
        </p>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label style={styles.label}>{label}</label>
      <input style={styles.input} name={name} type={type} value={value}
        onChange={onChange} placeholder={placeholder} required />
    </div>
  );
}

const styles = {
  page:     { minHeight:"100vh", width:"100%", background:"#000", display:"flex", justifyContent:"center", alignItems:"center", padding:"3rem 1rem", position:"relative", boxSizing:"border-box" },
  overlay:  { position:"absolute", inset:0, background:"radial-gradient(circle at top, rgba(220,38,38,0.15), transparent 40%)" },
  card:     { position:"relative", zIndex:2, width:"100%", maxWidth:"700px", background:"#111", border:"1px solid #222", borderRadius:"20px", padding:"3rem", boxShadow:"0 20px 60px rgba(220,38,38,0.25)" },
  iconWrap: { width:"75px", height:"75px", borderRadius:"50%", background:"linear-gradient(135deg,#ef4444,#991b1b)", display:"flex", justifyContent:"center", alignItems:"center", margin:"0 auto 1.5rem" },
  icon:     { fontSize:"32px" },
  title:    { color:"#fff", textAlign:"center", fontSize:"2rem", fontWeight:800, letterSpacing:"0.2em", marginBottom:"0.8rem" },
  subtitle: { textAlign:"center", color:"#888", marginBottom:"2.5rem" },
  errorBox: { background:"rgba(220,38,38,0.12)", border:"1px solid rgba(220,38,38,0.4)", color:"#f87171", borderRadius:"8px", padding:"0.75rem 1rem", marginBottom:"1.5rem", fontSize:"0.88rem", textAlign:"center" },
  form:     { display:"flex", flexDirection:"column", gap:"2rem" },
  grid:     { display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.2rem" },
  label:    { display:"block", color:"#aaa", fontSize:"0.75rem", fontWeight:700, marginBottom:"0.5rem", letterSpacing:"0.15em" },
  input:    { width:"100%", background:"#000", border:"1px solid #333", borderRadius:"10px", padding:"1rem", color:"#fff", fontSize:"0.95rem", outline:"none", boxSizing:"border-box" },
  planGrid: { display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"1rem" },
  planCard: { border:"2px solid", borderRadius:"12px", padding:"1.2rem", cursor:"pointer", transition:"0.2s" },
  planName: { color:"#fff", fontWeight:800, letterSpacing:"0.1em", textAlign:"center" },
  planPrice:{ color:"#888", marginTop:"0.5rem", textAlign:"center", fontSize:"0.9rem" },
  button:   { background:"linear-gradient(135deg,#ef4444,#991b1b)", border:"none", borderRadius:"12px", padding:"1rem", color:"#fff", fontWeight:800, fontSize:"1rem", letterSpacing:"0.15em", cursor:"pointer", boxShadow:"0 10px 30px rgba(220,38,38,0.35)" },
  footer:   { textAlign:"center", marginTop:"2rem", color:"#888" },
  linkRed:  { color:"#ef4444", textDecoration:"none", fontWeight:700 },
};