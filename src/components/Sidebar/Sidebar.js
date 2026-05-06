import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function Sidebar() {
  const [collapseShow, setCollapseShow] = useState("hidden");
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItem = (to, icon, label) => (
    <li className="items-center">
      <Link
        to={to}
        className={`flex items-center gap-3 text-xs uppercase py-3 px-4 font-semibold transition-all duration-200 ${
          isActive(to)
            ? "sidebar-active text-red-500"
            : "text-gray-400 hover:text-red-400 hover:bg-red-900 hover:bg-opacity-10"
        }`}
        style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em', fontSize: '0.8rem' }}
      >
        <i className={`${icon} text-sm w-5 text-center`}></i>
        {label}
      </Link>
    </li>
  );

  return (
    <>
      <nav
        className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
        style={{ backgroundColor: '#111111', borderRight: '1px solid #2a2a2a' }}
      >
        <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
          
          {/* Toggler */}
          <button
            className="cursor-pointer text-gray-400 opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-transparent"
            onClick={() => setCollapseShow(collapseShow === "hidden" ? "bg-gray-900 m-2 py-3 px-6" : "hidden")}
          >
            <i className="fas fa-bars"></i>
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="md:block text-left md:pb-2 mr-0 inline-block whitespace-nowrap p-4 px-0"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e11d48, #9f1239)' }}>
                <i className="fas fa-dumbbell text-white text-sm"></i>
              </div>
              <span style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: 'white', letterSpacing: '0.1em' }}>
                GYM<span style={{ color: '#e11d48' }}>ACCESS</span>
              </span>
            </div>
          </Link>

          {/* User dropdown mobile */}
          <ul className="md:hidden items-center flex flex-wrap list-none">
            <li className="inline-block relative">
              <UserDropdown />
            </li>
          </ul>

          {/* Collapse */}
          <div className={`md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ${collapseShow}`}>
            
            {/* Close mobile */}
            <div className="md:min-w-full md:hidden block pb-4 mb-4 border-b border-gray-800">
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link to="/" className="md:block text-left inline-block whitespace-nowrap text-sm font-bold p-4 px-0" style={{ color: '#e11d48', fontFamily: 'Oswald, sans-serif' }}>
                    GYMACCESS
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className="cursor-pointer text-gray-500 opacity-50 md:hidden"
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" style={{ borderColor: '#2a2a2a' }} />
            
            {/* Admin Section */}
            <h6 className="md:min-w-full text-xs uppercase font-bold block pt-1 pb-4 no-underline" style={{ color: '#e11d48', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.15em' }}>
              Administration
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none">
              {navItem("/admin/dashboard", "fas fa-chart-bar", "Dashboard")}
              {navItem("/admin/settings", "fas fa-cog", "Paramètres")}
              {navItem("/admin/tables", "fas fa-table", "Membres")}
              {navItem("/admin/maps", "fas fa-map-marked-alt", "Localisation")}
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" style={{ borderColor: '#2a2a2a' }} />

            {/* Pages Section */}
            <h6 className="md:min-w-full text-xs uppercase font-bold block pt-1 pb-4 no-underline" style={{ color: '#e11d48', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.15em' }}>
              Pages
            </h6>
            <ul className="md:flex-col md:min-w-full flex flex-col list-none md:mb-4">
              {navItem("/landing", "fas fa-dumbbell", "Salle de Sport")}
              {navItem("/profile", "fas fa-user", "Profil")}
              {navItem("/auth/login", "fas fa-sign-in-alt", "Connexion")}
              {navItem("/auth/register", "fas fa-user-plus", "Inscription")}
            </ul>

            {/* Divider */}
            <hr className="my-4 md:min-w-full" style={{ borderColor: '#2a2a2a' }} />

            {/* Quick Stats */}
            <div className="px-2 py-3 rounded-lg mb-4" style={{ background: 'rgba(225,29,72,0.08)', border: '1px solid rgba(225,29,72,0.2)' }}>
              <p className="text-xs mb-2" style={{ color: '#e11d48', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.1em' }}>AUJOURD'HUI</p>
              <div className="flex justify-between text-xs text-gray-400">
                <span><i className="fas fa-users mr-1"></i>247 membres</span>
                <span><i className="fas fa-fire mr-1" style={{ color: '#e11d48' }}></i>89 actifs</span>
              </div>
            </div>

          </div>
        </div>
      </nav>
    </>
  );
}