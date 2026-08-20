const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db.config');
const { TASK_STATUS, TASK_PRIORITY, TASK_STATUS_VALUES, TASK_PRIORITY_VALUES } = require('../constants/task.constants');

class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...TASK_STATUS_VALUES),
      allowNull: false,
      defaultValue: TASK_STATUS.TODO,
    },
    priority: {
      type: DataTypes.ENUM(...TASK_PRIORITY_VALUES),
      allowNull: false,
      defaultValue: TASK_PRIORITY.MEDIUM,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'due_date',
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: 'user_id',
    },
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'tasks',
    timestamps: true,
    indexes: [
      // Every task list/filter/search query is scoped to the owning user,
      // so a composite index keeps those lookups off a full table scan.
      { fields: ['user_id', 'status'] },
      { fields: ['user_id', 'priority'] },
      { fields: ['user_id', 'due_date'] },
    ],
  }
);

module.exports = Task;
