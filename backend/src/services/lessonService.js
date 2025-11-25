import { BaseService } from '../core/base/index.js';
import { lessonRepository, studentRepository } from '../repositories/index.js';
import { Progress } from '../models/index.js';
import { NotFoundError } from '../core/errors/index.js';
import { generateLessonContent } from '../config/openai.js';
import Logger from '../utils/Logger.js';

/**
 * Lesson Service
 * Business logic for lesson operations
 */
class LessonService extends BaseService {
  constructor() {
    super(lessonRepository);
  }

  /**
   * Get all lessons with filters
   * @param {Object} filters - Query filters
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Paginated lessons
   */
  async getLessons(filters, page = 1, limit = 10) {
    return this.repository.searchLessons(filters, page, limit);
  }

  /**
   * Get lesson by ID with full details
   * @param {string} lessonId - Lesson ID
   * @returns {Promise<Object>} Lesson with details
   */
  async getLessonById(lessonId) {
    const lesson = await this.repository.findWithDetails(lessonId);
    if (!lesson) {
      throw new NotFoundError('Lesson not found');
    }
    return lesson;
  }

  /**
   * Get lessons for student based on their level and age
   * @param {string} studentId - Student ID
   * @param {Object} filters - Additional filters
   * @returns {Promise<Array>} Recommended lessons
   */
  async getLessonsForStudent(studentId, filters = {}) {
    const student = await studentRepository.findById(studentId);
    if (!student) {
      throw new NotFoundError('Student not found');
    }

    const age = student.getAge();
    
    return this.repository.searchLessons({
      ...filters,
      level: filters.level || student.level,
      ageMin: age,
      ageMax: age
    });
  }

  /**
   * Create new lesson
   * @param {Object} lessonData - Lesson data
   * @param {string} teacherId - Creator teacher ID (optional)
   * @returns {Promise<Object>} Created lesson
   */
  async createLesson(lessonData, teacherId = null) {
    const lesson = await this.repository.create({
      ...lessonData,
      teacherId
    });
    
    Logger.info(`New lesson created: ${lesson.id}`);
    return lesson;
  }

  /**
   * Update lesson
   * @param {string} lessonId - Lesson ID
   * @param {Object} updateData - Update data
   * @returns {Promise<Object>} Updated lesson
   */
  async updateLesson(lessonId, updateData) {
    const lesson = await this.repository.findById(lessonId);
    if (!lesson) {
      throw new NotFoundError('Lesson not found');
    }

    await lesson.update(updateData);
    return lesson;
  }

  /**
   * Delete lesson (soft delete)
   * @param {string} lessonId - Lesson ID
   * @returns {Promise<boolean>} Deletion result
   */
  async deleteLesson(lessonId) {
    return this.repository.delete(lessonId);
  }

  /**
   * Start lesson for student
   * @param {string} studentId - Student ID
   * @param {string} lessonId - Lesson ID
   * @returns {Promise<Object>} Progress record
   */
  async startLesson(studentId, lessonId) {
    const [progress, created] = await Progress.findOrCreate({
      where: { studentId, lessonId },
      defaults: { status: 'in_progress' }
    });

    if (!created && progress.status === 'not_started') {
      await progress.update({ status: 'in_progress' });
    }

    return progress;
  }

  /**
   * Complete lesson for student
   * @param {string} studentId - Student ID
   * @param {string} lessonId - Lesson ID
   * @param {Object} completionData - Completion data (score, timeSpent, answers)
   * @returns {Promise<Object>} Updated progress
   */
  async completeLesson(studentId, lessonId, completionData) {
    const lesson = await this.repository.findById(lessonId);
    if (!lesson) {
      throw new NotFoundError('Lesson not found');
    }

    let progress = await Progress.findOne({
      where: { studentId, lessonId }
    });

    if (!progress) {
      progress = await Progress.create({
        studentId,
        lessonId,
        status: 'completed',
        ...completionData,
        completedAt: new Date()
      });
    } else {
      await progress.update({
        status: 'completed',
        score: completionData.score,
        timeSpent: progress.timeSpent + completionData.timeSpent,
        attempts: progress.attempts + 1,
        answers: completionData.answers,
        completedAt: new Date()
      });
    }

    // Update student statistics
    const student = await studentRepository.findById(studentId);
    if (student) {
      await studentRepository.incrementLessonsCompleted(studentId);
      await studentRepository.addPoints(studentId, lesson.pointsReward);
      await studentRepository.updateAverageScore(studentId, completionData.score);
      await student.updateStreak();
    }

    // Update lesson statistics
    await this.repository.incrementCompletions(lessonId);

    Logger.info(`Lesson ${lessonId} completed by student ${studentId}`);

    return progress;
  }

  /**
   * Generate AI lesson content
   * @param {Object} params - Generation parameters
   * @returns {Promise<Object>} Generated lesson content
   */
  async generateAILesson(params) {
    const content = await generateLessonContent(params);
    
    Logger.info(`AI lesson generated for topic: ${params.topic}`);
    return content;
  }

  /**
   * Get student's progress on a lesson
   * @param {string} studentId - Student ID
   * @param {string} lessonId - Lesson ID
   * @returns {Promise<Object|null>} Progress record
   */
  async getStudentProgress(studentId, lessonId) {
    return Progress.findOne({
      where: { studentId, lessonId }
    });
  }
}

export default new LessonService();
