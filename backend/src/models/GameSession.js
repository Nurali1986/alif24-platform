import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * GameSession Model
 * Tracks student game sessions
 */
const GameSession = sequelize.define('game_sessions', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  studentId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'student_id',
    references: {
      model: 'students',
      key: 'id'
    }
  },
  gameId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'game_id',
    references: {
      model: 'games',
      key: 'id'
    }
  },
  score: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  pointsEarned: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'points_earned'
  },
  timeSpent: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // seconds
    field: 'time_spent'
  },
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_completed'
  },
  gameData: {
    type: DataTypes.JSONB,
    defaultValue: {},
    field: 'game_data'
  },
  startedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'started_at'
  },
  endedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'ended_at'
  }
}, {
  timestamps: true
});

export default GameSession;
