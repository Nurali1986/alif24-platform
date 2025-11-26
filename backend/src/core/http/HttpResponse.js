/**
 * HTTP Response Builder
 * Utility class for building consistent HTTP responses
 */
class HttpResponse {
  /**
   * Create success response
   * @param {*} data - Response data
   * @param {string} message - Success message
   * @returns {Object} Response object
   */
  static success(data = null, message = 'Success') {
    return {
      success: true,
      message,
      data,
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Create error response
   * @param {string} message - Error message
   * @param {string} code - Error code
   * @param {Array} errors - Validation errors
   * @returns {Object} Response object
   */
  static error(message = 'Error', code = 'ERROR', errors = null) {
    const response = {
      success: false,
      error: {
        code,
        message
      },
      timestamp: new Date().toISOString()
    };

    if (errors) {
      response.error.details = errors;
    }

    return response;
  }

  /**
   * Create paginated response
   * @param {Array} data - Array of items
   * @param {Object} pagination - Pagination metadata
   * @returns {Object} Response object
   */
  static paginated(data, pagination) {
    return {
      success: true,
      data,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        totalPages: pagination.totalPages,
        hasNextPage: pagination.page < pagination.totalPages,
        hasPrevPage: pagination.page > 1
      },
      timestamp: new Date().toISOString()
    };
  }
}

export default HttpResponse;
