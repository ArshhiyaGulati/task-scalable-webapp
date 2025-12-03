const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { validate, taskValidation } = require('../middleware/validation');
const auth = require('../middleware/auth');

// All routes are protected
router.use(auth);

// @route   GET /api/tasks
// @desc    Get all tasks (with filters, search, pagination)
// @access  Private
router.get('/', getTasks);

// @route   GET /api/tasks/:id
// @desc    Get single task
// @access  Private
router.get('/:id', getTask);

// @route   POST /api/tasks
// @desc    Create a new task
// @access  Private
router.post('/', validate(taskValidation), createTask);

// @route   PUT /api/tasks/:id
// @desc    Update a task
// @access  Private
router.put('/:id', validate(taskValidation), updateTask);

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete('/:id', deleteTask);

module.exports = router;