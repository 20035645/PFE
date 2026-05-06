import React from "react";

export default function CardSettings() {
  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg"
      style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}>
      <div className="rounded-t mb-0 px-6 py-6" style={{ borderBottom: '1px solid #2a2a2a' }}>
        <div className="text-center flex justify-between items-center">
          <h6 className="text-blueGray-700 text-xl font-bold" style={{ color: 'white', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.05em' }}>
            Mon Compte
          </h6>
          <button
            className="btn-gym text-white font-bold uppercase text-xs px-4 py-2 rounded shadow outline-none focus:outline-none"
            type="button"
            style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.1em' }}
          >
            Sauvegarder
          </button>
        </div>
      </div>
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form>
          <h6 className="text-sm mt-6 mb-6 font-bold uppercase" style={{ color: '#e11d48', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em' }}>
            Informations Personnelles
          </h6>
          <div className="flex flex-wrap">
            {[
              { label: "Prénom", placeholder: "Ahmed", half: true },
              { label: "Nom", placeholder: "Chaabane", half: true },
              { label: "Email", placeholder: "ahmed@gymaccess.tn", half: true },
              { label: "Téléphone", placeholder: "+216 XX XXX XXX", half: true },
              { label: "Adresse", placeholder: "Rue de la liberté", half: true },
              { label: "Ville", placeholder: "Tunis", half: true },
            ].map((field, i) => (
              <div key={i} className={`w-full lg:w-${field.half ? '6/12' : 'full'} px-4`}>
                <div className="relative w-full mb-3">
                  <label className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em' }}>
                    {field.label}
                  </label>
                  <input
                    type="text"
                    className="gym-input border-0 px-3 py-3 placeholder-blueGray-300 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    defaultValue={field.placeholder}
                    style={{
                      backgroundColor: '#1a1a1a',
                      color: 'white',
                      border: '1px solid #2a2a2a',
                      fontFamily: 'Rajdhani, sans-serif',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <hr className="mt-6 border-b-1" style={{ borderColor: '#2a2a2a' }} />

          <h6 className="text-sm mt-6 mb-6 font-bold uppercase" style={{ color: '#e11d48', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em' }}>
            Objectifs Sportifs
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-xs font-bold mb-2" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em' }}>
                  Objectif Principal
                </label>
                <select className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  style={{ backgroundColor: '#1a1a1a', color: 'white', border: '1px solid #2a2a2a', fontFamily: 'Rajdhani, sans-serif' }}>
                  <option>Prise de masse</option>
                  <option>Perte de poids</option>
                  <option>Endurance</option>
                  <option>Tonification</option>
                  <option>Force</option>
                </select>
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-xs font-bold mb-2" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em' }}>
                  Niveau
                </label>
                <select className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  style={{ backgroundColor: '#1a1a1a', color: 'white', border: '1px solid #2a2a2a', fontFamily: 'Rajdhani, sans-serif' }}>
                  <option>Débutant</option>
                  <option>Intermédiaire</option>
                  <option>Avancé</option>
                  <option>Expert</option>
                </select>
              </div>
            </div>
            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <label className="block uppercase text-xs font-bold mb-2" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em' }}>
                  Notes / Contraintes médicales
                </label>
                <textarea
                  rows="4"
                  className="border-0 px-3 py-3 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue="Aucune contrainte particulière. Disponible les soirs et week-ends."
                  style={{ backgroundColor: '#1a1a1a', color: '#9ca3af', border: '1px solid #2a2a2a', fontFamily: 'Rajdhani, sans-serif', resize: 'none' }}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}