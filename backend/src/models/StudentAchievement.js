import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * StudentAchievement Model
 * Links students to earned achievements
 */
const StudentAchievement = sequelize.define('student_achievements', {
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
  achievementId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'achievement_id',
    references: {
      model: 'achievements',
      key: 'id'
    }
  },
  earnedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'earned_at'
  },
  progress: {
    type: DataTypes.JSONB,
    defaultValue: {}
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['student_id', 'achievement_id']
    }
  ]
});

export default StudentAchievement;
