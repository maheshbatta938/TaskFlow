const { body, param, query } = require('express-validator');
const { TASK_STATUS_VALUES, TASK_PRIORITY_VALUES } = require('../constants/task.constants');

const createTaskValidator = [
  body('title').trim().notEmpty().withMessage('Title is required').isLength({ max: 200 }),
  body('description').optional({ nullable: true }).isString(),
  body('status').optional().isIn(TASK_STATUS_VALUES).withMessage('Invalid status value'),
  body('priority').optional().isIn(TASK_PRIORITY_VALUES).withMessage('Invalid priority value'),
  body('dueDate').optional({ nullable: true }).isISO8601().withMessage('dueDate must be a valid date'),
];

const updateTaskValidator = [
  param('id').isInt().withMessage('Invalid task id'),
  body('title').optional().trim().notEmpty().withMessage('Title cannot be empty').isLength({ max: 200 }),
  body('description').optional({ nullable: true }).isString(),
  body('status').optional().isIn(TASK_STATUS_VALUES).withMessage('Invalid status value'),
  body('priority').optional().isIn(TASK_PRIORITY_VALUES).withMessage('Invalid priority value'),
  body('dueDate').optional({ nullable: true }).isISO8601().withMessage('dueDate must be a valid date'),
];

const updateStatusValidator = [
  param('id').isInt().withMessage('Invalid task id'),
  body('status').isIn(TASK_STATUS_VALUES).withMessage('Invalid status value'),
];

const taskIdValidator = [param('id').isInt().withMessage('Invalid task id')];

const listTasksValidator = [
  query('status').optional().isIn(TASK_STATUS_VALUES).withMessage('Invalid status filter'),
  query('priority').optional().isIn(TASK_PRIORITY_VALUES).withMessage('Invalid priority filter'),
  query('search').optional().isString().trim(),
  query('page').optional().isInt({ min: 1 }).withMessage('page must be a positive integer'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('limit must be between 1 and 100'),
  query('sortBy').optional().isIn(['createdAt', 'dueDate', 'priority', 'title']).withMessage('Invalid sortBy value'),
  query('sortOrder').optional().isIn(['asc', 'desc', 'ASC', 'DESC']).withMessage('Invalid sortOrder value'),
];

module.exports = {
  createTaskValidator,
  updateTaskValidator,
  updateStatusValidator,
  taskIdValidator,
  listTasksValidator,
};
