import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import bcrypt from 'bcryptjs';

/**
 * User Model
 * Base user model for all user types (student, teacher, parent, admin)
 */
const User = sequelize.define('users', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'first_name'
  },
  lastName: {
    type: DataTypes.STRING(100),
    allowNull: false,
    field: 'last_name'
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM('student', 'teacher', 'parent', 'admin'),
    allowNull: false,
    defaultValue: 'student'
  },
  avatar: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  language: {
    type: DataTypes.ENUM('uz', 'ru'),
    defaultValue: 'uz'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    field: 'is_active'
  },
  isVerified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_verified'
  },
  lastLoginAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'last_login_at'
  },
  refreshToken: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'refresh_token'
  }
}, {
  timestamps: true,
  paranoid: true, // Soft delete
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

/**
 * Compare password
 * @param {string} candidatePassword - Password to compare
 * @returns {Promise<boolean>} Match result
 */
User.prototype.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

/**
 * Get full name
 * @returns {string} Full name
 */
User.prototype.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

/**
 * To JSON - exclude sensitive fields
 */
User.prototype.toJSON = function() {
  const values = { ...this.get() };
  delete values.password;
  delete values.refreshToken;
  return values;
};

export default User;
