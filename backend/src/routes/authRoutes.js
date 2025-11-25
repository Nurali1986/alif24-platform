import { Router } from 'express';
import { authController } from '../controllers/index.js';
import { authenticate, authLimiter, registrationLimiter, generalLimiter } from '../middleware/index.js';
import { validateBody } from '../middleware/index.js';
import { registerSchema, loginSchema, refreshTokenSchema, changePasswordSchema } from '../validators/index.js';

const router = Router();

/**
 * Auth Routes
 * /api/v1/auth
 */

// Public routes - with rate limiting for security
router.post('/register', registrationLimiter, validateBody(registerSchema), authController.register);
router.post('/login', authLimiter, validateBody(loginSchema), authController.login);
router.post('/refresh', authLimiter, validateBody(refreshTokenSchema), authController.refreshToken);

// Protected routes - with general rate limiting
router.post('/logout', generalLimiter, authenticate, authController.logout);
router.put('/password', authLimiter, authenticate, validateBody(changePasswordSchema), authController.changePassword);
router.get('/me', generalLimiter, authenticate, authController.getProfile);

export default router;
