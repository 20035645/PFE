import React from "react";
import { parseMessageContent } from "services/apiChat";

function renderInlineText(text, keyPrefix) {
  const parts = [];
  const re = /(\*\*[^*]+\*\*|`[^`]+`)/g;
  let last = 0;
  let m;
  let idx = 0;

  while ((m = re.exec(text)) !== null) {
    if (m.index > last) {
      parts.push(
        <span key={`${keyPrefix}-t-${idx++}`}>{text.slice(last, m.index)}</span>
      );
    }
    const token = m[0];
    if (token.startsWith("**")) {
      parts.push(
        <strong
          key={`${keyPrefix}-b-${idx++}`}
          style={{ color: "#fff", fontWeight: 700 }}
        >
          {token.slice(2, -2)}
        </strong>
      );
    } else {
      parts.push(
        <code
          key={`${keyPrefix}-c-${idx++}`}
          style={{
            background: "rgba(214,40,40,0.15)",
            padding: "2px 6px",
            borderRadius: "4px",
            fontSize: "0.9em",
          }}
        >
          {token.slice(1, -1)}
        </code>
      );
    }
    last = m.index + token.length;
  }

  if (last < text.length) {
    parts.push(<span key={`${keyPrefix}-t-${idx}`}>{text.slice(last)}</span>);
  }

  return parts.length ? parts : text;
}

export default function ChatMessageContent({ text, isUser }) {
  if (isUser) {
    return <span>{text}</span>;
  }

  const blocks = parseMessageContent(text);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {blocks.map((block, bi) => {
        if (block.type === "list") {
          const Tag = block.ordered ? "ol" : "ul";
          return (
            <Tag
              key={bi}
              style={{
                margin: 0,
                paddingLeft: "1.25rem",
                color: "#d4d4d4",
                lineHeight: 1.55,
              }}
            >
              {block.items.map((item, ii) => (
                <li key={ii} style={{ marginBottom: "4px" }}>
                  {renderInlineText(item, `b${bi}-i${ii}`)}
                </li>
              ))}
            </Tag>
          );
        }

        return (
          <div key={bi}>
            {block.lines.map((line, li) => (
              <p
                key={li}
                style={{
                  margin: li === 0 ? 0 : "8px 0 0",
                  lineHeight: 1.55,
                  color: "#d4d4d4",
                }}
              >
                {renderInlineText(line, `b${bi}-p${li}`)}
              </p>
            ))}
          </div>
        );
      })}
    </div>
  );
}
