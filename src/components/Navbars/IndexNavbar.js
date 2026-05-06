import React, { useState } from "react";
import { Link } from "react-router-dom";
import IndexDropdown from "components/Dropdowns/IndexDropdown.js";

export default function IndexNavbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <>
      <nav
        className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-6 py-3"
        style={{ backgroundColor: 'rgba(10,10,10,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #2a2a2a' }}
      >
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link to="/" className="flex items-center gap-2 leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase font-bold">
              <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e11d48, #9f1239)' }}>
                <i className="fas fa-dumbbell text-white text-sm"></i>
              </div>
              <span style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: 'white', letterSpacing: '0.1em' }}>
                GYM<span style={{ color: '#e11d48' }}>ACCESS</span>
              </span>
            </Link>
            <button
              className="cursor-pointer text-gray-400 lg:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-transparent block outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div className={`lg:flex flex-grow items-center${navbarOpen ? " flex" : " hidden"}`} id="example-navbar-warning">
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto items-center gap-1">
              <li className="nav-item">
                <a href="#nutrition" className="px-4 py-2 flex items-center text-xs uppercase font-bold text-gray-300 hover:text-red-400 transition-colors" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em' }}>
                  Nutrition
                </a>
              </li>
              <li className="nav-item">
                <a href="#abonnements" className="px-4 py-2 flex items-center text-xs uppercase font-bold text-gray-300 hover:text-red-400 transition-colors" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em' }}>
                  Abonnements
                </a>
              </li>
              <li className="nav-item">
                <a href="#coachs" className="px-4 py-2 flex items-center text-xs uppercase font-bold text-gray-300 hover:text-red-400 transition-colors" style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em' }}>
                  Coachs
                </a>
              </li>
              <li className="nav-item">
                <IndexDropdown />
              </li>
              <li className="nav-item">
                <Link
                  to="/auth/register"
                  className="btn-gym px-6 py-2 rounded text-sm font-bold inline-block"
                  style={{ fontFamily: 'Oswald, sans-serif', letterSpacing: '0.1em' }}
                >
                  REJOINDRE
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}