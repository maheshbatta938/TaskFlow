const { Op, fn, col } = require('sequelize');
const { Task } = require('../models');
const ApiError = require('../utils/ApiError');
const { HTTP_STATUS } = require('../constants/http.constants');
const { TASK_STATUS, TASK_STATUS_VALUES, TASK_PRIORITY_VALUES } = require('../constants/task.constants');

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

// Builds the shared WHERE clause for status/priority/search filters so both
// listTasks (paginated rows) and any future count-only query stay in sync.
function buildFilter(userId, { status, priority, search }) {
  const where = { userId };

  if (status) where.status = status;
  if (priority) where.priority = priority;

  if (search) {
    where[Op.or] = [{ title: { [Op.like]: `%${search}%` } }, { description: { [Op.like]: `%${search}%` } }];
  }

  return where;
}

async function listTasks(userId, query) {
  const page = Number(query.page) || DEFAULT_PAGE;
  const limit = Number(query.limit) || DEFAULT_LIMIT;
  const sortBy = query.sortBy || 'createdAt';
  const sortOrder = (query.sortOrder || 'desc').toUpperCase();

  const where = buildFilter(userId, query);

  const { rows, count } = await Task.findAndCountAll({
    where,
    order: [[sortBy, sortOrder]],
    limit,
    offset: (page - 1) * limit,
  });

  return {
    tasks: rows,
    pagination: {
      total: count,
      page,
      limit,
      totalPages: Math.max(Math.ceil(count / limit), 1),
    },
  };
}

async function getTaskById(userId, id) {
  const task = await Task.findOne({ where: { id, userId } });
  if (!task) {
    throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Task not found');
  }
  return task;
}

async function createTask(userId, data) {
  return Task.create({
    title: data.title,
    description: data.description ?? null,
    status: data.status ?? TASK_STATUS.TODO,
    priority: data.priority ?? undefined,
    dueDate: data.dueDate ?? null,
    userId,
  });
}

async function updateTask(userId, id, data) {
  const task = await getTaskById(userId, id);

  const updatable = ['title', 'description', 'status', 'priority', 'dueDate'];
  updatable.forEach((field) => {
    if (data[field] !== undefined) {
      task[field] = data[field];
    }
  });

  await task.save();
  return task;
}

async function updateStatus(userId, id, status) {
  const task = await getTaskById(userId, id);
  task.status = status;
  await task.save();
  return task;
}

async function deleteTask(userId, id) {
  const task = await getTaskById(userId, id);
  await task.destroy();
}

async function getAnalytics(userId) {
  const [statusCounts, priorityCounts, total, overdue] = await Promise.all([
    Task.findAll({
      where: { userId },
      attributes: ['status', [fn('COUNT', col('id')), 'count']],
      group: ['status'],
      raw: true,
    }),
    Task.findAll({
      where: { userId },
      attributes: ['priority', [fn('COUNT', col('id')), 'count']],
      group: ['priority'],
      raw: true,
    }),
    Task.count({ where: { userId } }),
    Task.count({
      where: {
        userId,
        status: { [Op.ne]: TASK_STATUS.DONE },
        dueDate: { [Op.ne]: null, [Op.lt]: new Date() },
      },
    }),
  ]);

  const byStatus = Object.fromEntries(TASK_STATUS_VALUES.map((status) => [status, 0]));
  statusCounts.forEach((row) => {
    byStatus[row.status] = Number(row.count);
  });

  const byPriority = Object.fromEntries(TASK_PRIORITY_VALUES.map((priority) => [priority, 0]));
  priorityCounts.forEach((row) => {
    byPriority[row.priority] = Number(row.count);
  });

  const completed = byStatus[TASK_STATUS.DONE];
  const pending = total - completed;
  const completionPercentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return {
    total,
    completed,
    pending,
    completionPercentage,
    byStatus,
    byPriority,
    overdue,
  };
}

module.exports = {
  listTasks,
  getTaskById,
  createTask,
  updateTask,
  updateStatus,
  deleteTask,
  getAnalytics,
};
