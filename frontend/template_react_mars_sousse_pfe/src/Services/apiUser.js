import axios from 'axios';

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