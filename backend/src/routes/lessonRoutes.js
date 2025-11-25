import { Router } from 'express';
import { lessonController } from '../controllers/index.js';
import { authenticate, teacherOrAdmin, studentOnly, validateBody, validateQuery, validateParams, generalLimiter } from '../middleware/index.js';
import { createLessonSchema, updateLessonSchema, lessonIdParamSchema, getLessonsQuerySchema, completeLessonSchema, generateLessonSchema } from '../validators/index.js';

const router = Router();

/**
 * Lesson Routes
 * /api/v1/lessons
 */

// Public routes with rate limiting
router.get('/', generalLimiter, validateQuery(getLessonsQuerySchema), lessonController.getAll);
router.get('/:id', generalLimiter, validateParams(lessonIdParamSchema), lessonController.getById);

// Protected routes - apply authentication
router.use(authenticate);

// Student routes with rate limiting
router.get('/for-me', generalLimiter, studentOnly, lessonController.getForStudent);
router.post('/:id/start', generalLimiter, studentOnly, validateParams(lessonIdParamSchema), lessonController.start);
router.post('/:id/complete', generalLimiter, studentOnly, validateParams(lessonIdParamSchema), validateBody(completeLessonSchema), lessonController.complete);
router.get('/:id/progress', generalLimiter, studentOnly, validateParams(lessonIdParamSchema), lessonController.getProgress);

// Teacher/Admin routes with rate limiting
router.post('/', generalLimiter, teacherOrAdmin, validateBody(createLessonSchema), lessonController.create);
router.put('/:id', generalLimiter, teacherOrAdmin, validateParams(lessonIdParamSchema), validateBody(updateLessonSchema), lessonController.update);
router.delete('/:id', generalLimiter, teacherOrAdmin, validateParams(lessonIdParamSchema), lessonController.delete);
router.post('/generate', generalLimiter, teacherOrAdmin, validateBody(generateLessonSchema), lessonController.generate);

export default router;
