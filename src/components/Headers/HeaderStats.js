import React, { useEffect, useState } from "react";
import CardStats from "components/Cards/CardStats.js";
import { getAllUsers } from "services/apiUser";

const API = "http://localhost:5000/api";

export default function HeaderStats() {
  const [stats, setStats] = useState({
    membresActifs: 0,
    abonnementsActifs: 0,
    nouveauxCeMois: 0,
    coaches: 0,
    revenusMois: 0,
    loaded: false,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [resUsers, resPayments] = await Promise.all([
          getAllUsers(),
          fetch(`${API}/payments/getAllPayments`).then(r => r.json()),
        ]);

        const users = resUsers.data;
        const membres = users.filter((u) => u.role === "membre");
        const coaches = users.filter((u) => u.role === "coach");
        const now = new Date();

        const membresActifs = membres.filter((m) => m.statut === "actif").length;
        const abonnementsActifs = membres.filter((m) => m.statut === "actif").length;

        const nouveauxCeMois = membres.filter((m) => {
          const d = new Date(m.dateInscrit || m.createdAt);
          return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
        }).length;

        const lastMonth = membres.filter((m) => {
          const d = new Date(m.dateInscrit || m.createdAt);
          const last = new Date(now.getFullYear(), now.getMonth() - 1, 1);
          return d.getMonth() === last.getMonth() && d.getFullYear() === last.getFullYear();
        }).length;

        const progression = lastMonth > 0
          ? (((nouveauxCeMois - lastMonth) / lastMonth) * 100).toFixed(1)
          : nouveauxCeMois > 0 ? "100" : "0";

        const payments = Array.isArray(resPayments) ? resPayments : [];
        const revenusMois = payments
          .filter(p => {
            const d = new Date(p.createdAt);
            return p.status === "effectue" &&
              d.getMonth() === now.getMonth() &&
              d.getFullYear() === now.getFullYear();
          })
          .reduce((sum, p) => sum + (p.price || 0), 0);

        setStats({
          membresActifs,
          abonnementsActifs,
          nouveauxCeMois,
          coaches: coaches.length,
          revenusMois,
          progression: Math.abs(progression),
          progressionArrow: progression >= 0 ? "up" : "down",
          progressionColor: progression >= 0 ? "text-green-400" : "text-red-400",
          loaded: true,
        });
      } catch (err) {
        console.error("Erreur HeaderStats:", err);
      }
    }
    fetchStats();
  }, []);

  const totalMembres = stats.loaded ? stats.membresActifs + stats.coaches : null;

  return (
    <>
      <div
        className="relative pt-24 pb-32"
        style={{ background: "linear-gradient(135deg, #0a0a0a 0%, #1a0510 60%, #0a0a0a 100%)" }}
      >
        <div className="px-4 md:px-10 mx-auto w-full">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
            }}
          >
            <CardStats
              statSubtitle="TOTAL MEMBRES"
              statTitle={stats.loaded ? String(totalMembres) : "..."}
              statIconName="fas fa-users"
              statIconColor="bg-red-500"
            />
            <CardStats
              statSubtitle="MEMBRES ACTIFS"
              statTitle={stats.loaded ? String(stats.membresActifs) : "..."}
              statIconName="fas fa-check-circle"
              statIconColor="bg-green-500"
            />
            <CardStats
              statSubtitle="NOUVEAUX CE MOIS"
              statTitle={stats.loaded ? String(stats.nouveauxCeMois) : "..."}
              statArrow={stats.progressionArrow}
              statPercent={stats.loaded ? String(stats.progression) : "0"}
              statPercentColor={stats.progressionColor || "text-green-400"}
              statDescription="vs mois dernier"
              statIconName="fas fa-user-plus"
              statIconColor="bg-indigo-500"
            />
            <CardStats
              statSubtitle="REVENUS CE MOIS"
              statTitle={stats.loaded ? `${stats.revenusMois} DT` : "..."}
              statIconName="fas fa-money-bill-wave"
              statIconColor="bg-yellow-500"
            />
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent, #D62828, transparent)" }}
        />
      </div>
    </>
  );
}