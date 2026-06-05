import React from "react";

export default function CardStats({
  statSubtitle,
  statTitle,
  statArrow,
  statPercent,
  statPercentColor,
  statDescripiton,
  statIconName,
  statIconColor,
}) {
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words rounded mb-6 xl:mb-0 shadow-lg stat-glow"
        style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}>
        <div className="flex-auto p-4">
          <div className="flex flex-wrap">
            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
              <h5 className="text-blueGray-400 uppercase font-bold text-xs mb-1"
                style={{ color: '#9ca3af', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.12em' }}>
                {statSubtitle}
              </h5>
              <span className="font-semibold text-xl text-blueGray-700"
                style={{ color: 'white', fontFamily: 'Oswald, sans-serif', letterSpacing: '0.05em' }}>
                {statTitle}
              </span>
            </div>
            <div className="relative w-auto pl-4 flex-initial">
              <div className={`text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full ${statIconColor}`}>
                <i className={statIconName}></i>
              </div>
            </div>
          </div>
          {statPercent && (
            <p className="text-sm text-blueGray-400 mt-4">
              <span className={`${statPercentColor} mr-2 font-semibold`} style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                <i className={`fas fa-arrow-${statArrow}`}></i> {statPercent}%
              </span>
              <span className="whitespace-nowrap text-xs" style={{ color: '#6b7280', fontFamily: 'Rajdhani, sans-serif' }}>
                {statDescripiton}
              </span>
            </p>
          )}
        </div>
      </div>
    </>
  );
}