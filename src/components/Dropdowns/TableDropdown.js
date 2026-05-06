import React, { useState, useRef, useEffect } from "react";
import { createPopper } from "@popperjs/core";

export default function TableDropdown() {
  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnRef = useRef(null);
  const popoverRef = useRef(null);

  const openDropdown = () => {
    createPopper(btnRef.current, popoverRef.current, { placement: "left-start" });
    setDropdownPopoverShow(true);
  };
  const closeDropdown = () => setDropdownPopoverShow(false);

  useEffect(() => {
    const handleClickOutside = () => { if (dropdownPopoverShow) closeDropdown(); };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [dropdownPopoverShow]);

  return (
    <>
      <button
        ref={btnRef}
        onClick={(e) => { e.stopPropagation(); dropdownPopoverShow ? closeDropdown() : openDropdown(); }}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </button>
      <div
        ref={popoverRef}
        className={`${dropdownPopoverShow ? "block " : "hidden "}rounded shadow-xl z-50 py-2`}
        style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', minWidth: '140px' }}
      >
        {[
          { label: "Voir", icon: "fas fa-eye" },
          { label: "Modifier", icon: "fas fa-edit" },
          { label: "Supprimer", icon: "fas fa-trash" },
        ].map((item, i) => (
          <button key={i}
            className="flex items-center gap-3 px-4 py-2 text-xs hover:text-red-400 transition-colors w-full text-left"
            style={{ color: i === 2 ? '#ef4444' : '#9ca3af', fontFamily: 'Rajdhani, sans-serif', background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => closeDropdown()}>
            <i className={`${item.icon} w-4`}></i>
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}