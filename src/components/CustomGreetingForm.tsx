import { FormEvent, useState } from 'react';
import { DEFAULT_THEME, THEMES, THEME_KEYS, ThemeKey } from '../themes';

interface CustomGreetingFormProps {
  onGenerate: (payload: { text: string; theme: ThemeKey }) => void;
}

const CustomGreetingForm = ({ onGenerate }: CustomGreetingFormProps) => {
  const [text, setText] = useState('');
  const [theme, setTheme] = useState<ThemeKey>(DEFAULT_THEME);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = text.trim();

    if (!trimmed) {
      setError('Введите тёплые слова для поздравления.');
      return;
    }

    setError(null);
    onGenerate({ text: trimmed, theme });
  };

  return (
    <section className="custom-section">
      <div className="section-heading">
        <span className="section-badge">Создайте свою открытку</span>
        <h2 className="section-title">Уникальное поздравление</h2>
        <p className="section-subtitle">
          Напишите от души тёплые слова и выберите идеальное оформление из 8 уникальных тем. Мы мгновенно создадим ссылку для отправки вашим близким.
        </p>
      </div>
      <form className="custom-form" onSubmit={handleSubmit}>
        <label className="form-label" htmlFor="greeting-text">
          Текст поздравления
        </label>
        <textarea
          id="greeting-text"
          className="form-textarea"
          placeholder="Например: Дорогая Катя, поздравляю тебя с днем рождения..."
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={5}
        />
        <div className="help-text">Текст автоматически сохранится в ссылке. Можно использовать переносы строк.</div>
        <div className="form-field">
          <span className="form-label">Выберите оформление</span>
          <div className="theme-grid">
            {THEME_KEYS.map((themeKey) => {
              const option = THEMES[themeKey];
              const isActive = theme === themeKey;
              return (
                <label key={themeKey} className="theme-option">
                  <input
                    type="radio"
                    name="theme"
                    value={themeKey}
                    checked={isActive}
                    onChange={() => setTheme(themeKey)}
                  />
                  <span
                    className="theme-option__card"
                    style={{
                      backgroundImage: option.gradient,
                      boxShadow: isActive ? option.shadow : '0 12px 30px rgba(27, 19, 56, 0.12)',
                    }}
                  >
                    <span className="theme-option__name">{option.name}</span>
                    <span className="theme-option__description" style={{ color: option.mutedTextColor }}>
                      {isActive ? 'Выбрано' : 'Нажмите, чтобы выбрать'}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>
        {error ? <div className="form-error">{error}</div> : null}
        <button type="submit" className="primary-button">
          Создать поздравление
        </button>
      </form>
    </section>
  );
};

export default CustomGreetingForm;
