const bcrypt = require('bcrypt');
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

 
const maxAge = 3 * 24 * 60 * 60;
const secretKey = "net secret key";

const createToken = (id) => {
    return jwt.sign({id}, secretKey, {
        expiresIn: maxAge
    });
}

//module.exports.esm = async (req,res) => {
    //try{
        //res.status(200).json('message');
    //}catch (error) {
        //res.status(500).json({error :error.message});
    //}
//};

module.exports.getAllUsers = async (req,res) => {
    try{
        const users = await userModel.find();
        res.status(200).json(users);
    }catch(error) {
        res.status(500).json({error :error.message});
    }
};

module.exports.addUser = async (req,res) => {
    try{
        const { username, email, password, role, age, location, phone, objectif, abonnementType } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            username,
            email,
            password: hashedPassword,
            role,
            age,
            location,
            phone,
            objectif,
            abonnementType
        });

        await newUser.save();
        res.status(201).json(newUser);
    }catch(error){
        res.status(500).json({error :error.message});
    }
};

module.exports.addAdmin = async (req,res) => {
    try{
        const {email,password,permissions} = req.body;
        const newAdmin = new userModel ({email, password, permissions, role: 'admin'});
        await newAdmin.save();
        res.status(201).json(newAdmin);
    }catch(error){
        res.status(500).json({error :error.message});
    }
}

module.exports.deleteUser = async (req,res) => {
    try{
        const { id } = req.params;
        const deletedUser = await userModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({error : "User not found"});
        }
        res.status(200).json({message : "User deleted successfully"});
    }catch(error){
        res.status(500).json({error :error.message});
    }
}

module.exports.updateUser = async (req,res) => {
    try{
        const { id } = req.params;
        const { phone, location, username } = req.body;
        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            { phone , location , username },
            { new: true },
        );
        if (!updatedUser) {
            return res.status(404).json({error : "User not found"});        
        }
        res.status(200).json(updatedUser);
    }catch (error){
        res.status(500).json({error : error.message});
    }
}

   
module.exports.rechercheByUserName = async (req,res) => {
    try{
        const { username } = req.params;
        const user = await userModel.findOne({ username });
        if (!user){
            return res.status(404).json({error: "User not found"});
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.getUserById = async (req,res) => {
    try{
        const { id } = req.params;
        const user = await userModel.findById(id);
        if (!user){
            return res.status(404).json({error: "User not found"});
        }
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports.addUserwithPhoto = async (req,res) => {
    try{
        const { email, password } = req.body;
        const photo = req.file ? req.file.path : null;
        const newUser = new userModel({email, password, photo});
        await newUser.save();
        res.status(201).json(newUser);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

//jwt => id + date d'expiration + not secret key => token jsonwebtoken => npm install jsonwebtoken
//

module.exports.login = async (req,res) => {
    try{
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }
        const token = createToken(user._id);
        res.status(200).json({ message: "Login successful", user, token });
    }catch(error){
        res.status(500).json({ error: error.message });
    }
}
