import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * Lesson Model
 * Educational lessons for students
 */
const Lesson = sequelize.define('lessons', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  subjectId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'subject_id',
    references: {
      model: 'subjects',
      key: 'id'
    }
  },
  teacherId: {
    type: DataTypes.UUID,
    allowNull: true,
    field: 'teacher_id',
    references: {
      model: 'teachers',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  titleUz: {
    type: DataTypes.STRING(200),
    allowNull: false,
    field: 'title_uz'
  },
  titleRu: {
    type: DataTypes.STRING(200),
    allowNull: false,
    field: 'title_ru'
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
  content: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  type: {
    type: DataTypes.ENUM('video', 'interactive', 'reading', 'quiz', 'activity'),
    defaultValue: 'interactive'
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
  duration: {
    type: DataTypes.INTEGER,
    defaultValue: 15 // minutes
  },
  pointsReward: {
    type: DataTypes.INTEGER,
    defaultValue: 10,
    field: 'points_reward'
  },
  thumbnail: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  videoUrl: {
    type: DataTypes.STRING(500),
    allowNull: true,
    field: 'video_url'
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
  isAiGenerated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_ai_generated'
  },
  totalCompletions: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'total_completions'
  },
  averageRating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    field: 'average_rating'
  }
}, {
  timestamps: true,
  paranoid: true
});

export default Lesson;
