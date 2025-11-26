import { z } from 'zod';

/**
 * Student Validators
 * Zod schemas for student-related endpoints
 */

export const createStudentProfileSchema = z.object({
  dateOfBirth: z.string().refine((date) => {
    const birthDate = new Date(date);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    return age >= 4 && age <= 7;
  }, 'Student must be between 4 and 7 years old'),
  grade: z.string().max(50).optional(),
  preferences: z.object({
    favoriteSubjects: z.array(z.string()).optional(),
    learningStyle: z.enum(['visual', 'auditory', 'kinesthetic']).optional(),
    soundEnabled: z.boolean().optional(),
    animationsEnabled: z.boolean().optional()
  }).optional()
});

export const updateStudentProfileSchema = z.object({
  grade: z.string().max(50).optional(),
  preferences: z.object({
    favoriteSubjects: z.array(z.string()).optional(),
    learningStyle: z.enum(['visual', 'auditory', 'kinesthetic']).optional(),
    soundEnabled: z.boolean().optional(),
    animationsEnabled: z.boolean().optional()
  }).optional()
});

export const studentIdParamSchema = z.object({
  id: z.string().uuid('Invalid student ID format')
});

export const getStudentProgressSchema = z.object({
  subjectId: z.string().uuid().optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional()
});

export const updateStudentLevelSchema = z.object({
  level: z.number().int().min(1).max(10)
});

export default {
  createStudentProfileSchema,
  updateStudentProfileSchema,
  studentIdParamSchema,
  getStudentProgressSchema,
  updateStudentLevelSchema
};
