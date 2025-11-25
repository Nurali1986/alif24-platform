import { BaseService } from '../core/base/index.js';
import { userRepository } from '../repositories/index.js';
import { NotFoundError } from '../core/errors/index.js';

/**
 * User Service
 * Business logic for user management
 */
class UserService extends BaseService {
  constructor() {
    super(userRepository);
  }

  /**
   * Get user by ID
   * @param {string} userId - User ID
   * @returns {Promise<Object>} User object
   */
  async getUserById(userId) {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user.toJSON();
  }

  /**
   * Update user profile
   * @param {string} userId - User ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated user
   */
  async updateProfile(userId, updateData) {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    // Only allow updating specific fields
    const allowedFields = ['firstName', 'lastName', 'phone', 'avatar', 'language'];
    const filteredData = {};
    
    for (const field of allowedFields) {
      if (updateData[field] !== undefined) {
        filteredData[field] = updateData[field];
      }
    }

    await user.update(filteredData);
    return user.toJSON();
  }

  /**
   * Search users
   * @param {Object} criteria - Search criteria
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Paginated results
   */
  async searchUsers(criteria, page, limit) {
    return this.repository.search(criteria, page, limit);
  }

  /**
   * Deactivate user
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Updated user
   */
  async deactivateUser(userId) {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    await user.update({ isActive: false });
    return user.toJSON();
  }

  /**
   * Activate user
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Updated user
   */
  async activateUser(userId) {
    const user = await this.repository.findById(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    await user.update({ isActive: true });
    return user.toJSON();
  }

  /**
   * Get users by role
   * @param {string} role - User role
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Paginated results
   */
  async getUsersByRole(role, page = 1, limit = 10) {
    return this.repository.findPaginated(page, limit, {
      where: { role, isActive: true },
      attributes: { exclude: ['password', 'refreshToken'] }
    });
  }
}

export default new UserService();
