import React, { useState, useEffect } from "react";

const API = "http://localhost:5000/api";

const METHODS_LABEL = {
    especes: "Espèces",
    carte_bancaire: "Carte bancaire",
    virement_bancaire: "Virement bancaire",
    paypal: "PayPal",
};

const STATUS_STYLE = {
    effectue: { background: "rgba(34,197,94,0.15)", color: "#22c55e" },
    en_attente: { background: "rgba(234,179,8,0.15)", color: "#eab308" },
    echoue: { background: "rgba(214,40,40,0.15)", color: "#D62828" },
};

const STATUS_LABEL = {
    effectue: "Effectué",
    en_attente: "En attente",
    echoue: "Échoué",
};

const s = {
    page: { padding: "32px 24px", color: "#F5F5F5", fontFamily: "'Barlow', Arial, sans-serif" },
    title: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "2rem", letterSpacing: "4px", color: "#F5F5F5", marginBottom: "28px" },
    section: { background: "#1a1a1a", border: "1px solid rgba(214,40,40,0.18)", borderRadius: "4px", padding: "20px", marginBottom: "24px" },
    secTitle: { fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", letterSpacing: "3px", color: "#D62828", marginBottom: "16px" },
    table: { width: "100%", borderCollapse: "collapse", fontSize: "0.78rem" },
    th: { textAlign: "left", padding: "8px 12px", color: "#555", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1.5px", fontSize: "0.65rem", borderBottom: "1px solid rgba(214,40,40,0.15)" },
    td: { padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.04)", color: "#ccc", verticalAlign: "middle" },
    badge: { padding: "3px 10px", borderRadius: "20px", fontSize: "0.65rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" },
    btnGreen: { background: "rgba(34,197,94,0.15)", color: "#22c55e", border: "1px solid rgba(34,197,94,0.3)", padding: "5px 12px", borderRadius: "3px", cursor: "pointer", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "1px", marginRight: "6px" },
    btnRed: { background: "rgba(214,40,40,0.15)", color: "#D62828", border: "1px solid rgba(214,40,40,0.3)", padding: "5px 12px", borderRadius: "3px", cursor: "pointer", fontSize: "0.7rem", fontWeight: 700, letterSpacing: "1px" },
    grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" },
    label: { display: "block", fontSize: "0.65rem", color: "#555", textTransform: "uppercase", letterSpacing: "1.5px", marginBottom: "6px", fontWeight: 700 },
    input: { width: "100%", background: "#111", border: "1px solid rgba(214,40,40,0.2)", borderRadius: "3px", padding: "9px 12px", color: "#F5F5F5", fontSize: "0.82rem", outline: "none", boxSizing: "border-box" },
    select: { width: "100%", background: "#111", border: "1px solid rgba(214,40,40,0.2)", borderRadius: "3px", padding: "9px 12px", color: "#F5F5F5", fontSize: "0.82rem", outline: "none", boxSizing: "border-box" },
    submitBtn: { marginTop: "6px", background: "#D62828", color: "#fff", border: "none", padding: "10px 28px", borderRadius: "3px", fontFamily: "'Bebas Neue', sans-serif", fontSize: "1rem", letterSpacing: "3px", cursor: "pointer" },
    empty: { textAlign: "center", padding: "32px", color: "#444", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "2px" },
};

const emptyForm = {
    memberId: "", memberName: "", price: "",
    method: "especes", dateDebut: "", dateFin: "", status: "effectue",
};

export default function Paiements() {
    const [payments, setPayments] = useState([]);
    const [pendingMembers, setPendingMembers] = useState([]);
    const [allMembers, setAllMembers] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("pending"); // "pending" | "add" | "history"

    useEffect(() => { fetchAll(); }, []);

    async function fetchAll() {
        try {
            const [p, pending, all] = await Promise.all([
                fetch(`${API}/payments/getAllPayments`).then(r => r.json()),
                fetch(`${API}/members/getByStatus?status=pending`).then(r => r.json()),
                fetch(`${API}/members/getAllMembers`).then(r => r.json()),
            ]);

            setPayments(Array.isArray(p) ? p : []);
            setPendingMembers(Array.isArray(pending) ? pending : []);

            // ✅ filtre seulement role='membre' ET dédoublonne par email
            const membres = Array.isArray(all) ? all.filter(u => u.role === "membre") : [];
            const unique = membres.filter((m, index, self) =>
                index === self.findIndex(t => t.email === m.email)
            );
            setAllMembers(unique);

        } catch (err) {
            console.error("Erreur fetch:", err);
        }
    }

    function handleMemberSelect(e) {
        const id = e.target.value;
        const member = allMembers.find(m => m._id === id);
        setForm(f => ({ ...f, memberId: id, memberName: member?.name || "" }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.memberId || !form.price) return;
        setLoading(true);
        try {
            await fetch(`${API}/payments/addPayment`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    price: Number(form.price),
                }),
            });
            setForm(emptyForm);
            await fetchAll();
            setActiveTab("history");
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    }

    async function handleMemberStatus(id, status) {
        try {
            await fetch(`${API}/members/updateStatus/${id}`, {   // ✅
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status }),
            });
            await fetchAll();
        } catch (err) {
            console.error(err);
        }
    }

    async function handleDeletePayment(id) {
        if (!window.confirm("Supprimer ce paiement ?")) return;
        try {
            await fetch(`${API}/payments/deletePayment/${id}`, { method: "DELETE" });
            await fetchAll();
        } catch (err) {
            console.error(err);
        }
    }

    const tabs = [
        { key: "pending", label: `En attente (${pendingMembers.length})` },
        { key: "add", label: "Nouveau paiement" },
        { key: "history", label: `Historique (${payments.length})` },
    ];

    return (
        <div style={s.page}>

            {/* Titre */}
            <div style={s.title}>Gestion des Paiements</div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: "4px", marginBottom: "24px" }}>
                {tabs.map(t => (
                    <button
                        key={t.key}
                        onClick={() => setActiveTab(t.key)}
                        style={{
                            padding: "8px 20px",
                            background: activeTab === t.key ? "#D62828" : "rgba(214,40,40,0.08)",
                            color: activeTab === t.key ? "#fff" : "#7A7A7A",
                            border: "1px solid rgba(214,40,40,0.2)",
                            borderRadius: "3px",
                            cursor: "pointer",
                            fontFamily: "'Bebas Neue', sans-serif",
                            fontSize: "0.85rem",
                            letterSpacing: "2px",
                            transition: "all 0.15s",
                        }}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* ── TAB : Membres en attente ── */}
            {activeTab === "pending" && (
                <div style={s.section}>
                    <div style={s.secTitle}>⏳ Membres en attente de validation</div>
                    {pendingMembers.length === 0 ? (
                        <div style={s.empty}>Aucun membre en attente</div>
                    ) : (
                        <table style={s.table}>
                            <thead>
                                <tr>
                                    <th style={s.th}>Nom</th>
                                    <th style={s.th}>Email</th>
                                    <th style={s.th}>Téléphone</th>
                                    <th style={s.th}>Inscription</th>
                                    <th style={s.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingMembers.map(m => (
                                    <tr key={m._id}>
                                        <td style={{ ...s.td, color: "#F5F5F5", fontWeight: 700 }}>{m.name}</td>
                                        <td style={s.td}>{m.email}</td>
                                        <td style={s.td}>{m.phone || "—"}</td>
                                        <td style={s.td}>
                                            {m.createdAt
                                                ? new Date(m.createdAt).toLocaleDateString("fr-FR")
                                                : "—"}
                                        </td>
                                        <td style={s.td}>
                                            <button
                                                style={s.btnGreen}
                                                onClick={() => handleMemberStatus(m._id, "active")}
                                            >
                                                ✓ Accepter
                                            </button>
                                            <button
                                                style={s.btnRed}
                                                onClick={() => handleMemberStatus(m._id, "rejected")}
                                            >
                                                ✗ Refuser
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

            {/* ── TAB : Nouveau paiement ── */}
            {activeTab === "add" && (
                <div style={s.section}>
                    <div style={s.secTitle}>+ Enregistrer un paiement</div>
                    <form onSubmit={handleSubmit}>
                        <div style={s.grid}>

                            {/* Membre */}
                            <div style={{ gridColumn: "1 / -1" }}>
                                <label style={s.label}>Membre *</label>
                                <select
                                    style={s.select}
                                    value={form.memberId}
                                    onChange={handleMemberSelect}
                                    required
                                >
                                    <option value="">Sélectionner un membre</option>
                                    {allMembers.map(m => (
                                        <option key={m._id} value={m._id}>
                                            {m.name} — {m.email}
                                            {m.status === "pending" ? " ⏳" : ""}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Montant */}
                            <div>
                                <label style={s.label}>Montant (DT) *</label>
                                <input
                                    style={s.input}
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    placeholder="ex: 150"
                                    value={form.price}
                                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                                    required
                                />
                            </div>

                            {/* Méthode */}
                            <div>
                                <label style={s.label}>Méthode de paiement *</label>
                                <select
                                    style={s.select}
                                    value={form.method}
                                    onChange={e => setForm(f => ({ ...f, method: e.target.value }))}
                                >
                                    {Object.entries(METHODS_LABEL).map(([val, lab]) => (
                                        <option key={val} value={val}>{lab}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Date début */}
                            <div>
                                <label style={s.label}>Date début abonnement</label>
                                <input
                                    style={s.input}
                                    type="date"
                                    value={form.dateDebut}
                                    onChange={e => setForm(f => ({ ...f, dateDebut: e.target.value }))}
                                />
                            </div>

                            {/* Date fin */}
                            <div>
                                <label style={s.label}>Date fin abonnement</label>
                                <input
                                    style={s.input}
                                    type="date"
                                    value={form.dateFin}
                                    onChange={e => setForm(f => ({ ...f, dateFin: e.target.value }))}
                                />
                            </div>

                            {/* Statut */}
                            <div>
                                <label style={s.label}>Statut</label>
                                <select
                                    style={s.select}
                                    value={form.status}
                                    onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                                >
                                    <option value="effectue">Effectué</option>
                                    <option value="en_attente">En attente</option>
                                    <option value="echoue">Échoué</option>
                                </select>
                            </div>

                        </div>

                        <div style={{ marginTop: "20px" }}>
                            <button type="submit" style={s.submitBtn} disabled={loading}>
                                {loading ? "ENREGISTREMENT..." : "ENREGISTRER LE PAIEMENT"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* ── TAB : Historique ── */}
            {activeTab === "history" && (
                <div style={s.section}>
                    <div style={s.secTitle}>Historique des paiements</div>
                    {payments.length === 0 ? (
                        <div style={s.empty}>Aucun paiement enregistré</div>
                    ) : (
                        <table style={s.table}>
                            <thead>
                                <tr>
                                    <th style={s.th}>Membre</th>
                                    <th style={s.th}>Montant</th>
                                    <th style={s.th}>Méthode</th>
                                    <th style={s.th}>Période</th>
                                    <th style={s.th}>Date</th>
                                    <th style={s.th}>Statut</th>
                                    <th style={s.th}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map(p => (
                                    <tr key={p._id} style={{ transition: "background 0.1s" }}>
                                        <td style={{ ...s.td, color: "#F5F5F5", fontWeight: 700 }}>
                                            {p.memberName || "—"}
                                        </td>
                                        <td style={{ ...s.td, color: "#22c55e", fontWeight: 700 }}>
                                            {p.price} DT
                                        </td>
                                        <td style={s.td}>
                                            {METHODS_LABEL[p.method] || p.method}
                                        </td>
                                        <td style={{ ...s.td, fontSize: "0.72rem", color: "#666" }}>
                                            {p.dateDebut && p.dateFin
                                                ? `${new Date(p.dateDebut).toLocaleDateString("fr-FR")} → ${new Date(p.dateFin).toLocaleDateString("fr-FR")}`
                                                : "—"}
                                        </td>
                                        <td style={s.td}>
                                            {new Date(p.createdAt).toLocaleDateString("fr-FR")}
                                        </td>
                                        <td style={s.td}>
                                            <span style={{ ...s.badge, ...STATUS_STYLE[p.status] }}>
                                                {STATUS_LABEL[p.status] || p.status}
                                            </span>
                                        </td>
                                        <td style={s.td}>
                                            <button
                                                style={{ ...s.btnRed, marginRight: 0 }}
                                                onClick={() => handleDeletePayment(p._id)}
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            )}

        </div>
    );
}