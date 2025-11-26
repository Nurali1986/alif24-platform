import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * Progress Model
 * Tracks student progress in lessons
 */
const Progress = sequelize.define('progress', {
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
  lessonId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'lesson_id',
    references: {
      model: 'lessons',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('not_started', 'in_progress', 'completed'),
    defaultValue: 'not_started'
  },
  score: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100
    }
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
  attempts: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'completed_at'
  },
  answers: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  feedback: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['student_id', 'lesson_id']
    }
  ]
});

export default Progress;
