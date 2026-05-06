import React from "react";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function AdminNavbar() {
  return (
    <>
      <nav
        className="absolute top-0 left-0 w-full z-10 flex items-center p-4"
        style={{ backgroundColor: 'rgba(17,17,17,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #2a2a2a' }}
      >
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e11d48, #9f1239)' }}>
              <i className="fas fa-dumbbell text-white" style={{ fontSize: '0.6rem' }}></i>
            </div>
            <span style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1rem', color: 'white', letterSpacing: '0.08em' }}>
              GYMACCESS <span style={{ color: '#e11d48' }}>ADMIN</span>
            </span>
          </div>

          <ul className="flex-col md:flex-row list-none items-center hidden md:flex gap-4">
            <li>
              <span className="text-xs text-gray-400" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                <i className="fas fa-circle text-green-400 mr-1" style={{ fontSize: '0.5rem' }}></i>
                Système opérationnel
              </span>
            </li>
            <li>
              <UserDropdown />
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}