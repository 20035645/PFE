import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AuthNavbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <>
      <nav
        className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3"
        style={{ backgroundColor: 'transparent' }}
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link to="/" className="flex items-center gap-2 leading-relaxed inline-block mr-4 py-2 whitespace-nowrap">
              <div className="w-7 h-7 rounded flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e11d48, #9f1239)' }}>
                <i className="fas fa-dumbbell text-white text-xs"></i>
              </div>
              <span style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.2rem', fontWeight: 700, color: 'white', letterSpacing: '0.1em' }}>
                GYM<span style={{ color: '#e11d48' }}>ACCESS</span>
              </span>
            </Link>
            <button
              className="cursor-pointer text-gray-400 lg:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-transparent"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div className={`lg:flex flex-grow items-center${navbarOpen ? " flex" : " hidden"}`}>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center gap-4">
              <li>
                <Link to="/" className="text-xs uppercase font-bold text-gray-300 hover:text-red-400 transition-colors" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em' }}>
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/auth/login" className="text-xs uppercase font-bold text-gray-300 hover:text-red-400 transition-colors" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em' }}>
                  Connexion
                </Link>
              </li>
              <li>
                <Link to="/auth/register" className="btn-gym px-5 py-2 rounded text-xs font-bold" style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.1em' }}>
                  INSCRIPTION
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}