import { FormEvent, useState } from 'react';
import ShareButton from './ShareButton';
import { DEFAULT_THEME, THEMES, THEME_KEYS, ThemeKey } from '../themes';

interface CustomGreetingFormProps {
  onGenerate: (payload: { text: string; theme: ThemeKey }) => void;
  generatedLink: string | null;
  generatedData: { text: string; theme: ThemeKey } | null;
}

const CustomGreetingForm = ({ onGenerate, generatedLink, generatedData }: CustomGreetingFormProps) => {
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
        <h2 className="section-title">Персональное поздравление</h2>
        <p className="section-subtitle">
          Напишите несколько тёплых слов и выберите настроение открытки — мы сразу подготовим ссылку для отправки.
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

      {generatedLink && generatedData ? (
        <div className="generated-result">
          <h3 className="generated-title">Ваша открытка готова</h3>
          <p className="generated-subtitle">Сохраните ссылку или поделитесь ею сразу.</p>
          <div
            className="generated-preview"
            style={{ backgroundImage: THEMES[generatedData.theme].gradient }}
          >
            <div
              className="generated-preview__card"
              style={{
                backgroundColor: THEMES[generatedData.theme].cardBackground,
                color: THEMES[generatedData.theme].textColor,
                boxShadow: THEMES[generatedData.theme].shadow,
              }}
            >
              <div className="generated-preview__content">
                {generatedData.text
                  .split(/\r?\n/)
                  .map((line) => line.trim())
                  .filter(Boolean)
                  .map((line, index) => (
                    <p key={`${line}-${index}`}>{line}</p>
                  ))}
              </div>
            </div>
          </div>
          <div className="generated-actions">
            <div className="link-chip" title={generatedLink}>
              {generatedLink}
            </div>
            <ShareButton link={generatedLink} label="Скопировать или отправить" />
          </div>
        </div>
      ) : null}
    </section>
  );
};

export default CustomGreetingForm;
