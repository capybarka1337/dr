import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Calendar from './Calendar';
import BirthdayList from './BirthdayList';
import AddBirthdayForm from './AddBirthdayForm';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { themeMode, toggleTheme } = useTheme();

  return (
    <div className={`dashboard dashboard--${themeMode}`}>
      <header className="dashboard__header">
        <div className="dashboard__container">
          <div className="dashboard__header-content">
            <div className="dashboard__logo">
              🎂 Календарь Дней Рождений
            </div>
            
            <div className="dashboard__user-menu">
              <div className="dashboard__user-info">
                <span className="dashboard__user-name">
                  {user?.name}
                </span>
                <span className="dashboard__user-email">
                  {user?.email}
                </span>
              </div>
              
              <button
                onClick={toggleTheme}
                className="dashboard__theme-toggle"
                title={`Переключить на ${themeMode === 'light' ? 'темную' : 'светлую'} тему`}
              >
                {themeMode === 'light' ? '🌙' : '☀️'}
              </button>
              
              <button
                onClick={logout}
                className="dashboard__logout-button"
                title="Выйти"
              >
                🚪
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="dashboard__main">
        <div className="dashboard__container">
          <div className="dashboard__content">
            <div className="dashboard__sidebar">
              <AddBirthdayForm />
            </div>
            
            <div className="dashboard__calendar-section">
              <Calendar />
            </div>
            
            <div className="dashboard__birthday-section">
              <BirthdayList />
            </div>
          </div>
        </div>
      </main>

      <footer className="dashboard__footer">
        <div className="dashboard__container">
          <p className="dashboard__footer-text">
            С любовью и заботой о важных датах · {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;