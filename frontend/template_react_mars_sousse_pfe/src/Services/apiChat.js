export const CHAT_API =
  process.env.REACT_APP_CHAT_API_URL || "http://localhost:8000";

export async function sendChatMessage({ userId, message, sessionId }) {
  const res = await fetch(`${CHAT_API}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user_id: userId,
      message,
      session_id: sessionId || undefined,
    }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(
      typeof data.detail === "string"
        ? data.detail
        : data.error || "Chat request failed"
    );
    err.status = res.status;
    throw err;
  }

  return data;
}

export async function getChatHealth() {
  const res = await fetch(`${CHAT_API}/health`);
  return res.json();
}

/** Parse assistant text into render blocks for rich UI */
export function parseMessageContent(text) {
  if (!text || typeof text !== "string") {
    return [{ type: "paragraph", lines: [""] }];
  }

  const blocks = [];
  const lines = text.split("\n");
  let i = 0;

  while (i < lines.length) {
    const trimmed = lines[i].trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    if (/^[-*•]\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^[-*•]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*•]\s+/, ""));
        i += 1;
      }
      blocks.push({ type: "list", ordered: false, items });
      continue;
    }

    if (/^\d+[.)]\s+/.test(trimmed)) {
      const items = [];
      while (i < lines.length && /^\d+[.)]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+[.)]\s+/, ""));
        i += 1;
      }
      blocks.push({ type: "list", ordered: true, items });
      continue;
    }

    const para = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^[-*•]\s+/.test(lines[i].trim()) &&
      !/^\d+[.)]\s+/.test(lines[i].trim())
    ) {
      para.push(lines[i]);
      i += 1;
    }
    blocks.push({ type: "paragraph", lines: para });
  }

  if (blocks.length === 0) {
    blocks.push({ type: "paragraph", lines: [text] });
  }

  return blocks;
}
