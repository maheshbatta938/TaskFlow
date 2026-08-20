const sequelize = require('../config/db.config');
const User = require('./user.model');
const Task = require('./task.model');

User.hasMany(Task, { foreignKey: 'userId', as: 'tasks', onDelete: 'CASCADE' });
Task.belongsTo(User, { foreignKey: 'userId', as: 'owner' });

module.exports = { sequelize, User, Task };
