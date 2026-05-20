/** Backend base URL — override with REACT_APP_API_URL in .env */
export const API_BASE =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

export const AUTH_API = `${API_BASE}/api/auth`;
export const USERS_API = `${API_BASE}/users`;
