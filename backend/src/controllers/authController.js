import { BaseController } from '../core/base/index.js';
import { authService } from '../services/index.js';

/**
 * Auth Controller
 * Handles authentication-related HTTP requests
 */
class AuthController extends BaseController {
  constructor() {
    super(authService);
  }

  /**
   * Register new user
   * POST /auth/register
   */
  register = this.asyncHandler(async (req, res) => {
    const result = await this.service.register(req.body);
    return this.created(res, result, 'Registration successful');
  });

  /**
   * Login user
   * POST /auth/login
   */
  login = this.asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const result = await this.service.login(email, password);
    return this.success(res, result, 'Login successful');
  });

  /**
   * Refresh access token
   * POST /auth/refresh
   */
  refreshToken = this.asyncHandler(async (req, res) => {
    const { refreshToken } = req.body;
    const result = await this.service.refreshToken(refreshToken);
    return this.success(res, result, 'Token refreshed');
  });

  /**
   * Logout user
   * POST /auth/logout
   */
  logout = this.asyncHandler(async (req, res) => {
    await this.service.logout(req.userId);
    return this.success(res, null, 'Logged out successfully');
  });

  /**
   * Change password
   * PUT /auth/password
   */
  changePassword = this.asyncHandler(async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    await this.service.changePassword(req.userId, currentPassword, newPassword);
    return this.success(res, null, 'Password changed successfully');
  });

  /**
   * Get current user profile
   * GET /auth/me
   */
  getProfile = this.asyncHandler(async (req, res) => {
    const profile = await this.service.getProfile(req.userId);
    return this.success(res, profile);
  });
}

export default new AuthController();
