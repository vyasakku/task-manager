const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    dueDate: Date,
    userId: mongoose.Schema.Types.ObjectId,
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
