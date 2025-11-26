import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { Card, Button } from '../components/Common';
import './Home.css';

/**
 * Home Page
 * Landing page with role-based content
 */
const HomePage = () => {
  const { user, isAuthenticated, isStudent, isTeacher, isParent } = useAuth();
  const { t } = useLanguage();

  if (!isAuthenticated) {
    return (
      <div className="home-page">
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              {t('welcome')} to <span className="brand">Alif24</span>! 📚
            </h1>
            <p className="hero-subtitle">
              The fun and adaptive learning platform for kids aged 4-7
            </p>
            <div className="hero-actions">
              <Link to="/register">
                <Button variant="primary" size="large">
                  Get Started 🚀
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="large">
                  {t('login')}
                </Button>
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <span className="hero-emoji">🎓</span>
          </div>
        </section>

        <section className="features">
          <h2 className="section-title">Why Alif24?</h2>
          <div className="features-grid">
            <Card icon="🎯" title="Adaptive Learning" hoverable>
              <p>Content adjusts to each child's level and learning pace</p>
            </Card>
            <Card icon="🎮" title="Fun Games" hoverable>
              <p>Educational games that make learning enjoyable</p>
            </Card>
            <Card icon="📊" title="Progress Tracking" hoverable>
              <p>Parents and teachers can monitor student progress</p>
            </Card>
            <Card icon="🏆" title="Achievements" hoverable>
              <p>Earn badges and rewards for accomplishments</p>
            </Card>
          </div>
        </section>
      </div>
    );
  }

  // Student Dashboard
  if (isStudent) {
    return (
      <div className="home-page">
        <section className="welcome-section">
          <h1>Hi, {user?.firstName}! 👋</h1>
          <p>Ready to learn something new today?</p>
        </section>

        <section className="quick-actions">
          <Card 
            title={t('lessons')} 
            icon="📖"
            variant="lesson"
            hoverable
            onClick={() => window.location.href = '/lessons'}
          >
            <p>Continue your learning journey</p>
            <Button variant="success" size="small">Start Learning</Button>
          </Card>

          <Card 
            title={t('games')} 
            icon="🎮"
            variant="game"
            hoverable
            onClick={() => window.location.href = '/games'}
          >
            <p>Play educational games</p>
            <Button variant="danger" size="small">Play Now</Button>
          </Card>

          <Card 
            title={t('myAchievements')} 
            icon="🏆"
            variant="highlight"
            hoverable
            onClick={() => window.location.href = '/achievements'}
          >
            <p>View your badges and trophies</p>
            <Button variant="primary" size="small">View All</Button>
          </Card>
        </section>
      </div>
    );
  }

  // Teacher Dashboard
  if (isTeacher) {
    return (
      <div className="home-page">
        <section className="welcome-section">
          <h1>{t('welcome')}, {user?.firstName}! 👩‍🏫</h1>
          <p>Manage your students and create engaging content</p>
        </section>

        <section className="quick-actions">
          <Card title={t('myStudents')} icon="👨‍🎓" hoverable>
            <p>View and manage your students</p>
            <Link to="/my-students">
              <Button variant="primary" size="small">View Students</Button>
            </Link>
          </Card>

          <Card title={t('createLesson')} icon="✏️" hoverable>
            <p>Create new educational content</p>
            <Link to="/lessons/create">
              <Button variant="success" size="small">Create</Button>
            </Link>
          </Card>

          <Card title={t('createGame')} icon="🎲" hoverable>
            <p>Design interactive games</p>
            <Link to="/games/create">
              <Button variant="secondary" size="small">Create</Button>
            </Link>
          </Card>
        </section>
      </div>
    );
  }

  // Parent Dashboard
  if (isParent) {
    return (
      <div className="home-page">
        <section className="welcome-section">
          <h1>{t('welcome')}, {user?.firstName}! 👪</h1>
          <p>Monitor your children's learning progress</p>
        </section>

        <section className="quick-actions">
          <Card title={t('myChildren')} icon="👧" hoverable>
            <p>View your children's profiles</p>
            <Link to="/children">
              <Button variant="primary" size="small">View</Button>
            </Link>
          </Card>

          <Card title={t('childProgress')} icon="📈" hoverable>
            <p>Track learning progress and achievements</p>
            <Link to="/progress">
              <Button variant="success" size="small">View Progress</Button>
            </Link>
          </Card>

          <Card title={t('screenTime')} icon="⏰" hoverable>
            <p>Manage screen time settings</p>
            <Link to="/settings">
              <Button variant="secondary" size="small">Settings</Button>
            </Link>
          </Card>
        </section>
      </div>
    );
  }

  // Default/Admin Dashboard
  return (
    <div className="home-page">
      <section className="welcome-section">
        <h1>{t('welcome')}, {user?.firstName}! 👤</h1>
      </section>
    </div>
  );
};

export default HomePage;
