import { BaseService } from '../core/base/index.js';
import { studentRepository } from '../repositories/index.js';
import { Student, Progress, Achievement, StudentAchievement } from '../models/index.js';
import { NotFoundError } from '../core/errors/index.js';
import Logger from '../utils/Logger.js';

/**
 * Student Service
 * Business logic for student operations
 */
class StudentService extends BaseService {
  constructor() {
    super(studentRepository);
  }

  /**
   * Get student profile by user ID
   * @param {string} userId - User ID
   * @returns {Promise<Object>} Student profile
   */
  async getStudentByUserId(userId) {
    const student = await this.repository.findByUserId(userId);
    if (!student) {
      throw new NotFoundError('Student profile not found');
    }
    return student;
  }

  /**
   * Create student profile
   * @param {string} userId - User ID
   * @param {Object} profileData - Profile data
   * @returns {Promise<Object>} Created profile
   */
  async createProfile(userId, profileData) {
    const existing = await Student.findOne({ where: { userId } });
    if (existing) {
      return this.updateProfile(existing.id, profileData);
    }

    return Student.create({
      userId,
      ...profileData
    });
  }

  /**
   * Update student profile
   * @param {string} studentId - Student ID
   * @param {Object} updateData - Data to update
   * @returns {Promise<Object>} Updated profile
   */
  async updateProfile(studentId, updateData) {
    const student = await this.repository.findById(studentId);
    if (!student) {
      throw new NotFoundError('Student not found');
    }

    await student.update(updateData);
    return student;
  }

  /**
   * Get student progress
   * @param {string} studentId - Student ID
   * @param {Object} filters - Progress filters
   * @returns {Promise<Object>} Progress data
   */
  async getProgress(studentId, filters = {}) {
    const where = { studentId };
    
    if (filters.subjectId) {
      // Join with lessons to filter by subject
    }

    const progress = await Progress.findAll({
      where,
      include: ['lesson'],
      order: [['updatedAt', 'DESC']]
    });

    return progress;
  }

  /**
   * Get student achievements
   * @param {string} studentId - Student ID
   * @returns {Promise<Array>} Student achievements
   */
  async getAchievements(studentId) {
    const student = await Student.findByPk(studentId, {
      include: [{
        model: Achievement,
        as: 'achievements',
        through: { attributes: ['earnedAt'] }
      }]
    });

    if (!student) {
      throw new NotFoundError('Student not found');
    }

    return student.achievements;
  }

  /**
   * Award achievement to student
   * @param {string} studentId - Student ID
   * @param {string} achievementId - Achievement ID
   * @returns {Promise<Object>} Student achievement record
   */
  async awardAchievement(studentId, achievementId) {
    const [studentAchievement, created] = await StudentAchievement.findOrCreate({
      where: { studentId, achievementId },
      defaults: { earnedAt: new Date() }
    });

    if (created) {
      // Award points for new achievement
      const achievement = await Achievement.findByPk(achievementId);
      if (achievement) {
        await this.repository.addPoints(studentId, achievement.pointsReward);
      }
      Logger.info(`Achievement ${achievementId} awarded to student ${studentId}`);
    }

    return studentAchievement;
  }

  /**
   * Update student level based on performance
   * @param {string} studentId - Student ID
   * @returns {Promise<Object>} Updated student
   */
  async recalculateLevel(studentId) {
    const student = await this.repository.findById(studentId);
    if (!student) {
      throw new NotFoundError('Student not found');
    }

    // Calculate new level based on performance
    let newLevel = 1;
    
    if (student.averageScore >= 90 && student.totalLessonsCompleted >= 20) {
      newLevel = 10;
    } else if (student.averageScore >= 80 && student.totalLessonsCompleted >= 15) {
      newLevel = 8;
    } else if (student.averageScore >= 70 && student.totalLessonsCompleted >= 10) {
      newLevel = 6;
    } else if (student.averageScore >= 60 && student.totalLessonsCompleted >= 5) {
      newLevel = 4;
    } else if (student.totalLessonsCompleted >= 2) {
      newLevel = 2;
    }

    if (newLevel !== student.level) {
      await student.update({ level: newLevel });
      Logger.info(`Student ${studentId} level updated to ${newLevel}`);
    }

    return student;
  }

  /**
   * Get student statistics
   * @param {string} studentId - Student ID
   * @returns {Promise<Object>} Student statistics
   */
  async getStatistics(studentId) {
    const student = await this.repository.findWithUser(studentId);
    if (!student) {
      throw new NotFoundError('Student not found');
    }

    const achievements = await this.getAchievements(studentId);

    return {
      totalPoints: student.totalPoints,
      level: student.level,
      totalLessonsCompleted: student.totalLessonsCompleted,
      totalGamesPlayed: student.totalGamesPlayed,
      averageScore: student.averageScore,
      currentStreak: student.currentStreak,
      longestStreak: student.longestStreak,
      achievementsCount: achievements.length,
      lastActivityAt: student.lastActivityAt
    };
  }
}

export default new StudentService();
