import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * Parent Model
 * Extended profile for parent users
 */
const Parent = sequelize.define('parents', {
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
  occupation: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  notificationPreferences: {
    type: DataTypes.JSONB,
    defaultValue: {
      email: true,
      push: true,
      sms: false,
      weeklyReport: true,
      achievementAlerts: true
    },
    field: 'notification_preferences'
  },
  screenTimeLimit: {
    type: DataTypes.INTEGER,
    defaultValue: 60, // minutes per day
    field: 'screen_time_limit'
  },
  allowedTimeSlots: {
    type: DataTypes.JSONB,
    defaultValue: {
      weekdays: { start: '15:00', end: '19:00' },
      weekends: { start: '09:00', end: '20:00' }
    },
    field: 'allowed_time_slots'
  }
}, {
  timestamps: true
});

export default Parent;
