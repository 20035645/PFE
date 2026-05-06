import React from "react";
import TableDropdown from "components/Dropdowns/TableDropdown.js";

const members = [
  { name: "Ahmed Chaabane", email: "ahmed@email.com", plan: "Premium", status: "Actif", joined: "Jan 2024", color: "#e11d48" },
  { name: "Sonia Maatoug", email: "sonia@email.com", plan: "Standard", status: "Actif", joined: "Mar 2024", color: "#10b981" },
  { name: "Mehdi Tlili", email: "mehdi@email.com", plan: "Premium", status: "Actif", joined: "Fév 2024", color: "#e11d48" },
  { name: "Leila Benhassen", email: "leila@email.com", plan: "Coaching", status: "Actif", joined: "Avr 2024", color: "#8b5cf6" },
  { name: "Karim Ferchichi", email: "karim@email.com", plan: "Standard", status: "Expiré", joined: "Nov 2023", color: "#6b7280" },
];

export default function CardTable({ color = "dark" }) {
  return (
    <div className={"relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"}
      style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}>
      <div className="rounded-t mb-0 px-4 py-3 border-0" style={{ borderBottom: '1px solid #2a2a2a' }}>
        <div className="flex flex-wrap items-center">
          <div className="relative w-full px-4 max-w-full flex-grow flex-1">
            <h3 className="font-semibold text-lg" style={{ color: 'white', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.05em' }}>
              Liste des Membres
            </h3>
          </div>
          <div>
            <button className="btn-gym text-white font-bold uppercase text-xs px-4 py-2 rounded"
              style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.1em' }}>
              + Ajouter
            </button>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full border-collapse gym-table">
          <thead>
            <tr>
              {["Membre", "Abonnement", "Statut", "Inscription", "Actions"].map((h, i) => (
                <th key={i} className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                  style={{ borderColor: '#2a2a2a', color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em', backgroundColor: '#1a1a1a' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((m, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #1a1a1a' }}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                      style={{ background: `linear-gradient(135deg, ${m.color}, ${m.color}88)` }}>
                      {m.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ color: 'white', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.85rem', fontWeight: 600 }}>{m.name}</div>
                      <div style={{ color: '#6b7280', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.75rem' }}>{m.email}</div>
                    </div>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full"
                    style={{ backgroundColor: `${m.color}22`, color: m.color, border: `1px solid ${m.color}44`, fontFamily: 'Rajdhani, sans-serif' }}>
                    {m.plan}
                  </span>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: m.status === 'Actif' ? '#10b981' : '#6b7280' }}></div>
                    <span style={{ color: m.status === 'Actif' ? '#10b981' : '#6b7280', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.85rem' }}>
                      {m.status}
                    </span>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.85rem' }}>
                  {m.joined}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                  <TableDropdown />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}