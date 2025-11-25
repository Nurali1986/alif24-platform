import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * Subject Model
 * Educational subjects/topics
 */
const Subject = sequelize.define('subjects', {
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
  color: {
    type: DataTypes.STRING(20),
    defaultValue: '#4A90A4'
  },
  order: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  },
  ageRange: {
    type: DataTypes.JSONB,
    defaultValue: { min: 4, max: 7 },
    field: 'age_range'
  }
}, {
  timestamps: true
});

export default Subject;
