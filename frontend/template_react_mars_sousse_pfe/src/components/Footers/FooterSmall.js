import React from "react";
import { Link } from "react-router-dom";

export default function FooterSmall({ absolute }) {
  return (
    <footer className={`${absolute ? "absolute" : "relative"} w-full bottom-0 pb-6`}>
      <div className="container mx-auto px-4">
        <hr style={{ borderColor: '#2a2a2a' }} />
        <div className="flex flex-wrap items-center md:justify-between justify-center pt-4">
          <div className="w-full md:w-4/12 px-4">
            <div className="text-sm text-center md:text-left font-semibold"
              style={{ color: '#6b7280', fontFamily: 'Rajdhani, sans-serif' }}>
              © {new Date().getFullYear()} GymAccess
            </div>
          </div>
          <div className="w-full md:w-8/12 px-4">
            <ul className="flex flex-wrap list-none md:justify-end justify-center gap-4">
              <li>
                <Link to="/" className="text-xs font-semibold hover:text-red-400 transition-colors"
                  style={{ color: '#6b7280', fontFamily: 'Rajdhani, sans-serif' }}>
                  Accueil
                </Link>
              </li>
              <li>
                <Link to="/confidentialite" className="text-xs font-semibold hover:text-red-400 transition-colors"
                  style={{ color: '#6b7280', fontFamily: 'Rajdhani, sans-serif' }}>
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}