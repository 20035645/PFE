import React, { useEffect, useState } from "react";
import CardTable from "components/Cards/CardTable.js";
import { getAllUsers } from "services/apiUser";

export default function Tables() {
  const [stats, setStats] = useState({ actifs: 0 });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await getAllUsers();
        const membres = res.data.filter((u) => u.role === "membre");
        setStats({
          actifs: membres.filter((m) => m.statut === "actif").length,
        });
      } catch (err) {
        console.error("Erreur:", err);
      }
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: "1.5rem" }}>

      {/* ── Table Membres ── */}
      <div className="w-full mb-8">
        <CardTable />
      </div>

      {/* ── Présences du Jour ── */}
      <div style={{
        backgroundColor: "#111111",
        border: "1px solid #2a2a2a",
        borderRadius: "12px",
        marginTop: "1.5rem"
      }}>
        <div style={{
          padding: "1rem 1.5rem",
          borderBottom: "1px solid #2a2a2a",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <h3 style={{
            color: "white",
            fontFamily: "Oswald, sans-serif",
            fontSize: "1.1rem",
            fontWeight: 700,
            margin: 0
          }}>
            Présences du Jour
          </h3>
          <span style={{
            background: "rgba(225,29,72,0.1)",
            color: "#e11d48",
            border: "1px solid rgba(225,29,72,0.2)",
            padding: "0.2rem 0.75rem",
            borderRadius: "999px",
            fontSize: "0.75rem",
            fontWeight: 700
          }}>
            {stats.actifs} actifs aujourd'hui
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Heure", "Membre", "Activité", "Coach", "Durée"].map((h, i) => (
                  <th key={i} style={{
                    padding: "0.75rem 1.25rem",
                    textAlign: "left",
                    fontSize: "0.72rem",
                    color: "#9ca3af",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    borderBottom: "1px solid #2a2a2a",
                    backgroundColor: "#1a1a1a",
                    textTransform: "uppercase"
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { time: "09:15", member: "Ahmed C.",  activity: "Musculation", coach: "Coach Nabil", duration: "1h30" },
                { time: "09:30", member: "Sonia M.",  activity: "Yoga",        coach: "Coach Sarra", duration: "1h00" },
                { time: "10:00", member: "Mehdi T.",  activity: "CrossFit",    coach: "Coach Amine", duration: "1h15" },
                { time: "10:15", member: "Leila B.",  activity: "Cardio",      coach: "-",           duration: "45min" },
                { time: "10:45", member: "Karim F.",  activity: "Musculation", coach: "Coach Nabil", duration: "2h00" },
              ].map((entry, i) => (
                <tr key={i} style={{
                  borderBottom: "1px solid #1a1a1a",
                  background: i % 2 === 0 ? "transparent" : "#0a0a0a"
                }}>
                  <td style={{ padding: "0.85rem 1.25rem", color: "#e11d48", fontWeight: 700, fontSize: "0.85rem" }}>
                    {entry.time}
                  </td>
                  <td style={{ padding: "0.85rem 1.25rem", color: "white", fontWeight: 600, fontSize: "0.85rem" }}>
                    {entry.member}
                  </td>
                  <td style={{ padding: "0.85rem 1.25rem" }}>
                    <span style={{
                      background: "rgba(225,29,72,0.1)",
                      color: "#e11d48",
                      border: "1px solid rgba(225,29,72,0.2)",
                      padding: "0.2rem 0.6rem",
                      borderRadius: "6px",
                      fontSize: "0.75rem",
                      fontWeight: 600
                    }}>
                      {entry.activity}
                    </span>
                  </td>
                  <td style={{ padding: "0.85rem 1.25rem", color: "#9ca3af", fontSize: "0.85rem" }}>
                    {entry.coach}
                  </td>
                  <td style={{ padding: "0.85rem 1.25rem", color: "#34d399", fontWeight: 700, fontSize: "0.85rem" }}>
                    {entry.duration}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}