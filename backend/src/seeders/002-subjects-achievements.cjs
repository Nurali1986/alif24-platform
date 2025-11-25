'use strict';

const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    const now = new Date();

    // Create subjects
    const subjects = [
      {
        id: uuidv4(),
        name: 'Mathematics',
        name_uz: 'Matematika',
        name_ru: 'Математика',
        description: 'Basic math concepts for young learners',
        description_uz: 'Kichkintoylar uchun asosiy matematika tushunchalari',
        description_ru: 'Основные математические понятия для маленьких детей',
        icon: '🔢',
        color: '#FF6B6B',
        order: 1,
        is_active: true,
        age_range: JSON.stringify({ min: 4, max: 7 }),
        created_at: now,
        updated_at: now
      },
      {
        id: uuidv4(),
        name: 'Alphabet',
        name_uz: 'Alifbo',
        name_ru: 'Алфавит',
        description: 'Learn letters and basic reading',
        description_uz: 'Harflar va asosiy o\'qishni o\'rganish',
        description_ru: 'Изучение букв и основ чтения',
        icon: '📖',
        color: '#4ECDC4',
        order: 2,
        is_active: true,
        age_range: JSON.stringify({ min: 4, max: 7 }),
        created_at: now,
        updated_at: now
      },
      {
        id: uuidv4(),
        name: 'Colors & Shapes',
        name_uz: 'Ranglar va shakllar',
        name_ru: 'Цвета и формы',
        description: 'Recognize colors and shapes',
        description_uz: 'Ranglar va shaklarni tanish',
        description_ru: 'Распознавание цветов и форм',
        icon: '🎨',
        color: '#95E1D3',
        order: 3,
        is_active: true,
        age_range: JSON.stringify({ min: 4, max: 6 }),
        created_at: now,
        updated_at: now
      },
      {
        id: uuidv4(),
        name: 'Nature',
        name_uz: 'Tabiat',
        name_ru: 'Природа',
        description: 'Explore the natural world',
        description_uz: 'Tabiat dunyosini o\'rganing',
        description_ru: 'Изучение природы',
        icon: '🌿',
        color: '#A8E6CE',
        order: 4,
        is_active: true,
        age_range: JSON.stringify({ min: 4, max: 7 }),
        created_at: now,
        updated_at: now
      },
      {
        id: uuidv4(),
        name: 'Animals',
        name_uz: 'Hayvonlar',
        name_ru: 'Животные',
        description: 'Learn about different animals',
        description_uz: 'Turli hayvonlar haqida o\'rganish',
        description_ru: 'Изучение различных животных',
        icon: '🦁',
        color: '#FFEAA7',
        order: 5,
        is_active: true,
        age_range: JSON.stringify({ min: 4, max: 7 }),
        created_at: now,
        updated_at: now
      },
      {
        id: uuidv4(),
        name: 'Music',
        name_uz: 'Musiqa',
        name_ru: 'Музыка',
        description: 'Musical activities and songs',
        description_uz: 'Musiqiy mashg\'ulotlar va qo\'shiqlar',
        description_ru: 'Музыкальные занятия и песни',
        icon: '🎵',
        color: '#DDA0DD',
        order: 6,
        is_active: true,
        age_range: JSON.stringify({ min: 4, max: 7 }),
        created_at: now,
        updated_at: now
      }
    ];

    await queryInterface.bulkInsert('subjects', subjects);

    // Create achievements
    const achievements = [
      {
        id: uuidv4(),
        name: 'First Steps',
        name_uz: 'Birinchi qadamlar',
        name_ru: 'Первые шаги',
        description: 'Complete your first lesson',
        description_uz: 'Birinchi darsni yakunlang',
        description_ru: 'Завершите свой первый урок',
        icon: '🌟',
        type: 'badge',
        category: 'learning',
        criteria: JSON.stringify({ lessonsCompleted: 1 }),
        points_reward: 50,
        is_active: true,
        order: 1,
        created_at: now,
        updated_at: now
      },
      {
        id: uuidv4(),
        name: 'Curious Explorer',
        name_uz: 'Qiziquvchan kashfiyotchi',
        name_ru: 'Любознательный исследователь',
        description: 'Complete 10 lessons',
        description_uz: '10 ta darsni yakunlang',
        description_ru: 'Завершите 10 уроков',
        icon: '🔭',
        type: 'badge',
        category: 'learning',
        criteria: JSON.stringify({ lessonsCompleted: 10 }),
        points_reward: 100,
        is_active: true,
        order: 2,
        created_at: now,
        updated_at: now
      },
      {
        id: uuidv4(),
        name: 'Super Learner',
        name_uz: 'Super o\'rganuvchi',
        name_ru: 'Супер ученик',
        description: 'Score 100% on any lesson',
        description_uz: 'Istalgan darsda 100% to\'plang',
        description_ru: 'Получите 100% на любом уроке',
        icon: '🏆',
        type: 'trophy',
        category: 'learning',
        criteria: JSON.stringify({ perfectScore: true }),
        points_reward: 150,
        is_active: true,
        order: 3,
        created_at: now,
        updated_at: now
      },
      {
        id: uuidv4(),
        name: 'Game Master',
        name_uz: 'O\'yin ustasi',
        name_ru: 'Мастер игр',
        description: 'Play 20 games',
        description_uz: '20 ta o\'yin o\'ynang',
        description_ru: 'Сыграйте 20 игр',
        icon: '🎮',
        type: 'badge',
        category: 'game',
        criteria: JSON.stringify({ gamesPlayed: 20 }),
        points_reward: 100,
        is_active: true,
        order: 4,
        created_at: now,
        updated_at: now
      },
      {
        id: uuidv4(),
        name: 'Week Warrior',
        name_uz: 'Haftalik jangchi',
        name_ru: 'Недельный воин',
        description: 'Maintain a 7-day learning streak',
        description_uz: '7 kunlik o\'qish silsilasini saqlang',
        description_ru: 'Поддерживайте 7-дневную серию обучения',
        icon: '🔥',
        type: 'badge',
        category: 'streak',
        criteria: JSON.stringify({ streakDays: 7 }),
        points_reward: 200,
        is_active: true,
        order: 5,
        created_at: now,
        updated_at: now
      },
      {
        id: uuidv4(),
        name: 'Math Wizard',
        name_uz: 'Matematika sehrgari',
        name_ru: 'Математический волшебник',
        description: 'Complete all math lessons',
        description_uz: 'Barcha matematika darslarini yakunlang',
        description_ru: 'Завершите все уроки математики',
        icon: '🧙‍♂️',
        type: 'trophy',
        category: 'special',
        criteria: JSON.stringify({ subjectCompleted: 'Mathematics' }),
        points_reward: 500,
        is_active: true,
        order: 6,
        created_at: now,
        updated_at: now
      }
    ];

    await queryInterface.bulkInsert('achievements', achievements);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('achievements', null, {});
    await queryInterface.bulkDelete('subjects', null, {});
  }
};
