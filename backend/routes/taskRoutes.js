const express = require('express');
const Task = require('../models/Task');
const { verifyToken } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
    const newTask = new Task({ ...req.body, userId: req.user.id });
    await newTask.save();
    res.status(201).json(newTask);
});

router.get('/', verifyToken, async (req, res) => {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
});

router.put('/:id', verifyToken, async (req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
});

router.delete('/:id', verifyToken, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});

module.exports = router;
