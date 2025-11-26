import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import './Navbar.css';

/**
 * Navigation Bar Component
 * Responsive navbar with role-based navigation
 */
const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { t, language, switchLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getNavLinks = () => {
    if (!isAuthenticated) {
      return [
        { to: '/login', label: t('login') },
        { to: '/register', label: t('register') }
      ];
    }

    const baseLinks = [{ to: '/', label: t('home') }];

    switch (user?.role) {
      case 'student':
        return [
          ...baseLinks,
          { to: '/lessons', label: t('lessons') },
          { to: '/games', label: t('games') },
          { to: '/achievements', label: t('myAchievements') },
          { to: '/profile', label: t('profile') }
        ];
      case 'teacher':
        return [
          ...baseLinks,
          { to: '/my-students', label: t('myStudents') },
          { to: '/lessons/create', label: t('createLesson') },
          { to: '/profile', label: t('profile') }
        ];
      case 'parent':
        return [
          ...baseLinks,
          { to: '/children', label: t('myChildren') },
          { to: '/profile', label: t('profile') }
        ];
      case 'admin':
        return [
          ...baseLinks,
          { to: '/admin/users', label: 'Users' },
          { to: '/admin/content', label: 'Content' },
          { to: '/profile', label: t('profile') }
        ];
      default:
        return baseLinks;
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <NavLink to="/" className="navbar-logo">
          <span className="logo-icon">📚</span>
          <span className="logo-text">Alif24</span>
        </NavLink>
      </div>

      <div className="navbar-menu">
        {getNavLinks().map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `navbar-link ${isActive ? 'active' : ''}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>

      <div className="navbar-actions">
        <button
          className="lang-switch"
          onClick={() => switchLanguage(language === 'uz' ? 'ru' : 'uz')}
        >
          {language === 'uz' ? '🇺🇿 UZ' : '🇷🇺 RU'}
        </button>

        {isAuthenticated && (
          <>
            <span className="user-name">
              {user?.firstName}
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              {t('logout')}
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
