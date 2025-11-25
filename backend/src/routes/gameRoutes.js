import { Router } from 'express';
import { gameController } from '../controllers/index.js';
import { authenticate, teacherOrAdmin, studentOnly, validateBody, validateQuery, validateParams, generalLimiter, gameLimiter } from '../middleware/index.js';
import { createGameSchema, updateGameSchema, gameIdParamSchema, getGamesQuerySchema, startGameSessionSchema, endGameSessionSchema, gameSessionIdParamSchema } from '../validators/index.js';

const router = Router();

/**
 * Game Routes
 * /api/v1/games
 */

// Public routes with rate limiting
router.get('/', generalLimiter, validateQuery(getGamesQuerySchema), gameController.getAll);
router.get('/:id', generalLimiter, validateParams(gameIdParamSchema), gameController.getById);

// Protected routes - apply authentication
router.use(authenticate);

// Student routes - with game rate limiting
router.get('/for-me', gameLimiter, studentOnly, gameController.getForStudent);
router.get('/my-sessions', gameLimiter, studentOnly, gameController.getMySessions);
router.post('/:id/start', gameLimiter, studentOnly, validateParams(gameIdParamSchema), validateBody(startGameSessionSchema), gameController.startSession);

// Game session routes - with game rate limiting
router.get('/sessions/:sessionId', gameLimiter, validateParams(gameSessionIdParamSchema), gameController.getSession);
router.post('/sessions/:sessionId/end', gameLimiter, validateParams(gameSessionIdParamSchema), validateBody(endGameSessionSchema), gameController.endSession);

// Admin routes - with general rate limiting
router.post('/', generalLimiter, teacherOrAdmin, validateBody(createGameSchema), gameController.create);
router.put('/:id', generalLimiter, teacherOrAdmin, validateParams(gameIdParamSchema), validateBody(updateGameSchema), gameController.update);
router.delete('/:id', generalLimiter, teacherOrAdmin, validateParams(gameIdParamSchema), gameController.delete);

export default router;
