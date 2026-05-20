import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#111111', borderTop: '1px solid #2a2a2a' }}>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4 py-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, #e11d48, #9f1239)' }}>
                <i className="fas fa-dumbbell text-white text-sm"></i>
              </div>
              <span style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.3rem', fontWeight: 700, color: 'white', letterSpacing: '0.1em' }}>
                GYM<span style={{ color: '#e11d48' }}>ACCESS</span>
              </span>
            </div>
            <p className="text-sm mb-2" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', lineHeight: '1.8' }}>
              Votre salle de sport premium à Tunis. <br />
              Équipements modernes, coachs certifiés, nutrition optimisée.
            </p>
            <div className="flex gap-3 mt-4">
              {[
                { icon: 'fab fa-facebook', href: 'https://facebook.com' },
                { icon: 'fab fa-instagram', href: 'https://instagram.com' },
                { icon: 'fab fa-twitter', href: 'https://twitter.com' },
                { icon: 'fab fa-youtube', href: 'https://youtube.com' },
              ].map((item, i) => (
                <a key={i} href={item.href} target="_blank" rel="noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{ background: 'rgba(225,29,72,0.1)', border: '1px solid rgba(225,29,72,0.2)', color: '#e11d48' }}>
                  <i className={`${item.icon} text-sm`}></i>
                </a>
              ))}
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4 py-8">
            <div className="flex flex-wrap items-top">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <span className="block uppercase text-sm font-semibold mb-4"
                  style={{ color: '#e11d48', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.1em' }}>
                  Navigation
                </span>
                <ul className="list-unstyled">
                  {[
                    { label: "Accueil", to: "/" },
                    { label: "Abonnements", to: "/landing" },
                    { label: "Coachs", to: "/landing" },
                    { label: "Nutrition", to: "/landing" },
                    { label: "Contact", to: "/landing" },
                  ].map((item, i) => (
                    <li key={i}>
                      <Link to={item.to} className="block pb-2 text-sm hover:text-red-400 transition-colors"
                        style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-sm font-semibold mb-4"
                  style={{ color: '#e11d48', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.1em' }}>
                  Contact
                </span>
                <ul className="list-unstyled">
                  <li className="pb-2 text-sm" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>
                    <i className="fas fa-map-marker-alt mr-2" style={{ color: '#e11d48' }}></i>Tunis, Tunisie
                  </li>
                  <li className="pb-2 text-sm" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>
                    <i className="fas fa-phone mr-2" style={{ color: '#e11d48' }}></i>+216 71 XXX XXX
                  </li>
                  <li className="pb-2 text-sm" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>
                    <i className="fas fa-envelope mr-2" style={{ color: '#e11d48' }}></i>contact@gymaccess.tn
                  </li>
                  <li className="pb-2 text-sm" style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}>
                    <i className="fas fa-clock mr-2" style={{ color: '#e11d48' }}></i>6h00 - 23h00, 7j/7
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr style={{ borderColor: '#2a2a2a' }} />
        <div className="flex flex-wrap items-center md:justify-between justify-center py-4">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm font-semibold py-1" style={{ color: '#6b7280', fontFamily: 'Rajdhani, sans-serif' }}>
              © {new Date().getFullYear()} GymAccess. Tous droits réservés.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}