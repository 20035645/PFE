import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full" style={{ minHeight: '80vh' }}>
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-2xl rounded-2xl pb-8"
            style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}>
            
            {/* Header */}
            <div className="rounded-t mb-0 px-6 py-8 text-center" style={{ borderBottom: '1px solid #2a2a2a' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: 'linear-gradient(135deg, #e11d48, #9f1239)', boxShadow: '0 0 30px rgba(225,29,72,0.3)' }}>
                <i className="fas fa-dumbbell text-white text-2xl"></i>
              </div>
              <h2 className="text-2xl font-bold" style={{ color: 'white', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.05em' }}>
                CONNEXION
              </h2>
              <p className="text-sm mt-1" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>
                Accédez à votre espace membre
              </p>
            </div>

            <div className="flex-auto px-6 lg:px-10 py-8 pt-6">
              <form>
                <div className="relative w-full mb-5">
                  <label className="block uppercase text-xs font-bold mb-2" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em' }}>
                    Email
                  </label>
                  <div className="relative">
                    <i className="fas fa-envelope absolute left-3 top-1/2 transform -translate-y-1/2 text-xs" style={{ color: '#6b7280' }}></i>
                    <input
                      type="email"
                      className="pl-9 pr-3 py-3 placeholder-gray-600 rounded text-sm w-full focus:outline-none transition-all duration-150"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ backgroundColor: '#1a1a1a', color: 'white', border: '1px solid #2a2a2a', fontFamily: 'Rajdhani, sans-serif' }}
                    />
                  </div>
                </div>
                <div className="relative w-full mb-6">
                  <label className="block uppercase text-xs font-bold mb-2" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.08em' }}>
                    Mot de passe
                  </label>
                  <div className="relative">
                    <i className="fas fa-lock absolute left-3 top-1/2 transform -translate-y-1/2 text-xs" style={{ color: '#6b7280' }}></i>
                    <input
                      type="password"
                      className="pl-9 pr-3 py-3 placeholder-gray-600 rounded text-sm w-full focus:outline-none transition-all duration-150"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ backgroundColor: '#1a1a1a', color: 'white', border: '1px solid #2a2a2a', fontFamily: 'Rajdhani, sans-serif' }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded" style={{ accentColor: '#e11d48' }} />
                    <span className="text-xs" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>Se souvenir de moi</span>
                  </label>
                  <a href="#pablo" className="text-xs hover:text-red-400 transition-colors" style={{ color: '#e11d48', fontFamily: 'Rajdhani, sans-serif' }}>
                    Mot de passe oublié?
                  </a>
                </div>
                <div className="text-center mt-2">
                  <Link
                    to="/admin/dashboard"
                    className="btn-gym text-white font-bold uppercase text-sm px-6 py-3 rounded shadow w-full block text-center"
                    style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.1em' }}
                  >
                    SE CONNECTER
                  </Link>
                </div>
              </form>
              <div className="flex flex-wrap mt-6 relative">
                <div className="w-1/2">
                  <Link to="/auth/register" className="text-xs hover:text-red-400 transition-colors" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>
                    Pas encore membre?
                  </Link>
                </div>
                <div className="w-1/2 text-right">
                  <Link to="/" className="text-xs hover:text-red-400 transition-colors" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>
                    Retour à l'accueil
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}