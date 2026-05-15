import React from "react";
import UserDropdown from "components/Dropdowns/UserDropdown.js";

export default function AdminNavbar() {
  return (
    <>
      <nav
        className="absolute top-0 left-0 w-full z-10 flex items-center p-4"
        style={{ backgroundColor: 'rgba(17,17,17,0.95)', backdropFilter: 'blur(10px)', borderBottom: '1px solid #2a2a2a' }}
      >
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #e11d48, #9f1239)' }}>
            </div>
          </div>

          <ul className="flex-col md:flex-row list-none items-center hidden md:flex gap-4">
            <li>
            </li>
            <li>
            
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}