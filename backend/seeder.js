// Backend - Seeder Script (seeder.js)
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Task = require('./models/Task');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error(err));

const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany();
        await Task.deleteMany();

        // Create a test user
        const hashedPassword = await bcrypt.hash('password123', 10);
        const user = await User.create({ email: 'testuser@example.com', password: hashedPassword });

        // Create dummy tasks
        const tasks = [
            { title: 'Complete project', description: 'Finish the MERN Task Manager', category: 'Work', status: 'pending', userId: user._id },
            { title: 'Buy groceries', description: 'Get milk, eggs, and bread', category: 'Personal', status: 'completed', userId: user._id },
            { title: 'Exercise', description: 'Go for a 30-minute run', category: 'Health', status: 'pending', userId: user._id }
        ];

        await Task.insertMany(tasks);
        console.log('Data Seeded Successfully!');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error Seeding Data:', error);
        mongoose.connection.close();
    }
};

seedData();
