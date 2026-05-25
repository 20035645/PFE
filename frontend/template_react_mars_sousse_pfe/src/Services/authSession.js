/** Auth helpers + event so GymGPT reacts to login/logout in the same tab */

export const AUTH_CHANGE_EVENT = "gymaccess-auth-change";

export function notifyAuthChange() {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function getStoredUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/** Returns member session only for signed-in users with role "membre" and a valid id */
export function getMemberSession() {
  const token = localStorage.getItem("token");
  const user = getStoredUser();

  if (!token || !user || user.role !== "membre") {
    return null;
  }

  const memberId = user._id || user.id;
  if (!memberId) {
    return null;
  }

  return { user, memberId: String(memberId) };
}

export function getChatSessionId(memberId) {
  const key = `gymchat_session_${memberId}`;
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = `sess_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

export function clearChatSession(memberId) {
  if (memberId) {
    sessionStorage.removeItem(`gymchat_session_${memberId}`);
  }
}
