import { Router } from 'express';
import { authController } from '../controllers/index.js';
import { authenticate } from '../middleware/index.js';
import { validateBody } from '../middleware/index.js';
import { registerSchema, loginSchema, refreshTokenSchema, changePasswordSchema } from '../validators/index.js';

const router = Router();

/**
 * Auth Routes
 * /api/v1/auth
 */

// Public routes
router.post('/register', validateBody(registerSchema), authController.register);
router.post('/login', validateBody(loginSchema), authController.login);
router.post('/refresh', validateBody(refreshTokenSchema), authController.refreshToken);

// Protected routes
router.post('/logout', authenticate, authController.logout);
router.put('/password', authenticate, validateBody(changePasswordSchema), authController.changePassword);
router.get('/me', authenticate, authController.getProfile);

export default router;
