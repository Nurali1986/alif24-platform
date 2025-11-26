import { ValidationError } from '../core/errors/index.js';
import Validator from '../utils/Validator.js';

/**
 * Validation Middleware Factory
 * Creates middleware that validates request data against Zod schemas
 */

/**
 * Validate request body
 * @param {Object} schema - Zod schema
 * @returns {Function} Express middleware
 */
export const validateBody = (schema) => {
  return (req, res, next) => {
    try {
      req.body = Validator.validate(schema, req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Validate request query parameters
 * @param {Object} schema - Zod schema
 * @returns {Function} Express middleware
 */
export const validateQuery = (schema) => {
  return (req, res, next) => {
    try {
      req.query = Validator.validate(schema, req.query);
      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Validate request URL parameters
 * @param {Object} schema - Zod schema
 * @returns {Function} Express middleware
 */
export const validateParams = (schema) => {
  return (req, res, next) => {
    try {
      req.params = Validator.validate(schema, req.params);
      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Combined validation middleware
 * Validates body, query, and params together
 * @param {Object} schemas - Object with body, query, params schemas
 * @returns {Function} Express middleware
 */
export const validate = (schemas) => {
  return (req, res, next) => {
    const errors = [];

    if (schemas.body) {
      const result = Validator.safeParse(schemas.body, req.body);
      if (!result.success) {
        errors.push(...result.errors.map(e => ({ ...e, location: 'body' })));
      } else {
        req.body = result.data;
      }
    }

    if (schemas.query) {
      const result = Validator.safeParse(schemas.query, req.query);
      if (!result.success) {
        errors.push(...result.errors.map(e => ({ ...e, location: 'query' })));
      } else {
        req.query = result.data;
      }
    }

    if (schemas.params) {
      const result = Validator.safeParse(schemas.params, req.params);
      if (!result.success) {
        errors.push(...result.errors.map(e => ({ ...e, location: 'params' })));
      } else {
        req.params = result.data;
      }
    }

    if (errors.length > 0) {
      return next(new ValidationError('Validation failed', errors));
    }

    next();
  };
};

export default {
  validateBody,
  validateQuery,
  validateParams,
  validate
};
