const Task = require('../models/taskModel');

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.getAll();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tasks' });
    }
};

exports.createTask = async (req, res) => {
    const { text } = req.body;
    try {
        const task = await Task.create(text);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: 'Error creating task' });
    }
};

exports.clear = async (req, res) => {
    try {
        await Task.clear();
        res.status(200).json({ message: 'All tasks deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing tasks' });
    }
};

exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.delete(id);
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting task' });
    }
};

exports.editText = async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;
    try {
        const updatedTask = await Task.updateText(id, text);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task text' });
    }
};

exports.editCompleted = async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    try {
        const updatedTask = await Task.updateCompleted(id, completed);
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ message: 'Error updating task completion status' });
    }
};

