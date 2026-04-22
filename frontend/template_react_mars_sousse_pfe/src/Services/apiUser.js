import axios from 'axios';

//http://localhost:5000 Global URL for API 

//http://localhost:5000/Users Gestion des utilisateurs 

//http://localhost:5000/reservation des seances 

const API_URL = 'http://localhost:5000/Users';

//http://localhost:5000/Users/getAllUsers getallusers
//http://localhost:5000/Users/getUserById/:id get user by id 
//http://localhost:5000/Users/addUser add user
//http://localhost:5000/Users/updateUser/:id update user 
//http://localhost:5000/Users/deleteUser/:id delete user

//get => recuperer les donnees
//post => ajouter des donnees
//put => modifier les donnees
//delete => supprimer les donnees

//get all users 
export async function getAllUsers() {
    return await axios.get(`${API_URL}/getAllUsers`);
}

//get user by id
export async function getUserById(id){
    return await axios.get(`${API_URL}/getUserById/${id}`); 
}

export async function deleteUser(id){
    return await axios.delete(`${API_URL}/deleteUser/${id}`);
}

export async function addUser(userData){
    return await axios.post(`${API_URL}/addUser`, userData);
}

export async function updateUser(id, userData){
    return await axios.put(`${API_URL}/updateUser/${id}`, userData);
}

export async function getUserByEmail(email){
    return await axios.get(`${API_URL}/getUserByEmail/${email}`);
}