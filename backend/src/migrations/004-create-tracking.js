'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create progress table
    await queryInterface.createTable('progress', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      student_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'students',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      lesson_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'lessons',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      status: {
        type: Sequelize.ENUM('not_started', 'in_progress', 'completed'),
        defaultValue: 'not_started'
      },
      score: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      points_earned: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      time_spent: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      attempts: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      completed_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      answers: {
        type: Sequelize.JSONB,
        defaultValue: []
      },
      feedback: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create game_sessions table
    await queryInterface.createTable('game_sessions', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      student_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'students',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      game_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'games',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      score: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      points_earned: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      time_spent: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      level: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      is_completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      game_data: {
        type: Sequelize.JSONB,
        defaultValue: {}
      },
      started_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      ended_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create achievements table
    await queryInterface.createTable('achievements', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      name_uz: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      name_ru: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      description_uz: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      description_ru: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      icon: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      type: {
        type: Sequelize.ENUM('badge', 'trophy', 'certificate', 'milestone'),
        defaultValue: 'badge'
      },
      category: {
        type: Sequelize.ENUM('learning', 'streak', 'social', 'game', 'special'),
        defaultValue: 'learning'
      },
      criteria: {
        type: Sequelize.JSONB,
        defaultValue: {}
      },
      points_reward: {
        type: Sequelize.INTEGER,
        defaultValue: 50
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      "order": {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create student_achievements junction table
    await queryInterface.createTable('student_achievements', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      student_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'students',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      achievement_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'achievements',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      earned_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      progress: {
        type: Sequelize.JSONB,
        defaultValue: {}
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create notifications table
    await queryInterface.createTable('notifications', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.ENUM('achievement', 'reminder', 'update', 'alert', 'message'),
        defaultValue: 'update'
      },
      title: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      title_uz: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      title_ru: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      message_uz: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      message_ru: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      data: {
        type: Sequelize.JSONB,
        defaultValue: {}
      },
      is_read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      read_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // Create indexes
    await queryInterface.addIndex('progress', ['student_id', 'lesson_id'], { unique: true });
    await queryInterface.addIndex('progress', ['status']);
    await queryInterface.addIndex('game_sessions', ['student_id']);
    await queryInterface.addIndex('game_sessions', ['game_id']);
    await queryInterface.addIndex('achievements', ['type']);
    await queryInterface.addIndex('achievements', ['category']);
    await queryInterface.addIndex('student_achievements', ['student_id', 'achievement_id'], { unique: true });
    await queryInterface.addIndex('notifications', ['user_id']);
    await queryInterface.addIndex('notifications', ['is_read']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('notifications');
    await queryInterface.dropTable('student_achievements');
    await queryInterface.dropTable('achievements');
    await queryInterface.dropTable('game_sessions');
    await queryInterface.dropTable('progress');
  }
};
