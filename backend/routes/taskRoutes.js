const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.delete('/clear', taskController.clear);
router.delete('/:id', taskController.deleteTask);
router.put('/editText/:id', taskController.editText);
router.put('/editCompleted/:id', taskController.editCompleted);

module.exports = router;
