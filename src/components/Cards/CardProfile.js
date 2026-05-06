import React from "react";

export default function CardProfile() {
  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-xl rounded-lg mt-16"
      style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}>
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-full px-4 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 shadow-xl rounded-full align-middle border-4 flex items-center justify-center -mt-12"
                style={{ background: 'linear-gradient(135deg, #e11d48, #9f1239)', borderColor: '#1a1a1a' }}>
                <i className="fas fa-user text-white text-3xl"></i>
              </div>
            </div>
          </div>
          <div className="w-full px-4 text-center mt-4">
            <div className="flex justify-center py-4 lg:pt-4 pt-8">
              <div className="mr-4 p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide" style={{ color: 'white', fontFamily: 'Oswald, sans-serif' }}>22</span>
                <span className="text-sm text-blueGray-400" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>Programmes</span>
              </div>
              <div className="mr-4 p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide" style={{ color: '#e11d48', fontFamily: 'Oswald, sans-serif' }}>8</span>
                <span className="text-sm text-blueGray-400" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>Mois actif</span>
              </div>
              <div className="lg:mr-4 p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide" style={{ color: 'white', fontFamily: 'Oswald, sans-serif' }}>89</span>
                <span className="text-sm text-blueGray-400" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>Séances</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-2">
          <h3 className="text-xl font-semibold leading-normal mb-2" style={{ color: 'white', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.05em' }}>
            Ahmed Chaabane
          </h3>
          <div className="text-sm leading-normal mt-0 mb-2 font-bold uppercase" style={{ color: '#e11d48', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em' }}>
            <i className="fas fa-fire mr-2"></i>Membre Premium
          </div>
          <div className="mb-2 text-blueGray-600" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.85rem' }}>
            <i className="fas fa-map-marker-alt mr-2"></i>Tunis, Tunisie
          </div>
          <div className="mb-2 text-blueGray-600" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', fontSize: '0.85rem' }}>
            <i className="fas fa-dumbbell mr-2" style={{ color: '#e11d48' }}></i>Objectif: Prise de Masse
          </div>
        </div>
        <div className="mt-6 py-6 text-center" style={{ borderTop: '1px solid #2a2a2a' }}>
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4">
              <p className="font-light leading-relaxed text-blueGray-600 mb-4" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', lineHeight: '1.8' }}>
                Passionné de musculation depuis 3 ans. Actuellement en programme de prise de masse avec un coach personnel dédié chez GymAccess.
              </p>
              <a href="#pablo" className="btn-gym font-normal text-white px-8 py-2 rounded" style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.1em' }}>
                VOIR MON PROGRAMME
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}