import { AppError } from '../core/errors/index.js';
import Logger from '../utils/Logger.js';
import { env } from '../config/index.js';

/**
 * Global Error Handler Middleware
 * Catches all errors and sends appropriate responses
 */

/**
 * Handle Sequelize validation errors
 */
const handleSequelizeValidationError = (error) => {
  const errors = error.errors?.map(e => ({
    field: e.path,
    message: e.message,
    type: e.type
  })) || [];
  
  return {
    statusCode: 422,
    errorCode: 'VALIDATION_ERROR',
    message: 'Validation failed',
    errors
  };
};

/**
 * Handle Sequelize unique constraint errors
 */
const handleSequelizeUniqueError = (error) => {
  const field = error.errors?.[0]?.path || 'unknown';
  return {
    statusCode: 409,
    errorCode: 'CONFLICT',
    message: `${field} already exists`
  };
};

/**
 * Handle Sequelize foreign key errors
 */
const handleSequelizeForeignKeyError = () => {
  return {
    statusCode: 400,
    errorCode: 'BAD_REQUEST',
    message: 'Invalid reference. Related resource not found.'
  };
};

/**
 * Handle JWT errors
 */
const handleJWTError = () => ({
  statusCode: 401,
  errorCode: 'UNAUTHORIZED',
  message: 'Invalid token'
});

/**
 * Handle JWT expired errors
 */
const handleJWTExpiredError = () => ({
  statusCode: 401,
  errorCode: 'TOKEN_EXPIRED',
  message: 'Token has expired'
});

/**
 * Main error handler
 */
const errorHandler = (error, req, res, next) => {
  // Log error
  Logger.error(`Error: ${error.message}`, {
    stack: error.stack,
    path: req.path,
    method: req.method,
    ip: req.ip
  });

  // Default error response
  let statusCode = 500;
  let errorCode = 'INTERNAL_ERROR';
  let message = 'An unexpected error occurred';
  let errors = null;

  // Handle operational errors (AppError)
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    errorCode = error.errorCode;
    message = error.message;
    errors = error.errors;
  }
  // Handle Sequelize errors
  else if (error.name === 'SequelizeValidationError') {
    const result = handleSequelizeValidationError(error);
    statusCode = result.statusCode;
    errorCode = result.errorCode;
    message = result.message;
    errors = result.errors;
  }
  else if (error.name === 'SequelizeUniqueConstraintError') {
    const result = handleSequelizeUniqueError(error);
    statusCode = result.statusCode;
    errorCode = result.errorCode;
    message = result.message;
  }
  else if (error.name === 'SequelizeForeignKeyConstraintError') {
    const result = handleSequelizeForeignKeyError();
    statusCode = result.statusCode;
    errorCode = result.errorCode;
    message = result.message;
  }
  // Handle JWT errors
  else if (error.name === 'JsonWebTokenError') {
    const result = handleJWTError();
    statusCode = result.statusCode;
    errorCode = result.errorCode;
    message = result.message;
  }
  else if (error.name === 'TokenExpiredError') {
    const result = handleJWTExpiredError();
    statusCode = result.statusCode;
    errorCode = result.errorCode;
    message = result.message;
  }
  // Handle syntax errors (invalid JSON)
  else if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    statusCode = 400;
    errorCode = 'BAD_REQUEST';
    message = 'Invalid JSON in request body';
  }

  // Build response
  const response = {
    success: false,
    error: {
      code: errorCode,
      message
    },
    timestamp: new Date().toISOString()
  };

  // Include errors array if present
  if (errors) {
    response.error.details = errors;
  }

  // Include stack trace in development
  if (env.isDevelopment() && error.stack) {
    response.error.stack = error.stack;
  }

  res.status(statusCode).json(response);
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: `Route ${req.method} ${req.originalUrl} not found`
    },
    timestamp: new Date().toISOString()
  });
};

export default errorHandler;
