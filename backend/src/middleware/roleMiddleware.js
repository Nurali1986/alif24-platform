import { ForbiddenError } from '../core/errors/index.js';

/**
 * Role-based Access Control Middleware
 * Checks if user has required role(s)
 */

/**
 * Check if user has one of the allowed roles
 * @param {...string} allowedRoles - Allowed roles
 * @returns {Function} Express middleware
 */
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ForbiddenError('Authentication required'));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ForbiddenError(`Access denied. Required role: ${allowedRoles.join(' or ')}`));
    }

    next();
  };
};

/**
 * Admin only middleware
 */
export const adminOnly = requireRole('admin');

/**
 * Teacher only middleware
 */
export const teacherOnly = requireRole('teacher');

/**
 * Parent only middleware
 */
export const parentOnly = requireRole('parent');

/**
 * Student only middleware
 */
export const studentOnly = requireRole('student');

/**
 * Teacher or Admin middleware
 */
export const teacherOrAdmin = requireRole('teacher', 'admin');

/**
 * Parent or Teacher middleware
 */
export const parentOrTeacher = requireRole('parent', 'teacher');

/**
 * Check if user owns the resource or is admin
 * @param {Function} getResourceOwnerId - Function to extract owner ID from request
 * @returns {Function} Express middleware
 */
export const ownerOrAdmin = (getResourceOwnerId) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return next(new ForbiddenError('Authentication required'));
      }

      // Admins can access everything
      if (req.user.role === 'admin') {
        return next();
      }

      const ownerId = await getResourceOwnerId(req);
      
      if (req.user.id !== ownerId) {
        return next(new ForbiddenError('Access denied. You can only access your own resources.'));
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Check if parent has access to student's data
 * @param {Function} getStudentId - Function to extract student ID from request
 * @returns {Function} Express middleware
 */
export const parentOfStudent = (getStudentId) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return next(new ForbiddenError('Authentication required'));
      }

      // Admins can access everything
      if (req.user.role === 'admin') {
        return next();
      }

      // If user is the student themselves
      const studentId = await getStudentId(req);
      if (req.user.role === 'student' && req.user.studentProfile?.id === studentId) {
        return next();
      }

      // Check if parent is linked to student
      if (req.user.role === 'parent') {
        const { ParentStudent } = await import('../models/index.js');
        const { Parent } = await import('../models/index.js');
        
        const parent = await Parent.findOne({
          where: { userId: req.user.id }
        });

        if (parent) {
          const link = await ParentStudent.findOne({
            where: { 
              parentId: parent.id, 
              studentId 
            }
          });

          if (link) {
            return next();
          }
        }
      }

      return next(new ForbiddenError('Access denied. You do not have permission to access this student\'s data.'));
    } catch (error) {
      next(error);
    }
  };
};

export default {
  requireRole,
  adminOnly,
  teacherOnly,
  parentOnly,
  studentOnly,
  teacherOrAdmin,
  parentOrTeacher,
  ownerOrAdmin,
  parentOfStudent
};
