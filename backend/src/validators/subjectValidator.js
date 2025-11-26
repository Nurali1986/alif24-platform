import { z } from 'zod';

/**
 * Subject Validators
 * Zod schemas for subject-related endpoints
 */

export const createSubjectSchema = z.object({
  name: z.string().min(2).max(100),
  nameUz: z.string().min(2).max(100),
  nameRu: z.string().min(2).max(100),
  description: z.string().optional(),
  descriptionUz: z.string().optional(),
  descriptionRu: z.string().optional(),
  icon: z.string().url().optional(),
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid color format').default('#4A90A4'),
  order: z.number().int().nonnegative().default(0),
  ageRange: z.object({
    min: z.number().int().min(4).max(7).default(4),
    max: z.number().int().min(4).max(7).default(7)
  }).optional()
});

export const updateSubjectSchema = createSubjectSchema.partial();

export const subjectIdParamSchema = z.object({
  id: z.string().uuid('Invalid subject ID format')
});

export const getSubjectsQuerySchema = z.object({
  isActive: z.coerce.boolean().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10)
});

export default {
  createSubjectSchema,
  updateSubjectSchema,
  subjectIdParamSchema,
  getSubjectsQuerySchema
};
