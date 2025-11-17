import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setError('Неверный email или пароль');
    }
  };

  return (
    <div className="auth-form">
      <h2 className="auth-form__title">Вход в аккаунт</h2>
      
      <form onSubmit={handleSubmit} className="auth-form__form">
        <div className="auth-form__field">
          <label htmlFor="email" className="auth-form__label">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-form__input"
            placeholder="your@email.com"
            required
          />
        </div>

        <div className="auth-form__field">
          <label htmlFor="password" className="auth-form__label">
            Пароль
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-form__input"
            placeholder="Минимум 6 символов"
            required
          />
        </div>

        {error && <div className="auth-form__error">{error}</div>}

        <button
          type="submit"
          disabled={isLoading}
          className="auth-form__button"
        >
          {isLoading ? 'Вход...' : 'Войти'}
        </button>
      </form>

      <div className="auth-form__switch">
        Нет аккаунта?{' '}
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="auth-form__link"
        >
          Зарегистрироваться
        </button>
      </div>
    </div>
  );
};

export default LoginForm;