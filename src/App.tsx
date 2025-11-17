import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { CalendarProvider } from './contexts/CalendarContext';

// Компоненты для поздравлений
import CustomGreetingForm from './components/CustomGreetingForm';
import DefaultGreetings from './components/DefaultGreetings';
import GreetingView from './components/GreetingView';
import MomGreeting from './components/MomGreeting';

// Новые компоненты
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import ThemeToggle from './components/ThemeToggle';
import Navigation from './components/Navigation';

import { DEFAULT_THEME, THEMES, ThemeKey } from './themes';

type GeneratedData = {
  text: string;
  theme: ThemeKey;
};

// Компонент-обертка для защиты маршрутов
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading__spinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/auth" replace />;
};

// Компонент для общедоступных маршрутов (перенаправляет в дашборд если авторизован)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading__spinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }
  
  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>;
};

// Лендинг компонент
const Landing: React.FC = () => {
  const searchParams = useMemo(() => {
    if (typeof window === 'undefined') {
      return new URLSearchParams('');
    }
    return new URLSearchParams(window.location.search);
  }, []);
  
  const specialPage = searchParams.get('dr');
  if (specialPage === 'best') {
    return <MomGreeting />;
  }
  
  const sharedText = searchParams.get('text')?.trim();
  const requestedTheme = (searchParams.get('theme') as ThemeKey) ?? DEFAULT_THEME;
  const shareTheme = THEMES[requestedTheme] ? requestedTheme : DEFAULT_THEME;

  if (sharedText) {
    return <GreetingView text={sharedText} themeKey={shareTheme} />;
  }

  const handleGenerate = ({ text, theme }: GeneratedData) => {
    if (typeof window === 'undefined') {
      return;
    }

    const url = new URL(window.location.href);
    url.search = '';
    url.hash = '';
    url.searchParams.set('text', text);
    if (theme !== DEFAULT_THEME) {
      url.searchParams.set('theme', theme);
    }

    const fullLink = url.toString();
    
    // Сразу переходим на открытку
    window.location.href = fullLink;
  };

  return (
    <div className="landing">
      <Navigation />
      <header className="hero">
        <div className="hero__badge">✨ Красивые поздравления</div>
        <h1 className="hero__title">Создайте открытку для особенных людей</h1>
        <p className="hero__subtitle">
          Выберите из 20+ готовых поздравлений или напишите свои слова. Мгновенно создайте стильную открытку с уникальной ссылкой для отправки.
        </p>
        <div className="hero__features">
          <div className="feature">
            <span className="feature__icon">🎨</span>
            <span className="feature__text">8 уникальных тем</span>
          </div>
          <div className="feature">
            <span className="feature__icon">💝</span>
            <span className="feature__text">20+ готовых поздравлений</span>
          </div>
          <div className="feature">
            <span className="feature__icon">🔗</span>
            <span className="feature__text">Мгновенные ссылки</span>
          </div>
          <div className="feature">
            <span className="feature__icon">📅</span>
            <span className="feature__text">Календарь дней рождения</span>
          </div>
        </div>
        
        <div className="hero__cta">
          <Link to="/auth" className="hero__button hero__button--primary">
            🎂 Открыть календарь дней рождения
          </Link>
        </div>
      </header>
      <main className="content">
        <DefaultGreetings onGenerate={handleGenerate} />
        <CustomGreetingForm onGenerate={handleGenerate} />
      </main>
      <footer className="footer">
        <span>С любовью и вдохновением · {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <CalendarProvider>
            <Routes>
              {/* Публичные маршруты */}
              <Route path="/" element={<Landing />} />
              <Route 
                path="/auth" 
                element={
                  <PublicRoute>
                    <AuthPage />
                  </PublicRoute>
                } 
              />
              
              {/* Защищенные маршруты */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Маршруты для поздравлений (остаются публичными) */}
              <Route path="/greeting" element={<GreetingView text="" themeKey={DEFAULT_THEME} />} />
              <Route path="/special/mom" element={<MomGreeting />} />
              
              {/* Перенаправление для неизвестных маршрутов */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </CalendarProvider>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;