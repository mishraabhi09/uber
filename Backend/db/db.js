const mongoose = require('mongoose');

const connecttoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            family: 4
        });
        console.log('Connected to MongoDB successfully');


        // Add connection event handlers
        mongoose.connection.on('error', err => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected');
            // Attempt to reconnect
            setTimeout(connecttoDB, 5000);
        });


    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        setTimeout(connecttoDB, 5000);
        process.exit(1);
    }
};

module.exports = connecttoDB;