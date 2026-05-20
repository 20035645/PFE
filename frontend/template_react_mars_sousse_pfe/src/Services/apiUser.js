import axios from "axios";
import { AUTH_API, USERS_API } from "./api";

<<<<<<< HEAD
export async function getAllUsers() {
  return await axios.get(`${USERS_API}/getAllUsers`);
}

export async function getUserById(id) {
  return await axios.get(`${USERS_API}/getUserById/${id}`);
}

export async function deleteUser(id) {
  return await axios.delete(`${USERS_API}/deleteUser/${id}`);
}

export async function addUser(userData) {
  return await axios.post(`${USERS_API}/addUser`, userData);
}

export async function updateUser(id, userData) {
  return await axios.put(`${USERS_API}/updateUser/${id}`, userData);
}

export async function registerUser(payload) {
  const res = await fetch(`${AUTH_API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || data.message || "Registration failed");
  }
  return data;
}

export async function loginUser(email, password) {
  const res = await fetch(`${AUTH_API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || data.message || "Login failed");
  }
  return data;
}
=======
const API_URL = 'http://localhost:5000/users';

export async function registerUser(userData) {
  return await axios.post(`${API_URL}/register`, userData);
}

export async function loginUser(credentials) {
  return await axios.post(`${API_URL}/login`, credentials);
}

export async function getAllUsers() {
  return await axios.get(`${API_URL}/getAllUsers`);
}

export async function getUserById(id) {
  return await axios.get(`${API_URL}/getUserById/${id}`);
}

export async function deleteUser(id) {
  return await axios.delete(`${API_URL}/deleteUser/${id}`);
}

export async function addUser(userData) {
  return await axios.post(`${API_URL}/addUser`, userData);
}

export async function updateUser(id, userData) {
  return await axios.put(`${API_URL}/updateUser/${id}`, userData);
}

// ── Séances ──
export async function getSeancesByMembre(membreId) {
  return await axios.get(`http://localhost:5000/seances/getSeancesByMembre/${membreId}`);
}

// ── Progressions ──
export async function getProgressionsByMembre(membreId) {
  return await axios.get(`http://localhost:5000/progressions/getProgressionsByMembre/${membreId}`);
}
>>>>>>> 4e3b5072001c40ddd098fb493cbb1d7eb6202f9e
