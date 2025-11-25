import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

/**
 * Notification Model
 * System and user notifications
 */
const Notification = sequelize.define('notifications', {
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
  type: {
    type: DataTypes.ENUM('achievement', 'reminder', 'update', 'alert', 'message'),
    defaultValue: 'update'
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  titleUz: {
    type: DataTypes.STRING(200),
    allowNull: true,
    field: 'title_uz'
  },
  titleRu: {
    type: DataTypes.STRING(200),
    allowNull: true,
    field: 'title_ru'
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  messageUz: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'message_uz'
  },
  messageRu: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'message_ru'
  },
  data: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: 'is_read'
  },
  readAt: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'read_at'
  }
}, {
  timestamps: true
});

export default Notification;
