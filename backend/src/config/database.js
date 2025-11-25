import { Sequelize } from 'sequelize';
import env from './env.js';
import Logger from '../utils/Logger.js';

/**
 * Database configuration and connection
 */
const sequelize = new Sequelize(
  env.database.name,
  env.database.user,
  env.database.password,
  {
    host: env.database.host,
    port: env.database.port,
    dialect: env.database.dialect,
    logging: env.isDevelopment() ? (msg) => Logger.debug(msg) : false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true,
      underscored: true,
      freezeTableName: true
    }
  }
);

/**
 * Test database connection
 */
export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    Logger.info('Database connection established successfully');
    return true;
  } catch (error) {
    Logger.error('Unable to connect to the database:', error);
    throw error;
  }
};

/**
 * Sync database models
 */
export const syncDatabase = async (options = {}) => {
  try {
    await sequelize.sync(options);
    Logger.info('Database synchronized successfully');
    return true;
  } catch (error) {
    Logger.error('Database synchronization failed:', error);
    throw error;
  }
};

/**
 * Close database connection
 */
export const closeDatabase = async () => {
  try {
    await sequelize.close();
    Logger.info('Database connection closed');
    return true;
  } catch (error) {
    Logger.error('Error closing database connection:', error);
    throw error;
  }
};

export default sequelize;
