import { Router } from 'express';
import { lessonController } from '../controllers/index.js';
import { authenticate, teacherOrAdmin, studentOnly, validateBody, validateQuery, validateParams } from '../middleware/index.js';
import { createLessonSchema, updateLessonSchema, lessonIdParamSchema, getLessonsQuerySchema, completeLessonSchema, generateLessonSchema } from '../validators/index.js';

const router = Router();

/**
 * Lesson Routes
 * /api/v1/lessons
 */

// Public routes
router.get('/', validateQuery(getLessonsQuerySchema), lessonController.getAll);
router.get('/:id', validateParams(lessonIdParamSchema), lessonController.getById);

// Protected routes
router.use(authenticate);

// Student routes
router.get('/for-me', studentOnly, lessonController.getForStudent);
router.post('/:id/start', studentOnly, validateParams(lessonIdParamSchema), lessonController.start);
router.post('/:id/complete', studentOnly, validateParams(lessonIdParamSchema), validateBody(completeLessonSchema), lessonController.complete);
router.get('/:id/progress', studentOnly, validateParams(lessonIdParamSchema), lessonController.getProgress);

// Teacher/Admin routes
router.post('/', teacherOrAdmin, validateBody(createLessonSchema), lessonController.create);
router.put('/:id', teacherOrAdmin, validateParams(lessonIdParamSchema), validateBody(updateLessonSchema), lessonController.update);
router.delete('/:id', teacherOrAdmin, validateParams(lessonIdParamSchema), lessonController.delete);
router.post('/generate', teacherOrAdmin, validateBody(generateLessonSchema), lessonController.generate);

export default router;
