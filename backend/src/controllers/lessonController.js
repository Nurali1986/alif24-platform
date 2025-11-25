import { BaseController } from '../core/base/index.js';
import { lessonService } from '../services/index.js';

/**
 * Lesson Controller
 * Handles lesson-related HTTP requests
 */
class LessonController extends BaseController {
  constructor() {
    super(lessonService);
  }

  /**
   * Get all lessons
   * GET /lessons
   */
  getAll = this.asyncHandler(async (req, res) => {
    const { page, limit, ...filters } = req.query;
    const result = await this.service.getLessons(filters, page, limit);
    return this.paginated(res, result.data, result.page, result.limit, result.total);
  });

  /**
   * Get lesson by ID
   * GET /lessons/:id
   */
  getById = this.asyncHandler(async (req, res) => {
    const lesson = await this.service.getLessonById(req.params.id);
    return this.success(res, lesson);
  });

  /**
   * Get lessons for current student
   * GET /lessons/for-me
   */
  getForStudent = this.asyncHandler(async (req, res) => {
    const { studentId } = req.user.studentProfile || {};
    const result = await this.service.getLessonsForStudent(studentId, req.query);
    return this.success(res, result);
  });

  /**
   * Create new lesson
   * POST /lessons
   */
  create = this.asyncHandler(async (req, res) => {
    const teacherId = req.user.teacherProfile?.id || null;
    const lesson = await this.service.createLesson(req.body, teacherId);
    return this.created(res, lesson, 'Lesson created successfully');
  });

  /**
   * Update lesson
   * PUT /lessons/:id
   */
  update = this.asyncHandler(async (req, res) => {
    const lesson = await this.service.updateLesson(req.params.id, req.body);
    return this.success(res, lesson, 'Lesson updated successfully');
  });

  /**
   * Delete lesson
   * DELETE /lessons/:id
   */
  delete = this.asyncHandler(async (req, res) => {
    await this.service.deleteLesson(req.params.id);
    return this.noContent(res);
  });

  /**
   * Start lesson
   * POST /lessons/:id/start
   */
  start = this.asyncHandler(async (req, res) => {
    const { id: studentId } = req.user.studentProfile || {};
    const progress = await this.service.startLesson(studentId, req.params.id);
    return this.success(res, progress, 'Lesson started');
  });

  /**
   * Complete lesson
   * POST /lessons/:id/complete
   */
  complete = this.asyncHandler(async (req, res) => {
    const { id: studentId } = req.user.studentProfile || {};
    const progress = await this.service.completeLesson(studentId, req.params.id, req.body);
    return this.success(res, progress, 'Lesson completed');
  });

  /**
   * Get lesson progress
   * GET /lessons/:id/progress
   */
  getProgress = this.asyncHandler(async (req, res) => {
    const { id: studentId } = req.user.studentProfile || {};
    const progress = await this.service.getStudentProgress(studentId, req.params.id);
    return this.success(res, progress);
  });

  /**
   * Generate AI lesson
   * POST /lessons/generate
   */
  generate = this.asyncHandler(async (req, res) => {
    const content = await this.service.generateAILesson(req.body);
    return this.success(res, content, 'Lesson content generated');
  });
}

export default new LessonController();
