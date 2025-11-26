'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create students table
    await queryInterface.createTable('students', {
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
      date_of_birth: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      grade: {
        type: Sequelize.STRING(50),
        allowNull: true
      },
      level: {
        type: Sequelize.INTEGER,
        defaultValue: 1
      },
      total_points: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_lessons_completed: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_games_played: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      average_score: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      current_streak: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      longest_streak: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      last_activity_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      preferences: {
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

    // Create teachers table
    await queryInterface.createTable('teachers', {
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
      specialization: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      qualification: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      years_of_experience: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      bio: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      subjects: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: []
      },
      total_students: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      total_lessons_created: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      is_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      verification_documents: {
        type: Sequelize.JSONB,
        defaultValue: []
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

    // Create parents table
    await queryInterface.createTable('parents', {
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
      occupation: {
        type: Sequelize.STRING(200),
        allowNull: true
      },
      notification_preferences: {
        type: Sequelize.JSONB,
        defaultValue: {}
      },
      screen_time_limit: {
        type: Sequelize.INTEGER,
        defaultValue: 60
      },
      allowed_time_slots: {
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

    // Create parent_students junction table
    await queryInterface.createTable('parent_students', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
      },
      parent_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'parents',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
      relationship: {
        type: Sequelize.ENUM('mother', 'father', 'guardian', 'other'),
        defaultValue: 'guardian'
      },
      is_primary: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.addIndex('students', ['user_id']);
    await queryInterface.addIndex('students', ['level']);
    await queryInterface.addIndex('teachers', ['user_id']);
    await queryInterface.addIndex('parents', ['user_id']);
    await queryInterface.addIndex('parent_students', ['parent_id', 'student_id'], { unique: true });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('parent_students');
    await queryInterface.dropTable('parents');
    await queryInterface.dropTable('teachers');
    await queryInterface.dropTable('students');
  }
};
