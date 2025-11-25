import { BaseController } from '../core/base/index.js';
import { gameService } from '../services/index.js';

/**
 * Game Controller
 * Handles game-related HTTP requests
 */
class GameController extends BaseController {
  constructor() {
    super(gameService);
  }

  /**
   * Get all games
   * GET /games
   */
  getAll = this.asyncHandler(async (req, res) => {
    const { page, limit, ...filters } = req.query;
    const result = await this.service.getGames(filters, page, limit);
    return this.paginated(res, result.data, result.page, result.limit, result.total);
  });

  /**
   * Get game by ID
   * GET /games/:id
   */
  getById = this.asyncHandler(async (req, res) => {
    const game = await this.service.getGameById(req.params.id);
    return this.success(res, game);
  });

  /**
   * Get games for current student
   * GET /games/for-me
   */
  getForStudent = this.asyncHandler(async (req, res) => {
    const { id: studentId } = req.user.studentProfile || {};
    const result = await this.service.getGamesForStudent(studentId, req.query);
    return this.success(res, result);
  });

  /**
   * Create new game
   * POST /games
   */
  create = this.asyncHandler(async (req, res) => {
    const game = await this.service.createGame(req.body);
    return this.created(res, game, 'Game created successfully');
  });

  /**
   * Update game
   * PUT /games/:id
   */
  update = this.asyncHandler(async (req, res) => {
    const game = await this.service.updateGame(req.params.id, req.body);
    return this.success(res, game, 'Game updated successfully');
  });

  /**
   * Delete game
   * DELETE /games/:id
   */
  delete = this.asyncHandler(async (req, res) => {
    await this.service.deleteGame(req.params.id);
    return this.noContent(res);
  });

  /**
   * Start game session
   * POST /games/:id/start
   */
  startSession = this.asyncHandler(async (req, res) => {
    const { id: studentId } = req.user.studentProfile || {};
    const { level } = req.body;
    const session = await this.service.startGameSession(studentId, req.params.id, level);
    return this.created(res, session, 'Game session started');
  });

  /**
   * End game session
   * POST /games/sessions/:sessionId/end
   */
  endSession = this.asyncHandler(async (req, res) => {
    const session = await this.service.endGameSession(req.params.sessionId, req.body);
    return this.success(res, session, 'Game session completed');
  });

  /**
   * Get game session
   * GET /games/sessions/:sessionId
   */
  getSession = this.asyncHandler(async (req, res) => {
    const session = await this.service.getGameSession(req.params.sessionId);
    return this.success(res, session);
  });

  /**
   * Get student's game sessions
   * GET /games/my-sessions
   */
  getMySessions = this.asyncHandler(async (req, res) => {
    const { id: studentId } = req.user.studentProfile || {};
    const { gameId } = req.query;
    const sessions = await this.service.getStudentGameSessions(studentId, gameId);
    return this.success(res, sessions);
  });
}

export default new GameController();
