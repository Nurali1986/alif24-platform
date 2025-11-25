import { BaseRepository } from '../core/base/index.js';
import { Game, Subject } from '../models/index.js';

/**
 * Game Repository
 * Data access layer for Game model
 */
class GameRepository extends BaseRepository {
  constructor() {
    super(Game);
  }

  /**
   * Find games by subject
   * @param {string} subjectId - Subject ID
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of games
   */
  async findBySubject(subjectId, options = {}) {
    return this.model.findAll({
      where: { subjectId, isActive: true },
      ...options
    });
  }

  /**
   * Find games by type
   * @param {string} type - Game type
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of games
   */
  async findByType(type, options = {}) {
    return this.model.findAll({
      where: { type, isActive: true },
      ...options
    });
  }

  /**
   * Find games suitable for age
   * @param {number} age - Student age
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of suitable games
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
   * Find game with details
   * @param {string} id - Game ID
   * @returns {Promise<Object|null>} Game with details
   */
  async findWithDetails(id) {
    return this.model.findByPk(id, {
      include: [{ model: Subject, as: 'subject' }]
    });
  }

  /**
   * Search games with filters
   * @param {Object} filters - Search filters
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise<Object>} Paginated results
   */
  async searchGames(filters, page = 1, limit = 10) {
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
      include: [{ model: Subject, as: 'subject' }]
    });
  }

  /**
   * Increment play count
   * @param {string} gameId - Game ID
   * @returns {Promise<Object>} Updated game
   */
  async incrementPlays(gameId) {
    const game = await this.findById(gameId);
    if (!game) return null;
    
    game.totalPlays += 1;
    await game.save();
    return game;
  }

  /**
   * Update average score
   * @param {string} gameId - Game ID
   * @param {number} newScore - New score
   * @returns {Promise<Object>} Updated game
   */
  async updateAverageScore(gameId, newScore) {
    const game = await this.findById(gameId);
    if (!game) return null;
    
    if (game.totalPlays === 0) {
      game.averageScore = newScore;
    } else {
      game.averageScore = ((game.averageScore * game.totalPlays) + newScore) / (game.totalPlays + 1);
    }
    
    await game.save();
    return game;
  }
}

export default new GameRepository();
