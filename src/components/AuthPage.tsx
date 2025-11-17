import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useTheme } from '../contexts/ThemeContext';
import Navigation from './Navigation';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { themeMode } = useTheme();

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={`auth-page auth-page--${themeMode}`}>
      <Navigation />
      <div className="auth-page__container">
        <div className="auth-page__card">
          <div className="auth-page__header">
            <div className="auth-page__logo">
              🎂
            </div>
            <h1 className="auth-page__brand">
              Календарь Дней Рождений
            </h1>
            <p className="auth-page__subtitle">
              Никогда не забывайте о важных датах
            </p>
          </div>
          
          <div className="auth-page__form-container">
            {isLogin ? (
              <LoginForm onSwitchToRegister={toggleForm} />
            ) : (
              <RegisterForm onSwitchToLogin={toggleForm} />
            )}
          </div>
        </div>
        
        <div className="auth-page__features">
          <div className="auth-page__feature">
            <div className="auth-page__feature-icon">📅</div>
            <h3 className="auth-page__feature-title">Умный календарь</h3>
            <p className="auth-page__feature-description">
              Отслеживайте дни рождения близких и друзей
            </p>
          </div>
          
          <div className="auth-page__feature">
            <div className="auth-page__feature-icon">🔔</div>
            <h3 className="auth-page__feature-title">Напоминания</h3>
            <p className="auth-page__feature-description">
              Получайте уведомления о предстоящих событиях
            </p>
          </div>
          
          <div className="auth-page__feature">
            <div className="auth-page__feature-icon">🎁</div>
            <h3 className="auth-page__feature-title">Поздравления</h3>
            <p className="auth-page__feature-description">
              Создавайте красивые открытки для поздравлений
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;