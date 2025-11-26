import { BaseService } from '../core/base/index.js';
import { gameRepository, studentRepository } from '../repositories/index.js';
import { GameSession } from '../models/index.js';
import { NotFoundError } from '../core/errors/index.js';
import Logger from '../utils/Logger.js';

/**
 * Game Service
 * Business logic for game operations
 */
class GameService extends BaseService {
  constructor() {
    super(gameRepository);
  }

  /**
   * Get all games with filters
   * @param {Object} filters - Query filters
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Paginated games
   */
  async getGames(filters, page = 1, limit = 10) {
    return this.repository.searchGames(filters, page, limit);
  }

  /**
   * Get game by ID with details
   * @param {string} gameId - Game ID
   * @returns {Promise<Object>} Game with details
   */
  async getGameById(gameId) {
    const game = await this.repository.findWithDetails(gameId);
    if (!game) {
      throw new NotFoundError('Game not found');
    }
    return game;
  }

  /**
   * Get games for student based on their level and age
   * @param {string} studentId - Student ID
   * @param {Object} filters - Additional filters
   * @returns {Promise<Object>} Recommended games
   */
  async getGamesForStudent(studentId, filters = {}) {
    const student = await studentRepository.findById(studentId);
    if (!student) {
      throw new NotFoundError('Student not found');
    }

    const age = student.getAge();
    
    return this.repository.searchGames({
      ...filters,
      level: filters.level || student.level,
      ageMin: age,
      ageMax: age
    });
  }

  /**
   * Create new game
   * @param {Object} gameData - Game data
   * @returns {Promise<Object>} Created game
   */
  async createGame(gameData) {
    const game = await this.repository.create(gameData);
    Logger.info(`New game created: ${game.id}`);
    return game;
  }

  /**
   * Update game
   * @param {string} gameId - Game ID
   * @param {Object} updateData - Update data
   * @returns {Promise<Object>} Updated game
   */
  async updateGame(gameId, updateData) {
    const game = await this.repository.findById(gameId);
    if (!game) {
      throw new NotFoundError('Game not found');
    }

    await game.update(updateData);
    return game;
  }

  /**
   * Delete game
   * @param {string} gameId - Game ID
   * @returns {Promise<boolean>} Deletion result
   */
  async deleteGame(gameId) {
    return this.repository.delete(gameId);
  }

  /**
   * Start game session for student
   * @param {string} studentId - Student ID
   * @param {string} gameId - Game ID
   * @param {number} level - Starting level
   * @returns {Promise<Object>} Game session
   */
  async startGameSession(studentId, gameId, level = 1) {
    const game = await this.repository.findById(gameId);
    if (!game) {
      throw new NotFoundError('Game not found');
    }

    const session = await GameSession.create({
      studentId,
      gameId,
      level,
      startedAt: new Date()
    });

    Logger.info(`Game session started: ${session.id}`);
    return session;
  }

  /**
   * End game session
   * @param {string} sessionId - Session ID
   * @param {Object} sessionData - Session completion data
   * @returns {Promise<Object>} Completed session
   */
  async endGameSession(sessionId, sessionData) {
    const session = await GameSession.findByPk(sessionId);
    if (!session) {
      throw new NotFoundError('Game session not found');
    }

    const game = await this.repository.findById(session.gameId);

    await session.update({
      score: sessionData.score,
      timeSpent: sessionData.timeSpent,
      gameData: sessionData.gameData || {},
      isCompleted: true,
      endedAt: new Date(),
      pointsEarned: game?.pointsReward || 5
    });

    // Update student statistics
    const student = await studentRepository.findById(session.studentId);
    if (student) {
      await studentRepository.incrementGamesPlayed(session.studentId);
      await studentRepository.addPoints(session.studentId, session.pointsEarned);
      await studentRepository.updateAverageScore(session.studentId, sessionData.score);
      await student.updateStreak();
    }

    // Update game statistics
    await this.repository.incrementPlays(session.gameId);
    await this.repository.updateAverageScore(session.gameId, sessionData.score);

    Logger.info(`Game session completed: ${sessionId}`);
    return session;
  }

  /**
   * Get student's game sessions
   * @param {string} studentId - Student ID
   * @param {string} gameId - Optional game ID filter
   * @returns {Promise<Array>} Game sessions
   */
  async getStudentGameSessions(studentId, gameId = null) {
    const where = { studentId };
    if (gameId) {
      where.gameId = gameId;
    }

    return GameSession.findAll({
      where,
      include: ['game'],
      order: [['createdAt', 'DESC']]
    });
  }

  /**
   * Get game session by ID
   * @param {string} sessionId - Session ID
   * @returns {Promise<Object>} Game session
   */
  async getGameSession(sessionId) {
    const session = await GameSession.findByPk(sessionId, {
      include: ['game', 'student']
    });
    
    if (!session) {
      throw new NotFoundError('Game session not found');
    }
    
    return session;
  }
}

export default new GameService();
