import { BaseController } from '../core/base/index.js';
import { userService } from '../services/index.js';

/**
 * User Controller
 * Handles user-related HTTP requests
 */
class UserController extends BaseController {
  constructor() {
    super(userService);
  }

  /**
   * Get user by ID
   * GET /users/:id
   */
  getById = this.asyncHandler(async (req, res) => {
    const user = await this.service.getUserById(req.params.id);
    return this.success(res, user);
  });

  /**
   * Update user profile
   * PUT /users/:id
   */
  update = this.asyncHandler(async (req, res) => {
    const user = await this.service.updateProfile(req.params.id, req.body);
    return this.success(res, user, 'Profile updated successfully');
  });

  /**
   * Search users
   * GET /users
   */
  search = this.asyncHandler(async (req, res) => {
    const { page, limit, ...criteria } = req.query;
    const result = await this.service.searchUsers(criteria, page, limit);
    return this.paginated(res, result.data, result.page, result.limit, result.total);
  });

  /**
   * Get users by role
   * GET /users/role/:role
   */
  getByRole = this.asyncHandler(async (req, res) => {
    const { role } = req.params;
    const { page, limit } = req.query;
    const result = await this.service.getUsersByRole(role, page, limit);
    return this.paginated(res, result.data, result.page, result.limit, result.total);
  });

  /**
   * Deactivate user
   * PUT /users/:id/deactivate
   */
  deactivate = this.asyncHandler(async (req, res) => {
    const user = await this.service.deactivateUser(req.params.id);
    return this.success(res, user, 'User deactivated');
  });

  /**
   * Activate user
   * PUT /users/:id/activate
   */
  activate = this.asyncHandler(async (req, res) => {
    const user = await this.service.activateUser(req.params.id);
    return this.success(res, user, 'User activated');
  });
}

export default new UserController();
