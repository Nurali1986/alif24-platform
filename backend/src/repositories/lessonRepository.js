import { BaseRepository } from '../core/base/index.js';
import { Lesson, Subject, Teacher } from '../models/index.js';

/**
 * Lesson Repository
 * Data access layer for Lesson model
 */
class LessonRepository extends BaseRepository {
  constructor() {
    super(Lesson);
  }

  /**
   * Find lessons by subject
   * @param {string} subjectId - Subject ID
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of lessons
   */
  async findBySubject(subjectId, options = {}) {
    return this.model.findAll({
      where: { subjectId, isActive: true },
      order: [['order', 'ASC']],
      ...options
    });
  }

  /**
   * Find lessons by level
   * @param {number} level - Lesson level
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of lessons
   */
  async findByLevel(level, options = {}) {
    return this.model.findAll({
      where: { level, isActive: true },
      ...options
    });
  }

  /**
   * Find lessons suitable for age
   * @param {number} age - Student age
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of suitable lessons
   */
  async findByAge(age, options = {}) {
    const { Op } = await import('sequelize');
    return this.model.findAll({
      where: {
        ageMin: { [Op.lte]: age },
        ageMax: { [Op.gte]: age },
        isActive: true
      },
      ...options
    });
  }

  /**
   * Find lesson with full details
   * @param {string} id - Lesson ID
   * @returns {Promise<Object|null>} Lesson with details
   */
  async findWithDetails(id) {
    return this.model.findByPk(id, {
      include: [
        { model: Subject, as: 'subject' },
        { model: Teacher, as: 'teacher' }
      ]
    });
  }

  /**
   * Search lessons with filters
   * @param {Object} filters - Search filters
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Paginated results
   */
  async searchLessons(filters, page = 1, limit = 10) {
    const where = { isActive: true };
    
    if (filters.subjectId) {
      where.subjectId = filters.subjectId;
    }
    
    if (filters.type) {
      where.type = filters.type;
    }
    
    if (filters.level) {
      where.level = filters.level;
    }
    
    if (filters.ageMin) {
      const { Op } = await import('sequelize');
      where.ageMax = { [Op.gte]: filters.ageMin };
    }
    
    if (filters.ageMax) {
      const { Op } = await import('sequelize');
      where.ageMin = { [Op.lte]: filters.ageMax };
    }

    return this.findPaginated(page, limit, {
      where,
      order: [['order', 'ASC']],
      include: [{ model: Subject, as: 'subject' }]
    });
  }

  /**
   * Increment completion count
   * @param {string} lessonId - Lesson ID
   * @returns {Promise<Object>} Updated lesson
   */
  async incrementCompletions(lessonId) {
    const lesson = await this.findById(lessonId);
    if (!lesson) return null;
    
    lesson.totalCompletions += 1;
    await lesson.save();
    return lesson;
  }

  /**
   * Update average rating
   * @param {string} lessonId - Lesson ID
   * @param {number} newRating - New rating
   * @returns {Promise<Object>} Updated lesson
   */
  async updateRating(lessonId, newRating) {
    const lesson = await this.findById(lessonId);
    if (!lesson) return null;
    
    if (lesson.totalCompletions === 0) {
      lesson.averageRating = newRating;
    } else {
      lesson.averageRating = ((lesson.averageRating * lesson.totalCompletions) + newRating) / (lesson.totalCompletions + 1);
    }
    
    await lesson.save();
    return lesson;
  }
}

export default new LessonRepository();
