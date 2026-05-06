import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";

export default function UserDropdown() {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnRef = useRef(null);
  const popoverRef = useRef(null);

  const openDropdown = () => {
    createPopper(btnRef.current, popoverRef.current, { placement: "bottom-end" });
    setDropdownPopoverShow(true);
  };
  const closeDropdown = () => setDropdownPopoverShow(false);

  return (
    <>
      <button
        className="flex items-center gap-2 px-3 py-2 rounded transition-colors"
        style={{ background: 'rgba(225,29,72,0.1)', border: '1px solid rgba(225,29,72,0.2)', cursor: 'pointer' }}
        ref={btnRef}
        onClick={() => dropdownPopoverShow ? closeDropdown() : openDropdown()}
      >
        <div className="w-7 h-7 rounded-full flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #e11d48, #9f1239)' }}>
          <i className="fas fa-user text-white" style={{ fontSize: '0.7rem' }}></i>
        </div>
        <span className="hidden md:block text-xs text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>Admin</span>
      </button>
      <div
        ref={popoverRef}
        className={`${dropdownPopoverShow ? "block " : "hidden "}rounded shadow-xl z-50 py-2`}
        style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', minWidth: '160px' }}
      >
        {[
          { label: "Mon Profil", icon: "fas fa-user", to: "/profile" },
          { label: "Paramètres", icon: "fas fa-cog", to: "/admin/settings" },
          { label: "Déconnexion", icon: "fas fa-sign-out-alt", to: "/auth/login" },
        ].map((item, i) => (
          <Link key={i} to={item.to}
            className="flex items-center gap-3 px-4 py-2 text-xs hover:text-red-400 transition-colors"
            style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}
            onClick={closeDropdown}>
            <i className={`${item.icon} w-4`} style={{ color: i === 2 ? '#e11d48' : 'inherit' }}></i>
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}