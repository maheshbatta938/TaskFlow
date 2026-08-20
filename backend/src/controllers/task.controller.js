const taskService = require('../services/task.service');
const { sendSuccess } = require('../utils/apiResponse');
const { HTTP_STATUS } = require('../constants/http.constants');
const asyncHandler = require('../utils/asyncHandler');

const listTasks = asyncHandler(async (req, res) => {
  const result = await taskService.listTasks(req.user.id, req.query);
  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: 'Tasks fetched successfully',
    data: result,
  });
});

const getAnalytics = asyncHandler(async (req, res) => {
  const analytics = await taskService.getAnalytics(req.user.id);
  return sendSuccess(res, {
    statusCode: HTTP_STATUS.OK,
    message: 'Analytics fetched successfully',
    data: analytics,
  });
});

const getTaskById = asyncHandler(async (req, res) => {
  const task = await taskService.getTaskById(req.user.id, req.params.id);
  return sendSuccess(res, { statusCode: HTTP_STATUS.OK, message: 'Task fetched successfully', data: task });
});

const createTask = asyncHandler(async (req, res) => {
  const task = await taskService.createTask(req.user.id, req.body);
  return sendSuccess(res, { statusCode: HTTP_STATUS.CREATED, message: 'Task created successfully', data: task });
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await taskService.updateTask(req.user.id, req.params.id, req.body);
  return sendSuccess(res, { statusCode: HTTP_STATUS.OK, message: 'Task updated successfully', data: task });
});

const updateTaskStatus = asyncHandler(async (req, res) => {
  const task = await taskService.updateStatus(req.user.id, req.params.id, req.body.status);
  return sendSuccess(res, { statusCode: HTTP_STATUS.OK, message: 'Task status updated successfully', data: task });
});

const deleteTask = asyncHandler(async (req, res) => {
  await taskService.deleteTask(req.user.id, req.params.id);
  return sendSuccess(res, { statusCode: HTTP_STATUS.OK, message: 'Task deleted successfully' });
});

module.exports = {
  listTasks,
  getAnalytics,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  deleteTask,
};
