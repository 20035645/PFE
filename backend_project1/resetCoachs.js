require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const hash = await bcrypt.hash('Coach123!', 10);
  
  const result = await mongoose.connection.db
    .collection('coaches')
    .updateMany({}, { $set: { password: hash } });
    
  console.log('Coaches mis à jour:', result.modifiedCount);
  
  // Crée aussi un admin dans membres
  const adminHash = await bcrypt.hash('Admin123!', 10);
  const existingAdmin = await mongoose.connection.db
    .collection('membres')
    .findOne({ role: 'admin' });
    
  if (!existingAdmin) {
    await mongoose.connection.db.collection('membres').insertOne({
      name: 'Admin',
      email: 'admin@gym.com',
      password: adminHash,
      role: 'admin',
      statut: 'actif',
      permissions: [],
      createdAt: new Date(),
      updatedAt: new Date()
    });
    console.log('Admin créé: admin@gym.com / Admin123!');
  } else {
    await mongoose.connection.db.collection('membres')
      .updateOne({ role: 'admin' }, { $set: { password: adminHash } });
    console.log('Admin mis à jour:', existingAdmin.email, '/ Admin123!');
  }
  
  // Liste tous les coaches
  const coaches = await mongoose.connection.db
    .collection('coaches')
    .find({}, { projection: { email: 1, name: 1 } })
    .toArray();
  console.log('Coaches disponibles:');
  coaches.forEach(c => console.log(' -', c.email, '/ Coach123!'));
  
  process.exit();
});