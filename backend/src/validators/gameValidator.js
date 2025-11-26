import { z } from 'zod';

/**
 * Game Validators
 * Zod schemas for game-related endpoints
 */

export const createGameSchema = z.object({
  subjectId: z.string().uuid().optional(),
  name: z.string().min(3).max(200),
  nameUz: z.string().min(3).max(200),
  nameRu: z.string().min(3).max(200),
  description: z.string().optional(),
  descriptionUz: z.string().optional(),
  descriptionRu: z.string().optional(),
  type: z.enum(['puzzle', 'memory', 'matching', 'quiz', 'adventure', 'counting', 'spelling']).default('puzzle'),
  level: z.number().int().min(1).max(10).default(1),
  ageMin: z.number().int().min(4).max(7).default(4),
  ageMax: z.number().int().min(4).max(7).default(7),
  config: z.record(z.any()).optional(),
  thumbnail: z.string().url().optional(),
  pointsReward: z.number().int().nonnegative().default(5),
  timeLimit: z.number().int().nonnegative().default(0)
});

export const updateGameSchema = createGameSchema.partial();

export const gameIdParamSchema = z.object({
  id: z.string().uuid('Invalid game ID format')
});

export const getGamesQuerySchema = z.object({
  subjectId: z.string().uuid().optional(),
  type: z.enum(['puzzle', 'memory', 'matching', 'quiz', 'adventure', 'counting', 'spelling']).optional(),
  level: z.coerce.number().int().min(1).max(10).optional(),
  ageMin: z.coerce.number().int().min(4).max(7).optional(),
  ageMax: z.coerce.number().int().min(4).max(7).optional(),
  isActive: z.coerce.boolean().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10)
});

export const startGameSessionSchema = z.object({
  gameId: z.string().uuid('Invalid game ID'),
  level: z.number().int().min(1).max(10).default(1)
});

export const endGameSessionSchema = z.object({
  score: z.number().int().nonnegative(),
  timeSpent: z.number().int().nonnegative(),
  gameData: z.record(z.any()).optional()
});

export const gameSessionIdParamSchema = z.object({
  sessionId: z.string().uuid('Invalid session ID format')
});

export default {
  createGameSchema,
  updateGameSchema,
  gameIdParamSchema,
  getGamesQuerySchema,
  startGameSessionSchema,
  endGameSessionSchema,
  gameSessionIdParamSchema
};
