import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle ${className}`}
      title={`Переключить на ${themeMode === 'light' ? 'темную' : 'светлую'} тему`}
    >
      <div className="theme-toggle__slider">
        <div className={`theme-toggle__icon theme-toggle__icon--${themeMode}`}>
          {themeMode === 'light' ? '☀️' : '🌙'}
        </div>
      </div>
    </button>
  );
};

export default ThemeToggle;