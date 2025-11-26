import AppError from './AppError.js';

/**
 * BadRequestError - 400 Bad Request
 * Use when the client sends invalid data
 */
export class BadRequestError extends AppError {
  constructor(message = 'Bad request') {
    super(message, 400, 'BAD_REQUEST');
  }
}

/**
 * UnauthorizedError - 401 Unauthorized
 * Use when authentication is required but not provided or invalid
 */
export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized access') {
    super(message, 401, 'UNAUTHORIZED');
  }
}

/**
 * ForbiddenError - 403 Forbidden
 * Use when user is authenticated but lacks permission
 */
export class ForbiddenError extends AppError {
  constructor(message = 'Access forbidden') {
    super(message, 403, 'FORBIDDEN');
  }
}

/**
 * NotFoundError - 404 Not Found
 * Use when requested resource doesn't exist
 */
export class NotFoundError extends AppError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND');
  }
}

/**
 * ConflictError - 409 Conflict
 * Use when request conflicts with current state
 */
export class ConflictError extends AppError {
  constructor(message = 'Resource conflict') {
    super(message, 409, 'CONFLICT');
  }
}

/**
 * ValidationError - 422 Unprocessable Entity
 * Use when validation fails
 */
export class ValidationError extends AppError {
  constructor(message = 'Validation failed', errors = []) {
    super(message, 422, 'VALIDATION_ERROR');
    this.errors = errors;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      errors: this.errors
    };
  }
}

/**
 * TooManyRequestsError - 429 Too Many Requests
 * Use when rate limit is exceeded
 */
export class TooManyRequestsError extends AppError {
  constructor(message = 'Too many requests') {
    super(message, 429, 'TOO_MANY_REQUESTS');
  }
}

/**
 * InternalServerError - 500 Internal Server Error
 * Use for unexpected server errors
 */
export class InternalServerError extends AppError {
  constructor(message = 'Internal server error') {
    super(message, 500, 'INTERNAL_SERVER_ERROR');
  }
}

/**
 * ServiceUnavailableError - 503 Service Unavailable
 * Use when service is temporarily unavailable
 */
export class ServiceUnavailableError extends AppError {
  constructor(message = 'Service temporarily unavailable') {
    super(message, 503, 'SERVICE_UNAVAILABLE');
  }
}

/**
 * DatabaseError - Custom error for database operations
 */
export class DatabaseError extends AppError {
  constructor(message = 'Database operation failed') {
    super(message, 500, 'DATABASE_ERROR');
  }
}

/**
 * AuthenticationError - Custom error for auth failures
 */
export class AuthenticationError extends AppError {
  constructor(message = 'Authentication failed') {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}

/**
 * TokenExpiredError - Custom error for expired tokens
 */
export class TokenExpiredError extends AppError {
  constructor(message = 'Token has expired') {
    super(message, 401, 'TOKEN_EXPIRED');
  }
}
