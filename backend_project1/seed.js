require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('./models/user.model');
const Member = require('./models/member.model');
const Coach = require('./models/coach.model');
const Programme = require('./models/programme.model');
const Seance = require('./models/seance.model');
const Payment = require('./models/payment.model');
const Progression = require('./models/progression.model');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/gym';

async function seed() {
  await mongoose.connect(MONGO_URI);

  console.log('Connected to MongoDB');

  await User.deleteMany({});
  await Member.deleteMany({});
  await Coach.deleteMany({});
  await Programme.deleteMany({});
  await Seance.deleteMany({});
  await Payment.deleteMany({});
  await Progression.deleteMany({});

  const hashedAdminPassword = await bcrypt.hash('Admin123!', 10);
  const admin = await User.create({
    name: 'Gym Admin',
    email: 'admin@gym.com',
    password: hashedAdminPassword,
    role: 'admin',
    permissions: ['manage_users', 'manage_programs', 'view_reports'],
  });

  const coach = await Coach.create({
    name: 'Sami Coach',
    email: 'sami.coach@gym.com',
    password: 'Coach123!',
    phone: 12345678,
    active: true,
    specialite: 'musculation',
    experience: 5,
    tarif: 45,
    disponibilites: ['Lundi 18:00', 'Mercredi 19:00', 'Vendredi 17:00'],
  });

  const coachUser = await User.create({
    name: 'Sami Coach',
    email: 'sami.user@gym.com',
    password: hashedAdminPassword,
    role: 'coach',
    specialite: 'musculation',
    experience: 5,
    tarif: 45,
    disponibilites: ['Lundi 18:00', 'Mercredi 19:00', 'Vendredi 17:00'],
  });

  const member = await Member.create({
    name: 'Nadia Membre',
    email: 'nadia.member@gym.com',
    password: 'Member123!',
    phone: 98765432,
    age: 28,
    objectif: 'musculation',
    abonnementType: 'mensuel',
    dateDebut: new Date(),
    dateFin: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    price: 120,
    abonnementActif: true,
    coachAssigned: coach._id,
  });

  const programme = await Programme.create({
    name: 'Programme Force Débutant',
    description: 'Un programme pour gagner en force et en endurance.',
    duree: 8,
    niveau: 'debutant',
    coach: coachUser._id,
  });

  const seance = await Seance.create({
    date: new Date(new Date().setDate(new Date().getDate() + 2)),
    heure: '18:00',
    capacite: 12,
    coach: coachUser._id,
    programme: programme._id,
    membres: [member._id],
  });

  const payment = await Payment.create({
    memberName: member.name,
    memberId: member._id,
    price: 120,
    dateDebut: member.dateDebut,
    dateFin: member.dateFin,
    method: 'carte_bancaire',
    status: 'effectue',
  });

  const progression = await Progression.create({
    poids: 68,
    taille: 170,
    objectif: 'musculation',
    membre: member._id,
    seance: seance._id,
    date: new Date(),
  });

  console.log('Seed finished');
  console.log({ admin, coach, member, programme, seance, payment, progression });
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed error:', error);
  process.exit(1);
});
