import { BaseController } from '../core/base/index.js';
import { studentService } from '../services/index.js';

/**
 * Student Controller
 * Handles student-related HTTP requests
 */
class StudentController extends BaseController {
  constructor() {
    super(studentService);
  }

  /**
   * Get student profile by user ID
   * GET /students/me
   */
  getMyProfile = this.asyncHandler(async (req, res) => {
    const student = await this.service.getStudentByUserId(req.userId);
    return this.success(res, student);
  });

  /**
   * Get student by ID
   * GET /students/:id
   */
  getById = this.asyncHandler(async (req, res) => {
    const student = await this.service.findById(req.params.id);
    return this.success(res, student);
  });

  /**
   * Create or update student profile
   * POST /students/profile
   */
  createProfile = this.asyncHandler(async (req, res) => {
    const profile = await this.service.createProfile(req.userId, req.body);
    return this.created(res, profile, 'Profile created successfully');
  });

  /**
   * Update student profile
   * PUT /students/:id
   */
  updateProfile = this.asyncHandler(async (req, res) => {
    const profile = await this.service.updateProfile(req.params.id, req.body);
    return this.success(res, profile, 'Profile updated successfully');
  });

  /**
   * Get student progress
   * GET /students/:id/progress
   */
  getProgress = this.asyncHandler(async (req, res) => {
    const progress = await this.service.getProgress(req.params.id, req.query);
    return this.success(res, progress);
  });

  /**
   * Get student achievements
   * GET /students/:id/achievements
   */
  getAchievements = this.asyncHandler(async (req, res) => {
    const achievements = await this.service.getAchievements(req.params.id);
    return this.success(res, achievements);
  });

  /**
   * Get student statistics
   * GET /students/:id/statistics
   */
  getStatistics = this.asyncHandler(async (req, res) => {
    const statistics = await this.service.getStatistics(req.params.id);
    return this.success(res, statistics);
  });

  /**
   * Award achievement to student
   * POST /students/:id/achievements
   */
  awardAchievement = this.asyncHandler(async (req, res) => {
    const { achievementId } = req.body;
    const result = await this.service.awardAchievement(req.params.id, achievementId);
    return this.created(res, result, 'Achievement awarded');
  });

  /**
   * Recalculate student level
   * POST /students/:id/recalculate-level
   */
  recalculateLevel = this.asyncHandler(async (req, res) => {
    const student = await this.service.recalculateLevel(req.params.id);
    return this.success(res, student, 'Level recalculated');
  });
}

export default new StudentController();
