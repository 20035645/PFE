import React, { useEffect, useState } from "react";
import CardTable from "components/Cards/CardTable.js";
import { getAllUsers } from "Services/apiUser";

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
    </div>
  );
}