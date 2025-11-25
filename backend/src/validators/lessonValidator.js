import { z } from 'zod';

/**
 * Lesson Validators
 * Zod schemas for lesson-related endpoints
 */

export const createLessonSchema = z.object({
  subjectId: z.string().uuid('Invalid subject ID'),
  title: z.string().min(3).max(200),
  titleUz: z.string().min(3).max(200),
  titleRu: z.string().min(3).max(200),
  description: z.string().optional(),
  descriptionUz: z.string().optional(),
  descriptionRu: z.string().optional(),
  content: z.record(z.any()).optional(),
  type: z.enum(['video', 'interactive', 'reading', 'quiz', 'activity']).default('interactive'),
  level: z.number().int().min(1).max(10).default(1),
  ageMin: z.number().int().min(4).max(7).default(4),
  ageMax: z.number().int().min(4).max(7).default(7),
  duration: z.number().int().positive().default(15),
  pointsReward: z.number().int().nonnegative().default(10),
  thumbnail: z.string().url().optional(),
  videoUrl: z.string().url().optional()
});

export const updateLessonSchema = createLessonSchema.partial();

export const lessonIdParamSchema = z.object({
  id: z.string().uuid('Invalid lesson ID format')
});

export const getLessonsQuerySchema = z.object({
  subjectId: z.string().uuid().optional(),
  type: z.enum(['video', 'interactive', 'reading', 'quiz', 'activity']).optional(),
  level: z.coerce.number().int().min(1).max(10).optional(),
  ageMin: z.coerce.number().int().min(4).max(7).optional(),
  ageMax: z.coerce.number().int().min(4).max(7).optional(),
  isActive: z.coerce.boolean().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10)
});

export const completeLessonSchema = z.object({
  score: z.number().min(0).max(100),
  timeSpent: z.number().int().nonnegative(),
  answers: z.array(z.record(z.any())).optional()
});

export const generateLessonSchema = z.object({
  topic: z.string().min(3).max(200),
  subjectId: z.string().uuid(),
  level: z.number().int().min(1).max(10).default(1),
  language: z.enum(['uz', 'ru']).default('uz'),
  age: z.number().int().min(4).max(7)
});

export default {
  createLessonSchema,
  updateLessonSchema,
  lessonIdParamSchema,
  getLessonsQuerySchema,
  completeLessonSchema,
  generateLessonSchema
};
