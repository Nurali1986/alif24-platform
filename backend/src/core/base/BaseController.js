/**
 * BaseController - Abstract base class for all controllers
 * Provides common HTTP response methods and error handling
 */
class BaseController {
  constructor(service) {
    this.service = service;
  }

  /**
   * Send success response
   * @param {Object} res - Express response object
   * @param {*} data - Response data
   * @param {string} message - Success message
   * @param {number} statusCode - HTTP status code
   */
  success(res, data = null, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Send created response (201)
   * @param {Object} res - Express response object
   * @param {*} data - Created resource data
   * @param {string} message - Success message
   */
  created(res, data, message = 'Resource created successfully') {
    return this.success(res, data, message, 201);
  }

  /**
   * Send no content response (204)
   * @param {Object} res - Express response object
   */
  noContent(res) {
    return res.status(204).send();
  }

  /**
   * Send paginated response
   * @param {Object} res - Express response object
   * @param {Array} data - Array of items
   * @param {number} page - Current page
   * @param {number} limit - Items per page
   * @param {number} total - Total items
   */
  paginated(res, data, page, limit, total) {
    const totalPages = Math.ceil(total / limit);
    return res.status(200).json({
      success: true,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      timestamp: new Date().toISOString()
    });
  }

  /**
   * Wrapper for async route handlers
   * @param {Function} fn - Async function to wrap
   */
  asyncHandler(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch(next);
    };
  }
}

export default BaseController;
