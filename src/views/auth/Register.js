import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [plan, setPlan] = useState("standard");

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full" style={{ minHeight: '85vh', paddingTop: '80px' }}>
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-2xl rounded-2xl"
            style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}>
            
            <div className="rounded-t mb-0 px-6 py-6 text-center" style={{ borderBottom: '1px solid #2a2a2a' }}>
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #e11d48, #9f1239)' }}>
                  <i className="fas fa-user-plus text-white text-sm"></i>
                </div>
                <h2 className="text-2xl font-bold" style={{ color: 'white', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.05em' }}>
                  CRÉER MON COMPTE
                </h2>
              </div>
              <p className="text-sm" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>
                Rejoignez GymAccess et commencez votre transformation
              </p>
            </div>

            <div className="flex-auto px-6 lg:px-10 py-8">
              <form>
                <div className="flex flex-wrap">
                  {/* Nom & Prénom */}
                  <div className="w-full lg:w-6/12 px-2">
                    <div className="relative w-full mb-4">
                      <label className="block uppercase text-xs font-bold mb-2" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em' }}>Prénom</label>
                      <input type="text" placeholder="Ahmed" className="px-3 py-3 placeholder-gray-600 rounded text-sm w-full focus:outline-none"
                        style={{ backgroundColor: '#1a1a1a', color: 'white', border: '1px solid #2a2a2a', fontFamily: 'Rajdhani, sans-serif' }} />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-2">
                    <div className="relative w-full mb-4">
                      <label className="block uppercase text-xs font-bold mb-2" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em' }}>Nom</label>
                      <input type="text" placeholder="Chaabane" className="px-3 py-3 placeholder-gray-600 rounded text-sm w-full focus:outline-none"
                        style={{ backgroundColor: '#1a1a1a', color: 'white', border: '1px solid #2a2a2a', fontFamily: 'Rajdhani, sans-serif' }} />
                    </div>
                  </div>

                  {/* Email & Téléphone */}
                  <div className="w-full lg:w-6/12 px-2">
                    <div className="relative w-full mb-4">
                      <label className="block uppercase text-xs font-bold mb-2" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em' }}>Email</label>
                      <input type="email" placeholder="votre@email.com" className="px-3 py-3 placeholder-gray-600 rounded text-sm w-full focus:outline-none"
                        style={{ backgroundColor: '#1a1a1a', color: 'white', border: '1px solid #2a2a2a', fontFamily: 'Rajdhani, sans-serif' }} />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-2">
                    <div className="relative w-full mb-4">
                      <label className="block uppercase text-xs font-bold mb-2" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em' }}>Téléphone</label>
                      <input type="tel" placeholder="+216 XX XXX XXX" className="px-3 py-3 placeholder-gray-600 rounded text-sm w-full focus:outline-none"
                        style={{ backgroundColor: '#1a1a1a', color: 'white', border: '1px solid #2a2a2a', fontFamily: 'Rajdhani, sans-serif' }} />
                    </div>
                  </div>

                  {/* Mot de passe */}
                  <div className="w-full lg:w-6/12 px-2">
                    <div className="relative w-full mb-4">
                      <label className="block uppercase text-xs font-bold mb-2" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em' }}>Mot de passe</label>
                      <input type="password" placeholder="••••••••" className="px-3 py-3 placeholder-gray-600 rounded text-sm w-full focus:outline-none"
                        style={{ backgroundColor: '#1a1a1a', color: 'white', border: '1px solid #2a2a2a', fontFamily: 'Rajdhani, sans-serif' }} />
                    </div>
                  </div>
                  <div className="w-full lg:w-6/12 px-2">
                    <div className="relative w-full mb-4">
                      <label className="block uppercase text-xs font-bold mb-2" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em' }}>Confirmer</label>
                      <input type="password" placeholder="••••••••" className="px-3 py-3 placeholder-gray-600 rounded text-sm w-full focus:outline-none"
                        style={{ backgroundColor: '#1a1a1a', color: 'white', border: '1px solid #2a2a2a', fontFamily: 'Rajdhani, sans-serif' }} />
                    </div>
                  </div>

                  {/* Plan */}
                  <div className="w-full px-2 mb-4">
                    <label className="block uppercase text-xs font-bold mb-3" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em' }}>
                      Choisir un Abonnement
                    </label>
                    <div className="flex gap-3">
                      {[
                        { id: "standard", label: "Standard", price: "39 DT/mois" },
                        { id: "premium", label: "Premium", price: "69 DT/mois" },
                        { id: "coaching", label: "Coaching", price: "99 DT/mois" },
                      ].map((p) => (
                        <div key={p.id}
                          className="flex-1 p-3 rounded cursor-pointer text-center transition-all"
                          style={{
                            border: plan === p.id ? '2px solid #e11d48' : '1px solid #2a2a2a',
                            background: plan === p.id ? 'rgba(225,29,72,0.1)' : '#1a1a1a',
                          }}
                          onClick={() => setPlan(p.id)}>
                          <div className="text-sm font-bold" style={{ color: plan === p.id ? '#e11d48' : 'white', fontFamily: 'Oswald, sans-serif' }}>{p.label}</div>
                          <div className="text-xs" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>{p.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-full px-2">
                    <label className="flex items-center gap-2 cursor-pointer mb-4">
                      <input type="checkbox" style={{ accentColor: '#e11d48' }} />
                      <span className="text-xs" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>
                        J'accepte les <a href="#pablo" style={{ color: '#e11d48' }}>conditions d'utilisation</a>
                      </span>
                    </label>
                  </div>
                </div>

                <div className="text-center mt-2 px-2">
                  <Link to="/auth/login"
                    className="btn-gym text-white font-bold uppercase text-sm px-6 py-3 rounded shadow w-full block text-center"
                    style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.1em' }}>
                    CRÉER MON COMPTE
                  </Link>
                </div>
              </form>
              <div className="text-center mt-4">
                <Link to="/auth/login" className="text-xs hover:text-red-400 transition-colors" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>
                  Déjà membre? <span style={{ color: '#e11d48' }}>Se connecter</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}