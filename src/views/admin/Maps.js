import React from "react";
import MapExample from "components/Maps/MapExample.js";

export default function Maps() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <MapExample />
        </div>
      </div>
      {/* Branch info */}
      <div className="flex flex-wrap mt-4">
        {[
        ].map((branch, i) => (
          <div key={i} className="w-full lg:w-6/12 px-4 mb-6">
            <div className="rounded p-4" style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-base font-bold" style={{ color: 'white', fontFamily: 'Oswald, sans-serif' }}>{branch.name}</h3>
                  <p className="text-xs mt-1" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>
                    <i className="fas fa-map-marker-alt mr-1" style={{ color: '#e11d48' }}></i>{branch.address}
                  </p>
                </div>
                <span className="text-xs px-2 py-1 rounded" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)', fontFamily: 'Rajdhani, sans-serif' }}>
                  {branch.status}
                </span>
              </div>
              <div className="text-sm" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>
                <i className="fas fa-users mr-2" style={{ color: '#e11d48' }}></i>{branch.members} membres
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}