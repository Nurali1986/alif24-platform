import User from './User.js';
import Student from './Student.js';
import Teacher from './Teacher.js';
import Parent from './Parent.js';
import ParentStudent from './ParentStudent.js';
import Subject from './Subject.js';
import Lesson from './Lesson.js';
import Game from './Game.js';
import Progress from './Progress.js';
import GameSession from './GameSession.js';
import Achievement from './Achievement.js';
import StudentAchievement from './StudentAchievement.js';
import Notification from './Notification.js';

/**
 * Define Model Associations
 */

// User <-> Student (one-to-one)
User.hasOne(Student, { foreignKey: 'userId', as: 'studentProfile' });
Student.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User <-> Teacher (one-to-one)
User.hasOne(Teacher, { foreignKey: 'userId', as: 'teacherProfile' });
Teacher.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// User <-> Parent (one-to-one)
User.hasOne(Parent, { foreignKey: 'userId', as: 'parentProfile' });
Parent.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Parent <-> Student (many-to-many)
Parent.belongsToMany(Student, { 
  through: ParentStudent, 
  foreignKey: 'parentId', 
  otherKey: 'studentId',
  as: 'children' 
});
Student.belongsToMany(Parent, { 
  through: ParentStudent, 
  foreignKey: 'studentId', 
  otherKey: 'parentId',
  as: 'parents' 
});

// Subject <-> Lesson (one-to-many)
Subject.hasMany(Lesson, { foreignKey: 'subjectId', as: 'lessons' });
Lesson.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' });

// Teacher <-> Lesson (one-to-many)
Teacher.hasMany(Lesson, { foreignKey: 'teacherId', as: 'lessons' });
Lesson.belongsTo(Teacher, { foreignKey: 'teacherId', as: 'teacher' });

// Subject <-> Game (one-to-many)
Subject.hasMany(Game, { foreignKey: 'subjectId', as: 'games' });
Game.belongsTo(Subject, { foreignKey: 'subjectId', as: 'subject' });

// Student <-> Progress (one-to-many)
Student.hasMany(Progress, { foreignKey: 'studentId', as: 'progress' });
Progress.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });

// Lesson <-> Progress (one-to-many)
Lesson.hasMany(Progress, { foreignKey: 'lessonId', as: 'studentProgress' });
Progress.belongsTo(Lesson, { foreignKey: 'lessonId', as: 'lesson' });

// Student <-> GameSession (one-to-many)
Student.hasMany(GameSession, { foreignKey: 'studentId', as: 'gameSessions' });
GameSession.belongsTo(Student, { foreignKey: 'studentId', as: 'student' });

// Game <-> GameSession (one-to-many)
Game.hasMany(GameSession, { foreignKey: 'gameId', as: 'sessions' });
GameSession.belongsTo(Game, { foreignKey: 'gameId', as: 'game' });

// Student <-> Achievement (many-to-many)
Student.belongsToMany(Achievement, { 
  through: StudentAchievement, 
  foreignKey: 'studentId', 
  otherKey: 'achievementId',
  as: 'achievements' 
});
Achievement.belongsToMany(Student, { 
  through: StudentAchievement, 
  foreignKey: 'achievementId', 
  otherKey: 'studentId',
  as: 'students' 
});

// User <-> Notification (one-to-many)
User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export {
  User,
  Student,
  Teacher,
  Parent,
  ParentStudent,
  Subject,
  Lesson,
  Game,
  Progress,
  GameSession,
  Achievement,
  StudentAchievement,
  Notification
};

export default {
  User,
  Student,
  Teacher,
  Parent,
  ParentStudent,
  Subject,
  Lesson,
  Game,
  Progress,
  GameSession,
  Achievement,
  StudentAchievement,
  Notification
};
