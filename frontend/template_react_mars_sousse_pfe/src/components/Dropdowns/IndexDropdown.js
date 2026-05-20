import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { createPopper } from "@popperjs/core";

export default function IndexDropdown() {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnRef = useRef(null);
  const popoverRef = useRef(null);

  const openDropdownPopover = () => {
    createPopper(btnRef.current, popoverRef.current, { placement: "bottom-start" });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => setDropdownPopoverShow(false);

  return (
    <>
      <button
        className="text-gray-300 hover:text-red-400 transition-colors px-4 py-2 text-xs uppercase font-bold"
        style={{ fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em', background: 'none', border: 'none', cursor: 'pointer' }}
        ref={btnRef}
        onClick={() => dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover()}
      >
        Pages <i className="fas fa-chevron-down ml-1 text-xs"></i>
      </button>
      <div
        ref={popoverRef}
        className={`${dropdownPopoverShow ? "block " : "hidden "}rounded shadow-lg z-50 py-2`}
        style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', minWidth: '180px' }}
      >
        <div className="px-4 py-2 text-xs uppercase font-bold"
          style={{ color: '#e11d48', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.1em', borderBottom: '1px solid #2a2a2a' }}>
          Admin
        </div>
        {[
          { to: "/admin/dashboard", label: "Dashboard" },
          { to: "/admin/settings", label: "Paramètres" },
          { to: "/admin/tables", label: "Membres" },
          { to: "/admin/maps", label: "Maps" },
        ].map((item, i) => (
          <Link key={i} to={item.to}
            className="block px-4 py-2 text-xs hover:text-red-400 transition-colors"
            style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}
            onClick={closeDropdownPopover}>
            {item.label}
          </Link>
        ))}
        <div className="px-4 py-2 text-xs uppercase font-bold mt-2"
          style={{ color: '#e11d48', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.1em', borderTop: '1px solid #2a2a2a', borderBottom: '1px solid #2a2a2a' }}>
          Auth
        </div>
        {[
          { to: "/auth/login", label: "Connexion" },
          { to: "/auth/register", label: "Inscription" },
        ].map((item, i) => (
          <Link key={i} to={item.to}
            className="block px-4 py-2 text-xs hover:text-red-400 transition-colors"
            style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif' }}
            onClick={closeDropdownPopover}>
            {item.label}
          </Link>
        ))}
      </div>
    </>
  );
}