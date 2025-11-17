import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { register, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !confirmPassword || !name) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    if (password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    const success = await register(email, password, name);
    if (!success) {
      setError('Ошибка при регистрации. Попробуйте другой email.');
    }
  };

  return (
    <div className="auth-form">
      <h2 className="auth-form__title">Создание аккаунта</h2>
      
      <form onSubmit={handleSubmit} className="auth-form__form">
        <div className="auth-form__field">
          <label htmlFor="name" className="auth-form__label">
            Имя
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-form__input"
            placeholder="Ваше имя"
            required
          />
        </div>

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

        <div className="auth-form__field">
          <label htmlFor="confirmPassword" className="auth-form__label">
            Подтверждение пароля
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="auth-form__input"
            placeholder="Повторите пароль"
            required
          />
        </div>

        {error && <div className="auth-form__error">{error}</div>}

        <button
          type="submit"
          disabled={isLoading}
          className="auth-form__button"
        >
          {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        </button>
      </form>

      <div className="auth-form__switch">
        Уже есть аккаунт?{' '}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="auth-form__link"
        >
          Войти
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;