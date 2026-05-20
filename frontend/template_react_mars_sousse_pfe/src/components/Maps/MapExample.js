import React from "react";

export default function MapExample() {
  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded overflow-hidden"
      style={{ height: '600px', backgroundColor: '#111111', border: '1px solid #2a2a2a' }}>
      <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid #2a2a2a' }}>
        <div>
          <h6 className="text-xs uppercase mb-1" style={{ color: '#e11d48', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em' }}>Localisation</h6>
          <h2 className="text-xl font-semibold" style={{ color: 'white', fontFamily: 'Oswald, sans-serif' }}>Notre Salle de Sport</h2>
        </div>
        <div className="flex items-center gap-2 px-3 py-2 rounded" style={{ background: 'rgba(225,29,72,0.1)', border: '1px solid rgba(225,29,72,0.2)' }}>
          <i className="fas fa-map-marker-alt" style={{ color: '#e11d48' }}></i>
          <span className="text-xs" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>Tunis, Tunisie</span>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center relative"
        style={{ background: 'linear-gradient(135deg, #111111 0%, #1a0510 50%, #111111 100%)' }}>
        {/* Map placeholder with gym info */}
        <div className="text-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: 'linear-gradient(135deg, #e11d48, #9f1239)', boxShadow: '0 0 40px rgba(225,29,72,0.4)' }}>
            <i className="fas fa-map-marker-alt text-white text-3xl"></i>
          </div>
          <h3 className="text-2xl font-bold mb-2" style={{ color: 'white', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.05em' }}>
            GymAccess - Centre Principal
          </h3>
          <p className="text-sm mb-6" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>
            Avenue Habib Bourguiba, Tunis 1000
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            {[
              { icon: 'fas fa-clock', label: 'Lun-Sam: 6h-23h' },
              { icon: 'fas fa-calendar', label: 'Dim: 8h-20h' },
              { icon: 'fas fa-phone', label: '+216 71 XXX XXX' },
              { icon: 'fas fa-car', label: 'Parking gratuit' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-4 py-2 rounded"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid #2a2a2a' }}>
                <i className={`${item.icon} text-xs`} style={{ color: '#e11d48' }}></i>
                <span className="text-xs" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>{item.label}</span>
              </div>
            ))}
          </div>
          <p className="text-xs mt-6" style={{ color: '#4b5563', fontFamily: 'Rajdhani, sans-serif' }}>
            * Intégrez votre clé Google Maps API pour afficher la carte interactive
          </p>
        </div>
      </div>
    </div>
  );
}