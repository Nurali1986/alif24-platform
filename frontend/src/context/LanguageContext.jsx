import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

const translations = {
  uz: {
    // Common
    welcome: "Xush kelibsiz",
    login: "Kirish",
    logout: "Chiqish",
    register: "Ro'yxatdan o'tish",
    email: "Elektron pochta",
    password: "Parol",
    confirmPassword: "Parolni tasdiqlang",
    firstName: "Ism",
    lastName: "Familiya",
    submit: "Yuborish",
    cancel: "Bekor qilish",
    save: "Saqlash",
    loading: "Yuklanmoqda...",
    error: "Xato",
    success: "Muvaffaqiyat",
    
    // Navigation
    home: "Bosh sahifa",
    lessons: "Darslar",
    games: "O'yinlar",
    progress: "Rivojlanish",
    profile: "Profil",
    settings: "Sozlamalar",
    
    // Student
    myLessons: "Mening darslarim",
    myGames: "Mening o'yinlarim",
    myAchievements: "Mening yutuqlarim",
    points: "Ballar",
    level: "Daraja",
    streak: "Kunlik silsila",
    
    // Parent
    myChildren: "Bolalarim",
    childProgress: "Bolaning rivojlanishi",
    screenTime: "Ekran vaqti",
    
    // Teacher
    myStudents: "O'quvchilarim",
    createLesson: "Dars yaratish",
    createGame: "O'yin yaratish",
    
    // Messages
    loginSuccess: "Muvaffaqiyatli kirdingiz",
    registerSuccess: "Ro'yxatdan muvaffaqiyatli o'tdingiz",
    lessonCompleted: "Dars yakunlandi!",
    achievementEarned: "Yangi yutuq qo'lga kiritildi!",
    
    // Errors
    invalidCredentials: "Email yoki parol noto'g'ri",
    networkError: "Tarmoq xatosi",
    sessionExpired: "Sessiya muddati tugadi"
  },
  ru: {
    // Common
    welcome: "Добро пожаловать",
    login: "Войти",
    logout: "Выйти",
    register: "Регистрация",
    email: "Электронная почта",
    password: "Пароль",
    confirmPassword: "Подтвердите пароль",
    firstName: "Имя",
    lastName: "Фамилия",
    submit: "Отправить",
    cancel: "Отмена",
    save: "Сохранить",
    loading: "Загрузка...",
    error: "Ошибка",
    success: "Успешно",
    
    // Navigation
    home: "Главная",
    lessons: "Уроки",
    games: "Игры",
    progress: "Прогресс",
    profile: "Профиль",
    settings: "Настройки",
    
    // Student
    myLessons: "Мои уроки",
    myGames: "Мои игры",
    myAchievements: "Мои достижения",
    points: "Баллы",
    level: "Уровень",
    streak: "Серия дней",
    
    // Parent
    myChildren: "Мои дети",
    childProgress: "Прогресс ребенка",
    screenTime: "Экранное время",
    
    // Teacher
    myStudents: "Мои ученики",
    createLesson: "Создать урок",
    createGame: "Создать игру",
    
    // Messages
    loginSuccess: "Вход выполнен успешно",
    registerSuccess: "Регистрация прошла успешно",
    lessonCompleted: "Урок завершен!",
    achievementEarned: "Получено новое достижение!",
    
    // Errors
    invalidCredentials: "Неверный email или пароль",
    networkError: "Ошибка сети",
    sessionExpired: "Сессия истекла"
  }
};

/**
 * Language Provider
 * Manages language state and translations
 */
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'uz';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  /**
   * Get translation by key
   * @param {string} key - Translation key
   * @returns {string} Translated text
   */
  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  /**
   * Switch language
   * @param {string} lang - Language code ('uz' or 'ru')
   */
  const switchLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  const value = {
    language,
    t,
    switchLanguage,
    availableLanguages: ['uz', 'ru']
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

/**
 * Hook to use language context
 */
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
