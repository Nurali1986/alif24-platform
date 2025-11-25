import { BaseRepository } from '../core/base/index.js';
import { User } from '../models/index.js';

/**
 * User Repository
 * Data access layer for User model
 */
class UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  /**
   * Find user by email
   * @param {string} email - User email
   * @returns {Promise<Object|null>} User or null
   */
  async findByEmail(email) {
    return this.model.findOne({
      where: { email: email.toLowerCase() }
    });
  }

  /**
   * Find users by role
   * @param {string} role - User role
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of users
   */
  async findByRole(role, options = {}) {
    return this.model.findAll({
      where: { role },
      ...options
    });
  }

  /**
   * Update user's last login time
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Updated user
   */
  async updateLastLogin(userId) {
    return this.model.update(
      { lastLoginAt: new Date() },
      { where: { id: userId } }
    );
  }

  /**
   * Update refresh token
   * @param {string} userId - User ID
   * @param {string} refreshToken - Refresh token
   * @returns {Promise<Object>} Updated user
   */
  async updateRefreshToken(userId, refreshToken) {
    return this.model.update(
      { refreshToken },
      { where: { id: userId } }
    );
  }

  /**
   * Find user by refresh token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise<Object|null>} User or null
   */
  async findByRefreshToken(refreshToken) {
    return this.model.findOne({
      where: { refreshToken }
    });
  }

  /**
   * Search users
   * @param {Object} criteria - Search criteria
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Paginated results
   */
  async search(criteria, page = 1, limit = 10) {
    const where = {};
    
    if (criteria.query) {
      const { Op } = await import('sequelize');
      where[Op.or] = [
        { firstName: { [Op.iLike]: `%${criteria.query}%` } },
        { lastName: { [Op.iLike]: `%${criteria.query}%` } },
        { email: { [Op.iLike]: `%${criteria.query}%` } }
      ];
    }
    
    if (criteria.role) {
      where.role = criteria.role;
    }
    
    if (criteria.isActive !== undefined) {
      where.isActive = criteria.isActive;
    }

    return this.findPaginated(page, limit, { where });
  }
}

export default new UserRepository();
