import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * ParentStudent Model
 * Links parents to their children (students)
 */
const ParentStudent = sequelize.define('parent_students', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  parentId: {
    type: DataTypes.UUID,
    allowNull: false,
    field: 'parent_id',
    references: {
      model: 'parents',
      key: 'id'
    }
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
  relationship: {
    type: DataTypes.ENUM('mother', 'father', 'guardian', 'other'),
    defaultValue: 'guardian'
  },
  isPrimary: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_primary'
  }
}, {
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['parent_id', 'student_id']
    }
  ]
});

export default ParentStudent;
