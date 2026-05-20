// REGISTER.JS
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
<<<<<<< HEAD
import { AUTH_API } from "Services/api";
=======
import { registerUser } from "../../services/apiUser";

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
>>>>>>> 4e3b5072001c40ddd098fb493cbb1d7eb6202f9e

export default function Register() {
  const history = useHistory();

  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [selectedObjectif, setSelectedObjectif] = useState("Prise de masse");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    password: "", confirmPassword: "",
    age: "", poids: "", taille: "",
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
<<<<<<< HEAD
      const res = await fetch(`${AUTH_API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          prenom,
          email,
          password,
          role: "membre",
        }),
=======
      const res = await registerUser({
        name: form.firstName + ' ' + form.lastName,
        email: form.email,
        password: form.password,
        numTelephone: form.phone,
        abonnement: selectedPlan,
        age: Number(form.age),
        poids: Number(form.poids),
        taille: Number(form.taille),
        objectif: selectedObjectif,
>>>>>>> 4e3b5072001c40ddd098fb493cbb1d7eb6202f9e
      });

<<<<<<< HEAD
      if (!res.ok) {
        setError(data.error || data.message || "Erreur lors de l'inscription.");
        return;
      }
=======
      if (res.data.token) localStorage.setItem("token", res.data.token);
      if (res.data.user) localStorage.setItem("user", JSON.stringify(res.data.user));
>>>>>>> 4e3b5072001c40ddd098fb493cbb1d7eb6202f9e

      history.push("/auth/login");
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || "Erreur lors de l'inscription");
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

          {/* Infos personnelles */}
          <div>
            <div style={styles.sectionTitle}>INFORMATIONS PERSONNELLES</div>
            <div style={styles.grid}>
              <Input label="PRÉNOM" name="firstName" value={form.firstName} onChange={handleChange} placeholder="Ahmed" />
              <Input label="NOM" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Chaabane" />
              <Input label="EMAIL" name="email" type="email" value={form.email} onChange={handleChange} placeholder="votre@email.com" />
              <Input label="TÉLÉPHONE" name="phone" value={form.phone} onChange={handleChange} placeholder="+216 XX XXX XXX" />
              <Input label="MOT DE PASSE" name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" />
              <Input label="CONFIRMER" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="••••••••" />
            </div>
          </div>

          {/* Bilan corporel */}
          <div>
            <div style={styles.sectionTitle}>BILAN CORPOREL</div>
            <div style={styles.grid3}>
              <Input label="ÂGE" name="age" type="number" value={form.age} onChange={handleChange} placeholder="25" />
              <Input label="POIDS (kg)" name="poids" type="number" value={form.poids} onChange={handleChange} placeholder="75" />
              <Input label="TAILLE (cm)" name="taille" type="number" value={form.taille} onChange={handleChange} placeholder="175" />
            </div>
          </div>

          {/* Objectif */}
          <div>
            <div style={styles.sectionTitle}>OBJECTIF</div>
            <div style={styles.objectifGrid}>
              {objectifs.map((obj) => {
                const active = selectedObjectif === obj.id;
                return (
                  <button key={obj.id} type="button" onClick={() => setSelectedObjectif(obj.id)}
                    style={{ ...styles.objectifCard, borderColor: active ? "#ef4444" : "#333", background: active ? "rgba(239,68,68,0.1)" : "#111" }}>
                    <div style={{ ...styles.planName, fontSize: "0.85rem" }}>{obj.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

<<<<<<< HEAD
            <label style={s.label}>Confirmer le mot de passe</label>
            <input
              style={{
                ...s.input,
                ...(focusField === "confirm" ? s.inputFocus : {}),
                ...(confirm && confirm !== password ? s.inputInvalid : {}),
                ...(confirm && confirm === password ? s.inputValid : {}),
              }}
              type="password" placeholder="••••••••"
              value={confirm} onChange={e => setConfirm(e.target.value)}
              onFocus={() => setFocusField("confirm")} onBlur={() => setFocusField(null)}
              onKeyDown={e => e.key === "Enter" && handleRegister()}
            />

            <button
              style={{ ...s.btnPrimary, opacity: loading ? 0.7 : 1, marginTop: "0.5rem" }}
              onClick={handleRegister} disabled={loading}
            >
              {loading ? "INSCRIPTION..." : "S'INSCRIRE"}
            </button>

            <div style={s.divider}>
              <div style={s.divLine} /><span style={s.divText}>déjà membre ?</span><div style={s.divLine} />
=======
          {/* Abonnement */}
          <div>
            <div style={styles.sectionTitle}>ABONNEMENT</div>
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
>>>>>>> 4e3b5072001c40ddd098fb493cbb1d7eb6202f9e
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

<<<<<<< HEAD
const s = {
  page: { minHeight: "100vh", background: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Barlow',sans-serif", color: "#F5F5F5", position: "relative", overflow: "hidden", padding: "2rem 1rem" },
  bgLines: { position: "absolute", inset: 0, pointerEvents: "none" },
  bgLine: { position: "absolute", top: 0, width: "1px", height: "100%", background: "linear-gradient(to bottom,transparent,rgba(214,40,40,0.08),transparent)", animation: "pulse 4s ease-in-out infinite" },
  blob: { position: "absolute", width: "500px", height: "500px", background: "radial-gradient(circle,rgba(214,40,40,0.12) 0%,transparent 70%)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" },
  card: { position: "relative", zIndex: 1, background: "#111111", border: "1px solid rgba(214,40,40,0.3)", borderRadius: "4px", padding: "3rem 2.5rem", width: "100%", maxWidth: "460px", boxShadow: "0 0 80px rgba(214,40,40,0.12)", animation: "fadeUp 0.5s ease both" },
  logo: { display: "block", textAlign: "center", fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.8rem", letterSpacing: "4px", color: "#F5F5F5", textDecoration: "none", marginBottom: "2rem" },
  red: { color: "#D62828" },
  title: { fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.9rem", letterSpacing: "3px", marginBottom: "0.3rem", textAlign: "center" },
  sub: { color: "#888", fontSize: "0.85rem", textAlign: "center", marginBottom: "2rem" },
  errorBox: { background: "rgba(214,40,40,0.1)", border: "1px solid rgba(214,40,40,0.4)", color: "#ff6b6b", padding: "0.7rem 1rem", borderRadius: "2px", fontSize: "0.85rem", marginBottom: "1rem" },
  label: { display: "block", fontSize: "0.7rem", letterSpacing: "2px", textTransform: "uppercase", color: "#888", marginBottom: "0.5rem" },
  input: { width: "100%", background: "#0A0A0A", border: "1px solid #2a2a2a", color: "#F5F5F5", padding: "0.85rem 1rem", fontFamily: "'Barlow',sans-serif", fontSize: "0.95rem", borderRadius: "2px", outline: "none", marginBottom: "1.2rem", transition: "border .2s" },
  inputFocus: { border: "1px solid #D62828" },
  inputInvalid: { border: "1px solid #D62828" },
  inputValid: { border: "1px solid #28a745" },
  eyeBtn: { position: "absolute", right: "0.8rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#888", cursor: "pointer", fontSize: "1rem" },
  btnPrimary: { width: "100%", background: "#D62828", color: "#F5F5F5", padding: "0.9rem", fontFamily: "'Barlow',sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "3px", textTransform: "uppercase", border: "none", cursor: "pointer", borderRadius: "2px", textAlign: "center", display: "block" },
  divider: { display: "flex", alignItems: "center", gap: "1rem", margin: "1.5rem 0" },
  divLine: { flex: 1, height: "1px", background: "#222" },
  divText: { color: "#555", fontSize: "0.8rem" },
  btnOutline: { width: "100%", background: "transparent", color: "#F5F5F5", padding: "0.9rem", fontFamily: "'Barlow',sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "3px", textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.2)", cursor: "pointer", borderRadius: "2px", textAlign: "center", textDecoration: "none", display: "block" },
=======
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
  page: { minHeight: "100vh", width: "100%", background: "#000", display: "flex", justifyContent: "center", alignItems: "center", padding: "3rem 1rem", position: "relative", boxSizing: "border-box" },
  overlay: { position: "absolute", inset: 0, background: "radial-gradient(circle at top, rgba(220,38,38,0.15), transparent 40%)" },
  card: { position: "relative", zIndex: 2, width: "100%", maxWidth: "700px", background: "#111", border: "1px solid #222", borderRadius: "20px", padding: "3rem", boxShadow: "0 20px 60px rgba(220,38,38,0.25)" },
  iconWrap: { width: "75px", height: "75px", borderRadius: "50%", background: "linear-gradient(135deg,#ef4444,#991b1b)", display: "flex", justifyContent: "center", alignItems: "center", margin: "0 auto 1.5rem" },
  icon: { fontSize: "32px" },
  title: { color: "#fff", textAlign: "center", fontSize: "2rem", fontWeight: 800, letterSpacing: "0.2em", marginBottom: "0.8rem" },
  subtitle: { textAlign: "center", color: "#888", marginBottom: "2.5rem" },
  errorBox: { background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.4)", color: "#f87171", borderRadius: "8px", padding: "0.75rem 1rem", marginBottom: "1.5rem", fontSize: "0.88rem", textAlign: "center" },
  form: { display: "flex", flexDirection: "column", gap: "2rem" },
  sectionTitle: { color: "#ef4444", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.2em", marginBottom: "1rem", borderBottom: "1px solid rgba(239,68,68,0.2)", paddingBottom: "0.5rem" },
  grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" },
  grid3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.2rem" },
  label: { display: "block", color: "#aaa", fontSize: "0.75rem", fontWeight: 700, marginBottom: "0.5rem", letterSpacing: "0.15em" },
  input: { width: "100%", background: "#000", border: "1px solid #333", borderRadius: "10px", padding: "1rem", color: "#fff", fontSize: "0.95rem", outline: "none", boxSizing: "border-box" },
  objectifGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" },
  objectifCard: { border: "2px solid", borderRadius: "10px", padding: "0.9rem", cursor: "pointer", transition: "0.2s", textAlign: "center" },
  planGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" },
  planCard: { border: "2px solid", borderRadius: "12px", padding: "1.2rem", cursor: "pointer", transition: "0.2s" },
  planName: { color: "#fff", fontWeight: 800, letterSpacing: "0.1em", textAlign: "center" },
  planPrice: { color: "#888", marginTop: "0.5rem", textAlign: "center", fontSize: "0.9rem" },
  button: { background: "linear-gradient(135deg,#ef4444,#991b1b)", border: "none", borderRadius: "12px", padding: "1rem", color: "#fff", fontWeight: 800, fontSize: "1rem", letterSpacing: "0.15em", cursor: "pointer", boxShadow: "0 10px 30px rgba(220,38,38,0.35)" },
  footer: { textAlign: "center", marginTop: "2rem", color: "#888" },
  linkRed: { color: "#ef4444", textDecoration: "none", fontWeight: 700 },
>>>>>>> 4e3b5072001c40ddd098fb493cbb1d7eb6202f9e
};