'use strict';

const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const hashedPassword = await bcrypt.hash('Admin123!', 10);
    const now = new Date();

    // Create admin user
    const adminId = uuidv4();
    await queryInterface.bulkInsert('users', [{
      id: adminId,
      email: 'admin@alif24.uz',
      password: hashedPassword,
      first_name: 'Admin',
      last_name: 'User',
      role: 'admin',
      language: 'uz',
      is_active: true,
      is_verified: true,
      created_at: now,
      updated_at: now
    }]);

    // Create sample teacher
    const teacherId = uuidv4();
    const teacherUserId = uuidv4();
    await queryInterface.bulkInsert('users', [{
      id: teacherUserId,
      email: 'teacher@alif24.uz',
      password: hashedPassword,
      first_name: 'Malika',
      last_name: 'Karimova',
      role: 'teacher',
      language: 'uz',
      is_active: true,
      is_verified: true,
      created_at: now,
      updated_at: now
    }]);

    await queryInterface.bulkInsert('teachers', [{
      id: teacherId,
      user_id: teacherUserId,
      specialization: 'Early Childhood Education',
      qualification: 'Bachelor in Education',
      years_of_experience: 5,
      bio: 'Passionate educator with 5 years of experience teaching young children.',
      subjects: ['Math', 'Reading', 'Science'],
      is_verified: true,
      created_at: now,
      updated_at: now
    }]);

    // Create sample parent
    const parentId = uuidv4();
    const parentUserId = uuidv4();
    await queryInterface.bulkInsert('users', [{
      id: parentUserId,
      email: 'parent@alif24.uz',
      password: hashedPassword,
      first_name: 'Bobur',
      last_name: 'Alimov',
      phone: '+998901234567',
      role: 'parent',
      language: 'uz',
      is_active: true,
      is_verified: true,
      created_at: now,
      updated_at: now
    }]);

    await queryInterface.bulkInsert('parents', [{
      id: parentId,
      user_id: parentUserId,
      occupation: 'Engineer',
      notification_preferences: JSON.stringify({
        email: true,
        push: true,
        sms: false,
        weeklyReport: true
      }),
      screen_time_limit: 60,
      allowed_time_slots: JSON.stringify({
        weekdays: { start: '15:00', end: '19:00' },
        weekends: { start: '09:00', end: '20:00' }
      }),
      created_at: now,
      updated_at: now
    }]);

    // Create sample student
    const studentId = uuidv4();
    const studentUserId = uuidv4();
    await queryInterface.bulkInsert('users', [{
      id: studentUserId,
      email: 'student@alif24.uz',
      password: hashedPassword,
      first_name: 'Amir',
      last_name: 'Alimov',
      role: 'student',
      language: 'uz',
      is_active: true,
      is_verified: true,
      created_at: now,
      updated_at: now
    }]);

    await queryInterface.bulkInsert('students', [{
      id: studentId,
      user_id: studentUserId,
      date_of_birth: '2019-03-15',
      grade: 'Pre-K',
      level: 1,
      total_points: 0,
      total_lessons_completed: 0,
      total_games_played: 0,
      average_score: 0,
      current_streak: 0,
      longest_streak: 0,
      preferences: JSON.stringify({
        favoriteSubjects: [],
        learningStyle: 'visual',
        soundEnabled: true,
        animationsEnabled: true
      }),
      created_at: now,
      updated_at: now
    }]);

    // Link parent to student
    await queryInterface.bulkInsert('parent_students', [{
      id: uuidv4(),
      parent_id: parentId,
      student_id: studentId,
      relationship: 'father',
      is_primary: true,
      created_at: now,
      updated_at: now
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('parent_students', null, {});
    await queryInterface.bulkDelete('students', null, {});
    await queryInterface.bulkDelete('parents', null, {});
    await queryInterface.bulkDelete('teachers', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
