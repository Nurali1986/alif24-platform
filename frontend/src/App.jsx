import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar, Loading } from './components/Common';
import { HomePage, LoginPage, RegisterPage } from './pages';
import './styles/global.css';

/**
 * Protected Route Component
 * Redirects to login if not authenticated
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return <Loading fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

/**
 * Public Route Component
 * Redirects to home if already authenticated
 */
const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <Loading fullScreen />;
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

/**
 * App Layout Component
 */
const AppLayout = ({ children }) => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
    </div>
  );
};

/**
 * Main App Component
 */
const App = () => {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
};

/**
 * App Routes
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <AppLayout>
            <HomePage />
          </AppLayout>
        }
      />

      {/* Student Routes */}
      <Route
        path="/lessons"
        element={
          <ProtectedRoute allowedRoles={['student', 'admin']}>
            <AppLayout>
              <div>Lessons Page (Coming Soon)</div>
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/games"
        element={
          <ProtectedRoute allowedRoles={['student', 'admin']}>
            <AppLayout>
              <div>Games Page (Coming Soon)</div>
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/achievements"
        element={
          <ProtectedRoute allowedRoles={['student', 'admin']}>
            <AppLayout>
              <div>Achievements Page (Coming Soon)</div>
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Teacher Routes */}
      <Route
        path="/my-students"
        element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <AppLayout>
              <div>My Students Page (Coming Soon)</div>
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/lessons/create"
        element={
          <ProtectedRoute allowedRoles={['teacher', 'admin']}>
            <AppLayout>
              <div>Create Lesson Page (Coming Soon)</div>
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Parent Routes */}
      <Route
        path="/children"
        element={
          <ProtectedRoute allowedRoles={['parent', 'admin']}>
            <AppLayout>
              <div>My Children Page (Coming Soon)</div>
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Profile Route */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <AppLayout>
              <div>Profile Page (Coming Soon)</div>
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* Settings Route */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <AppLayout>
              <div>Settings Page (Coming Soon)</div>
            </AppLayout>
          </ProtectedRoute>
        }
      />

      {/* 404 Route */}
      <Route
        path="*"
        element={
          <AppLayout>
            <div className="not-found">
              <h1>404 - Page Not Found</h1>
              <p>The page you're looking for doesn't exist.</p>
            </div>
          </AppLayout>
        }
      />
    </Routes>
  );
};

export default App;
