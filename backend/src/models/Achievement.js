import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * Achievement Model
 * Badges and achievements for students
 */
const Achievement = sequelize.define('achievements', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  nameUz: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'name_uz'
  },
  nameRu: {
    type: DataTypes.STRING(100),
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
  icon: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  type: {
    type: DataTypes.ENUM('badge', 'trophy', 'certificate', 'milestone'),
    defaultValue: 'badge'
  },
  category: {
    type: DataTypes.ENUM('learning', 'streak', 'social', 'game', 'special'),
    defaultValue: 'learning'
  },
  criteria: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  pointsReward: {
    type: DataTypes.INTEGER,
    defaultValue: 50,
    field: 'points_reward'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true
});

export default Achievement;
