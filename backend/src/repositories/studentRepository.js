import { BaseRepository } from '../core/base/index.js';
import { Student, User } from '../models/index.js';

/**
 * Student Repository
 * Data access layer for Student model
 */
class StudentRepository extends BaseRepository {
  constructor() {
    super(Student);
  }

  /**
   * Find student by user ID
   * @param {string} userId - User ID
   * @returns {Promise<Object|null>} Student profile or null
   */
  async findByUserId(userId) {
    return this.model.findOne({
      where: { userId },
      include: [{ model: User, as: 'user', attributes: { exclude: ['password', 'refreshToken'] } }]
    });
  }

  /**
   * Find student with user details
   * @param {string} id - Student ID
   * @returns {Promise<Object|null>} Student with user details
   */
  async findWithUser(id) {
    return this.model.findByPk(id, {
      include: [{ model: User, as: 'user', attributes: { exclude: ['password', 'refreshToken'] } }]
    });
  }

  /**
   * Find students by level
   * @param {number} level - Student level
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of students
   */
  async findByLevel(level, options = {}) {
    return this.model.findAll({
      where: { level },
      ...options
    });
  }

  /**
   * Update student points
   * @param {string} studentId - Student ID
   * @param {number} points - Points to add
   * @returns {Promise<Object>} Updated student
   */
  async addPoints(studentId, points) {
    const student = await this.findById(studentId);
    if (!student) return null;
    
    student.totalPoints += points;
    await student.save();
    return student;
  }

  /**
   * Update student level
   * @param {string} studentId - Student ID
   * @param {number} newLevel - New level
   * @returns {Promise<Object>} Updated student
   */
  async updateLevel(studentId, newLevel) {
    return this.update(studentId, { level: newLevel });
  }

  /**
   * Increment completed lessons count
   * @param {string} studentId - Student ID
   * @returns {Promise<Object>} Updated student
   */
  async incrementLessonsCompleted(studentId) {
    const student = await this.findById(studentId);
    if (!student) return null;
    
    student.totalLessonsCompleted += 1;
    await student.save();
    return student;
  }

  /**
   * Increment games played count
   * @param {string} studentId - Student ID
   * @returns {Promise<Object>} Updated student
   */
  async incrementGamesPlayed(studentId) {
    const student = await this.findById(studentId);
    if (!student) return null;
    
    student.totalGamesPlayed += 1;
    await student.save();
    return student;
  }

  /**
   * Update average score
   * @param {string} studentId - Student ID
   * @param {number} newScore - New score to factor in
   * @returns {Promise<Object>} Updated student
   */
  async updateAverageScore(studentId, newScore) {
    const student = await this.findById(studentId);
    if (!student) return null;
    
    const totalActivities = student.totalLessonsCompleted + student.totalGamesPlayed;
    if (totalActivities === 0) {
      student.averageScore = newScore;
    } else {
      student.averageScore = ((student.averageScore * totalActivities) + newScore) / (totalActivities + 1);
    }
    
    await student.save();
    return student;
  }
}

export default new StudentRepository();
