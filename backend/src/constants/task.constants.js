const TASK_STATUS = Object.freeze({
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
});

const TASK_PRIORITY = Object.freeze({
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
});

const TASK_STATUS_VALUES = Object.values(TASK_STATUS);
const TASK_PRIORITY_VALUES = Object.values(TASK_PRIORITY);

module.exports = {
  TASK_STATUS,
  TASK_PRIORITY,
  TASK_STATUS_VALUES,
  TASK_PRIORITY_VALUES,
};
