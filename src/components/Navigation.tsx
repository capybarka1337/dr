import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navigation: React.FC = () => {
  const { user } = useAuth();

  return (
    <nav className="navigation">
      <div className="navigation__container">
        <div className="navigation__brand">
          <Link to="/" className="navigation__logo">
            🎂 Открытки
          </Link>
        </div>
        
        <div className="navigation__menu">
          <Link to="/" className="navigation__link">
            Создать открытку
          </Link>
          
          {user ? (
            <Link to="/dashboard" className="navigation__link navigation__link--primary">
              📅 Мой календарь
            </Link>
          ) : (
            <Link to="/auth" className="navigation__link navigation__link--primary">
              Войти
            </Link>
          )}
          
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;