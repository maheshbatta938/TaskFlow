const app = require('./app');
const env = require('./config/env');
const { sequelize } = require('./models');

async function start() {
  try {
    await sequelize.authenticate();
    // sync() is used instead of a migrations tool to keep this assessment
    // project simple; DATABASE.md documents this as a deliberate trade-off.
    await sequelize.sync();
    // eslint-disable-next-line no-console
    console.log('Database connected and synchronized');

    app.listen(env.port, () => {
      // eslint-disable-next-line no-console
      console.log(`Server running on port ${env.port} in ${env.nodeEnv} mode`);
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

start();
