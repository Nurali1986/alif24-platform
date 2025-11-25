import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * Teacher Model
 * Extended profile for teacher users
 */
const Teacher = sequelize.define('teachers', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'user_id',
    references: {
      model: 'users',
      key: 'id'
    }
  },
  specialization: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  qualification: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  yearsOfExperience: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'years_of_experience'
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  subjects: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  totalStudents: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'total_students'
  },
  totalLessonsCreated: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'total_lessons_created'
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 5
    }
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_verified'
  },
  verificationDocuments: {
    type: DataTypes.JSONB,
    defaultValue: [],
    field: 'verification_documents'
  }
}, {
  timestamps: true
});

export default Teacher;
