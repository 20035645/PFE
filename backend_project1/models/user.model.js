const mongoose = require('mongoose');
const bcrypt =require('bcrypt');
const userSchema = new mongoose.Schema({
    username : {type: String, required: true},
    email: {type: String, required: true, unique:true,regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/},
    password: {type: String, required: true},
    role: {type : String, enum: ['admin','coach', 'membre'], default: 'membre'},
    perf: String,
    location: String,
    phone: Number,
    active: Boolean,
    photo: String,

    //admin
    permissions: { type: [String], default: [] },
    
    //membre
     age: { type: Number },
        objectif: {
            type: String,
            enum: ['perte_de_poids', 'musculation', 'cardio', 'souplesse', 'autre'],
        },
        dateDebut :  { type: Date },
        dateFin :    { type: Date },
        abonnementType: {
            type: String,
            enum: ['mensuel', 'trimestriel', 'annuel'],
        },
        perf: { type: String },
        coachAssigned: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },

    //coach
    specialite: {
            type: String,
            enum: ['musculation', 'yoga', 'cardio', 'crossfit', 'natation', 'autre'],
        },
        experience:     { type: Number },
        tarif:          { type: Number },
        disponibilites: { type: [String], default: [] },
        membres: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }],
    },
    
    { timestamps: true }
);
    

userSchema.pre('save',async function(){
    //hash the password before saving the user
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.statics.Login = async function(email,password) {
    const user = await this.findOne({email});
    if(!user){
        throw new Error('Invalid email or password');
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error('Invalid password');
    }
    return user;
}


module.exports = mongoose.model('User',userSchema);