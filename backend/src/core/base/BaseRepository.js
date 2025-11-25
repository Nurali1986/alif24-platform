/**
 * BaseRepository - Abstract base class for all repositories
 * Provides common database operations using Sequelize
 */
class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  /**
   * Find all records with optional filtering
   * @param {Object} options - Sequelize query options
   * @returns {Promise<Array>} Array of records
   */
  async findAll(options = {}) {
    return this.model.findAll(options);
  }

  /**
   * Find record by primary key
   * @param {string|number} id - Record ID
   * @param {Object} options - Sequelize query options
   * @returns {Promise<Object|null>} Found record or null
   */
  async findById(id, options = {}) {
    return this.model.findByPk(id, options);
  }

  /**
   * Find single record by criteria
   * @param {Object} criteria - Where clause
   * @param {Object} options - Sequelize query options
   * @returns {Promise<Object|null>} Found record or null
   */
  async findOne(criteria, options = {}) {
    return this.model.findOne({
      where: criteria,
      ...options
    });
  }

  /**
   * Find or create record
   * @param {Object} criteria - Where clause
   * @param {Object} defaults - Default values for creation
   * @returns {Promise<Array>} [instance, created]
   */
  async findOrCreate(criteria, defaults = {}) {
    return this.model.findOrCreate({
      where: criteria,
      defaults
    });
  }

  /**
   * Create new record
   * @param {Object} data - Record data
   * @returns {Promise<Object>} Created record
   */
  async create(data) {
    return this.model.create(data);
  }

  /**
   * Bulk create records
   * @param {Array} dataArray - Array of record data
   * @param {Object} options - Sequelize options
   * @returns {Promise<Array>} Created records
   */
  async bulkCreate(dataArray, options = {}) {
    return this.model.bulkCreate(dataArray, options);
  }

  /**
   * Update record by ID
   * @param {string|number} id - Record ID
   * @param {Object} data - Update data
   * @returns {Promise<Object>} Updated record
   */
  async update(id, data) {
    const record = await this.findById(id);
    if (!record) {
      return null;
    }
    return record.update(data);
  }

  /**
   * Update multiple records
   * @param {Object} criteria - Where clause
   * @param {Object} data - Update data
   * @returns {Promise<Array>} [affectedCount]
   */
  async updateMany(criteria, data) {
    return this.model.update(data, {
      where: criteria
    });
  }

  /**
   * Delete record by ID
   * @param {string|number} id - Record ID
   * @returns {Promise<boolean>} Deletion result
   */
  async delete(id) {
    const record = await this.findById(id);
    if (!record) {
      return false;
    }
    await record.destroy();
    return true;
  }

  /**
   * Delete multiple records
   * @param {Object} criteria - Where clause
   * @returns {Promise<number>} Number of deleted records
   */
  async deleteMany(criteria) {
    return this.model.destroy({
      where: criteria
    });
  }

  /**
   * Find with pagination
   * @param {number} page - Page number (1-indexed)
   * @param {number} limit - Items per page
   * @param {Object} options - Additional query options
   * @returns {Promise<Object>} Paginated results with metadata
   */
  async findPaginated(page = 1, limit = 10, options = {}) {
    const offset = (page - 1) * limit;
    const { count, rows } = await this.model.findAndCountAll({
      ...options,
      limit,
      offset
    });
    return {
      data: rows,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit)
    };
  }

  /**
   * Count records
   * @param {Object} criteria - Where clause
   * @returns {Promise<number>} Record count
   */
  async count(criteria = {}) {
    return this.model.count({
      where: criteria
    });
  }

  /**
   * Execute raw query
   * @param {string} query - SQL query
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Query results
   */
  async rawQuery(query, options = {}) {
    return this.model.sequelize.query(query, options);
  }
}

export default BaseRepository;
