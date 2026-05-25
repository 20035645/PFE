import React, { useCallback, useEffect, useRef, useState } from "react";
import ChatMessageContent from "components/Chat/ChatMessageContent";
import { sendChatMessage } from "Services/apiChat";
import {
  AUTH_CHANGE_EVENT,
  clearChatSession,
  getChatSessionId,
  getMemberSession,
} from "Services/authSession";

const QUICK_PROMPTS = [
  "Donne-moi 3 conseils pour débuter la musculation",
  "Quels programmes propose la salle pour débutants ?",
  "Comment bien m'échauffer avant une séance ?",
];

const WELCOME = {
  role: "assistant",
  content:
    "Salut ! Je suis **GymGPT**, ton assistant GymAccess. Pose-moi des questions sur l'entraînement, la nutrition ou les services de la salle.",
  meta: { welcome: true },
};

export default function GymChatWidget() {
  const [memberSession, setMemberSession] = useState(() => getMemberSession());
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const refreshSession = useCallback(() => {
    setMemberSession(getMemberSession());
  }, []);

  useEffect(() => {
    refreshSession();
    const onAuthChange = () => refreshSession();
    window.addEventListener(AUTH_CHANGE_EVENT, onAuthChange);
    window.addEventListener("storage", onAuthChange);
    return () => {
      window.removeEventListener(AUTH_CHANGE_EVENT, onAuthChange);
      window.removeEventListener("storage", onAuthChange);
    };
  }, [refreshSession]);

  useEffect(() => {
    if (!memberSession) {
      setOpen(false);
    }
  }, [memberSession]);

  useEffect(() => {
    if (open && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, loading]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  if (!memberSession) {
    return null;
  }

  const { user, memberId } = memberSession;
  const sessionId = getChatSessionId(memberId);

  const sendMessage = async (text) => {
    const trimmed = (text || "").trim();
    if (!trimmed || loading) return;

    setError("");
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setLoading(true);

    try {
      const data = await sendChatMessage({
        userId: memberId,
        message: trimmed,
        sessionId,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply || "Je n'ai pas pu générer de réponse.",
          meta: {
            backend: data.backend,
            tools_enabled: data.tools_enabled,
          },
        },
      ]);
    } catch (err) {
      setError(
        err.message ||
          "Impossible de joindre GymGPT. Vérifiez que le service tourne sur le port 8000."
      );
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Désolé, une erreur s'est produite. Réessayez dans un instant ou contactez l'accueil de la salle.",
          meta: { error: true },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const clearChat = () => {
    clearChatSession(memberId);
    setMessages([WELCOME]);
    setError("");
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={styles.fab}
          aria-label="Ouvrir GymGPT"
        >
          <span style={styles.fabIcon}>💬</span>
          <span style={styles.fabLabel}>GymGPT</span>
        </button>
      )}

      {open && (
        <div style={styles.panel} role="dialog" aria-label="GymGPT chat">
          <header style={styles.header}>
            <div>
              <div style={styles.headerTitle}>GYM<span style={{ color: "#D62828" }}>GPT</span></div>
              <div style={styles.headerSub}>
                Membre · {user.name} · ID {memberId.slice(-6)}
              </div>
            </div>
            <div style={styles.headerActions}>
              <button type="button" style={styles.iconBtn} onClick={clearChat} title="Nouvelle conversation">
                ↺
              </button>
              <button
                type="button"
                style={styles.iconBtn}
                onClick={() => setOpen(false)}
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>
          </header>

          <div style={styles.messages}>
            {messages.map((msg, i) => {
              const isUser = msg.role === "user";
              return (
                <div
                  key={i}
                  style={{
                    ...styles.row,
                    justifyContent: isUser ? "flex-end" : "flex-start",
                  }}
                >
                  {!isUser && (
                    <div style={styles.avatar}>🤖</div>
                  )}
                  <div
                    style={{
                      ...styles.bubble,
                      ...(isUser ? styles.bubbleUser : styles.bubbleBot),
                      ...(msg.meta?.error ? styles.bubbleError : {}),
                    }}
                  >
                    <ChatMessageContent text={msg.content} isUser={isUser} />
                    {msg.meta?.tools_enabled && !msg.meta?.welcome && (
                      <div style={styles.badge}>Données salle utilisées</div>
                    )}
                  </div>
                  {isUser && <div style={styles.avatarUser}>👤</div>}
                </div>
              );
            })}

            {loading && (
              <div style={{ ...styles.row, justifyContent: "flex-start" }}>
                <div style={styles.avatar}>🤖</div>
                <div style={{ ...styles.bubble, ...styles.bubbleBot }}>
                  <div style={styles.typing}>
                    <span style={styles.dot} />
                    <span style={{ ...styles.dot, animationDelay: "0.15s" }} />
                    <span style={{ ...styles.dot, animationDelay: "0.3s" }} />
                  </div>
                </div>
              </div>
            )}

            {error && <div style={styles.errorBanner}>⚠ {error}</div>}
            <div ref={bottomRef} />
          </div>

          <div style={styles.quickRow}>
            {QUICK_PROMPTS.map((q) => (
              <button
                key={q}
                type="button"
                style={styles.chip}
                onClick={() => sendMessage(q)}
                disabled={loading}
              >
                {q.length > 42 ? `${q.slice(0, 42)}…` : q}
              </button>
            ))}
          </div>

          <form style={styles.form} onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question…"
              style={styles.input}
              disabled={loading}
            />
            <button type="submit" style={styles.sendBtn} disabled={loading || !input.trim()}>
              ↑
            </button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes gymgpt-bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </>
  );
}

const styles = {
  fab: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    zIndex: 9998,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "linear-gradient(135deg, #D62828, #991b1b)",
    color: "#fff",
    border: "none",
    borderRadius: "999px",
    padding: "14px 20px",
    cursor: "pointer",
    boxShadow: "0 12px 40px rgba(214, 40, 40, 0.45)",
    fontFamily: "'Barlow', sans-serif",
    fontWeight: 700,
    letterSpacing: "1px",
  },
  fabIcon: { fontSize: "1.2rem" },
  fabLabel: { fontSize: "0.85rem", textTransform: "uppercase" },
  panel: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    zIndex: 9999,
    width: "min(720px, calc(100vw - 24px))",
    height: "min(640px, calc(100vh - 32px))",
    display: "flex",
    flexDirection: "column",
    background: "#111",
    border: "1px solid rgba(214, 40, 40, 0.35)",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 24px 80px rgba(0,0,0,0.6)",
    fontFamily: "'Barlow', sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 18px",
    background: "linear-gradient(180deg, #1a1a1a, #111)",
    borderBottom: "1px solid rgba(214, 40, 40, 0.25)",
  },
  headerTitle: {
    fontFamily: "'Bebas Neue', sans-serif",
    fontSize: "1.5rem",
    letterSpacing: "3px",
    color: "#f5f5f5",
  },
  headerSub: { fontSize: "0.72rem", color: "#888", marginTop: "2px" },
  headerActions: { display: "flex", gap: "8px" },
  iconBtn: {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid #333",
    color: "#aaa",
    width: "32px",
    height: "32px",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  messages: {
    flex: 1,
    overflowY: "auto",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    background: "#0A0A0A",
  },
  row: { display: "flex", alignItems: "flex-end", gap: "8px" },
  avatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "#1a1a1a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    flexShrink: 0,
  },
  avatarUser: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    background: "rgba(214, 40, 40, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1rem",
    flexShrink: 0,
  },
  bubble: {
    maxWidth: "88%",
    padding: "14px 16px",
    borderRadius: "14px",
    fontSize: "0.98rem",
  },
  bubbleUser: {
    background: "linear-gradient(135deg, #D62828, #b91c1c)",
    color: "#fff",
    borderBottomRightRadius: "4px",
  },
  bubbleBot: {
    background: "#1a1a1a",
    border: "1px solid #2a2a2a",
    borderBottomLeftRadius: "4px",
  },
  bubbleError: {
    borderColor: "rgba(214, 40, 40, 0.5)",
  },
  badge: {
    marginTop: "10px",
    fontSize: "0.65rem",
    color: "#D62828",
    textTransform: "uppercase",
    letterSpacing: "1px",
    opacity: 0.9,
  },
  typing: { display: "flex", gap: "6px", padding: "4px 0" },
  dot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#D62828",
    animation: "gymgpt-bounce 1s ease infinite",
  },
  errorBanner: {
    background: "rgba(214, 40, 40, 0.12)",
    border: "1px solid rgba(214, 40, 40, 0.35)",
    color: "#f87171",
    padding: "10px 12px",
    borderRadius: "8px",
    fontSize: "0.82rem",
  },
  quickRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    padding: "10px 12px",
    borderTop: "1px solid #222",
    background: "#111",
  },
  chip: {
    background: "#1a1a1a",
    border: "1px solid #333",
    color: "#aaa",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "0.7rem",
    cursor: "pointer",
    fontFamily: "'Barlow', sans-serif",
  },
  form: {
    display: "flex",
    gap: "8px",
    padding: "12px",
    borderTop: "1px solid #222",
    background: "#111",
  },
  input: {
    flex: 1,
    background: "#0A0A0A",
    border: "1px solid #333",
    borderRadius: "10px",
    padding: "12px 14px",
    color: "#f5f5f5",
    fontSize: "0.9rem",
    outline: "none",
    fontFamily: "'Barlow', sans-serif",
  },
  sendBtn: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    border: "none",
    background: "#D62828",
    color: "#fff",
    fontSize: "1.2rem",
    fontWeight: 700,
    cursor: "pointer",
  },
};
