import { Router } from 'express';
import { gameController } from '../controllers/index.js';
import { authenticate, teacherOrAdmin, studentOnly, validateBody, validateQuery, validateParams } from '../middleware/index.js';
import { createGameSchema, updateGameSchema, gameIdParamSchema, getGamesQuerySchema, startGameSessionSchema, endGameSessionSchema, gameSessionIdParamSchema } from '../validators/index.js';

const router = Router();

/**
 * Game Routes
 * /api/v1/games
 */

// Public routes
router.get('/', validateQuery(getGamesQuerySchema), gameController.getAll);
router.get('/:id', validateParams(gameIdParamSchema), gameController.getById);

// Protected routes
router.use(authenticate);

// Student routes
router.get('/for-me', studentOnly, gameController.getForStudent);
router.get('/my-sessions', studentOnly, gameController.getMySessions);
router.post('/:id/start', studentOnly, validateParams(gameIdParamSchema), validateBody(startGameSessionSchema), gameController.startSession);

// Game session routes
router.get('/sessions/:sessionId', validateParams(gameSessionIdParamSchema), gameController.getSession);
router.post('/sessions/:sessionId/end', validateParams(gameSessionIdParamSchema), validateBody(endGameSessionSchema), gameController.endSession);

// Admin routes
router.post('/', teacherOrAdmin, validateBody(createGameSchema), gameController.create);
router.put('/:id', teacherOrAdmin, validateParams(gameIdParamSchema), validateBody(updateGameSchema), gameController.update);
router.delete('/:id', teacherOrAdmin, validateParams(gameIdParamSchema), gameController.delete);

export default router;
