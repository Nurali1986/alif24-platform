/**
 * BaseService - Abstract base class for all services
 * Provides common CRUD operations and business logic helpers
 */
class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  /**
   * Find all records with optional filtering
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of records
   */
  async findAll(options = {}) {
    return this.repository.findAll(options);
  }

  /**
   * Find record by ID
   * @param {string|number} id - Record ID
   * @param {Object} options - Query options
   * @returns {Promise<Object|null>} Found record or null
   */
  async findById(id, options = {}) {
    return this.repository.findById(id, options);
  }

  /**
   * Find single record by criteria
   * @param {Object} criteria - Search criteria
   * @param {Object} options - Query options
   * @returns {Promise<Object|null>} Found record or null
   */
  async findOne(criteria, options = {}) {
    return this.repository.findOne(criteria, options);
  }

  /**
   * Create new record
   * @param {Object} data - Record data
   * @returns {Promise<Object>} Created record
   */
  async create(data) {
    return this.repository.create(data);
  }

  /**
   * Update record by ID
   * @param {string|number} id - Record ID
   * @param {Object} data - Update data
   * @returns {Promise<Object>} Updated record
   */
  async update(id, data) {
    return this.repository.update(id, data);
  }

  /**
   * Delete record by ID
   * @param {string|number} id - Record ID
   * @returns {Promise<boolean>} Deletion result
   */
  async delete(id) {
    return this.repository.delete(id);
  }

  /**
   * Find with pagination
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @param {Object} options - Additional query options
   * @returns {Promise<Object>} Paginated results
   */
  async findPaginated(page = 1, limit = 10, options = {}) {
    return this.repository.findPaginated(page, limit, options);
  }

  /**
   * Count records
   * @param {Object} criteria - Count criteria
   * @returns {Promise<number>} Record count
   */
  async count(criteria = {}) {
    return this.repository.count(criteria);
  }

  /**
   * Check if record exists
   * @param {Object} criteria - Search criteria
   * @returns {Promise<boolean>} Existence result
   */
  async exists(criteria) {
    const record = await this.repository.findOne(criteria);
    return !!record;
  }
}

export default BaseService;
