import axios from 'axios';

// ─────────────────────────────────────────────────────────────
//  apiGym.js — API GymAccess (même style que apiUser.js)
//  Base URL : http://localhost:5000
// ─────────────────────────────────────────────────────────────

const BASE_URL = 'http://localhost:5000';

// Token JWT (stocké au login)
function authHeader() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ─── MEMBRES  /members ────────────────────────────────────────
export async function getAllMembers() {
  return await axios.get(`${BASE_URL}/members`, { headers: authHeader() });
}
export async function getMemberById(id) {
  return await axios.get(`${BASE_URL}/members/${id}`, { headers: authHeader() });
}
export async function addMember(data) {
  return await axios.post(`${BASE_URL}/members`, data, { headers: authHeader() });
}
export async function updateMember(id, data) {
  return await axios.put(`${BASE_URL}/members/${id}`, data, { headers: authHeader() });
}
export async function deleteMember(id) {
  return await axios.delete(`${BASE_URL}/members/${id}`, { headers: authHeader() });
}

// ─── COACHS  /coaches ─────────────────────────────────────────
export async function getAllCoaches() {
  return await axios.get(`${BASE_URL}/coaches`, { headers: authHeader() });
}
export async function getCoachById(id) {
  return await axios.get(`${BASE_URL}/coaches/${id}`, { headers: authHeader() });
}
export async function addCoach(data) {
  return await axios.post(`${BASE_URL}/coaches`, data, { headers: authHeader() });
}
export async function updateCoach(id, data) {
  return await axios.put(`${BASE_URL}/coaches/${id}`, data, { headers: authHeader() });
}
export async function deleteCoach(id) {
  return await axios.delete(`${BASE_URL}/coaches/${id}`, { headers: authHeader() });
}

// ─── ABONNEMENTS  /abonnements ────────────────────────────────
export async function getAllAbonnements() {
  return await axios.get(`${BASE_URL}/abonnements`, { headers: authHeader() });
}
export async function getAbonnementById(id) {
  return await axios.get(`${BASE_URL}/abonnements/${id}`, { headers: authHeader() });
}
export async function addAbonnement(data) {
  return await axios.post(`${BASE_URL}/abonnements`, data, { headers: authHeader() });
}
export async function updateAbonnement(id, data) {
  return await axios.put(`${BASE_URL}/abonnements/${id}`, data, { headers: authHeader() });
}
export async function deleteAbonnement(id) {
  return await axios.delete(`${BASE_URL}/abonnements/${id}`, { headers: authHeader() });
}

// ─── PAIEMENTS  /payments ─────────────────────────────────────
export async function getAllPayments() {
  return await axios.get(`${BASE_URL}/payments`, { headers: authHeader() });
}
export async function getPaymentById(id) {
  return await axios.get(`${BASE_URL}/payments/${id}`, { headers: authHeader() });
}
export async function addPayment(data) {
  return await axios.post(`${BASE_URL}/payments`, data, { headers: authHeader() });
}
export async function updatePayment(id, data) {
  return await axios.put(`${BASE_URL}/payments/${id}`, data, { headers: authHeader() });
}
export async function deletePayment(id) {
  return await axios.delete(`${BASE_URL}/payments/${id}`, { headers: authHeader() });
}

// ─── SÉANCES  /seances ────────────────────────────────────────
export async function getAllSeances() {
  return await axios.get(`${BASE_URL}/seances`, { headers: authHeader() });
}
export async function getSeanceById(id) {
  return await axios.get(`${BASE_URL}/seances/${id}`, { headers: authHeader() });
}
export async function addSeance(data) {
  return await axios.post(`${BASE_URL}/seances`, data, { headers: authHeader() });
}
export async function updateSeance(id, data) {
  return await axios.put(`${BASE_URL}/seances/${id}`, data, { headers: authHeader() });
}
export async function deleteSeance(id) {
  return await axios.delete(`${BASE_URL}/seances/${id}`, { headers: authHeader() });
}

// ─── GYM CLASSES  /gymclasses ─────────────────────────────────
export async function getAllGymClasses() {
  return await axios.get(`${BASE_URL}/gymclasses`, { headers: authHeader() });
}
export async function getGymClassById(id) {
  return await axios.get(`${BASE_URL}/gymclasses/${id}`, { headers: authHeader() });
}
export async function addGymClass(data) {
  return await axios.post(`${BASE_URL}/gymclasses`, data, { headers: authHeader() });
}
export async function updateGymClass(id, data) {
  return await axios.put(`${BASE_URL}/gymclasses/${id}`, data, { headers: authHeader() });
}
export async function deleteGymClass(id) {
  return await axios.delete(`${BASE_URL}/gymclasses/${id}`, { headers: authHeader() });
}

// ─── PROGRESSIONS  /progressions ──────────────────────────────
export async function getAllProgressions() {
  return await axios.get(`${BASE_URL}/progressions`, { headers: authHeader() });
}
export async function getProgressionById(id) {
  return await axios.get(`${BASE_URL}/progressions/${id}`, { headers: authHeader() });
}
export async function addProgression(data) {
  return await axios.post(`${BASE_URL}/progressions`, data, { headers: authHeader() });
}
export async function updateProgression(id, data) {
  return await axios.put(`${BASE_URL}/progressions/${id}`, data, { headers: authHeader() });
}
export async function deleteProgression(id) {
  return await axios.delete(`${BASE_URL}/progressions/${id}`, { headers: authHeader() });
}

// ─── AUTH  /users ─────────────────────────────────────────────
export async function loginUser(credentials) {
  return await axios.post(`${BASE_URL}/users/login`, credentials);
}
export async function registerUser(userData) {
  return await axios.post(`${BASE_URL}/users/register`, userData);
}