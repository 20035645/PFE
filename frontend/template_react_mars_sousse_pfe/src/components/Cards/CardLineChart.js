import React, { useEffect, useRef } from "react";
import Chart from "chart.js";

export default function CardLineChart() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    if (chartInstance.current) chartInstance.current.destroy();

    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
        datasets: [
          {
            label: "Nouveaux membres",
            backgroundColor: "rgba(225, 29, 72, 0.1)",
            borderColor: "#e11d48",
            data: [45, 62, 58, 74, 89, 103, 112, 98, 125, 143, 118, 156],
            borderWidth: 2,
            pointBackgroundColor: "#e11d48",
            pointRadius: 4,
            tension: 0.4,
            fill: true,
          },
          {
            label: "Abonnements renouvelés",
            backgroundColor: "rgba(255,255,255,0.05)",
            borderColor: "rgba(255,255,255,0.3)",
            data: [38, 54, 49, 63, 75, 88, 95, 82, 109, 128, 101, 134],
            borderWidth: 2,
            pointBackgroundColor: "rgba(255,255,255,0.6)",
            pointRadius: 3,
            tension: 0.4,
            fill: true,
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
        hover: { mode: "nearest", intersect: true },
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
            gridLines: { borderDash: [2], borderDashOffset: 2, color: "rgba(255,255,255,0.05)", drawBorder: false, zeroLineColor: "transparent" },
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
              Vue d'ensemble
            </h6>
            <h2 className="text-xl font-semibold" style={{ color: 'white', fontFamily: 'Oswald, sans-serif' }}>
              Évolution des Membres
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