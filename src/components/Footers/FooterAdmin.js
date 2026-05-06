import React from "react";
import { Link } from "react-router-dom";

export default function FooterAdmin() {
  return (
    <footer className="block py-4">
      <div className="container mx-auto px-4">
        <hr style={{ borderColor: '#2a2a2a' }} />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4">
            <div className="text-sm font-semibold py-1" style={{ color: '#6b7280', fontFamily: 'Rajdhani, sans-serif' }}>
              © {new Date().getFullYear()} GymAccess Admin
            </div>
          </div>
          <div className="w-full md:w-8/12 px-4">
            <ul className="flex flex-wrap list-none md:justify-end justify-center gap-4">
              {[
                { label: "Dashboard", to: "/admin/dashboard" },
                { label: "Membres", to: "/admin/tables" },
                { label: "Paramètres", to: "/admin/settings" },
              ].map((item, i) => (
                <li key={i}>
                  <Link to={item.to} className="text-xs font-semibold hover:text-red-400 transition-colors"
                    style={{ color: '#6b7280', fontFamily: 'Rajdhani, sans-serif' }}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}