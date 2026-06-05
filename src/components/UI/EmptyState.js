import React from "react";
import { colors, fonts } from "theme/gymTheme";

export default function EmptyState({ icon = "📭", title, message, action }) {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "3rem 1.5rem",
        color: colors.muted,
      }}
    >
      <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{icon}</div>
      {title && (
        <h4
          style={{
            fontFamily: fonts.display,
            letterSpacing: "2px",
            color: colors.text,
            margin: "0 0 0.5rem",
            fontSize: "1.1rem",
          }}
        >
          {title}
        </h4>
      )}
      {message && (
        <p style={{ margin: "0 0 1rem", fontSize: "0.9rem", maxWidth: "320px", marginLeft: "auto", marginRight: "auto" }}>
          {message}
        </p>
      )}
      {action}
    </div>
  );
}
