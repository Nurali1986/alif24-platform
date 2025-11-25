import { Router } from 'express';
import { studentController } from '../controllers/index.js';
import { authenticate, studentOnly, parentOfStudent, adminOnly, validateBody, validateParams, generalLimiter } from '../middleware/index.js';
import { createStudentProfileSchema, updateStudentProfileSchema, studentIdParamSchema } from '../validators/index.js';

const router = Router();

/**
 * Student Routes
 * /api/v1/students
 */

// All routes require authentication and rate limiting
router.use(generalLimiter);
router.use(authenticate);

// Get my profile (student only)
router.get('/me', studentOnly, studentController.getMyProfile);

// Create/update my profile (student only)
router.post('/profile', studentOnly, validateBody(createStudentProfileSchema), studentController.createProfile);

// Get student by ID (admin, parent of student, or self)
router.get('/:id', validateParams(studentIdParamSchema), parentOfStudent((req) => req.params.id), studentController.getById);

// Update student profile
router.put('/:id', validateParams(studentIdParamSchema), validateBody(updateStudentProfileSchema), studentController.updateProfile);

// Get student progress
router.get('/:id/progress', validateParams(studentIdParamSchema), parentOfStudent((req) => req.params.id), studentController.getProgress);

// Get student achievements
router.get('/:id/achievements', validateParams(studentIdParamSchema), parentOfStudent((req) => req.params.id), studentController.getAchievements);

// Get student statistics
router.get('/:id/statistics', validateParams(studentIdParamSchema), parentOfStudent((req) => req.params.id), studentController.getStatistics);

// Award achievement (admin only)
router.post('/:id/achievements', adminOnly, validateParams(studentIdParamSchema), studentController.awardAchievement);

// Recalculate level (admin only)
router.post('/:id/recalculate-level', adminOnly, validateParams(studentIdParamSchema), studentController.recalculateLevel);

export default router;
