const express = require('express');
const taskController = require('../controllers/task.controller');
const authMiddleware = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const {
  createTaskValidator,
  updateTaskValidator,
  updateStatusValidator,
  taskIdValidator,
  listTasksValidator,
} = require('../validators/task.validator');

const router = express.Router();

router.use(authMiddleware);

// Registered before /:id so the literal "analytics" segment is never
// swallowed by the :id param route.
router.get('/analytics', taskController.getAnalytics);

router.get('/', listTasksValidator, validate, taskController.listTasks);
router.post('/', createTaskValidator, validate, taskController.createTask);
router.get('/:id', taskIdValidator, validate, taskController.getTaskById);
router.put('/:id', updateTaskValidator, validate, taskController.updateTask);
router.patch('/:id/status', updateStatusValidator, validate, taskController.updateTaskStatus);
router.delete('/:id', taskIdValidator, validate, taskController.deleteTask);

module.exports = router;
