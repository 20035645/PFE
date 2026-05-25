import axios from "axios";
import api, { AUTH_API, API_BASE, USERS_API } from "./api";

async function parseJsonResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    const err = new Error(data.error || data.message || "Request failed");
    err.response = { data, status: res.status };
    throw err;
  }
  return data;
}

export async function registerUser(userData) {
  const res = await fetch(`${AUTH_API}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  return parseJsonResponse(res);
}

export async function loginUser({ email, password }) {
  const res = await fetch(`${AUTH_API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await parseJsonResponse(res);
  return { data };
}

export async function getAllUsers() {
  return api.get(`${USERS_API}/getAllUsers`);
}

export async function getUserById(id) {
  return api.get(`${USERS_API}/getUserById/${id}`);
}

export async function deleteUser(id) {
  return api.delete(`${USERS_API}/deleteUser/${id}`);
}

export async function addUser(userData) {
  return api.post(`${USERS_API}/addUser`, userData);
}

export async function updateUser(id, userData) {
  return api.put(`${USERS_API}/updateUser/${id}`, userData);
}

export async function getSeancesByMembre(membreId) {
  return api.get(`${API_BASE}/seances/getSeancesByMembre/${membreId}`);
}

export async function getProgressionsByMembre(membreId) {
  return api.get(`${API_BASE}/progressions/getProgressionsByMembre/${membreId}`);
}
