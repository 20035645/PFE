const mongoose = require('mongoose');

module.exports.connectToMongoDB = async () => {

    try {

        console.log("Connecting to MongoDB...");

        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 30000
        });

        console.log('Connected to MongoDB');

    } catch (err) {

        console.error('Error connecting to MongoDB:', err);

    }
};