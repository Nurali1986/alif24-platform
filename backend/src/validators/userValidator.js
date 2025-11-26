import { z } from 'zod';

/**
 * User Validators
 * Zod schemas for user-related endpoints
 */

export const updateUserSchema = z.object({
  firstName: z.string().min(2).max(100).optional(),
  lastName: z.string().min(2).max(100).optional(),
  phone: z.string().regex(/^\+998[0-9]{9}$/).optional().nullable(),
  avatar: z.string().url().optional().nullable(),
  language: z.enum(['uz', 'ru']).optional()
});

export const userIdParamSchema = z.object({
  id: z.string().uuid('Invalid user ID format')
});

export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});

export const searchUsersSchema = z.object({
  query: z.string().min(1).optional(),
  role: z.enum(['student', 'teacher', 'parent', 'admin']).optional(),
  isActive: z.coerce.boolean().optional(),
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(10)
});

export default {
  updateUserSchema,
  userIdParamSchema,
  paginationSchema,
  searchUsersSchema
};
