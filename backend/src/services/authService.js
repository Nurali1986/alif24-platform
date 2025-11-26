import { BaseService } from '../core/base/index.js';
import { userRepository } from '../repositories/index.js';
import { User, Student, Teacher, Parent } from '../models/index.js';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../middleware/authMiddleware.js';
import { UnauthorizedError, BadRequestError, NotFoundError, ConflictError } from '../core/errors/index.js';
import Logger from '../utils/Logger.js';

/**
 * Auth Service
 * Business logic for authentication
 */
class AuthService extends BaseService {
  constructor() {
    super(userRepository);
  }

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} User and tokens
   */
  async register(userData) {
    // Check if email already exists
    const existingUser = await userRepository.findByEmail(userData.email);
    if (existingUser) {
      throw new ConflictError('Email already registered');
    }

    // Create user
    const user = await User.create({
      ...userData,
      email: userData.email.toLowerCase()
    });

    // Create role-specific profile
    await this.createRoleProfile(user);

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token
    await userRepository.updateRefreshToken(user.id, refreshToken);

    Logger.info(`New user registered: ${user.email}`);

    return {
      user: user.toJSON(),
      accessToken,
      refreshToken
    };
  }

  /**
   * Create role-specific profile
   * @param {Object} user - User object
   */
  async createRoleProfile(user) {
    switch (user.role) {
      case 'student':
        await Student.create({
          userId: user.id,
          dateOfBirth: new Date('2019-01-01') // Default, should be updated
        });
        break;
      case 'teacher':
        await Teacher.create({ userId: user.id });
        break;
      case 'parent':
        await Parent.create({ userId: user.id });
        break;
      default:
        break;
    }
  }

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} User and tokens
   */
  async login(email, password) {
    // Find user by email
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Check if user is active
    if (!user.isActive) {
      throw new UnauthorizedError('Account is deactivated');
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new UnauthorizedError('Invalid email or password');
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token and update last login
    await userRepository.updateRefreshToken(user.id, refreshToken);
    await userRepository.updateLastLogin(user.id);

    Logger.info(`User logged in: ${user.email}`);

    return {
      user: user.toJSON(),
      accessToken,
      refreshToken
    };
  }

  /**
   * Refresh access token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise<Object>} New tokens
   */
  async refreshToken(refreshToken) {
    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Find user by refresh token
    const user = await userRepository.findByRefreshToken(refreshToken);
    if (!user || user.id !== decoded.userId) {
      throw new UnauthorizedError('Invalid refresh token');
    }

    // Generate new tokens
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    // Update refresh token
    await userRepository.updateRefreshToken(user.id, newRefreshToken);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    };
  }

  /**
   * Logout user
   * @param {string} userId - User ID
   * @returns {Promise<boolean>} Logout result
   */
  async logout(userId) {
    await userRepository.updateRefreshToken(userId, null);
    Logger.info(`User logged out: ${userId}`);
    return true;
  }

  /**
   * Change password
   * @param {string} userId - User ID
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<boolean>} Change result
   */
  async changePassword(userId, currentPassword, newPassword) {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      throw new BadRequestError('Current password is incorrect');
    }

    user.password = newPassword;
    await user.save();

    Logger.info(`Password changed for user: ${userId}`);
    return true;
  }

  /**
   * Get current user profile
   * @param {string} userId - User ID
   * @returns {Promise<Object>} User profile
   */
  async getProfile(userId) {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password', 'refreshToken'] },
      include: [
        { model: Student, as: 'studentProfile' },
        { model: Teacher, as: 'teacherProfile' },
        { model: Parent, as: 'parentProfile' }
      ]
    });

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }
}

export default new AuthService();
