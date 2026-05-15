import React from "react";
import CardTable from "components/Cards/CardTable.js";
import prototypes from "prop-types";

import {getAllUsers} from "services/apiUser";
export default function Tables() {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    fetchUsers();
  }, []);



  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full mb-12 px-4">
        <CardTable />
      </div>
      <div className="w-full mb-12 px-4">
        {/* Recent Entries Table */}
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
          style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}>
          <div className="rounded-t mb-0 px-4 py-3" style={{ borderBottom: '1px solid #2a2a2a' }}>
            <div className="flex flex-wrap items-center justify-between">
              <h3 className="font-semibold text-lg" style={{ color: 'white', fontFamily: 'Oswald, sans-serif' }}>
                Présences du Jour
              </h3>
              <span className="text-xs px-3 py-1 rounded-full" style={{ background: 'rgba(225,29,72,0.1)', color: '#e11d48', border: '1px solid rgba(225,29,72,0.2)', fontFamily: 'Rajdhani, sans-serif' }}>
                89 entrées aujourd'hui
              </span>
            </div>
          </div>
          <div className="block w-full overflow-x-auto">
            <table className="items-center w-full border-collapse">
              <thead>
                <tr>
                  {["Heure", "Membre", "Activité", "Coach", "Durée"].map((h, i) => (
                    <th key={i} className="px-6 py-3 text-xs uppercase border-l-0 border-r-0 text-left"
                      style={{ borderBottom: '1px solid #2a2a2a', color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em', backgroundColor: '#1a1a1a' }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { time: "09:15", member: "Ahmed C.", activity: "Musculation", coach: "Coach Nabil", duration: "1h30" },
                  { time: "09:30", member: "Sonia M.", activity: "Yoga", coach: "Coach Sarra", duration: "1h00" },
                  { time: "10:00", member: "Mehdi T.", activity: "CrossFit", coach: "Coach Amine", duration: "1h15" },
                  { time: "10:15", member: "Leila B.", activity: "Cardio", coach: "-", duration: "45min" },
                  { time: "10:45", member: "Karim F.", activity: "Musculation", coach: "Coach Nabil", duration: "2h00" },
                ].map((entry, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #1a1a1a' }}>
                    <td className="px-6 py-3 text-xs" style={{ color: '#e11d48', fontFamily: 'Oswald, sans-serif', fontWeight: 600 }}>{entry.time}</td>
                    <td className="px-6 py-3 text-xs" style={{ color: 'white', fontFamily: 'Rajdhani, sans-serif', fontWeight: 600 }}>{entry.member}</td>
                    <td className="px-6 py-3 text-xs">
                      <span className="px-2 py-1 rounded text-xs" style={{ background: 'rgba(225,29,72,0.1)', color: '#e11d48', border: '1px solid rgba(225,29,72,0.2)', fontFamily: 'Rajdhani, sans-serif' }}>
                        {entry.activity}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-xs" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>{entry.coach}</td>
                    <td className="px-6 py-3 text-xs" style={{ color: '#34d399', fontFamily: 'Oswald, sans-serif' }}>{entry.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}