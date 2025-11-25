import winston from 'winston';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
};

const logColors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue'
};

winston.addColors(logColors);

const formatLog = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    let log = `${timestamp} [${level.toUpperCase()}]: ${message}`;
    if (Object.keys(meta).length > 0) {
      log += ` ${JSON.stringify(meta)}`;
    }
    if (stack) {
      log += `\n${stack}`;
    }
    return log;
  })
);

const formatConsole = winston.format.combine(
  winston.format.colorize({ all: true }),
  formatLog
);

const transports = [
  new winston.transports.Console({
    format: formatConsole
  })
];

// Add file transports in production
if (process.env.NODE_ENV === 'production') {
  const logsDir = path.join(__dirname, '../../logs');
  
  transports.push(
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      format: formatLog
    }),
    new winston.transports.File({
      filename: path.join(logsDir, 'combined.log'),
      format: formatLog
    })
  );
}

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  levels: logLevels,
  transports
});

/**
 * Logger utility wrapper
 */
const Logger = {
  /**
   * Log info message
   * @param {string} message - Log message
   * @param {Object} meta - Additional metadata
   */
  info(message, meta = {}) {
    logger.info(message, meta);
  },

  /**
   * Log error message
   * @param {string} message - Log message
   * @param {Error|Object} error - Error object or metadata
   */
  error(message, error = {}) {
    if (error instanceof Error) {
      logger.error(message, { error: error.message, stack: error.stack });
    } else {
      logger.error(message, error);
    }
  },

  /**
   * Log warning message
   * @param {string} message - Log message
   * @param {Object} meta - Additional metadata
   */
  warn(message, meta = {}) {
    logger.warn(message, meta);
  },

  /**
   * Log debug message
   * @param {string} message - Log message
   * @param {Object} meta - Additional metadata
   */
  debug(message, meta = {}) {
    logger.debug(message, meta);
  },

  /**
   * Log HTTP request
   * @param {string} method - HTTP method
   * @param {string} url - Request URL
   * @param {number} statusCode - Response status code
   * @param {number} responseTime - Response time in ms
   */
  http(method, url, statusCode, responseTime) {
    logger.http(`${method} ${url} ${statusCode} - ${responseTime}ms`);
  },

  /**
   * Create child logger with context
   * @param {Object} context - Logger context
   * @returns {Object} Child logger
   */
  child(context) {
    return logger.child(context);
  }
};

export default Logger;
