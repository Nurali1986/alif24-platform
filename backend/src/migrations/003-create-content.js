'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create subjects table
    await queryInterface.createTable('subjects', {
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
      color: {
        type: Sequelize.STRING(20),
        defaultValue: '#4A90A4'
      },
      "order": {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      age_range: {
        type: Sequelize.JSONB,
        defaultValue: { min: 4, max: 7 }
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

    // Create lessons table
    await queryInterface.createTable('lessons', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      subject_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'subjects',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      teacher_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'teachers',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      title: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      title_uz: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      title_ru: {
        type: Sequelize.STRING(200),
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
      content: {
        type: Sequelize.JSONB,
        defaultValue: {}
      },
      type: {
        type: Sequelize.ENUM('video', 'interactive', 'reading', 'quiz', 'activity'),
        defaultValue: 'interactive'
      },
      level: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      age_min: {
        type: Sequelize.INTEGER,
        defaultValue: 4
      },
      age_max: {
        type: Sequelize.INTEGER,
        defaultValue: 7
      },
      duration: {
        type: Sequelize.INTEGER,
        defaultValue: 15
      },
      points_reward: {
        type: Sequelize.INTEGER,
        defaultValue: 10
      },
      thumbnail: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      video_url: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      "order": {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      is_ai_generated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      total_completions: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      average_rating: {
        type: Sequelize.FLOAT,
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
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });

    // Create games table
    await queryInterface.createTable('games', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      subject_id: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'subjects',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      name: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      name_uz: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
      name_ru: {
        type: Sequelize.STRING(200),
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
      type: {
        type: Sequelize.ENUM('puzzle', 'memory', 'matching', 'quiz', 'adventure', 'counting', 'spelling'),
        defaultValue: 'puzzle'
      },
      level: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      age_min: {
        type: Sequelize.INTEGER,
        defaultValue: 4
      },
      age_max: {
        type: Sequelize.INTEGER,
        defaultValue: 7
      },
      config: {
        type: Sequelize.JSONB,
        defaultValue: {}
      },
      thumbnail: {
        type: Sequelize.STRING(500),
        allowNull: true
      },
      points_reward: {
        type: Sequelize.INTEGER,
        defaultValue: 5
      },
      time_limit: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      total_plays: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      average_score: {
        type: Sequelize.FLOAT,
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

    // Create indexes
    await queryInterface.addIndex('subjects', ['is_active']);
    await queryInterface.addIndex('lessons', ['subject_id']);
    await queryInterface.addIndex('lessons', ['level']);
    await queryInterface.addIndex('lessons', ['is_active']);
    await queryInterface.addIndex('games', ['subject_id']);
    await queryInterface.addIndex('games', ['type']);
    await queryInterface.addIndex('games', ['is_active']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('games');
    await queryInterface.dropTable('lessons');
    await queryInterface.dropTable('subjects');
  }
};
