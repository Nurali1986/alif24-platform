import { Router } from 'express';
import { userController } from '../controllers/index.js';
import { authenticate, adminOnly, validateBody, validateQuery, validateParams } from '../middleware/index.js';
import { updateUserSchema, userIdParamSchema, searchUsersSchema } from '../validators/index.js';

const router = Router();

/**
 * User Routes
 * /api/v1/users
 */

// All routes require authentication
router.use(authenticate);

// Search users (admin only)
router.get('/', adminOnly, validateQuery(searchUsersSchema), userController.search);

// Get users by role (admin only)
router.get('/role/:role', adminOnly, userController.getByRole);

// Get user by ID
router.get('/:id', validateParams(userIdParamSchema), userController.getById);

// Update user profile
router.put('/:id', validateParams(userIdParamSchema), validateBody(updateUserSchema), userController.update);

// Deactivate user (admin only)
router.put('/:id/deactivate', adminOnly, validateParams(userIdParamSchema), userController.deactivate);

// Activate user (admin only)
router.put('/:id/activate', adminOnly, validateParams(userIdParamSchema), userController.activate);

export default router;
