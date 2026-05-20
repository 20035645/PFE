import axios from "axios";
import { AUTH_API, USERS_API } from "./api";

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
