import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * Game Model
 * Educational games for students
 */
const Game = sequelize.define('games', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  subjectId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'subject_id',
    references: {
      model: 'subjects',
      key: 'id'
    }
  },
  name: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  nameUz: {
    type: DataTypes.STRING(200),
    allowNull: false,
    field: 'name_uz'
  },
  nameRu: {
    type: DataTypes.STRING(200),
    allowNull: false,
    field: 'name_ru'
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  descriptionUz: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'description_uz'
  },
  descriptionRu: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'description_ru'
  },
  type: {
    type: DataTypes.ENUM('puzzle', 'memory', 'matching', 'quiz', 'adventure', 'counting', 'spelling'),
    defaultValue: 'puzzle'
  },
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 10
    }
  },
  ageMin: {
    type: DataTypes.INTEGER,
    defaultValue: 4,
    field: 'age_min'
  },
  ageMax: {
    type: DataTypes.INTEGER,
    defaultValue: 7,
    field: 'age_max'
  },
  config: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  thumbnail: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  pointsReward: {
    type: DataTypes.INTEGER,
    defaultValue: 5,
    field: 'points_reward'
  },
  timeLimit: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // 0 = no limit
    field: 'time_limit'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  },
  totalPlays: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'total_plays'
  },
  averageScore: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    field: 'average_score'
  }
}, {
  timestamps: true
});

export default Game;
