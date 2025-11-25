import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * Student Model
 * Extended profile for student users (children aged 4-7)
 */
const Student = sequelize.define('students', {
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
  dateOfBirth: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    field: 'date_of_birth'
  },
  grade: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  level: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    validate: {
      min: 1,
      max: 10
    }
  },
  totalPoints: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'total_points'
  },
  totalLessonsCompleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'total_lessons_completed'
  },
  totalGamesPlayed: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'total_games_played'
  },
  averageScore: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
    field: 'average_score'
  },
  currentStreak: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'current_streak'
  },
  longestStreak: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    field: 'longest_streak'
  },
  lastActivityAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'last_activity_at'
  },
  preferences: {
    type: DataTypes.JSONB,
    defaultValue: {
      favoriteSubjects: [],
      learningStyle: 'visual',
      soundEnabled: true,
      animationsEnabled: true
    }
  }
}, {
  timestamps: true
});

/**
 * Calculate age from date of birth
 * @returns {number} Age in years
 */
Student.prototype.getAge = function() {
  const today = new Date();
  const birthDate = new Date(this.dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

/**
 * Update streak
 */
Student.prototype.updateStreak = async function() {
  const now = new Date();
  const lastActivity = this.lastActivityAt ? new Date(this.lastActivityAt) : null;
  
  if (lastActivity) {
    const diffDays = Math.floor((now - lastActivity) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) {
      this.currentStreak += 1;
      if (this.currentStreak > this.longestStreak) {
        this.longestStreak = this.currentStreak;
      }
    } else if (diffDays > 1) {
      this.currentStreak = 1;
    }
  } else {
    this.currentStreak = 1;
  }
  
  this.lastActivityAt = now;
  await this.save();
};

export default Student;
