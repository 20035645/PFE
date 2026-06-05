import React from "react";

export default function CardPageVisits() {
  const activities = [
    { name: "Musculation", count: "342 séances", progress: 85, change: "+18.3%" },
    { name: "Cardio", count: "218 séances", progress: 64, change: "+7.2%" },
    { name: "CrossFit", count: "156 séances", progress: 48, change: "+24.7%" },
    { name: "Yoga", count: "98 séances", progress: 32, change: "+12.1%" },
  ];

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
      style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}>
      <div className="rounded-t mb-0 px-4 py-3" style={{ borderBottom: '1px solid #2a2a2a' }}>
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase mb-1 text-xs font-semibold" style={{ color: '#e11d48', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em' }}>
              Performance
            </h6>
            <h2 className="text-xl font-semibold" style={{ color: 'white', fontFamily: 'Oswald, sans-serif' }}>
              Activités Populaires
            </h2>
          </div>
        </div>
      </div>
      <div className="block w-full overflow-x-auto">
        <table className="items-center w-full border-collapse gym-table">
          <thead>
            <tr>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                style={{ borderColor: '#2a2a2a', color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em', backgroundColor: '#1a1a1a' }}>
                Activité
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                style={{ borderColor: '#2a2a2a', color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em', backgroundColor: '#1a1a1a' }}>
                Séances
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                style={{ borderColor: '#2a2a2a', color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em', backgroundColor: '#1a1a1a' }}>
                Popularité
              </th>
              <th className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                style={{ borderColor: '#2a2a2a', color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em', backgroundColor: '#1a1a1a' }}>
                Tendance
              </th>
            </tr>
          </thead>
          <tbody>
            {activities.map((act, i) => (
              <tr key={i} style={{ borderBottom: '1px solid #1a1a1a', transition: 'background 0.2s' }}>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  style={{ color: 'white', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.85rem', fontWeight: 600 }}>
                  <i className="fas fa-dumbbell mr-2" style={{ color: '#e11d48' }}></i>
                  {act.name}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.85rem' }}>
                  {act.count}
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                  <div className="flex items-center">
                    <span className="mr-2" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.8rem' }}>{act.progress}%</span>
                    <div className="relative w-full">
                      <div className="overflow-hidden h-2 text-xs flex rounded" style={{ backgroundColor: '#2a2a2a' }}>
                        <div
                          style={{ width: `${act.progress}%`, background: 'linear-gradient(90deg, #e11d48, #9f1239)' }}
                          className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center rounded"
                        ></div>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  style={{ color: act.change.startsWith('+') ? '#34d399' : '#f87171', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.85rem', fontWeight: 600 }}>
                  {act.change}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}