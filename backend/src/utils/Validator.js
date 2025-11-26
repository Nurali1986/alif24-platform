import { ZodError } from 'zod';
import { ValidationError } from '../core/errors/index.js';

/**
 * Validator utility for request validation using Zod
 */
const Validator = {
  /**
   * Validate data against a Zod schema
   * @param {Object} schema - Zod schema
   * @param {Object} data - Data to validate
   * @returns {Object} Validated and parsed data
   * @throws {ValidationError} If validation fails
   */
  validate(schema, data) {
    try {
      return schema.parse(data);
    } catch (error) {
      if (error instanceof ZodError) {
        const formattedErrors = error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
          code: err.code
        }));
        throw new ValidationError('Validation failed', formattedErrors);
      }
      throw error;
    }
  },

  /**
   * Validate data and return result without throwing
   * @param {Object} schema - Zod schema
   * @param {Object} data - Data to validate
   * @returns {Object} { success: boolean, data?: Object, errors?: Array }
   */
  safeParse(schema, data) {
    const result = schema.safeParse(data);
    if (result.success) {
      return { success: true, data: result.data };
    }
    return {
      success: false,
      errors: result.error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
        code: err.code
      }))
    };
  },

  /**
   * Create validation middleware for Express
   * @param {Object} schema - Zod schema
   * @param {string} source - Request property to validate ('body', 'query', 'params')
   * @returns {Function} Express middleware
   */
  middleware(schema, source = 'body') {
    return (req, res, next) => {
      try {
        req[source] = this.validate(schema, req[source]);
        next();
      } catch (error) {
        next(error);
      }
    };
  },

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} Validation result
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Validate phone number format (Uzbek format)
   * @param {string} phone - Phone number to validate
   * @returns {boolean} Validation result
   */
  isValidPhone(phone) {
    const phoneRegex = /^\+998[0-9]{9}$/;
    return phoneRegex.test(phone);
  },

  /**
   * Validate UUID format
   * @param {string} uuid - UUID to validate
   * @returns {boolean} Validation result
   */
  isValidUUID(uuid) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return uuidRegex.test(uuid);
  },

  /**
   * Sanitize string input
   * @param {string} str - String to sanitize
   * @returns {string} Sanitized string
   */
  sanitizeString(str) {
    if (typeof str !== 'string') return str;
    return str.trim().replace(/[<>]/g, '');
  }
};

export default Validator;
