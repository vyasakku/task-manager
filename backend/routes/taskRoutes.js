const express = require('express');
const Task = require('../models/Task');
const { verifyToken } = require('../middleware/authMiddleware');
const sendReminderEmail = require('../utils/emailReminder');

const router = express.Router();

// Create a new task
router.post('/', verifyToken, async (req, res) => {
    try {
        const newTask = new Task({ ...req.body, userId: req.user.id });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task' });
    }
});

// Get all tasks for the logged-in user
router.get('/', verifyToken, async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
});

// Update a task
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task' });
    }
});

// Delete a task
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task' });
    }
});

// ✅ New route to send task reminder
router.post('/:id/remind', verifyToken, async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        await sendReminderEmail(req.user.email, task);
        res.json({ message: 'Reminder email sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send reminder' });
    }
});

module.exports = router;
