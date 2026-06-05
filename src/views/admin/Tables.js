import React, { useEffect, useState } from "react";
import CardTable from "components/Cards/CardTable.js";
import { getAllUsers } from "services/apiUser";

export default function Tables() {
  const [stats, setStats] = useState({ actifs: 0 });

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:5000/api/members/getAllMembers");
        const data = await res.json();
        const membres = Array.isArray(data) ? data.filter(u => u.role === "membre") : [];
        setStats({
          actifs: membres.filter((m) => m.statut === "actif" || m.status === "active").length,
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
    </div>
  );
}