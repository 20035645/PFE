import React from "react";
import { colors } from "theme/gymTheme";

export default function LoadingSpinner({ label = "Chargement...", size = 32 }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
        padding: "2.5rem",
        color: colors.muted,
      }}
    >
      <div
        style={{
          width: size,
          height: size,
          border: `3px solid ${colors.border}`,
          borderTopColor: colors.red,
          borderRadius: "50%",
          animation: "gym-spin 0.8s linear infinite",
        }}
      />
      <span style={{ fontSize: "0.88rem", letterSpacing: "0.05em" }}>{label}</span>
      <style>{`@keyframes gym-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
