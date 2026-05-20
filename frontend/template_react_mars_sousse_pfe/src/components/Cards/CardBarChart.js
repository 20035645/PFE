import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

export default function CardBarChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
        datasets: [
          {
            label: "Séances réalisées",
            backgroundColor: [
              "rgba(225,29,72,0.8)",
              "rgba(225,29,72,0.7)",
              "rgba(225,29,72,0.6)",
              "rgba(225,29,72,0.8)",
              "rgba(225,29,72,0.9)",
              "rgba(225,29,72,1)",
              "rgba(225,29,72,0.4)",
            ],
            borderColor: "#e11d48",
            borderWidth: 0,
            data: [89, 114, 97, 128, 143, 168, 52],
            borderRadius: 4,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: { fontColor: "#9ca3af", fontFamily: "Rajdhani", fontSize: 12 },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
          backgroundColor: "#1a1a1a",
          borderColor: "#e11d48",
          borderWidth: 1,
          titleFontColor: "#ffffff",
          bodyFontColor: "#9ca3af",
        },
        scales: {
          xAxes: [{
            gridLines: { display: false, drawBorder: false },
            ticks: { fontColor: "#6b7280", fontFamily: "Rajdhani", fontSize: 11 },
          }],
          yAxes: [{
            ticks: {
              fontColor: "#6b7280",
              fontFamily: "Rajdhani",
              fontSize: 11,
              beginAtZero: true,
            },
            gridLines: {
              borderDash: [2], color: "rgba(255,255,255,0.05)",
              drawBorder: false, zeroLineColor: "transparent",
            },
          }],
        },
      },
    });

    return () => { if (chartInstance.current) chartInstance.current.destroy(); };
  }, []);

  return (
    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
      style={{ backgroundColor: '#111111', border: '1px solid #2a2a2a' }}>
      <div className="rounded-t mb-0 px-4 py-3" style={{ borderBottom: '1px solid #2a2a2a' }}>
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h6 className="uppercase mb-1 text-xs font-semibold" style={{ color: '#e11d48', fontFamily: 'Rajdhani, sans-serif', letterSpacing: '0.1em' }}>
              Performance hebdomadaire
            </h6>
            <h2 className="text-xl font-semibold" style={{ color: 'white', fontFamily: 'Oswald, sans-serif' }}>
              Fréquentation par Jour
            </h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        <div className="relative" style={{ height: "350px" }}>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
    </div>
  );
}