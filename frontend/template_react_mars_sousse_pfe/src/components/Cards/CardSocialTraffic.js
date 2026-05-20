import React from "react";

export default function CardSocialTraffic() {
  const sources = [
    { source: "Abonnements Premium", icon: "fas fa-crown", amount: "12,400 DT", percent: "44%", color: "#e11d48" },
    { source: "Abonnements Standard", icon: "fas fa-id-card", amount: "8,250 DT", percent: "29%", color: "#f97316" },
    { source: "Coaching Privé", icon: "fas fa-user-tie", amount: "5,340 DT", percent: "19%", color: "#8b5cf6" },
    { source: "Boutique Nutrition", icon: "fas fa-apple-alt", amount: "2,500 DT", percent: "8%", color: "#10b981" },
  ];

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
      style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}>
      <div className="rounded-t mb-0 px-4 py-3" style={{ borderBottom: '1px solid #2a2a2a' }}>
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase mb-1 text-xs font-semibold" style={{ color: '#e11d48', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em' }}>
              Revenus
            </h6>
            <h2 className="text-xl font-semibold" style={{ color: 'white', fontFamily: 'Oswald, sans-serif' }}>
              Sources de Revenus
            </h2>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full border-collapse">
          <thead>
            <tr>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                style={{ borderColor: '#2a2a2a', color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em', backgroundColor: '#1a1a1a' }}>
                Source
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                style={{ borderColor: '#2a2a2a', color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em', backgroundColor: '#1a1a1a' }}>
                Montant
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                style={{ borderColor: '#2a2a2a', color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em', backgroundColor: '#1a1a1a' }}>
                Part
              </th>
            </tr>
          </thead>
          <tbody>
            {sources.map((src, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #1a1a1a' }}>
                <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${src.color}22`, border: `1px solid ${src.color}44` }}>
                    <i className={`${src.icon} text-xs`} style={{ color: src.color }}></i>
                  </div>
                  <span style={{ color: 'white', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.85rem', fontWeight: 600 }}>{src.source}</span>
                </th>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  style={{ color: '#34d399', fontFamily: 'Oswald, sans-serif', fontSize: '0.9rem' }}>
                  {src.amount}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center gap-2">
                    <span style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.8rem' }}>{src.percent}</span>
                    <div className="overflow-hidden h-2 flex rounded flex-1" style={{ backgroundColor: '#2a2a2a' }}>
                      <div style={{ width: src.percent, backgroundColor: src.color }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded"></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}